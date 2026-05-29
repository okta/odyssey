import { describe, expect, test } from "vitest";

import {
  extractComponentUsageDetail,
  type ExtractComponentUsageDetailArgs,
} from "./uiStats.js";

// Mirrors the structure of /api/usage/components response
const makeUsageDetailResponse = (
  overrides: Partial<
    ExtractComponentUsageDetailArgs["usageDetailResponse"]
  > = {},
): ExtractComponentUsageDetailArgs["usageDetailResponse"] => ({
  data: {},
  message: "componentUsage",
  ...overrides,
});

const WP_COMPONENTS_RESPONSE: ExtractComponentUsageDetailArgs["usageDetailResponse"] =
  {
    message: "componentUsage",
    data: {
      "atko-eng/workload-principal-ui": {
        packages: [
          {
            name: "@okta/odyssey-contributions-wp-components",
            components: [
              {
                name: "Typography",
                count: 14,
                files: [
                  {
                    package: "@okta/admin.ai-agents",
                    version: "1.5.0",
                    path: "src/components/AIAgents/SourceCell.tsx",
                  },
                  {
                    package: "@okta/admin.ai-agents",
                    version: "1.5.0",
                    path: "src/components/DataDisplay/DataField.tsx",
                  },
                  {
                    package: "@okta/admin.ai-agents",
                    version: "1.5.0",
                    path: "src/pages/AIAgentDetailsPage/AgentDetailsCard.tsx",
                  },
                  {
                    package: "@okta/workload-principal-components",
                    version: "1.5.0",
                    path: "src/components/FormattedDate.tsx",
                  },
                  {
                    package: "@okta/admin.import-monitoring-ai-agents",
                    version: "1.5.0",
                    path: "src/components/ImportOperations/AIAgentProviderCell.tsx",
                  },
                  {
                    package: "@okta/admin.import-monitoring-ai-agents",
                    version: "1.5.0",
                    path: "src/components/ImportOperations/ApplicationCell.tsx",
                  },
                  {
                    package: "@okta/admin.import-monitoring-ai-agents",
                    version: "1.5.0",
                    path: "src/components/ImportOperations/StatusCell.tsx",
                  },
                  {
                    package: "@okta/admin.appinstance-ai-agent-import",
                    version: "1.5.0",
                    path: "src/components/ImportedAgentsView/ImportSummaryCard.tsx",
                  },
                  {
                    package: "@okta/admin.appinstance-ai-agent-import",
                    version: "1.5.0",
                    path: "src/components/TabbedSurface/TabbedSurfaceTab.tsx",
                  },
                ],
              },
              {
                name: "PageTemplate",
                count: 3,
                files: [
                  {
                    package: "@okta/admin.ai-agents",
                    version: "1.5.0",
                    path: "src/pages/AIAgentsPage/AIAgentsPage.tsx",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };

describe(extractComponentUsageDetail.name, () => {
  test("component found in one repo across multiple consumer packages", () => {
    const result = extractComponentUsageDetail({
      componentName: "Typography",
      usageDetailResponse: WP_COMPONENTS_RESPONSE,
    });

    expect(result).toEqual([
      {
        repoName: "atko-eng/workload-principal-ui",
        consumerPackages: [
          {
            consumerPackage: "@okta/admin.ai-agents",
            minimumViablePath: "src/",
            files: [
              {
                path: "src/components/AIAgents/SourceCell.tsx",
                version: "1.5.0",
              },
              {
                path: "src/components/DataDisplay/DataField.tsx",
                version: "1.5.0",
              },
              {
                path: "src/pages/AIAgentDetailsPage/AgentDetailsCard.tsx",
                version: "1.5.0",
              },
            ],
          },
          {
            consumerPackage: "@okta/admin.appinstance-ai-agent-import",
            minimumViablePath: "src/components/",
            files: [
              {
                path: "src/components/ImportedAgentsView/ImportSummaryCard.tsx",
                version: "1.5.0",
              },
              {
                path: "src/components/TabbedSurface/TabbedSurfaceTab.tsx",
                version: "1.5.0",
              },
            ],
          },
          {
            consumerPackage: "@okta/admin.import-monitoring-ai-agents",
            minimumViablePath: "src/components/ImportOperations/",
            files: [
              {
                path: "src/components/ImportOperations/AIAgentProviderCell.tsx",
                version: "1.5.0",
              },
              {
                path: "src/components/ImportOperations/ApplicationCell.tsx",
                version: "1.5.0",
              },
              {
                path: "src/components/ImportOperations/StatusCell.tsx",
                version: "1.5.0",
              },
            ],
          },
          {
            consumerPackage: "@okta/workload-principal-components",
            minimumViablePath: "src/components/",
            files: [
              {
                path: "src/components/FormattedDate.tsx",
                version: "1.5.0",
              },
            ],
          },
        ],
      },
    ]);
  });

  test("component not present in any repo returns empty array", () => {
    const result = extractComponentUsageDetail({
      componentName: "NonExistentComponent",
      usageDetailResponse: WP_COMPONENTS_RESPONSE,
    });

    expect(result).toEqual([]);
  });

  test("empty data returns empty array", () => {
    const result = extractComponentUsageDetail({
      componentName: "Typography",
      usageDetailResponse: makeUsageDetailResponse(),
    });

    expect(result).toEqual([]);
  });

  test("component used in multiple repos returns one entry per repo", () => {
    const result = extractComponentUsageDetail({
      componentName: "Typography",
      usageDetailResponse: makeUsageDetailResponse({
        data: {
          "org/repo-a": {
            packages: [
              {
                name: "@okta/odyssey-contributions-wp-components",
                components: [
                  {
                    name: "Typography",
                    count: 1,
                    files: [
                      {
                        package: "@okta/admin.foo",
                        version: "1.0.0",
                        path: "src/Foo.tsx",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          "org/repo-b": {
            packages: [
              {
                name: "@okta/odyssey-contributions-wp-components",
                components: [
                  {
                    name: "Typography",
                    count: 1,
                    files: [
                      {
                        package: "@okta/admin.bar",
                        version: "1.0.0",
                        path: "src/Bar.tsx",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }),
    });

    expect(result).toHaveLength(2);
    expect(result[0].repoName).toBe("org/repo-a");
    expect(result[1].repoName).toBe("org/repo-b");
  });

  test("single file in a deep directory uses its directory as minimumViablePath", () => {
    const result = extractComponentUsageDetail({
      componentName: "Widget",
      usageDetailResponse: makeUsageDetailResponse({
        data: {
          "org/repo": {
            packages: [
              {
                name: "@okta/odyssey-contributions-wp-components",
                components: [
                  {
                    name: "Widget",
                    count: 1,
                    files: [
                      {
                        package: "@okta/admin.app",
                        version: "1.0.0",
                        path: "src/components/deep/Widget.tsx",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }),
    });

    expect(result[0].consumerPackages[0].minimumViablePath).toBe(
      "src/components/deep/",
    );
  });

  test("files in root directory use ./ as minimumViablePath", () => {
    const result = extractComponentUsageDetail({
      componentName: "Widget",
      usageDetailResponse: makeUsageDetailResponse({
        data: {
          "org/repo": {
            packages: [
              {
                name: "@okta/odyssey-contributions-wp-components",
                components: [
                  {
                    name: "Widget",
                    count: 2,
                    files: [
                      {
                        package: "@okta/admin.app",
                        version: "1.0.0",
                        path: "App.tsx",
                      },
                      {
                        package: "@okta/admin.app",
                        version: "1.0.0",
                        path: "Main.tsx",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }),
    });

    expect(result[0].consumerPackages[0].minimumViablePath).toBe("./");
  });
});
