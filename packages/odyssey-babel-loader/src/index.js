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

module.exports = require("babel-loader").custom(() => ({
  customOptions({ include, loader = {} }, { source }) {
    const dependencyRegexp = buildImportDependencyRegexp(include);

    Array.from(source.matchAll(dependencyRegexp)).forEach(([, dependency]) => {
      const absoluteDependency = this.utils.absolutify(
        this.context,
        dependency
      );
      this.addDependency(absoluteDependency);
    });

    return { loader };
  },
}));

function buildImportDependencyRegexp(include) {
  const normalized = Array.isArray(include)
    ? include.map(toRegexpString)
    : ["\\.module\\.(?:scss|css)"];

  return new RegExp(`from ["'\`](\\S+(?:${normalized.join("|")}))["'\`]`, "gi");
}

function toRegexpString(include) {
  if (typeof include === "string") return include;
  if (include instanceof RegExp) return include.toString().slice(1, -1);
  throw new Error(
    "[@okta/odyssey-babel-loader]: invalid include option, must be an array of regular expressions or escaped string regular expressions"
  );
}
