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

const validThemeProperty = /^[A-Z][A-Za-z]+$/;

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
      invalidThemeProperty: "Invalid theme property, use UpperCamelCase string",
    },
  },
  create: function (context) {
    function report(node) {
      context.report({
        messageId: "invalidThemeProperty",
        node,
      });
    }

    function isInvalidThemeProperty(value) {
      if (typeof value !== "string") {
        return true;
      }
      if (validThemeProperty.test(value)) {
        return false;
      }

      return true;
    }

    function check(node) {
      const value = node.key.name;
      if (isInvalidThemeProperty(value)) {
        report(node);
      }
    }

    return {
      Property: check,
    };
  },
};
