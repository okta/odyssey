import { getBundleWithRestoredOverrides } from "./getBundleWithRestoredOverrides.js";

describe(getBundleWithRestoredOverrides.name, () => {
  test("plan restores a previous value and leaves untouched keys alone", () => {
    expect(
      getBundleWithRestoredOverrides({
        overriddenBundle: {
          greeting: "Hi",
          farewell: "Goodbye",
          addedByConsumer: "Consumer string",
        },
        restorePlan: [
          {
            keyPath: ["greeting"],
            hasPreviousValue: true,
            previousValue: "Hello",
          },
        ],
      }),
    ).toStrictEqual({
      greeting: "Hello",
      farewell: "Goodbye",
      addedByConsumer: "Consumer string",
    });
  });

  test("plan removes a key the override introduced", () => {
    expect(
      getBundleWithRestoredOverrides({
        overriddenBundle: { greeting: "Hello", farewell: "Bye" },
        restorePlan: [{ keyPath: ["farewell"], hasPreviousValue: false }],
      }),
    ).toStrictEqual({ greeting: "Hello" });
  });

  test("plan reaches a leaf inside a nested group", () => {
    expect(
      getBundleWithRestoredOverrides({
        overriddenBundle: {
          errors: {
            required: "Please fill this in",
            missing: "Missing",
            tooLong: "Too long",
          },
          greeting: "Hello",
        },
        restorePlan: [
          {
            keyPath: ["errors", "required"],
            hasPreviousValue: true,
            previousValue: "Required",
          },
          { keyPath: ["errors", "missing"], hasPreviousValue: false },
        ],
      }),
    ).toStrictEqual({
      errors: { required: "Required", tooLong: "Too long" },
      greeting: "Hello",
    });
  });

  test("plan restores a nested group over a string", () => {
    expect(
      getBundleWithRestoredOverrides({
        overriddenBundle: { errors: "Something went wrong" },
        restorePlan: [
          {
            keyPath: ["errors"],
            hasPreviousValue: true,
            previousValue: { required: "Required" },
          },
        ],
      }),
    ).toStrictEqual({ errors: { required: "Required" } });
  });

  test("plan names a nested path the bundle no longer nests", () => {
    expect(
      getBundleWithRestoredOverrides({
        overriddenBundle: { errors: "Something went wrong" },
        restorePlan: [
          {
            keyPath: ["errors", "required"],
            hasPreviousValue: true,
            previousValue: "Required",
          },
        ],
      }),
    ).toStrictEqual({ errors: "Something went wrong" });
  });

  test("empty plan", () => {
    expect(
      getBundleWithRestoredOverrides({
        overriddenBundle: { greeting: "Hello" },
        restorePlan: [],
      }),
    ).toStrictEqual({ greeting: "Hello" });
  });
});
