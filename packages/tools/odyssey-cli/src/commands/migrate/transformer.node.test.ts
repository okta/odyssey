import type { FileInfo } from "jscodeshift";

import jscodeshift from "jscodeshift";
import { describe, expect, it, vi } from "vitest";

import transformer from "./transformer.js";

vi.mock("./mappings/index.js", async () => {
  const actual = await vi.importActual<typeof import("./mappings/index.js")>(
    "./mappings/index.js",
  );

  return {
    COMPONENT_MAPPINGS: {
      ...actual.COMPONENT_MAPPINGS,
      // Override DataTable with test-friendly source/target packages.
      DataTable: {
        ...actual.COMPONENT_MAPPINGS.DataTable,
        source: {
          ...actual.COMPONENT_MAPPINGS.DataTable.source,
          package: "@old/lib",
        },
        target: {
          ...actual.COMPONENT_MAPPINGS.DataTable.target,
          package: "@new/lib",
        },
      },
      DeepWidget: {
        source: {
          component: "DeepWidget",
          package: "@old/lib",
          propsType: "DeepWidgetProps",
        },
        target: {
          component: "NewDeepWidget",
          package: "@new/lib",
          propsType: "NewDeepWidgetProps",
        },
        propMap: {
          color: "theme.palette.color",
          flat: "flat",
        },
      },
      NestedSource: {
        source: {
          component: "NestedSource",
          package: "@old/lib",
          propsType: "NestedSourceProps",
        },
        target: {
          component: "NewNestedSource",
          package: "@new/lib",
          propsType: "NewNestedSourceProps",
        },
        propMap: {
          options: {
            columns: "cols",
            sort: "layout.sort",
          },
          config: {
            theme: {
              color: "themeColor",
            },
          },
          flat: "flat",
        },
      },
      BatchWidget: {
        source: {
          component: "BatchWidget",
          package: "@old/lib",
          propsType: "BatchWidgetProps",
        },
        target: {
          component: "NewBatchWidget",
          package: "@new/lib",
          propsType: "NewBatchWidgetProps",
        },
        propMap: {
          label: "title",
          onClick: "onPress",
        },
      },
      WithDefaults: {
        source: {
          component: "WithDefaults",
          package: "@old/lib",
          propsType: "WithDefaultsProps",
        },
        target: {
          component: "NewWithDefaults",
          package: "@new/lib",
          propsType: "NewWithDefaultsProps",
        },
        defaultProps: {
          mode: "standard",
          config: { dense: true },
        },
        propMap: {
          name: "renamed",
          mode: "mode",
        },
      },
      SamePackageWidget: {
        source: {
          component: "SamePackageWidget",
          package: "@shared/lib",
          propsType: "SamePackageWidgetProps",
        },
        target: {
          component: "NewSamePackageWidget",
          package: "@shared/lib",
          propsType: "NewSamePackageWidgetProps",
        },
        propMap: {
          label: "title",
        },
      },
    },
  };
});

type TransformOptions = {
  components: string;
};

const logger = vi.fn();

const runTransform = (source: string, options?: Partial<TransformOptions>) => {
  const fileInfo: FileInfo = { path: "test-file.tsx", source };

  const baseOptions: TransformOptions = {
    components: "DataTable",
  };

  return transformer(
    fileInfo,
    {
      jscodeshift: jscodeshift.withParser("tsx"),
      j: jscodeshift.withParser("tsx"),
      stats: () => {},
      report: () => {},
    },
    {
      ...baseOptions,
      ...options,
      logger,
    },
  );
};

