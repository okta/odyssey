import type { FileInfo } from "jscodeshift";

import jscodeshift from "jscodeshift";
import { describe, expect, it, vi } from "vitest";

import { DROPPED } from "./mappings/types.js";
import transformer from "./transformer.js";

vi.mock("./mappings/index.js", () => {
  return {
    COMPONENT_MAPPINGS: {
      GroupedWidget: {
        source: {
          component: "GroupedWidget",
          packages: ["@old/lib"],
          propsType: "GroupedWidgetProps",
        },
        target: {
          component: "NewGroupedWidget",
          package: "@new/lib",
          propsType: "NewGroupedWidgetProps",
        },
        defaultProps: {
          layouts: ["list"],
        },
        propMap: {
          items: "viewOptions.items",
          page: "page",
          getData: "getData",
          hasItemResize: "viewOptions.hasItemResize",
          hasSorting: "viewOptions.hasSorting",
          hasSearch: "hasSearch",
          onSelectChange: "onSelectionChange",
        },
      },
      DeepWidget: {
        source: {
          component: "DeepWidget",
          packages: ["@old/lib"],
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
          packages: ["@old/lib"],
          propsType: "NestedSourceProps",
        },
        target: {
          component: "NewNestedSource",
          package: "@new/lib",
          propsType: "NewNestedSourceProps",
        },
        propMap: {
          options: {
            items: "cols",
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
          packages: ["@old/lib"],
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
          packages: ["@old/lib"],
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
          packages: ["@shared/lib"],
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
      DroppedWidget: {
        source: {
          component: "DroppedWidget",
          packages: ["@old/lib"],
          propsType: "DroppedWidgetProps",
        },
        target: {
          component: "NewDroppedWidget",
          package: "@new/lib",
          propsType: "NewDroppedWidgetProps",
        },
        propMap: {
          label: "label",
          legacy: DROPPED,
          deprecated: DROPPED,
        },
      },
      MultiSourceWidget: {
        source: {
          component: "MultiSourceWidget",
          packages: ["@first/lib", "@second/lib"],
          propsType: "MultiSourceWidgetProps",
        },
        target: {
          component: "NewMultiSourceWidget",
          package: "@target/lib",
          propsType: "NewMultiSourceWidgetProps",
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
    components: "GroupedWidget",
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
      odysseyVerbose: false,
    },
  );
};

describe("migrateComponent", () => {
  beforeEach(() => {
    logger.mockClear();
  });

  it("should move simple value import without alias", () => {
    const input = 'import { GroupedWidget } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe('import { NewGroupedWidget } from "@new/lib";');
  });

  it("should move props-only type import", () => {
    const input = 'import type { GroupedWidgetProps } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type NewGroupedWidgetProps } from "@new/lib";',
    );
  });

  it("should move component and props type from same import", () => {
    const input =
      'import { GroupedWidget, type GroupedWidgetProps } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { NewGroupedWidget, type NewGroupedWidgetProps } from "@new/lib";',
    );
  });

  it("should preserve value alias and move props type", () => {
    const input =
      'import { GroupedWidget as GroupedWidgetImpl, type GroupedWidgetProps } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { NewGroupedWidget as GroupedWidgetImpl, type NewGroupedWidgetProps } from "@new/lib";',
    );
  });

  it("should move component when props type is aliased", () => {
    const input =
      'import { type GroupedWidgetProps as TableProps, GroupedWidget } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type NewGroupedWidgetProps as TableProps, NewGroupedWidget } from "@new/lib";',
    );
  });

  it("should move both when props type and component are aliased", () => {
    const input =
      'import { type GroupedWidgetProps as TableProps, GroupedWidget as GroupedWidgetImpl } from "@old/lib";';
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import {
  type NewGroupedWidgetProps as TableProps,
  NewGroupedWidget as GroupedWidgetImpl,
} from "@new/lib";`);
  });

  it("should consolidate props type and component from separate imports", () => {
    const input = `\
import type { GroupedWidgetProps } from "@old/lib";
import { GroupedWidget } from "@old/lib";`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { type NewGroupedWidgetProps, NewGroupedWidget } from "@new/lib";',
    );
  });

  it("should preserve value alias for simple component import", () => {
    const input =
      'import { GroupedWidget as GroupedWidgetImpl } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { NewGroupedWidget as GroupedWidgetImpl } from "@new/lib";',
    );
  });

  it("should merge with existing target import", () => {
    const input = `\
import { Other } from "@new/lib";
import { GroupedWidget, type GroupedWidgetProps } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { Other, NewGroupedWidget, type NewGroupedWidgetProps } from "@new/lib";',
    );
  });

  it("should avoid duplicates when target import already has specifiers", () => {
    const input = `\
import { NewGroupedWidget, type NewGroupedWidgetProps } from "@new/lib";
import { GroupedWidget, type GroupedWidgetProps } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { NewGroupedWidget, type NewGroupedWidgetProps } from "@new/lib";',
    );
  });

  it("should rename JSX when target already has the unaliased component imported", () => {
    const input = `\
import { NewGroupedWidget } from "@new/lib";
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget page={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget page={1} layouts={["list"]} />;`);
  });

  it("should keep unrelated specifiers on original module", () => {
    const input =
      'import { GroupedWidget, Unrelated, type GroupedWidgetProps, type OtherType } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { Unrelated, type OtherType } from "@old/lib";
import { NewGroupedWidget, type NewGroupedWidgetProps } from "@new/lib";`);
  });

  it("should leave default import unchanged", () => {
    const input = 'import GroupedWidgetDefault from "@old/lib";\n';
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
import { GroupedWidget } from "@old/lib";
import { GroupedWidget as GroupedWidgetImpl } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { NewGroupedWidget, NewGroupedWidget as GroupedWidgetImpl } from "@new/lib";',
    );
  });

  it("should only move mapped component when multiple are present", () => {
    const input = 'import { GroupedWidget, OtherComponent } from "@old/lib";\n';
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { OtherComponent } from "@old/lib";
import { NewGroupedWidget } from "@new/lib";`);
  });

  it("should leave unrelated imports from other modules unchanged", () => {
    const input = `\
import { SomethingElse } from "@another/lib";
import { GroupedWidget } from "@old/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { SomethingElse } from "@another/lib";
import { NewGroupedWidget } from "@new/lib";`);
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
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget page={1} hasSearch />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget page={1} hasSearch layouts={["list"]} />;`);
  });

  it("should add aliased specifier when target already has unaliased version", () => {
    const input = `\
import { GroupedWidget } from "@new/lib";
import { GroupedWidget as GroupedWidgetImpl } from "@old/lib";

const view = <GroupedWidget {...rest} />;
const view2 = <GroupedWidgetImpl {...rest} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { GroupedWidget, NewGroupedWidget as GroupedWidgetImpl } from "@new/lib";

const view = <GroupedWidget {...rest} />;
const view2 = <GroupedWidgetImpl {...rest} layouts={["list"]} />;`);
  });

  it("should avoid duplicate when target import has aliased component", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";
import { NewGroupedWidget as NewGroupedWidgetImpl } from "@new/lib";
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(
      'import { NewGroupedWidget as NewGroupedWidgetImpl } from "@new/lib";',
    );
  });

  it("should group flat props into nested object props", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget items={cols} hasItemResize hasSorting />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget
  viewOptions={{
    items: cols,
    hasItemResize: true,
    hasSorting: true
  }}
  layouts={["list"]} />;`);
  });

  it("should handle mix of flat rename and nested grouping, dropping unmapped props", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget onSelectChange={handler} items={cols} customProp="hello" />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget viewOptions={{
  items: cols
}} onSelectionChange={handler} layouts={["list"]} />;`);
  });

  it("should drop all unmapped props from the target component", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget deprecated1 deprecated2={val} page={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget page={1} layouts={["list"]} />;`);
  });

  it("should preserve component alias in JSX", () => {
    const input = `\
import { GroupedWidget as MyTable } from "@old/lib";

const view = <MyTable page={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget as MyTable } from "@new/lib";

const view = <MyTable page={1} layouts={["list"]} />;`);
  });

  it("should rename closing tags for non-self-closing elements", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget page={1}>children</GroupedWidget>;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget page={1} layouts={["list"]}>children</NewGroupedWidget>;`);
  });

  it("should preserve spread attributes", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget {...rest} page={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget {...rest} page={1} layouts={["list"]} />;`);
  });

  it("should replace all JSX usages when multiple imports are deduplicated", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";
import { GroupedWidget as GroupedWidgetImpl } from "@old/lib";

const view = <GroupedWidget {...rest} page={1} />;
const view2 = <GroupedWidget {...rest} page={1} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget, NewGroupedWidget as GroupedWidgetImpl } from "@new/lib";

const view = <NewGroupedWidget {...rest} page={1} layouts={["list"]} />;
const view2 = <NewGroupedWidget {...rest} page={1} layouts={["list"]} />;`);
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

const view = <NestedSource options={{ items: cols }} />;
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

const view = <NestedSource options={{ items: cols, sort: fn }} />;
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

const view = <NestedSource options={{ items: cols, unrelated: val }} />;
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

const view = <NestedSource options={{ items: cols }} flat={1} />;
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource cols={cols} flat={1} />;`);
  });

  it("should inject default props when mapping has defaultProps", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget getData={fn} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget getData={fn} layouts={["list"]} />;`);
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
import { GroupedWidget, BatchWidget } from "@old/lib";

