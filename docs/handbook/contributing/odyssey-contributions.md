# Contributions

A contribution is a reusable package under `packages/contributions/` that is
owned by an Okta team outside Odyssey. Changes elsewhere in the repository are
Odyssey-owned maintenance, not contributions.

Use this path when your team needs to build a reusable component or alter an
existing Odyssey component that your team will own. Your team maintains the
component. Odyssey provides the package infrastructure, automation, and optional
design-system guidance, so your team can focus on the component and release it on
its own timeline.

No prior Odyssey approval is required. Before starting, choose:

- a short package name;
- the Terminus project that represents the home team and will own the package.

If your team does not have a Terminus project, follow the
[Terminus setup instructions](https://oktainc.atlassian.net/wiki/spaces/ODS/pages/913540729/Code+Contribution+Guide#Terminus)
to create one before continuing.

## Start in Two Steps

1. Ask your coding agent to set up a contribution package. Agents that support
   this repository's skills can run `/contribution-setup`. The setup asks for the
   package name and Terminus project, then prepares the package, CODEOWNERS,
   Storybook, optional i18n, and release configuration. It leaves all changes
   local for your team to review and does not commit or push.
2. Complete the Terminus project-sharing request described when setup finishes,
   then begin developing the component in the generated package.

If the repository skill is unavailable, scaffold the package from the repository
root with:

```sh
yarn create-contribution --name <package-name>
```

The command creates the package only. Complete the CODEOWNERS, Storybook, i18n,
release configuration, and Terminus integration described above yourself, or ask
a coding agent to finish them.

## Why Build It Here

A contribution gives your team:

- **Automated setup:** `/contribution-setup` creates the package and connects the
  repository plumbing instead of making the team assemble it by hand.
- **Odyssey's shared foundation:** use the same build, theming, design-token, and
  i18n pipeline as Odyssey Core without maintaining a parallel toolchain.
- **Storybook and VRT included:** develop component states in the shared Storybook
  and get visual regression coverage without creating either system yourself.
- **Guidance when it helps:** ask Odyssey core members for pattern, accessibility,
  design-system, or implementation guidance instead of solving unfamiliar problems alone.
- **Reuse across ORD:** other teams can use the component from the shared package
  as soon as it lands instead of rebuilding a one-off equivalent.
- **A path into Odyssey Core:** a broadly useful Contribution can be promoted into
  Core. Odyssey then owns its long-term maintenance.
- **Your team's delivery timeline:** the home team owns prioritization and release
  timing rather than waiting on the Odyssey backlog.

The home team decides the package's internal architecture and owns its code,
design, documentation, releases, maintenance, and bug fixes while it remains an
contribution.

Odyssey maintains the shared tooling and is available for design-system guidance,
pairing, or review when that help is useful. Odyssey assistance is not an extra
approval gate for ordinary Contribution work. Teams should understand the shared
patterns and ask in `#odyssey` whenever a rule, integration, or tradeoff is
unclear.

Use this path for a new reusable component or component variation that is not
already part of Odyssey Core. Starting here should be easier than creating a
separate component repository because the shared infrastructure and automation
already exist.

## Contribution Lifecycle

The operating model has three phases:

1. **Discovery:** identify a reusable design-system need and align within the home
   team.
2. **Engagement:** understand the shared platform and involve Odyssey when advice
   or coordination would help.
3. **Contribution:** build, document, test, review, and release the home-team-owned
   package.

The internal guides own the current organizational process:

- [Operating & Contribution Model](https://oktainc.atlassian.net/wiki/spaces/ODS/pages/913244929/Operating+Contribution+Model)
- [Engineering Contribution Guide](https://oktainc.atlassian.net/wiki/spaces/ODS/pages/913540729/Guide+Engineering+Contribution)

Use these guides to understand the model and available support. They provide
context, not a sequence of Odyssey approval gates.

## Repository Shape

Contribution work commonly touches:

- `packages/contributions/<package-name>/` for the owned package;
- `packages/apps/odyssey-storybook/src/<package-name>/` for Storybook stories;
- `.github/CODEOWNERS` for explicit home-team ownership;
- `.config/releaserc.json` for independent package releases;
- package-owned documentation and generated translations.

Use the setup skill and existing Contribution packages as starting points. Beyond
the shared package, ownership, release, accessibility, and integration contracts,
the home team controls the package's internal implementation.

## Ready to Merge

Most of the repository setup below is generated by `/contribution-setup`. Before
merging, confirm:

- the home team and ownership are explicit;
- package metadata, release configuration, and generated files are current;
- component behavior, accessibility, internationalization, and documentation are
  covered;
- Storybook directly renders the meaningful states needed for visual regression
  coverage;
- applicable Nx targets and repository quality gates pass;
- the PR author has reviewed any visual regression differences according to the
  [visual regression testing guide](../testing/visual-regression-testing.md).
