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

import type { Template } from "@svgr/babel-plugin-transform-svg-component";

import generate from "@babel/generator";
import {
  jsxClosingFragment,
  jsxFragment,
  jsxOpeningFragment,
} from "@babel/types";

import { headerCopyrightLicense } from "./headerCopyrightLicense";

export const iconTemplate: Template = ({ componentName, jsx }, { tpl }) => {
  const iconComponentName = `${componentName.replace(/^Svg/, "")}Icon`;

  const iconComponentPropsTypeName = `${iconComponentName}Props`;
  const memoizedIconComponentName = `Memoized${iconComponentName}`;

  const fragmentJsx = jsxFragment(
    jsxOpeningFragment(),
    jsxClosingFragment(),
    jsx.children,
  );
  const svgIconChildren = generate(fragmentJsx).code;

  const iconChildren = `<SvgIcon
  fill="none"
  ref={ref}
  viewBox="0 0 16 16"
  xmlns="http://www.w3.org/2000/svg"
  {...props}
>
  ${svgIconChildren}
</SvgIcon>`;

  const newLine = `
  `;

  return tpl`
${headerCopyrightLicense}

import { forwardRef, memo } from "react";
import { SvgIcon, type SvgIconNoChildrenProps } from '../SvgIcon.js';

${newLine}

export type ${iconComponentPropsTypeName} = SvgIconNoChildrenProps;

${newLine}

const ${iconComponentName} = forwardRef<SVGSVGElement, ${iconComponentPropsTypeName}>((props, ref) => {
  return (
    ${iconChildren}
  )
});

${newLine}

const ${memoizedIconComponentName} = memo(${iconComponentName});
${memoizedIconComponentName}.displayName = "${iconComponentName}";

${newLine}

export { ${memoizedIconComponentName} as ${iconComponentName} };
`;
};