const table = <GroupedWidget items={cols} hasSearch />;
const widget = <BatchWidget label={t} onClick={fn} />;
`;

    const output = runTransform(input, {
      components: "GroupedWidget,BatchWidget",
    });

    expect(output.trim()).toBe(`\
import { NewGroupedWidget, NewBatchWidget } from "@new/lib";

const table = <NewGroupedWidget
  viewOptions={{
    items: cols
  }}
  hasSearch
  layouts={["list"]} />;
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

    expect(logger).toHaveBeenCalledTimes(2);
    expect(logger).toHaveBeenCalledWith({
      message:
        'Kept "options" as-is - nested mapping expects an inline object, verify manually',
      type: "warn",
      options: { indentation: 2 },
    });
    expect(logger).toHaveBeenCalledWith({
      message:
        "Kept inline arrays/objects/functions as-is - no block body for hooks",
      type: "warn",
      options: { indentation: 2 },
    });
    // The nested prop is passed through as-is (TypeScript will catch type mismatches)
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";

const view = <NewNestedSource options={someVariable} flat={1} />;`);
  });

  it("should preserve unmapped props that have leading comments", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = (
  <GroupedWidget
    page={1}
    // eslint-disable-next-line
    // @ts-ignore
    testId="tasks-card--table"
  />
);
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = (
  <NewGroupedWidget
    // eslint-disable-next-line
    // @ts-ignore
    testId="tasks-card--table"
    page={1}
    layouts={["list"]} />
);`);
  });

  it("should drop unmapped props without comments", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const view = <GroupedWidget page={1} testId="test" />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const view = <NewGroupedWidget page={1} layouts={["list"]} />;`);
  });

  it("should omit a DROPPED prop and emit a warning", () => {
    const input = `\
import { DroppedWidget } from "@old/lib";

const view = <DroppedWidget label="title" legacy={val} />;
`;
    const output = runTransform(input, { components: "DroppedWidget" });
    expect(output.trim()).toBe(`\
import { NewDroppedWidget } from "@new/lib";

const view = <NewDroppedWidget label="title" />;`);
    expect(logger).toHaveBeenCalledWith({
      message:
        'Dropped "legacy" — no equivalent prop in target component, update manually',
      type: "warn",
      options: { indentation: 2 },
    });
  });

  it("should omit multiple DROPPED props and emit a warning for each", () => {
    const input = `\
import { DroppedWidget } from "@old/lib";

const view = <DroppedWidget label="title" legacy={val} deprecated="x" />;
`;
    const output = runTransform(input, { components: "DroppedWidget" });
    expect(output.trim()).toBe(`\
import { NewDroppedWidget } from "@new/lib";

const view = <NewDroppedWidget label="title" />;`);
    expect(logger).toHaveBeenCalledWith({
      message:
        'Dropped "legacy" — no equivalent prop in target component, update manually',
      type: "warn",
      options: { indentation: 2 },
    });
    expect(logger).toHaveBeenCalledWith({
      message:
        'Dropped "deprecated" — no equivalent prop in target component, update manually',
      type: "warn",
      options: { indentation: 2 },
    });
  });

  it("should not warn when a DROPPED prop is absent from source", () => {
    const input = `\
import { DroppedWidget } from "@old/lib";

const view = <DroppedWidget label="title" />;
`;
    const output = runTransform(input, { components: "DroppedWidget" });
    expect(output.trim()).toBe(`\
import { NewDroppedWidget } from "@new/lib";

const view = <NewDroppedWidget label="title" />;`);
    expect(logger).not.toHaveBeenCalledWith({
      message:
        'Dropped "legacy" — no equivalent prop in target component, update manually',
      type: "warn",
      options: { indentation: 2 },
    });
    expect(logger).not.toHaveBeenCalledWith({
      message:
        'Dropped "deprecated" — no equivalent prop in target component, update manually',
      type: "warn",
      options: { indentation: 2 },
    });
  });

  it("should wrap object default props in useMemo when inside a function body", () => {
    const input = `\
import { WithDefaults } from "@old/lib";

function App() {
  return <WithDefaults name={x} />;
}
`;
    const output = runTransform(input, { components: "WithDefaults" });
    expect(output.trim()).toBe(`\
import { NewWithDefaults } from "@new/lib";
import { useMemo } from "react";

function App() {
  const config = useMemo(() => ({
    dense: true
  }), []);

  return <NewWithDefaults renamed={x} mode={"standard"} config={config} />;
}`);
  });

  it("should insert useMemo variable after variable declaration", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
    const cols = [
      "column1",
      "column2"
    ];

  return <GroupedWidget items={cols} hasSorting />;
}
`;

    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const cols = [
    "column1",
    "column2"
  ];

  const viewOptions = useMemo(() => ({
    items: cols,
    hasSorting: true
  }), [cols]);

  const layouts = useMemo(() => ["list"], []);

  return <NewGroupedWidget viewOptions={viewOptions} layouts={layouts} />;
}`);
  });

  it("should not wrap primitive default props in useMemo", () => {
    const input = `\
