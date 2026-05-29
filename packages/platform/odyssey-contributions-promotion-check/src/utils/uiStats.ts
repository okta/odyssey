// These types are manually maintained to match the UI Stats API response shape.
// If usage of ui-stats grows, consider proper type-safety tooling (e.g. ts-rest
// with a shared package on Artifactory) to avoid drift.
export type ComponentUsage = {
  name: string;
  totalCount: number;
  usedInPackageCount: number;
  usedInRepoCount: number;
};

export type ComponentUsageSummaryEntry = {
  components: ComponentUsage[];
  name: string;
  packageCount: number;
  repoCount: number;
  totalCount: number;
  version: string | null;
};

type ComponentUsageSummaryResponse = {
  data: ComponentUsageSummaryEntry[];
};

export type FetchUiStatsSummaryArgs = {
  onWarn?: (message: string) => void;
  packageName: string;
};

// --- Detail endpoint types (/api/usage/components) ---

type ComponentDetailFile = {
  package: string;
  path: string;
  version: string;
};

type ComponentDetailItem = {
  count: number;
  files: ComponentDetailFile[];
  name: string;
};

type RepoPackageDetail = {
  components: ComponentDetailItem[];
  name: string;
};

type ComponentUsageDetailResponse = {
  data: Record<string, { packages: RepoPackageDetail[] }>;
  message: string;
};

export type ComponentFileReference = {
  path: string;
  version: string;
};

export type ConsumerPackageUsage = {
  consumerPackage: string;
  files: ComponentFileReference[];
  minimumViablePath: string;
};

export type ComponentUsageDetailEntry = {
  consumerPackages: ConsumerPackageUsage[];
  repoName: string;
};

export type ExtractComponentUsageDetailArgs = {
  componentName: string;
  usageDetailResponse: ComponentUsageDetailResponse;
};

type FetchUiStatsArgs = {
  onWarn: (message: string) => void;
  packageName: string;
  path: string;
};

const fetchUiStats = async <T>({
  onWarn,
  packageName,
  path,
}: FetchUiStatsArgs): Promise<T | null> => {
  const apiUrl = process.env["UI_STATS_API_URL"];
  const token = process.env["UI_STATS_TOKEN"];

  if (!apiUrl || !token) {
    onWarn(
      `UI Stats skipped for ${packageName}: UI_STATS_API_URL or UI_STATS_TOKEN is not set`,
    );
    return null;
  }

  try {
    const response = await fetch(new URL(path, apiUrl), {
      headers: { Cookie: `aurmRefreshToken_0=${token}` },
    });

    if (!response.ok) {
      throw new Error(
        `UI Stats API returned ${response.status} for package ${packageName}`,
      );
    }

    return await (response.json() as Promise<T>);
  } catch (error) {
    onWarn(
      `UI Stats unavailable for ${packageName}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
};

/**
 * Fetches the component usage summary for a given package from the UI Stats API.
 *
 * Requires UI_STATS_API_URL and UI_STATS_TOKEN environment variables.
 * UI_STATS_TOKEN is sent as an AURM refresh-token cookie required by
 * the UI Stats authentication middleware.
 *
 * Returns null and calls onWarn if env vars are missing or the request fails.
 */
export const getComponentUsageSummary = async ({
  onWarn = () => {},
  packageName,
}: FetchUiStatsSummaryArgs): Promise<ComponentUsageSummaryEntry[] | null> => {
  const response = await fetchUiStats<ComponentUsageSummaryResponse>({
    onWarn,
    packageName,
    path: `/api/usage/components/summary?package=${encodeURIComponent(packageName)}`,
  });
  return response?.data ?? null;
};

/**
 * Fetches the detailed component usage (per-repo, per-package, per-file) for a
 * given package from the UI Stats API.
 *
 * Requires UI_STATS_API_URL and UI_STATS_TOKEN environment variables.
 * Returns null and calls onWarn if env vars are missing or the request fails.
 */
export const getComponentUsageDetail = async ({
  onWarn = () => {},
  packageName,
}: FetchUiStatsSummaryArgs): Promise<ComponentUsageDetailResponse | null> =>
  fetchUiStats<ComponentUsageDetailResponse>({
    onWarn,
    packageName,
    path: `/api/usage/components?package=${encodeURIComponent(packageName)}`,
  });

const computeMinimumViablePath = (filePaths: string[]): string => {
  if (filePaths.length === 0) return "./";

  const getDirectorySegments = (filePath: string): string[] => {
    const lastSlash = filePath.lastIndexOf("/");
    return lastSlash === -1 ? [] : filePath.slice(0, lastSlash).split("/");
  };

  const segmentArrays = filePaths.map(getDirectorySegments);
  const firstSegments = segmentArrays[0];

  let commonLength = firstSegments.length;
  for (const segments of segmentArrays.slice(1)) {
    let matchLength = 0;
    while (
      matchLength < commonLength &&
      matchLength < segments.length &&
      firstSegments[matchLength] === segments[matchLength]
    ) {
      matchLength++;
    }
    commonLength = matchLength;
  }

  if (commonLength === 0) return "./";
  return `${firstSegments.slice(0, commonLength).join("/")}/`;
};

/**
 * Extracts per-repo, per-consumer-package usage detail for a single component
 * from a full detail response. Returns one entry per repo that uses the component.
 *
 * Each ConsumerPackageUsage includes a pre-computed minimumViablePath — the
 * longest common directory prefix of all files for that package — suitable for
 * use as the --paths argument to `yarn odyssey-cli migrate`.
 */
export const extractComponentUsageDetail = ({
  componentName,
  usageDetailResponse,
}: ExtractComponentUsageDetailArgs): ComponentUsageDetailEntry[] =>
  Object.entries(usageDetailResponse.data)
    .toSorted(([repoNameA], [repoNameB]) => repoNameA.localeCompare(repoNameB))
    .flatMap(([repoName, repoData]) => {
      const matchingFiles = repoData.packages.flatMap((repoPackage) =>
        repoPackage.components
          .filter((component) => component.name === componentName)
          .flatMap((component) =>
            component.files.map((file) => ({
              consumerPackage: file.package,
              fileReference: { path: file.path, version: file.version },
            })),
          ),
      );

      if (matchingFiles.length === 0) return [];

      const filesByConsumerPackage = matchingFiles.reduce<
        Record<string, ComponentFileReference[]>
      >(
        (filesByPackage, { consumerPackage, fileReference }) => ({
          ...filesByPackage,
          [consumerPackage]: [
            ...(filesByPackage[consumerPackage] ?? []),
            fileReference,
          ],
        }),
        {},
      );

      const consumerPackages: ConsumerPackageUsage[] = Object.entries(
        filesByConsumerPackage,
      )
        .toSorted(([packageA], [packageB]) => packageA.localeCompare(packageB))
        .map(([consumerPackage, files]) => {
          const sortedFiles = files.toSorted((fileA, fileB) =>
            fileA.path.localeCompare(fileB.path),
          );
          return {
            consumerPackage,
            files: sortedFiles,
            minimumViablePath: computeMinimumViablePath(
              sortedFiles.map((file) => file.path),
            ),
          };
        });

      return [{ repoName, consumerPackages }];
    });