describe("migrateComponent", () => {
  beforeEach(() => {
    logger.mockClear();
  });

  it("should move simple value import without alias", () => {
    const input = 'import { DataTable } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe('import { DataView } from "@new/lib";');
  });

  it("should move props-only type import", () => {
    const input = 'import type { DataTableProps } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type DataViewProps } from "@new/lib";',
    );
  });

  it("should move component and props type from same import", () => {
    const input = 'import { DataTable, type DataTableProps } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { DataView, type DataViewProps } from "@new/lib";',
    );
  });

  it("should preserve value alias and move props type", () => {
    const input =
      'import { DataTable as DataTableImpl, type DataTableProps } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { DataView as DataTableImpl, type DataViewProps } from "@new/lib";',
    );
  });

  it("should move component when props type is aliased", () => {
    const input =
      'import { type DataTableProps as TableProps, DataTable } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type DataViewProps as TableProps, DataView } from "@new/lib";',
    );
  });

  it("should move both when props type and component are aliased", () => {
    const input =
      'import { type DataTableProps as TableProps, DataTable as DataTableImpl } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type DataViewProps as TableProps, DataView as DataTableImpl } from "@new/lib";',
    );
  });

  it("should consolidate props type and component from separate imports", () => {
    const input = `\
import type { DataTableProps } from "@old/lib";
import { DataTable } from "@old/lib";`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type DataViewProps, DataView } from "@new/lib";',
    );
  });

  it("should preserve value alias for simple component import", () => {
    const input = 'import { DataTable as DataTableImpl } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { DataView as DataTableImpl } from "@new/lib";',
    );
  });

  it("should merge with existing target import", () => {
    const input = `\
import { Other } from "@new/lib";
import { DataTable, type DataTableProps } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { Other, DataView, type DataViewProps } from "@new/lib";',
    );
  });

  it("should avoid duplicates when target import already has specifiers", () => {
    const input = `\
import { DataView, type DataViewProps } from "@new/lib";
import { DataTable, type DataTableProps } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { DataView, type DataViewProps } from "@new/lib";',
    );
  });

  it("should keep unrelated specifiers on original module", () => {
    const input =
      'import { DataTable, Unrelated, type DataTableProps, type OtherType } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { Unrelated, type OtherType } from "@old/lib";
import { DataView, type DataViewProps } from "@new/lib";`);
  });

  it("should leave default import unchanged", () => {
    const input = 'import DataTableDefault from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(input.trim());
  });

  it("should leave namespace import unchanged", () => {
    const input = 'import * as Old from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(input.trim());
  });

  it("should leave props-only import unchanged when component mapping is different", () => {
    const input = 'import type { OtherComponentProps } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(input.trim());
  });

  it("should deduplicate multiple imports of same component from same source", () => {
    const input = `\
import { DataTable } from "@old/lib";
import { DataTable as DataTableImpl } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe('import { DataView } from "@new/lib";');
  });

  it("should only move mapped component when multiple are present", () => {
    const input = 'import { DataTable, OtherComponent } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { OtherComponent } from "@old/lib";
import { DataView } from "@new/lib";`);
  });

  it("should leave unrelated imports from other modules unchanged", () => {
    const input = `\
import { SomethingElse } from "@another/lib";
import { DataTable } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { SomethingElse } from "@another/lib";
import { DataView } from "@new/lib";`);
  });

  it("should throw when component mapping is missing", () => {
    const input = 'import { UnknownComponent } from "@old/lib";\n';

    expect(() =>
      runTransform(input, {
        components: "UnknownComponent",
      }),
    ).toThrowError(/Missing component mapping for: UnknownComponent/);
  });

  it("should rename JSX element and preserve flat props", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable currentPage={1} hasSearch />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView currentPage={1} hasSearch availableLayouts={["table"]} />;`);
  });

  it("should avoid duplicate when target import has aliased component", () => {
    const input = `\
import { DataTable } from "@old/lib";
import { DataView as DataViewImpl } from "@new/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { DataView as DataViewImpl } from "@new/lib";',
    );
  });

  it("should group flat props into nested object props", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable columns={cols} hasColumnResizing hasSorting />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView
  tableLayoutOptions={{
    columns: cols,
    hasColumnResizing: true,
    hasSorting: true
  }}
  availableLayouts={["table"]} />;`);
  });

  it("should handle mix of flat rename and nested grouping, dropping unmapped props", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable onChangeRowSelection={handler} columns={cols} customProp="hello" />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView tableLayoutOptions={{
  columns: cols
}} onRowSelectionChange={handler} availableLayouts={["table"]} />;`);
  });

  it("should drop all unmapped props from the target component", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable deprecated1 deprecated2={val} currentPage={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView currentPage={1} availableLayouts={["table"]} />;`);
  });

  it("should preserve component alias in JSX", () => {
    const input = `\
import { DataTable as MyTable } from "@old/lib";

const view = <MyTable currentPage={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView as MyTable } from "@new/lib";

const view = <MyTable currentPage={1} availableLayouts={["table"]} />;`);
  });

  it("should rename closing tags for non-self-closing elements", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable currentPage={1}>children</DataTable>;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView currentPage={1} availableLayouts={["table"]}>children</DataView>;`);
  });

  it("should preserve spread attributes", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable {...rest} currentPage={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView {...rest} currentPage={1} availableLayouts={["table"]} />;`);
  });

  it("should replace all JSX usages when multiple imports are deduplicated", () => {
    const input = `\
import { DataTable } from "@old/lib";
import { DataTable as DataTableImpl } from "@old/lib";

const view = <DataTable {...rest} currentPage={1} />;
const view2 = <DataTable {...rest} currentPage={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView {...rest} currentPage={1} availableLayouts={["table"]} />;
const view2 = <DataView {...rest} currentPage={1} availableLayouts={["table"]} />;`);
  });

  it("should wrap deep nested paths (3+ levels) into nested objects", () => {
    const input = `\
import { DeepWidget } from "@old/lib";

const view = <DeepWidget color="red" flat={1} />;
`;
    const output = runTransform(input, { components: "DeepWidget" });
    expect(output.trim()).toBe(`\
import { NewDeepWidget } from "@new/lib";

const view = <NewDeepWidget theme={{
  palette: {
    color: "red"
  }
}} flat={1} />;`);
  });

  it("should extract nested source prop to flat target", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource options={{ columns: cols }} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource cols={cols} />;`);
  });

  it("should extract nested source prop to nested target", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource options={{ sort: fn }} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource layout={{
  sort: fn
}} />;`);
  });

  it("should extract multiple nested source props from the same object", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource options={{ columns: cols, sort: fn }} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource
  layout={{
    sort: fn
  }}
  cols={cols} />;`);
  });

  it("should drop unmapped nested keys from source object", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource options={{ columns: cols, unrelated: val }} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource cols={cols} />;`);
  });

  it("should extract deeply nested source prop (3+ levels)", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource config={{ theme: { color: "red" } }} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource themeColor={"red"} />;`);
  });

  it("should handle nested source props alongside flat source props", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource options={{ columns: cols }} flat={1} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource cols={cols} flat={1} />;`);
  });

  it("should inject default props when mapping has defaultProps", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable getData={fn} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView getData={fn} availableLayouts={["table"]} />;`);
  });

  it("should not inject default props when no defaultProps in mapping", () => {
    const input = `\
import { DeepWidget } from "@old/lib";

const view = <DeepWidget flat={1} />;
`;
    const output = runTransform(input, { components: "DeepWidget" });
    expect(output.trim()).toBe(`\
import { NewDeepWidget } from "@new/lib";

const view = <NewDeepWidget flat={1} />;`);
  });

  it("should inject default props with object values", () => {
    const input = `\
import { WithDefaults } from "@old/lib";

const view = <WithDefaults name={x} />;
`;
    const output = runTransform(input, { components: "WithDefaults" });
    expect(output.trim()).toBe(`\
import { NewWithDefaults } from "@new/lib";

const view = <NewWithDefaults
  renamed={x}
  mode={"standard"}
  config={{
    dense: true
  }} />;`);
  });

  it("should not override user-provided props with defaults", () => {
    const input = `\
import { WithDefaults } from "@old/lib";

const view = <WithDefaults name={x} mode="custom" />;
`;
    const output = runTransform(input, { components: "WithDefaults" });
    expect(output.trim()).toBe(`\
import { NewWithDefaults } from "@new/lib";

const view = <NewWithDefaults
  renamed={x}
  mode="custom"
  config={{
    dense: true
  }} />;`);
  });

  it("should migrate multiple components in a single pass", () => {
    const input = `\
import { DataTable, BatchWidget } from "@old/lib";

const table = <DataTable columns={cols} hasSearch />;
const widget = <BatchWidget label={t} onClick={fn} />;
`;

    const output = runTransform(input, {
      components: "DataTable,BatchWidget",
    });

    expect(output.trim()).toBe(`\
import { DataView, NewBatchWidget } from "@new/lib";

const table = <DataView
  tableLayoutOptions={{
    columns: cols
  }}
  hasSearch
  availableLayouts={["table"]} />;
const widget = <NewBatchWidget title={t} onPress={fn} />;`);
  });

  it("should handle same source and target package", () => {
    const input = `\
import { SamePackageWidget } from "@shared/lib";

const view = <SamePackageWidget label="hi" />;
`;
    const output = runTransform(input, { components: "SamePackageWidget" });
    expect(output.trim()).toBe(`\
import { NewSamePackageWidget } from "@shared/lib";

const view = <NewSamePackageWidget title="hi" />;`);
  });

  it("should handle same source and target package with unrelated specifiers", () => {
    const input = `\
import { SamePackageWidget, Other } from "@shared/lib";

const view = <SamePackageWidget label="hi" />;
`;
    const output = runTransform(input, { components: "SamePackageWidget" });
    expect(output.trim()).toBe(`\
import { Other, NewSamePackageWidget } from "@shared/lib";

const view = <NewSamePackageWidget title="hi" />;`);
  });

  it("should handle same source and target package with alias", () => {
    const input = `\
import { SamePackageWidget as SPW } from "@shared/lib";

const view = <SPW label="hi" />;
`;
    const output = runTransform(input, { components: "SamePackageWidget" });
    expect(output.trim()).toBe(`\
import { NewSamePackageWidget as SPW } from "@shared/lib";

const view = <SPW title="hi" />;`);
  });

  it("should warn and pass through when nested source prop is not an inline object expression", () => {
    const input = `\
import { NestedSource } from "@old/lib";

const view = <NestedSource options={someVariable} flat={1} />;
`;
    const output = runTransform(input, { components: "NestedSource" });

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith(
      expect.objectContaining({
        message:
          'nested source prop "options" is not an inline object expression and could not be destructured, passing through as-is — verify manually',
        type: "warn",
      }),
    );
    // The nested prop is passed through as-is (TypeScript will catch type mismatches)
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource options={someVariable} flat={1} />;`);
  });

  it("should preserve unmapped props that have leading comments", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = (
  <DataTable
    currentPage={1}
    // eslint-disable-next-line
    // @ts-ignore
    testId="tasks-card--table"
  />
);
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = (
  <DataView
    // eslint-disable-next-line
    // @ts-ignore
    testId="tasks-card--table"
    currentPage={1}
    availableLayouts={["table"]} />
);`);
  });

  it("should drop unmapped props without comments", () => {
    const input = `\
import { DataTable } from "@old/lib";

const view = <DataTable currentPage={1} testId="test" />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { DataView } from "@new/lib";

const view = <DataView currentPage={1} availableLayouts={["table"]} />;`);
  });
});