import { WithDefaults } from "@old/lib";

function App() {
  return <WithDefaults name={x} mode="custom" />;
}
`;
    const output = runTransform(input, { components: "WithDefaults" });
    expect(output.trim()).toBe(`\
import { NewWithDefaults } from "@new/lib";
import { useMemo } from "react";

function App() {
  const config = useMemo(() => ({
    dense: true
  }), []);

  return <NewWithDefaults renamed={x} mode="custom" config={config} />;
}`);
  });

  it("should add useMemo to existing react import", () => {
    const input = `\
import { useState } from "react";
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget getData={fn} />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { useState, useMemo } from "react";
import { NewGroupedWidget } from "@new/lib";

function App() {
  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget getData={fn} layouts={layouts} />;
}`);
  });

  it("should not append useMemo to a type-only react import", () => {
    const input = `\
import type { ReactNode } from "react";
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget getData={fn} />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import type { ReactNode } from "react";
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget getData={fn} layouts={layouts} />;
}`);
  });

  it("should add useMemo to value import when both type-only and value imports exist", () => {
    const input = `\
import type { ReactNode } from "react";
import { useState } from "react";
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget getData={fn} />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import type { ReactNode } from "react";
import { useState, useMemo } from "react";
import { NewGroupedWidget } from "@new/lib";

