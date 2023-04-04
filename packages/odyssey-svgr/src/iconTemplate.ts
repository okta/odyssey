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

const generate = require("@babel/generator").default;
const {
  jsxFragment,
  jsxOpeningFragment,
  jsxClosingFragment,
} = require("@babel/types");
const headerComment = require("./header-comment");

const odysseyIconTemplate = ({ componentName, jsx }: TemplateVariables, { tpl: template, options }) => {
  const plugins = ["jsx"];
  if (options.typescript) {
    plugins.push("typescript");
  }
  const typeScriptTpl = template.smart({ plugins, preserveComments: true });

  const compName = componentName.name.substring(3) + "Icon";
  const compProps = compName + "Props";

  const fragmentJsx = jsxFragment(
    jsxOpeningFragment(),
    jsxClosingFragment(),
    jsx.children
  );
  const svgChildren = generate(fragmentJsx).code;

  const icon = `<SvgIcon
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  ref={ref}
  {...props}
>
  ${svgChildren}
</SvgIcon>`;

  const newLine = `
  `;

  return typeScriptTpl.ast`
${headerComment}

import { forwardRef } from "react";
import { SvgIcon } from './SvgIcon';
import type { SvgIconNoChildrenProps } from './types';

${newLine}

export type ${compProps} = SvgIconNoChildrenProps

${newLine}

export const ${compName} = forwardRef<SVGSVGElement, ${compProps}>((props, ref) => {
  return (
    ${icon}
  )
});

${newLine}

${compName}.displayName = "${compName}";
`;
}

module.exports = odysseyIconTemplate;
