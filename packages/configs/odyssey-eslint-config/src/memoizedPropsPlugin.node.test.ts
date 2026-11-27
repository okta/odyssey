/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import typescriptParser from "@typescript-eslint/parser";
import { Linter, RuleTester } from "eslint";
import { describe, expect, test } from "vitest";

import {
  createRenderScopeRule,
  memoizedPropsPlugin,
} from "./memoizedPropsPlugin.js";

// Run each RuleTester case synchronously inside the enclosing test(). RuleTester otherwise registers its own describe()/it() blocks from inside a running test, which Vitest does not support.
RuleTester.describe = (_name: string, callback: () => void) => callback();
RuleTester.it = (_name: string, callback: () => void) => callback();

const languageOptions = {
  parser: typescriptParser,
  parserOptions: { ecmaFeatures: { jsx: true } },
};

const ruleTester = new RuleTester({ languageOptions });

const ruleOptions = [{ nativeAllowList: "all" }];

const COMPONENT_FILENAME = "/repository/src/Banner.tsx";
const STORY_FILENAME = "/repository/src/Banner.stories.tsx";
const TEST_FILENAME = "/repository/src/Banner.test.tsx";

const getRule = (
  ruleName: keyof NonNullable<typeof memoizedPropsPlugin.rules>,
) => {
  const rule = memoizedPropsPlugin.rules?.[ruleName];

  if (!rule || typeof rule === "function") {
    throw new Error(`memoized-props/${ruleName} is not a rule module.`);
  }

  return rule;
};

