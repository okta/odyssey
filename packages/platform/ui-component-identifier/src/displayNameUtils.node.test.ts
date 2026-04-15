import { describe, expect, test } from "vitest";

import { getPackageDisplayName } from "./displayNameUtils.js";

describe(getPackageDisplayName.name, () => {
  test("converts single word without -components suffix", () => {
    expect(getPackageDisplayName("odyssey")).toBe("Odyssey");
  });

  test("converts short acronym package with -components suffix", () => {
    expect(getPackageDisplayName("iga-components")).toBe("IGA");
  });

  test("converts two-letter acronym package", () => {
    expect(getPackageDisplayName("ud-components")).toBe("UD");
    expect(getPackageDisplayName("wp-components")).toBe("WP");
  });

  test("converts three-letter acronym package", () => {
    expect(getPackageDisplayName("oin-components")).toBe("OIN");
  });

  test("converts multi-word package with -components suffix", () => {
    expect(getPackageDisplayName("resource-access-policy-components")).toBe(
      "Resource Access Policy",
    );
  });

  test("converts single longer word with -components suffix", () => {
    expect(getPackageDisplayName("passwordless-components")).toBe(
      "Passwordless",
    );
    expect(getPackageDisplayName("workflows-components")).toBe("Workflows");
    expect(getPackageDisplayName("example-components")).toBe("Example");
  });

  test("handles unknown packages gracefully", () => {
    // "my" (2 chars) and "new" (3 chars) both uppercased by the <= 3 rule
    expect(getPackageDisplayName("my-new-pkg-components")).toBe("MY NEW PKG");
    expect(getPackageDisplayName("some-library")).toBe("Some Library");
  });

  test("uppercases words with exactly 3 characters", () => {
    // "api" is 3 chars -> "API"
    expect(getPackageDisplayName("api-components")).toBe("API");
  });

  test("title-cases words with exactly 4 characters", () => {
    // "auth" is 4 chars -> "Auth"
    expect(getPackageDisplayName("auth-components")).toBe("Auth");
  });
});