function App() {
  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget getData={fn} layouts={layouts} />;
}`);
  });

  it("should deduplicate useMemo declarations for multiple JSX elements in same function", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
  return (
    <div>
      <GroupedWidget getData={fn1} />
      <GroupedWidget getData={fn2} />
    </div>
  );
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const layouts = useMemo(() => ["list"], []);
  return (
    <div>
      <NewGroupedWidget getData={fn1} layouts={layouts} />
      <NewGroupedWidget getData={fn2} layouts={layouts} />
    </div>
  );
}`);
  });

  it("should fall back to inline for arrow function with expression body", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const App = () => <GroupedWidget getData={fn} />;
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

const App = () => <NewGroupedWidget getData={fn} layouts={["list"]} />;`);
  });

  it("should create useMemo in arrow function with block body", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

const App = () => {
  return <GroupedWidget getData={fn} />;
};
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

const App = () => {
  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget getData={fn} layouts={layouts} />;
};`);
  });

  it("should insert useMemo before early/conditional returns to satisfy Rules of Hooks", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App({ data }) {
  if (!data) return null;
  return <GroupedWidget getData={fn} />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App({ data }) {
  const layouts = useMemo(() => ["list"], []);
  if (!data) return null;
  return <NewGroupedWidget getData={fn} layouts={layouts} />;
}`);
  });

  it("should insert useMemo after dependency declarations but before early returns", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App({ data }) {
  const cols = getCols();
  if (!data) return null;
  return <GroupedWidget items={cols} hasSorting />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App({ data }) {
  const cols = getCols();

  const viewOptions = useMemo(() => ({
    items: cols,
    hasSorting: true
  }), [cols]);

  const layouts = useMemo(() => ["list"], []);
  if (!data) return null;
  return <NewGroupedWidget viewOptions={viewOptions} layouts={layouts} />;
}`);
  });

  it("should wrap nested grouped props in useMemo with correct deps", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget items={cols} hasSorting hasItemResize />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const viewOptions = useMemo(() => ({
    items: cols,
    hasSorting: true,
    hasItemResize: true
  }), [cols]);

  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget viewOptions={viewOptions} layouts={layouts} />;
}`);
  });

  it("should include shorthand property identifiers in useMemo deps", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget items={items} hasSorting />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const viewOptions = useMemo(() => ({
    items,
    hasSorting: true
  }), [items]);

  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget viewOptions={viewOptions} layouts={layouts} />;
}`);
  });

  it("should not include object literal keys in useMemo deps", () => {
    const input = `\
import { NestedSource } from "@old/lib";

function App() {
  return <NestedSource flat={{ propX: true }} />;
}
`;
    const output = runTransform(input, { components: "NestedSource" });
    expect(output.trim()).toBe(`\
import { NewNestedSource } from "@new/lib";
import { useMemo } from "react";

function App() {
  const flat = useMemo(() => ({
    propX: true
  }), []);

  return <NewNestedSource flat={flat} />;
}`);
  });

  it("should extract root identifier from member expression deps", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget items={config.items} hasSorting />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const viewOptions = useMemo(() => ({
    items: config.items,
    hasSorting: true
  }), [config]);

  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget viewOptions={viewOptions} layouts={layouts} />;
}`);
  });

  it("should warn when useMemo dependencies are unstable in the same scope", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
  const cols = ["column1", "column2"];
  return <GroupedWidget items={cols} hasSorting />;
}
`;
    const output = runTransform(input);

    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useMemo } from "react";

