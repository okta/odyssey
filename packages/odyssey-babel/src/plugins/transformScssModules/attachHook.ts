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

import type { FileMap } from './transformScssModules';
import { resolve } from 'path';
import hook from 'css-modules-require-hook';
import crypto from 'crypto';
import sass from 'node-sass';
import cssnanoPreset from 'cssnano-preset-default';

const partials = `functions colors mixins tokens`.split(' ');
const importDir = resolve(require.resolve('@okta/odyssey'), '../abstracts');
const importData = partials.map(partial => `@import '${ importDir }/${ partial }';`).join('\n');

let shouldHook = true;

export interface AttachHookArgs {
  fileMap: FileMap;
}

export default function attachHook (
  { fileMap }: AttachHookArgs
): void {
  shouldHook && hook({
    ignore: '**/node_modules/**/*',
    extensions: '.module.scss',
    generateScopedName: 'ods-[hash:hex:6]',
    append: [
      ...cssnanoPreset({
        svgo: { __omit: true },
        discardComments: { removeAll: true },
      }).plugins
        .filter(([, pluginOpts = {} ]) => !pluginOpts.__omit)
        .map(plugin => plugin[ 0 ](plugin[ 1 ]))
    ],
    preprocessCss (styles: string, file: string) {
      return sass.renderSync({
        data: `${ importData }\n${ styles }`,
        file
      }).css.toString('utf8');
    },
    processCss (styles: string, file: string) {
      if (fileMap.has(file)) { return; }

      const digest = crypto.createHash('md5').update(styles).digest('hex').substr(0, 6);
      fileMap.set(file, { digest, styles });
    }
  });
  shouldHook = false;
}