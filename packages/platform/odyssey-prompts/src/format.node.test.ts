import { describe, expect, test } from "vitest";

import { formatMessage } from "./format.js";

describe(formatMessage.name, () => {
  describe("string message", () => {
    test("no options returns the string unchanged", () => {
      expect(formatMessage({ message: "hello" })).toBe("hello");
    });

    test("colorFunction applied to the full string", () => {
      expect(
        formatMessage({
          message: "hello",
          colorFunction: (text) => `[${text}]`,
        }),
      ).toBe("[hello]");
    });

    test("indentation prepends spaces before the string", () => {
      expect(formatMessage({ message: "hello", indentation: 2 })).toBe(
        "  hello",
      );
    });
  });

  describe("structured message", () => {
    test("title and details appear in output", () => {
      expect(
        formatMessage({
          message: { title: "My Title", details: ["first", "second"] },
        }),
      ).toBe(`My Title\n  - first\n  - second`);
    });

    test("colorFunction applied to title and each detail", () => {
      expect(
        formatMessage({
          message: { title: "Title", details: ["item"] },
          colorFunction: (text) => `[${text}]`,
        }),
      ).toBe(`[Title]\n[  - item]`);
    });

    test("indentation prepends prefix to title and each detail", () => {
      expect(
        formatMessage({
          message: { title: "Title", details: ["item"] },
          indentation: 4,
        }),
      ).toBe(`    Title\n      - item`);
    });
  });
});
