import { describe, expect, test } from "vitest";

import * as OdysseyIndex from "./index.js";

describe("UI Component Identifier", () => {
  test("exports the setupOdysseyDebugListener function", () => {
    expect(OdysseyIndex.setupOdysseyDebugListener).toBeDefined();
    expect(typeof OdysseyIndex.setupOdysseyDebugListener).toBe("function");
  });
});
