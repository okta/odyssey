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

import generate from "@babel/generator";
import {
  jsxFragment,
  jsxOpeningFragment,
  jsxClosingFragment,
} from "@babel/types";
import type { Template } from "@svgr/babel-plugin-transform-svg-component";

import { headerComment } from "./headerComment";

export const iconTemplate: Template = ({ componentName, jsx }, { tpl }) => {
  const compName = componentName.substring(3) + "Icon";
  const compProps = compName + "Props";

  const fragmentJsx = jsxFragment(
    jsxOpeningFragment(),
    jsxClosingFragment(),
    jsx.children
  );
  const svgChildren = generate(fragmentJsx).code;

  const icon = `<SvgIcon
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  ref={ref}
  {...props}
>
  ${svgChildren}
</SvgIcon>`;

  const newLine = `
  `;

  return tpl`
${headerComment}

import { forwardRef } from "react";
import { SvgIcon, type SvgIconNoChildrenProps } from '../SvgIcon';

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
};