function App() {
  const cols = ["column1", "column2"];

  const viewOptions = useMemo(() => ({
    items: cols,
    hasSorting: true
  }), [cols]);

  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget viewOptions={viewOptions} layouts={layouts} />;
}`);

    expect(logger).toHaveBeenCalledWith({
      type: "warn",
      message: {
        details: ["Verify type assertion (e.g., useMemo<Type>)"],
        title: 'Created useMemo for "layouts"',
      },
      options: { indentation: 2 },
    });
  });

  it("should wrap inline arrow function prop in useCallback", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return <BatchWidget label="hi" onClick={() => handleClick(id)} />;
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = useCallback(() => handleClick(id), [handleClick, id]);
  return <NewBatchWidget title="hi" onPress={onPress} />;
}`);
  });

  it("should wrap inline function expression prop in useCallback", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return <BatchWidget label="hi" onClick={function() { handleClick(id); }} />;
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = useCallback(function() { handleClick(id); }, [handleClick, id]);
  return <NewBatchWidget title="hi" onPress={onPress} />;
}`);
  });

  it("should exclude function parameters from useCallback deps", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return <BatchWidget label="hi" onClick={(event) => handleClick(event, userId)} />;
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = useCallback((event) => handleClick(event, userId), [handleClick, userId]);
  return <NewBatchWidget title="hi" onPress={onPress} />;
}`);
  });

  it("should not wrap identifier reference in useCallback", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return <BatchWidget label="hi" onClick={handleClick} />;
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";

function App() {
  return <NewBatchWidget title="hi" onPress={handleClick} />;
}`);
  });

  it("should include bare identifier deps in useCallback for expression-bodied arrows", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  const rows = [{ name: "John" }];
  return <BatchWidget label="hi" onClick={() => rows} />;
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const rows = [{ name: "John" }];
  const onPress = useCallback(() => rows, [rows]);
  return <NewBatchWidget title="hi" onPress={onPress} />;
}`);
  });

  it("should add both useMemo and useCallback imports when both are needed", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

function App() {
  return <GroupedWidget getData={() => fetchData(url)} />;
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";
import { useCallback, useMemo } from "react";

function App() {
  const getData = useCallback(() => fetchData(url), [fetchData, url]);
  const layouts = useMemo(() => ["list"], []);
  return <NewGroupedWidget getData={getData} layouts={layouts} />;
}`);
  });

  it("should fall back to inline for arrow function props in expression-bodied arrow", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

const App = () => <BatchWidget label="hi" onClick={() => handleClick()} />;
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";

const App = () => <NewBatchWidget title="hi" onPress={() => handleClick()} />;`);
  });

  it("should create separate useCallback declarations for different expressions with same prop name", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return (
    <div>
      <BatchWidget label="a" onClick={() => handleClick()} />
      <BatchWidget label="b" onClick={() => otherClick()} />
    </div>
  );
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = useCallback(() => handleClick(), [handleClick]);
  const onPress_2 = useCallback(() => otherClick(), [otherClick]);
  return (
    <div>
      <NewBatchWidget title="a" onPress={onPress} />
      <NewBatchWidget title="b" onPress={onPress_2} />
    </div>
  );
}`);
  });

  it("should deduplicate useCallback declarations when expressions are identical", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return (
    <div>
      <BatchWidget label="a" onClick={() => handleClick()} />
      <BatchWidget label="b" onClick={() => handleClick()} />
    </div>
  );
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = useCallback(() => handleClick(), [handleClick]);
  return (
    <div>
      <NewBatchWidget title="a" onPress={onPress} />
      <NewBatchWidget title="b" onPress={onPress} />
    </div>
  );
}`);
  });

  it("should create separate hook declarations when multiple elements have different callbacks for the same prop and reuse identical ones", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  return (
    <>
      <BatchWidget label="a" onClick={() => fetchA()} />
      <BatchWidget label="b" onClick={() => fetchB()} />
      <BatchWidget label="c" onClick={() => fetchA()} />
    </>
  );
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = useCallback(() => fetchA(), [fetchA]);
  const onPress_2 = useCallback(() => fetchB(), [fetchB]);
  return (
    <>
      <NewBatchWidget title="a" onPress={onPress} />
      <NewBatchWidget title="b" onPress={onPress_2} />
      <NewBatchWidget title="c" onPress={onPress} />
    </>
  );
}`);
  });

  it("should avoid name collisions with existing scope variables when hoisting hooks and warn about unstable references", () => {
    const input = `\
