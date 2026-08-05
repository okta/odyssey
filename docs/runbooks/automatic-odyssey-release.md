# Automatic Odyssey Release

The `/release` skill orchestrates the full Odyssey release. Local git work (version
bump, release branch, tag, public sync + PR) runs directly in the operator's
checkouts through `scripts/release/release-git.sh`. The four Bacon stages (CI,
promotion, backport, public publish) are triggered directly by the `/release` skill
invoking the `ord-skills:bacon` skill, not by a shell wrapper. Each trigger's run id
is recorded in the JSON checkpoint through `scripts/release/release-git.sh
record-task`, then a background subagent (haiku model) polls `ord-skills:bacon`
until the run reaches a terminal state and reports the raw status back to the
`/release` skill. The main agent does not poll in a loop; it only decides go/no-go
for the two irreversible stages from the status the subagent returns. Progress is
checkpointed to a JSON state file, so every stage is skipped once it has succeeded
and a re-run resumes safely.

There is no local Aperture access and no local robo-warrior clone: all Bacon calls
go through the `ord-skills:bacon` skill, which authenticates with `ocm auth aurm`.

## Prerequisites

- `ocm` logged in, on VPN (the `ord-skills:bacon` skill reaches Bacon/Aperture).
- The `ord-skills:bacon` skill installed (it is resolved automatically).
- `git`, `jq`, `yarn`, and `gh` available; `gh` authenticated to the `okta` org.
- A clean public `okta/odyssey` clone at `$OKTA_HOME/odyssey` (default `~/okta/odyssey`).
- A clean operator checkout of this repo.

## Start

Run the skill:

```
/release                                   # minor or major from master
/release --patch 1.65 --version 1.65.2     # patch from a release branch
/release --patch 1.65 --version 1.65.2 --cherry-pick <sha>
```

The skill previews the release, asks once to approve the two irreversible actions
(artifact promotion and public NPM/Storybook publishing), then walks the ten
stages: preflight, version, release_branch, ci, promotion, backport, tag,
public_release, sync, sync_pr. It prints the checkpoint path on the first run.

## Safety model

- Operator checkout and the public `okta/odyssey` clone must both be clean; the
  release runs directly in them (no worktrees) and aborts if either is dirty.
- Release commits, tags, and the public sync commit are signed and verified before
  every push, and each pushed ref is confirmed to have reached origin.
- Existing remote branches and tags are reused only when their SHA matches; only
  fast-forward updates, no destructive resets, no force-pushes.
- Minor/major tags refuse to apply until the backport has actually landed on
  `origin/master`.
- The public sync copies only the mirrored file set; public-only files (the public
  repo's LICENSE, README, CONTRIBUTING, CODEOWNERS, and `.github`) are preserved,
  and no internal `.github/workflows` is ever ported.
- Bacon waits run in a background subagent with a deadline and bounded read
  retries, not a foreground polling loop in the main agent.

## Resume

Re-run with the checkpoint path. Completed stages are skipped. An interrupted Bacon
stage reuses its recorded run id instead of triggering a duplicate: the wait
subagent appends a progress line to a per-stage handoff file
(`<state-file>.wait-<stage>.md`) on every poll cycle, so a re-run resumes the wait
against that same run id rather than starting a new one.

```
/release --state-file <checkpoint.json>
```

Individual stages can also be re-run directly:

```bash
bash scripts/release/release-git.sh <stage> --state-file <checkpoint.json>
```

## Dry run

```
/release --patch 1.65 --version 1.65.2 --dry-run
```

Dry-run performs real preflight and simulates every mutation and Bacon stage with
no network calls, git mutations, pushes, publishes, or PRs. Delete the dry-run
checkpoint before starting a live release with the same inputs.

## Completion

The final checkpoint holds the version, branches, SHAs, tag, Bacon run ids, sync
branch, and sync PR URL. The only human-owned action after a successful run is
merging the public sync PR and watching its public Bacon run.
