import { describe, expect, test } from "vitest";

import {
  formatComponentReference,
  parseComponentReference,
} from "./componentReference.js";

describe(parseComponentReference.name, () => {
  test("parses a valid library::Component reference", () => {
    expect(parseComponentReference("odyssey-react-mui::Dialog")).toEqual({
      componentName: "Dialog",
      libraryName: "odyssey-react-mui",
    });
  });

  test("reference string without :: separator", () => {
    expect(() => parseComponentReference("Dialog")).toThrow();
  });
});

describe(formatComponentReference.name, () => {
  test("formats a reference as ComponentName in libraryName", () => {
    expect(
      formatComponentReference({
        componentName: "Dialog",
        libraryName: "odyssey-react-mui",
      }),
    ).toBe("Dialog in odyssey-react-mui");
  });
});