describe(createRenderScopeRule.name, () => {
  test("component source", () => {
    ruleTester.run(
      "no-new-function-as-prop",
      getRule("no-new-function-as-prop"),
      {
        invalid: [
          {
            code: `
            const Banner = () => (
              <Dialog onClose={() => undefined} />
            );
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            function Banner() {
              const closeBanner = () => undefined;

              return <Dialog onClose={closeBanner} />;
            }
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const Banner = memo(({ isOpen }) => (
              <Dialog onClose={isOpen ? () => undefined : undefined} />
            ));
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const Banner = forwardRef((props, ref) => (
              <Dialog onClose={function closeBanner() {}} ref={ref} />
            ));
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const useBannerContent = () => (
              <Dialog onClose={() => undefined} />
            );
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const Banner = () => {
              const onClose = useCallback(() => (
                <Dialog onClose={() => undefined} />
              ), []);

              return onClose;
            };
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
        ],
        valid: [
          {
            code: `
            const Banner = () => {
              const closeBanner = useCallback(() => undefined, []);

              return <Dialog onClose={closeBanner} />;
            };
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const Banner = () => (
              <button onClick={() => undefined} type="button" />
            );
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const Banner = () => {
              const dialog = useMemo(
                () => <Dialog onClose={() => undefined} />,
                [],
              );

              return dialog;
            };
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const closeBanner = () => undefined;
            const banner = <Dialog onClose={closeBanner} />;
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const getBanner = () => <Dialog onClose={() => undefined} />;
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const banner = (
              <Dialog
                renderContent={function Content() {
                  return null;
                }}
              />
            );
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            const Content = () => null;
            const banner = <Dialog renderContent={Content} />;
          `,
            filename: COMPONENT_FILENAME,
            options: ruleOptions,
          },
        ],
      },
    );
  });

  test("component source objects and arrays", () => {
    ruleTester.run("no-new-object-as-prop", getRule("no-new-object-as-prop"), {
      invalid: [
        {
          code: `
            const Banner = ({ label }) => (
              <Dialog labels={{ close: label }} />
            );
          `,
          errors: [{ messageId: "createdInRender" }],
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
        {
          code: `
            const Banner = ({ close }) => {
              const renderDialog = useMemo(
                () => () => <Dialog labels={{ close }} />,
                [close],
              );

              return renderDialog();
            };
          `,
          errors: [{ messageId: "createdInRender" }],
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
      ],
      valid: [
        {
          code: `
            const Banner = ({ rows }) => {
              const dialogs = useMemo(
                () => rows.map((row) => <Dialog key={row} labels={{ close: row }} />),
                [rows],
              );

              return dialogs;
            };
          `,
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
        {
          code: `
            const Banner = () => <div style={{ display: "flex" }} />;
          `,
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
        {
          code: `
            const Banner = ({ label }) => {
              const labels = useMemo(() => ({ close: label }), [label]);

              return <Dialog labels={labels} />;
            };
          `,
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
      ],
    });

    ruleTester.run("no-new-array-as-prop", getRule("no-new-array-as-prop"), {
      invalid: [
        {
          code: `
            const Banner = ({ firstAction }) => (
              <Dialog actions={[firstAction]} />
            );
          `,
          errors: [{ messageId: "createdInRender" }],
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
      ],
      valid: [
        {
          code: `
            const NO_ACTIONS = [];
            const Banner = () => <Dialog actions={NO_ACTIONS} />;
          `,
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
      ],
    });
  });

  test("story render function", () => {
    ruleTester.run(
      "no-new-function-as-prop",
      getRule("no-new-function-as-prop"),
      {
        invalid: [
          {
            code: `
            export const Playground = {
              render: function C() {
                const [isVisible, setIsVisible] = useState(true);

                return isVisible ? (
                  <Banner onClose={() => setIsVisible(false)} />
                ) : null;
              },
            };
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: STORY_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            export const Playground = {
              render: (args) => <Banner {...args} onClose={() => undefined} />,
            };
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: STORY_FILENAME,
            options: ruleOptions,
          },
        ],
        valid: [
          {
            code: `
            export const Playground = {
              render: function C() {
                const [isVisible, setIsVisible] = useState(true);
                const closeBanner = useCallback(() => setIsVisible(false), []);

                return isVisible ? <Banner onClose={closeBanner} /> : null;
              },
            };
          `,
            filename: STORY_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            export const Playground = {
              args: {
                onClose: () => undefined,
              },
            };
          `,
            filename: STORY_FILENAME,
            options: ruleOptions,
          },
        ],
      },
    );
  });

  test("functions named render outside a story", () => {
    ruleTester.run("no-new-object-as-prop", getRule("no-new-object-as-prop"), {
      invalid: [
        {
          code: `
            export default {
              render: (args) => <Banner {...args} labels={{ close: "Close" }} />,
            } satisfies Meta<typeof Banner>;
          `,
          errors: [{ messageId: "createdInRender" }],
          filename: STORY_FILENAME,
          options: ruleOptions,
        },
      ],
      valid: [
        {
          code: `
            const render = () => <Banner labels={{ close: "Close" }} />;
          `,
          filename: TEST_FILENAME,
          options: ruleOptions,
        },
        {
          code: `
            const render = () => <Banner labels={{ close: "Close" }} />;
          `,
          filename: STORY_FILENAME,
          options: ruleOptions,
        },
        {
          code: `
            const bannerRenderers = {
              render: () => <Banner labels={{ close: "Close" }} />,
            };
          `,
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
        {
          code: `
            export const Playground = {
              render: () => <Banner labels={{ close: "Close" }} />,
            };
          `,
          filename: COMPONENT_FILENAME,
          options: ruleOptions,
        },
      ],
    });
  });

  test("React test harness", () => {
    ruleTester.run(
      "no-new-function-as-prop",
      getRule("no-new-function-as-prop"),
      {
        invalid: [
          {
            code: `
            const BannerHarness = memo(() => {
              const [isVisible, setIsVisible] = useState(true);

              return isVisible ? (
                <Banner onClose={() => setIsVisible(false)} />
              ) : null;
            });
          `,
            errors: [{ messageId: "createdInRender" }],
            filename: TEST_FILENAME,
            options: ruleOptions,
          },
        ],
        valid: [
          {
            code: `
            test("banner closes", async () => {
              const closeBanner = vi.fn();

              render(<Banner onClose={closeBanner} />);
            });
          `,
            filename: TEST_FILENAME,
            options: ruleOptions,
          },
          {
            code: `
            test("banner with a new close handler on rerender", async () => {
              const { rerender } = render(<Banner onClose={() => undefined} />);

              rerender(<Banner onClose={() => undefined} />);
            });
          `,
            filename: TEST_FILENAME,
            options: ruleOptions,
          },
        ],
      },
    );
  });

  test("identity-change harness with a disable directive", () => {
    const linter = new Linter({ cwd: "/repository" });

    const lintMessages = linter.verify(
      `
        const BannerHarness = memo(({ closeCount }) => (
          // eslint-disable-next-line memoized-props/no-new-function-as-prop -- the test asserts the Banner handles a new onClose identity on every render
          <Banner key={closeCount} onClose={() => closeCount} />
        ));
      `,
      {
        files: ["**/*.tsx"],
        languageOptions,
        linterOptions: { reportUnusedDisableDirectives: "error" },
        plugins: { "memoized-props": memoizedPropsPlugin },
        rules: {
          "memoized-props/no-new-function-as-prop": ["error", ...ruleOptions],
        },
      },
      TEST_FILENAME,
    );

    expect(lintMessages).toStrictEqual([]);
  });
});
