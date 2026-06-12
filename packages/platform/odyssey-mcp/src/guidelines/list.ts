import { parseFrontmatter } from "../utils/frontmatter.js";

export type GuidelineEntry = {
  content: string;
  description: string;
  label: string;
  topic: string;
};

const rawFiles = import.meta.glob("./*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const guidelines: GuidelineEntry[] = Object.entries(rawFiles).map(
  ([filePath, raw]) => {
    const topic = filePath.replace(/^\.\//, "").replace(/\.md$/, "");
    const { data, content } = parseFrontmatter(raw);
    return {
      topic,
      label: data["label"] ?? "",
      description: data["description"] ?? "",
      content,
    };
  },
);

export type GuidelineOverview = Omit<GuidelineEntry, "content">;

export const guidelineOverviews: GuidelineOverview[] = guidelines.map(
  ({ topic, label, description }) => ({ topic, label, description }),
);

export const findGuideline = (topic: string): GuidelineEntry | undefined =>
  guidelines.find((guideline) => guideline.topic === topic);
