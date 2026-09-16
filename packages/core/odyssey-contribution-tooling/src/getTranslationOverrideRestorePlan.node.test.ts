import { getTranslationOverrideRestorePlan } from "./getTranslationOverrideRestorePlan.js";

describe(getTranslationOverrideRestorePlan.name, () => {
  test("override replaces a key the bundle already holds", () => {
    expect(
      getTranslationOverrideRestorePlan({
        currentBundle: { greeting: "Hello", farewell: "Goodbye" },
        overrideBundle: { greeting: "Hi" },
      }),
    ).toStrictEqual([
      { keyPath: ["greeting"], hasPreviousValue: true, previousValue: "Hello" },
    ]);
  });

  test("override introduces a key the bundle does not hold", () => {
    expect(
      getTranslationOverrideRestorePlan({
        currentBundle: { greeting: "Hello" },
        overrideBundle: { farewell: "Bye" },
      }),
    ).toStrictEqual([{ keyPath: ["farewell"], hasPreviousValue: false }]);
  });

  test("no bundle exists for the language yet", () => {
    expect(
      getTranslationOverrideRestorePlan({
        overrideBundle: { greeting: "Hallo" },
      }),
    ).toStrictEqual([{ keyPath: ["greeting"], hasPreviousValue: false }]);
  });

  test("override value is undefined", () => {
    expect(
      getTranslationOverrideRestorePlan({
        currentBundle: { greeting: "Hello" },
        overrideBundle: { greeting: undefined },
      }),
    ).toStrictEqual([]);
  });

  test("override nests groups that the bundle also nests", () => {
    expect(
      getTranslationOverrideRestorePlan({
        currentBundle: {
          errors: { required: "Required", tooLong: "Too long" },
          greeting: "Hello",
        },
        overrideBundle: {
          errors: { required: "Please fill this in", missing: "Missing" },
        },
      }),
    ).toStrictEqual([
      {
        keyPath: ["errors", "required"],
        hasPreviousValue: true,
        previousValue: "Required",
      },
      { keyPath: ["errors", "missing"], hasPreviousValue: false },
    ]);
  });

  test("override replaces a nested group with a string", () => {
    expect(
      getTranslationOverrideRestorePlan({
        currentBundle: { errors: { required: "Required" } },
        overrideBundle: { errors: "Something went wrong" },
      }),
    ).toStrictEqual([
      {
        keyPath: ["errors"],
        hasPreviousValue: true,
        previousValue: { required: "Required" },
      },
    ]);
  });

  test("snapshotted group is detached from the bundle it came from", () => {
    const currentBundle = { errors: { required: "Required" } };
    const [operation] = getTranslationOverrideRestorePlan({
      currentBundle,
      overrideBundle: { errors: "Something went wrong" },
    });

    currentBundle.errors.required = "Mutated after the snapshot";

    expect(operation).toStrictEqual({
      keyPath: ["errors"],
      hasPreviousValue: true,
      previousValue: { required: "Required" },
    });
  });
});