import { BatchWidget } from "@old/lib";

function App() {
  const onPress = () => existingHandler();

  return (
    <>
      <BatchWidget label="a" onClick={onPress} />
      <BatchWidget label="b" onClick={() => handleClick()} />
      <BatchWidget label="c" onClick={() => otherClick()} />
    </>
  );
}
`;
    const output = runTransform(input, { components: "BatchWidget" });
    expect(output.trim()).toBe(`\
import { NewBatchWidget } from "@new/lib";
import { useCallback } from "react";

function App() {
  const onPress = () => existingHandler();

  const onPress_2 = useCallback(() => handleClick(), [handleClick]);
  const onPress_3 = useCallback(() => otherClick(), [otherClick]);

  return (
    <>
      <NewBatchWidget title="a" onPress={onPress} />
      <NewBatchWidget title="b" onPress={onPress_2} />
      <NewBatchWidget title="c" onPress={onPress_3} />
    </>
  );
}`);
    expect(logger).toHaveBeenCalledWith({
      type: "warn",
      message: {
        title: `"onPress" references "onPress"`,
        details: [
          `These variables [onPress] need to be wrapped in useMemo/useCallback`,
        ],
      },
      options: { indentation: 2 },
    });
  });

  it("should fall back to inline for class components and not use useMemo", () => {
    const input = `\
