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
const headerComment = require("./header-comment");

function odysseyIconTemplate({ template }, opts, { componentName, jsx }) {
  const plugins = ["jsx"];
  if (opts.typescript) {
    plugins.push("typescript");
  }
  const typeScriptTpl = template.smart({ plugins, preserveComments: true });

  const compName = componentName.name.substring(3) + "Icon";
  const compProps = compName + "Props";

  const attrs = jsx.openingElement.attributes;
  const classNameIndex = attrs.findIndex(
    (att) => att.name.name === "className"
  );
  jsx.openingElement.attributes = [
    ...attrs.slice(0, classNameIndex),
    ...attrs.slice(classNameIndex + 1),
  ];

  const icon = `<SvgIcon
  ref={ref}
  {...omitProps}
>
  ${generate(jsx).code}
</SvgIcon>`;

  const newLine = `
  `;

  return typeScriptTpl.ast`
${headerComment}

import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { useOmit } from '../../utils';
import { SvgIcon } from './SvgIcon';

${newLine}

export interface ${compProps} extends Omit<
  ComponentPropsWithRef<'svg'>,
  'style' | 'className'
> {
  title?: string;
}

${newLine}

const ${compName} = forwardRef<SVGSVGElement, ${compProps}>((props, ref) => {
  const omitProps = useOmit(props);
  return (
    ${icon}
  )
});

${newLine}

${compName}.displayName = "${compName}";

${newLine}

export { ${compName} as ${compName} }
`;
}

module.exports = odysseyIconTemplate;
