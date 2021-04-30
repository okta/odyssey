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
const addEmptyLineAfter = require('stylelint/lib/utils/addEmptyLineAfter');
const { pattern, template, licenseLines, licenseText, licenseComment } = require('./license');

const ruleName = 'odyssey/header';
const messages = stylelint.utils.ruleMessages(ruleName, {
  missing: 'missing header',
  incorrect: 'incorrect header'
});

function isLicenseHeader (text) {
  const textLines = text.split('\n');

  return licenseLines.every((line, idx) => {
    const candidate = textLines[idx];

    if (idx === 1) { // copyright line with dynamic year value
      return pattern.test(candidate);
    }

    return candidate === line;
  })
}

function rule (actual, options = {}, context = {}) {
  return function ruleBody (root, result) {
    const fix = context.fix && !(options.disableFix || false)
    const first = root.first;
    const rootComment = first.type === 'comment';

    if (fix && !rootComment) {
      root.prepend(licenseComment);
      return
    }

    if (!rootComment) {
      stylelint.utils.report({
        message: messages.missing,
        node: root,
        result,
        ruleName,
      });

      return
    }

    if (isLicenseHeader(first.text)) {
      return
    }

    if (fix) {
      root.prepend(licenseComment);
      return
    }

    stylelint.utils.report({
      message: messages.incorrect,
      node: first,
      result,
      ruleName,
    });
  }
}

module.exports = Object.assign(
  stylelint.createPlugin(ruleName, rule),
  { ruleName, messages }
);