import { GroupedWidget } from "@old/lib";

class App extends React.Component {
  render() {
    return <GroupedWidget getData={fn} />;
  }
}
`;
    const output = runTransform(input);
    expect(output.trim()).toBe(`\
import { NewGroupedWidget } from "@new/lib";

class App extends React.Component {
  render() {
    return <NewGroupedWidget getData={fn} layouts={["list"]} />;
  }
}`);
    expect(logger).toHaveBeenCalledWith({
      type: "warn",
      message:
        "Kept inline arrays/objects/functions as-is - hooks not available for class components",
      options: { indentation: 2 },
    });
  });

  it("should fall back to inline for class components with object defaults", () => {
    const input = `\
import { WithDefaults } from "@old/lib";

class App extends React.Component {
  render() {
    return <WithDefaults name={x} />;
  }
}
`;
    const output = runTransform(input, { components: "WithDefaults" });
    expect(output.trim()).toBe(`\
import { NewWithDefaults } from "@new/lib";

class App extends React.Component {
  render() {
    return (
      <NewWithDefaults
        renamed={x}
        mode={"standard"}
        config={{
          dense: true
        }} />
    );
  }
}`);
  });

  describe("multiple source packages", () => {
    it("should migrate import from the first source package", () => {
      const input = `\
import { MultiSourceWidget } from "@first/lib";

function App() {
  return (<MultiSourceWidget label="a" />);
}`;
      const output = runTransform(input, { components: "MultiSourceWidget" });
      expect(output.trim()).toBe(
        `\
import { NewMultiSourceWidget } from "@target/lib";

function App() {
  return (<NewMultiSourceWidget title="a" />);
}`,
      );
    });

    it("should migrate import from the second source package", () => {
      const input = `\
import { MultiSourceWidget } from "@second/lib";

function App() {
  return (<MultiSourceWidget label="b" />);
}`;
      const output = runTransform(input, { components: "MultiSourceWidget" });
      expect(output.trim()).toBe(
        `\
import { NewMultiSourceWidget } from "@target/lib";

function App() {
  return (<NewMultiSourceWidget title="b" />);
}`,
      );
    });

    it("should consolidate imports from both source packages into a single target import", () => {
      const input = `\
import { MultiSourceWidget } from "@first/lib";
import { MultiSourceWidget as MultiSourceWidgetB } from "@second/lib";

const a = <MultiSourceWidget label="a" />;
const b = <MultiSourceWidgetB label="b" />;
`;
      const output = runTransform(input, { components: "MultiSourceWidget" });
      expect(output.trim()).toBe(`\
import { NewMultiSourceWidget, NewMultiSourceWidget as MultiSourceWidgetB } from "@target/lib";

const a = <NewMultiSourceWidget title="a" />;
const b = <MultiSourceWidgetB title="b" />;`);
    });
  });
});
