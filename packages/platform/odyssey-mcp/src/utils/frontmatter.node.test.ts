import { parseFrontmatter } from "./frontmatter.js";

describe(parseFrontmatter.name, () => {
  test("parses frontmatter and body", () => {
    const result = parseFrontmatter(
      "---\nlabel: Contributions\ndescription: Setup guide\n---\n# Heading\n\nBody text.",
    );
    expect(result).toEqual({
      data: { label: "Contributions", description: "Setup guide" },
      content: "# Heading\n\nBody text.",
    });
  });

  test("no frontmatter returns full string as content", () => {
    const result = parseFrontmatter("Just content here");
    expect(result).toEqual({ data: {}, content: "Just content here" });
  });

  test("malformed frontmatter (no closing ---) treated as content", () => {
    const result = parseFrontmatter("---\nlabel: Foo\nNo closing delimiter");
    expect(result).toEqual({
      data: {},
      content: "---\nlabel: Foo\nNo closing delimiter",
    });
  });

  test("throws for non-string input", () => {
    expect(() => parseFrontmatter(42)).toThrow(
      "Expected raw content to be a string",
    );
    expect(() => parseFrontmatter(null)).toThrow(
      "Expected raw content to be a string",
    );
  });

  test("empty string returns empty data and content", () => {
    const result = parseFrontmatter("");
    expect(result).toEqual({ data: {}, content: "" });
  });

  test("content with additional --- separators is preserved", () => {
    const result = parseFrontmatter(
      "---\nlabel: Foo\n---\nLine 1\n---\nLine 2",
    );
    expect(result).toEqual({
      data: { label: "Foo" },
      content: "Line 1\n---\nLine 2",
    });
  });

  test("single-key frontmatter", () => {
    const result = parseFrontmatter("---\ntopic: theming\n---\nContent");
    expect(result).toEqual({
      data: { topic: "theming" },
      content: "Content",
    });
  });
});
