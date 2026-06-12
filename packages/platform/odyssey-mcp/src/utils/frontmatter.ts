export type FrontmatterResult = {
  content: string;
  data: Record<string, string>;
};

// Simple frontmatter parser that expects key-value pairs in the format "key: value" and separates them from the content using "---" delimiters.
export const parseFrontmatter = (raw: unknown): FrontmatterResult => {
  if (typeof raw !== "string") {
    throw new Error("Expected raw content to be a string");
  }
  const parts = raw.split(/^---\s*$/m);
  // If there are fewer than 3 parts, it means there's no valid frontmatter, return content as is.
  if (parts.length < 3) {
    return { data: {}, content: raw.trim() };
  }
  const data = Object.fromEntries(
    parts[1]
      .split("\n")
      .map((line) => line.match(/^(\w+):\s*(.+)$/))
      .filter(Boolean)
      .map((match) => [match![1], match![2].trim()]),
  );
  return { data, content: parts.slice(2).join("---").trim() };
};
