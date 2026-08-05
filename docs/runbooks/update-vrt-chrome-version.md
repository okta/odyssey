# Runbook — Update the Chrome version used by Visual Regression Tests

**Goal:** bump the `google-chrome-stable` version installed by the Visual
Regression Test (VRT) CI suite to the newest build available in Artifactory.

**When to run:** occasionally, when the pinned Chrome falls behind and you want
current Chromium runtime libraries on the CI image (for example, after a Chrome
major release, or when a new dependency needs a newer shared library).

**What this does and does not affect:** the VRT suite installs
`google-chrome-stable` for its runtime shared libraries (`libatk-1.0.so.0`,
`libnss3`, etc.), which the puppeteer-bundled Chromium that `eyes-storybook`
launches needs in order to start. The system Chrome binary itself is not
launched. The pixels compared in Applitools are rendered server-side on the
Applitools Ultrafast Grid, not by this local Chrome. So updating this version
refreshes the CI image's libraries and the local DOM-capture browser, not the
comparison rendering.

---

## Prerequisites

- The corporate CA cert available to `curl`. Kevin's is at
  `~/.local/prisma_certificates.pem` (exported via `NODE_EXTRA_CA_CERTS` in the
  shell profile). Substitute your own path.
- Network access to `artifacts.aue1e.internal` (on VPN / corp network).

---

## Step 1 — Find the newest version in Artifactory

The versions live in the `thirdparty-yum/x86_64/chrome-sel3` repo. List them and
take the highest stable (`-1` suffix, no `beta` / `dev`):

```sh
CACERT="$HOME/.local/prisma_certificates.pem"
BASE="https://artifacts.aue1e.internal/artifactory"

curl -s --cacert "$CACERT" \
  "$BASE/api/storage/thirdparty-yum/x86_64/chrome-sel3/" \
  | grep -oE '"/[0-9][^"]+"' | tr -d '"/' \
  | grep -vE 'beta|dev|unstable' \
  | sort -t. -k1,1n -k2,2n -k3,3n -k4,4n \
  | tail -5
```

The last line is the newest. Note that Artifactory mirrors a subset of Google's
builds, so the newest here may be a slightly older patch than the absolute
latest Chrome release.

## Step 2 — Confirm the RPM exists for that version

The folder must contain a `google-chrome-stable-<version>-1.x86_64.rpm`:

```sh
VERSION="150.0.7871.114"   # from Step 1, without the -1 suffix
curl -s --cacert "$CACERT" \
  "$BASE/api/storage/thirdparty-yum/x86_64/chrome-sel3/${VERSION}-1/" \
  | grep -oE '"uri" : "[^"]+"'
```

You should see `google-chrome-stable-<version>-1.x86_64.rpm`. If it is missing,
pick the next-newest version from Step 1.

## Step 3 — Update the pin

Edit `scripts/visual-regression-test.sh` and set `CHROME_VERSION` to the value
from Step 1 (without the `-1` suffix — the script appends it):

```sh
CHROME_VERSION="150.0.7871.114"
```

`setup_service google-chrome-stable ${CHROME_VERSION}-1` installs that RPM and
its dependency tree.

## Step 4 — Ship and verify

Open a PR to `master`, then watch the VRT suite on Bacon. Confirm the
`setup_service google-chrome-stable` step logs
`Google Chrome Stable Version: Google Chrome <new version>` and completes, and
that the run proceeds into the visual comparisons without a
`libatk-1.0.so.0: cannot open shared object file` (or similar missing-library)
error.

---

## Notes

- The `CHROME_VERSION` value is the version string only; the script appends the
  `-1` release suffix when building both the package name and the Artifactory
  path.
- The Selenium `chromedriver` is intentionally not downloaded — puppeteer does
  not use it. Do not re-add it when bumping the version.
