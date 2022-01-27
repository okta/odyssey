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

const message = rule.meta.messages.invalidThemeProperty;
const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

ruleTester.run("no-invalid-theme-properties", rule, {
  valid: [
    { code: "({ Foo: 0 })" },
    { code: "({ FooBar: 0 })" },
    { code: "({ FooBarBaz: 0 })" },
    { code: "({ FooBarBazX: 0 })" },
    { code: "({ FooBarBazXs: 0 })" },
  ],

  invalid: [
    {
      code: "({ foo: 0 })",
      errors: [{ message }],
    },
    {
      code: "({ fooBar: 0 })",
      errors: [{ message }],
    },
    {
      code: "({ $fooBarBaz: 0 })",
      errors: [{ message }],
    },
    {
      code: "({ fooBarBaz0: 0 })",
      errors: [{ message }],
    },
    {
      code: "({ [Symbol('foo')]: 0 })",
      errors: [{ message }],
    },
  ],
});
