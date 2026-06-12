import { extractExportNames } from "./generatePictograms.js";

describe(extractExportNames.name, () => {
  test("extracts icon name with Icon suffix appended", () => {
    expect(extractExportNames('export * from "./Add.js";')).toEqual([
      "AddIcon",
    ]);
  });

  test("extracts multiple export names", () => {
    const content = [
      'export * from "./Add.js";',
      'export * from "./ArrowBottom.js";',
      'export * from "./Close.js";',
    ].join("\n");
    expect(extractExportNames(content)).toEqual([
      "AddIcon",
      "ArrowBottomIcon",
      "CloseIcon",
    ]);
  });

  test("appends Icon suffix to logo names that lack it", () => {
    expect(extractExportNames('export * from "./Duo.js";')).toEqual([
      "DuoIcon",
    ]);
    expect(extractExportNames('export * from "./GoogleAuth.js";')).toEqual([
      "GoogleAuthIcon",
    ]);
  });

  test("returns empty array for empty file", () => {
    expect(extractExportNames("")).toEqual([]);
  });

  test("ignores lines that are not export * from patterns", () => {
    const content = [
      "// comment",
      "",
      'export * from "./Add.js";',
      'export { Foo } from "./Foo.js";',
    ].join("\n");
    expect(extractExportNames(content)).toEqual(["AddIcon"]);
  });

  test("ignores copyright header block at top of file", () => {
    const content = [
      "/*!",
      " * Copyright (c) 2026-present, Okta, Inc.",
      " */",
      'export * from "./ArrowRight.js";',
    ].join("\n");
    expect(extractExportNames(content)).toEqual(["ArrowRightIcon"]);
  });
});
