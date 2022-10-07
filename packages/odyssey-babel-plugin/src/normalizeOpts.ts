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

import type * as Babel from "@babel/core";

export interface Opts {
  include?: Array<string | RegExp>;
  identityObjectProxy: boolean;
}

interface NormalizedOpts extends Opts {
  include: RegExp[];
}

export function normalizeOpts(
  babelOpts: Babel.PluginPass["opts"]
): NormalizedOpts {
  const opts = babelOpts as Opts;
  const normalized = {
    include: [/\.module\.(?:scss|css)$/i],
    identityObjectProxy:
      typeof opts.identityObjectProxy === "boolean"
        ? opts.identityObjectProxy
        : false,
  };

  if (Array.isArray(opts.include)) {
    normalized.include = opts.include.map((incl: string | RegExp) =>
      incl instanceof RegExp ? incl : new RegExp(incl)
    );
  }

  return normalized;
}

export function shouldInclude(candidate: string, include: RegExp[]): boolean {
  return include.some((incl) => incl.test(candidate));
}
