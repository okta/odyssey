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

const path = require("path");
const validThemeProperty = /^[A-Z][A-z0-9]+$/;
const declarations = require("../utils/cssDeclarations");

module.exports = {
  meta: {
    type: "problem",

    docs: {
      description: "disallow invalid theme properties",
      category: "Possible Problems",
      recommended: true,
    },
    fixable: null,
    schema: [], // no options
    messages: {
      declaration: "Invalid theme property, use a css declaration suffix",
      string: "Invalid theme property, use a string key",
      format: "Invalid theme property, use UpperCamelCase format",
      filename: "Invalid theme property, avoid file name",
      dirname: "Invalid theme property, avoid directory name",
    },
  },
  create: function (context) {
    function check(node) {
      const value = node.key.name;
      const absolute = context.getFilename();
      const filename = path.basename(absolute).split(".")[0];
      const dirname = path.basename(path.dirname(absolute));

      if (typeof value !== "string") {
        context.report({ messageId: "string", node });
        return;
      }

      if (!validThemeProperty.test(value)) {
        context.report({ messageId: "format", node });
        return;
      }

      if (value.includes(filename)) {
        context.report({ messageId: "filename", node });
        return;
      }

      if (value.includes(dirname)) {
        context.report({ messageId: "dirname", node });
        return;
      }

      if (
        !value.match(/[0-9]+$/) &&
        !declarations.some((decl) => value.endsWith(decl))
      ) {
        context.report({ messageId: "declaration", node });
        return;
      }
    }

    return {
      Property: check,
    };
  },
};
