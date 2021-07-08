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

const stylelint = require('stylelint');
const { validateOptions, report } = stylelint.utils;
const ruleName = 'odyssey/property-rtl-selector';
const messages = stylelint.utils.ruleMessages(ruleName, {
  error: 'error: odyssey/property-rtl-selector',
});

function rule(_, options = {}, context = {}) {
  return function ruleBody(root, result) {
    const validOptions = validateOptions(
      root,
      ruleName,
      {
          //No options for now...
      }
    );

    if (!validOptions) { // If the options are invalid, don't lint
      return;
    }

    root.walkDecls(decl => {
      const hasProperty = (() => (
        [/^box-shadow$/, /^transform$/, /^background/]
          .filter((property) => property.test(decl.prop)).length
      ))()
        const hasDirRtl = decl.parent.selector.includes(`[dir='rtl']`) || decl.parent.selector.includes(`[dir="rtl"]`);
      
      if (!hasProperty && hasDirRtl) {
          return; // Nothing to do with this node - continue
      }

      if (hasProperty & !hasDirRtl) {
        report({
            ruleName,
            result: result,
            message: messages.error, // Build the reported message
            node: decl, // Specify the reported node
            word: decl.parent.selector, // Which exact word caused the error? This positions the error properly
        });
      }
    });
  };
}

module.exports = Object.assign(
  stylelint.createPlugin(ruleName, rule),
  { ruleName, messages }
);
