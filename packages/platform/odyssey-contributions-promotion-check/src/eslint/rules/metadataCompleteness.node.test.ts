import json from "@eslint/json";
import { type ESLint, RuleTester } from "eslint";
import { describe, test } from "vitest";

import { createMetadataCompletenessRule } from "./metadataCompleteness.js";

// Execute each RuleTester case immediately and synchronously so that failures
// throw and propagate to the enclosing test() block. Without this, RuleTester
// would try to call describe()/it() to register async Vitest tests from inside
// a running test() — which Vitest does not support.
RuleTester.describe = (_name: string, fn: () => void) => fn();
RuleTester.it = (_name: string, fn: () => void) => fn();

const ruleTester = new RuleTester({
  language: "json/json",
  // @eslint/json 1.x types don't perfectly align with ESLint's Plugin type
  plugins: { json: json as unknown as ESLint.Plugin },
});

const FILENAME = "/contributions/fake/contributionsMetadata.json";

const makeMetadataCompletenessRule = (exportedNames: string[]) =>
  createMetadataCompletenessRule({
    checkFileExists: () => true,
    getExportedNames: () => new Set(exportedNames),
  });

const SINGLE_COMPONENT = `{
  "components": [
    {
      "componentName": "Button",
      "libraryName": "test"
    }
  ]
}`;

const DUPLICATE_COMPONENTS = `{
  "components": [
    {
      "componentName": "Button",
      "libraryName": "test"
    },
    {
      "componentName": "Button",
      "libraryName": "test"
    }
  ]
}`;

const EMPTY_COMPONENTS = `{
  "components": []
}`;

describe(createMetadataCompletenessRule.name, () => {
  test("no violations when exports match metadata", () => {
    ruleTester.run(
      "metadata-completeness",
      makeMetadataCompletenessRule(["Button"]),
      {
        valid: [{ code: SINGLE_COMPONENT, filename: FILENAME }],
        invalid: [],
      },
    );
  });

  test("no violations when src/index.ts is absent", () => {
    ruleTester.run(
      "metadata-completeness",
      createMetadataCompletenessRule({
        checkFileExists: () => false,
        getExportedNames: () => new Set(["Button"]),
      }),
      {
        valid: [{ code: SINGLE_COMPONENT, filename: FILENAME }],
        invalid: [],
      },
    );
  });

  test("staleEntry errors on the componentName value string", () => {
    ruleTester.run("metadata-completeness", makeMetadataCompletenessRule([]), {
      valid: [],
      invalid: [
        {
          code: SINGLE_COMPONENT,
          filename: FILENAME,
          errors: [
            {
              messageId: "staleEntry",
              data: { componentName: "Button" },
              line: 4,
              column: 24, // start of "Button" value
            },
          ],
        },
      ],
    });
  });

  test('missingEntry errors on the "components" property key', () => {
    ruleTester.run(
      "metadata-completeness",
      makeMetadataCompletenessRule(["Button"]),
      {
        valid: [],
        invalid: [
          {
            code: EMPTY_COMPONENTS,
            filename: FILENAME,
            errors: [
              {
                messageId: "missingEntry",
                data: { componentName: "Button" },
                line: 2,
                endLine: 2,
                column: 3, // start of "components" key
                endColumn: 15, // covers all of "components"
              },
            ],
          },
        ],
      },
    );
  });

  test("duplicateEntry errors on the second occurrence", () => {
    ruleTester.run(
      "metadata-completeness",
      makeMetadataCompletenessRule(["Button"]),
      {
        valid: [],
        invalid: [
          {
            code: DUPLICATE_COMPONENTS,
            filename: FILENAME,
            errors: [
              {
                messageId: "duplicateEntry",
                data: { componentName: "Button" },
                line: 8,
                endLine: 8,
                column: 24, // start of the second "Button" value
                endColumn: 32, // covers all of "Button"
              },
            ],
          },
        ],
      },
    );
  });

  test("missingEntry and staleEntry errors are reported together", () => {
    ruleTester.run(
      "metadata-completeness",
      makeMetadataCompletenessRule(["TextField"]),
      {
        valid: [],
        invalid: [
          {
            code: SINGLE_COMPONENT,
            filename: FILENAME,
            errors: [
              {
                messageId: "missingEntry",
                data: { componentName: "TextField" },
              },
              {
                messageId: "staleEntry",
                data: { componentName: "Button" },
              },
            ],
          },
        ],
      },
    );
  });
});
