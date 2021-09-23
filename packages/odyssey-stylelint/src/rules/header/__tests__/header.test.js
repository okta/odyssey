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

const { messages, ruleName } = require("..");
const { licenseComment, getYear } = require("../license");

testRule({
  ruleName,
  config: true,
  fix: true,
  customSyntax: "postcss-scss",

  accept: [
    {
      code: licenseComment,
      description: "Valid header",
    },
    {
      code: licenseComment.replace(getYear(), "00"),
      description: "Valid header - valid copyright year",
    },
  ],

  reject: [
    {
      code: `a { color: red; }`,
      description: "Missing header",
      message: messages.missing,
      line: 1,
      fixed: `${licenseComment}\na { color: red; }`,
    },
    {
      code: `a { color: red; }\n${licenseComment}`,
      description: "Missing header - with license comment in wrong location",
      message: messages.missing,
      line: 1,
      fixed: `${licenseComment}\na { color: red; }\n${licenseComment}`,
    },
    {
      code: `// a comment that is not a header\na { color: rgb(100 0 0); }`,
      description: "Incorrect header - SCSS style comment",
      message: messages.incorrect,
      line: 1,
      fixed: `${licenseComment}\n// a comment that is not a header\na { color: rgb(100 0 0); }`,
    },
    {
      code: `/* a comment that is not a header */\na { color: red; }`,
      description: "Incorrect header - CSS style comment",
      message: messages.incorrect,
      line: 1,
      fixed: `${licenseComment}\n/* a comment that is not a header */\na { color: red; }`,
    },
    {
      code: licenseComment.replace("20", "19"),
      description: "Incorrect header - invalid copyright year",
      message: messages.incorrect,
      line: 1,
      fixed: `${licenseComment}${licenseComment.replace("20", "19")}`,
    },
  ],
});
