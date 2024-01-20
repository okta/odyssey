/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

const rule = require("./no-invalid-theme-properties");
const RuleTester = require("eslint").RuleTester;

const { declaration, string, format, filename, dirname } = rule.meta.messages;
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

ruleTester.run("no-invalid-theme-properties", rule, {
  valid: [
    { code: "({ FooX: 0 })" },
    { code: "({ FooBarX: 0 })" },
    { code: "({ FooBarBazX: 0 })" },
    { code: "({ FooBarBazX0: 0 })" },
    { code: "({ FooBarBazX000: 0 })" },
  ],

  invalid: [
    {
      code: "({ fooX: 0 })",
      errors: [{ message: format }],
    },
    {
      code: "({ fooBarX: 0 })",
      errors: [{ message: format }],
    },
    {
      code: "({ $fooBarBazX: 0 })",
      errors: [{ message: format }],
    },
    {
      code: "({ fooBarBaz0X: 0 })",
      errors: [{ message: format }],
    },
    {
      code: "({ [Symbol('fooX')]: 0 })",
      errors: [{ message: string }],
    },
    {
      code: "({ FooX: 0 })",
      errors: [{ message: dirname }],
      filename: "Foo/Bar.theme.ts",
    },
    {
      code: "({ BarX: 0 })",
      errors: [{ message: filename }],
      filename: "Foo/Bar.theme.ts",
    },
    {
      code: "({ Baz: 0 })",
      errors: [{ message: declaration }],
    },
  ],
});
