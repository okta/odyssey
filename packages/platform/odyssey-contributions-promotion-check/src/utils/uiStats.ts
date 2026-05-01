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
  const apiUrl = process.env["UI_STATS_API_URL"];
  const token = process.env["UI_STATS_TOKEN"];

  if (!apiUrl || !token) {
    onWarn(
      `UI Stats skipped for ${packageName}: UI_STATS_API_URL or UI_STATS_TOKEN is not set`,
    );
    return null;
  }

  try {
    const path = `/api/usage/components/summary?package=${encodeURIComponent(packageName)}`;
    const response = await fetch(new URL(path, apiUrl), {
      headers: {
        Cookie: `aurmRefreshToken_0=${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `UI Stats API returned ${response.status} for package ${packageName}`,
      );
    }

    const json =
      await (response.json() as Promise<ComponentUsageSummaryResponse>);
    return json.data;
  } catch (error) {
    onWarn(
      `UI Stats unavailable for ${packageName}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return null;
  }
};
