/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { transformSync } from "@babel/core";
import { plugin } from "./fully-specified-plugin";

const importStatements = `
import { level } from '.'
import { levelIndex } from './'
import { oneBackLevel } from '..'
import { oneBackLevelIndex } from '../'
import { twoBackLevel } from '../..'
import { twoBackLevelIndex } from '../../'
import { somethingBack } from '../lib/something'
import { somethingBackTest } from '../lib/something.test'
import { export1 , export2 as alias2 } from './lib/something'
import { export1Test , export2 as alias2Test } from './lib/something.test'
import { something } from './lib/something'
import { somethingTest } from './lib/something.test'
import { something as other } from './lib/something'
import { something as otherTest } from './lib/something.test'
import anotherImport from './lib/something'
import anotherImportTest from './lib/something.test'
import another, { otherImport } from './lib/something'
import anotherTest, { otherImportTest } from './lib/something.test'
import * as Something from './lib/something'
import * as SomethingTest from './lib/something.test'
`;

const exportStatements = `
export { level } from '.'
export { levelIndex } from './'
export { oneBackLevel } from '..'
export { oneBackLevelIndex } from '../'
export { twoBackLevel } from '../..'
export { twoBackLevelIndex } from '../../'
export { somethingBack } from '../lib/something'
export { somethingBackTest } from '../lib/something.test'
export { something } from './lib/something'
export { somethingTest } from './lib/something.test'
export { something as another } from './lib/something'
export { somethingTest as anotherTest } from './lib/something.test'
export * as anotherModule from './lib/something'
export * as anotherModuleTest from './lib/something.test'
export * from './lib/something'
export * from './lib/something.test'
`;

const typeOnlyExports = `
export type { NamedType } from './lib/something'
export type { NamedTypeTest } from './lib/something.test'
`;

const typeOnlyImports = `
import type DefaultType from './lib/something'
import type DefaultTypeTest from './lib/something.test'
import type { NamedType } from './lib/something'
import type { NamedTypeTest } from './lib/something.test'
import type * as AllTypes from './lib/something'
import type * as AllTypesTest from './lib/something.test'
`;

const styleModuleImports = `
import stylesWithMultipleExtensions from './styles.module.scss'
import styles from './styles.scss'
`;

const bareModuleSpecifiers = `
import babel from '@babel/core'
import { transform } from '@babel/core'

export * from '@babel/core'
export { transform } from '@babel/core'
`;

describe("plugin", () => {
  test.each`
    type                | statements
    ${"module imports"} | ${importStatements}
    ${"module exports"} | ${exportStatements}
  `(
    "should fully qualify the $type specifiers",
    ({ statements }: { statements: string }) => {
      const result = transformSync(statements, {
        plugins: ["@babel/plugin-syntax-typescript", plugin],
        filename: "foo",
        configFile: false,
      });

      expect(result?.code).toMatchSnapshot();
    },
  );

  test.each`
    type                        | statements
    ${"type-only imports"}      | ${typeOnlyImports}
    ${"type-only exports"}      | ${typeOnlyExports}
    ${"style module imports"}   | ${styleModuleImports}
    ${"bare module specifiers"} | ${bareModuleSpecifiers}
  `("should skip $type", ({ statements }: { statements: string }) => {
    const result = transformSync(statements, {
      plugins: ["@babel/plugin-syntax-typescript", plugin],
      filename: "foo",
      configFile: false,
    });

    expect(result?.code).toMatchSnapshot();
  });
});
