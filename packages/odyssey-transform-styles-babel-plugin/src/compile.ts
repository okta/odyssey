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

import type { MessagePort } from 'worker_threads';
import { parentPort } from 'worker_threads';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import { createHash } from 'crypto';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { renderSync } from 'sass';
import formatWarnings from './formatWarnings';

export interface File {
  digest: string,
  styles: string,
  tokens: Tokens,
}

export type Tokens = Record<string, string>;

export interface MessageArgs {
  signal: Int32Array,
  port: MessagePort,
  filePath: string,
}

export interface CompileResponse extends Partial<File> {
  error?: unknown,
  warning?: string;
}

if (!parentPort) {
  throw new Error('Cannot execute this module in the main thread');
}

const partials = `functions colors mixins tokens`.split(' ');
const importDir = resolve(require.resolve('@okta/odyssey'), '../abstracts');
const importData = partials.map(partial => `@import '${ importDir }/${ partial }';`).join('\n');

parentPort.addListener('message', async (message: MessageArgs) => {
  let response: CompileResponse | undefined;
  const { signal, port, filePath } = message;

  try {
    const source = readFileSync(filePath, 'utf8');

    const intermediate = renderSync({
      data: `${ importData }\n${ source }`,
      file: filePath
    }).css.toString('utf8');

    let tokens: Tokens | undefined

    const context = {
      transformStyles: {
        modules: {
          getJSON (_: string, _tokens: Tokens) {
            tokens = _tokens
          }
        }
      }
    } as postcssrc.ConfigContext

    const { plugins } = await postcssrc(context);
    const runner = postcss(plugins);
    const result = await runner.process(intermediate, { from: filePath });

    if (!tokens) {
      throw new Error('Cannot fetch style tokens');
    }

    const styles = result.css;
    const digest = createHash('md5').update(styles).digest('hex').substr(0, 6);

    response = { digest, styles, tokens, warning: formatWarnings(result.warnings()) };
  } catch (error) {
    response = { error };
  } finally {
    port.postMessage(response);
    port.close();
    Atomics.store(signal, 0, 1);
    Atomics.notify(signal, 0);
  }
});