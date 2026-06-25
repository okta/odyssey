import { describe, expect, test, vi } from "vitest";

import { migrateSource } from "./migrate.js";

vi.mock("./mappings/index.js", () => ({
  COMPONENT_MAPPINGS: {
    TestWidget: {
      source: {
        component: "TestWidget",
        packages: ["@old/lib"],
        propsType: "TestWidgetProps",
      },
      target: {
        component: "NewTestWidget",
        package: "@new/lib",
        propsType: "NewTestWidgetProps",
      },
      propMap: { label: "title" },
    },
  },
}));

const logger = vi.fn();

describe(migrateSource.name, () => {
  test("source code with matching import", () => {
    const result = migrateSource({
      components: "TestWidget",
      logger,
      sourceCode: 'import { TestWidget } from "@old/lib";\n',
    });

    expect(result.hasChanges).toBe(true);
    expect(result.transformedCode.trim()).toBe(
      'import { NewTestWidget } from "@new/lib";',
    );
  });

  test("source code with no matching import", () => {
    const sourceCode = 'import { Other } from "@other/lib";\n';

    const result = migrateSource({
      components: "TestWidget",
      logger,
      sourceCode,
    });

    expect(result).toEqual({ hasChanges: false, transformedCode: sourceCode });
  });
});
