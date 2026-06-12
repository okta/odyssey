import { extractCategory } from "./generateTokens.js";

describe(extractCategory.name, () => {
  test("extracts lowercase first CamelCase word as category", () => {
    expect(extractCategory("BorderColorControl")).toBe("border");
    expect(extractCategory("SpacingBase4")).toBe("spacing");
    expect(extractCategory("TypographyWeightHeading")).toBe("typography");
    expect(extractCategory("ColorBlue500")).toBe("color");
    expect(extractCategory("HuePrimary")).toBe("hue");
    expect(extractCategory("PaletteNeutral")).toBe("palette");
  });

  test("returns 'other' for token names without a recognizable CamelCase prefix", () => {
    expect(extractCategory("abc")).toBe("other");
    expect(extractCategory("")).toBe("other");
    expect(extractCategory("123value")).toBe("other");
  });

  test("single-word PascalCase token maps to lowercase category", () => {
    expect(extractCategory("Border")).toBe("border");
  });
});
