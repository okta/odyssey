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

const changeCase = require('change-case');
const generate = require('@babel/generator').default;

function odysseyIconTemplate(
  { template },
  opts,
  { componentName, jsx },
) {
  const plugins = ['jsx']
  if (opts.typescript) {
    plugins.push('typescript')
  }
  const typeScriptTpl = template.smart({ plugins, preserveComments: true })

  const currentYear = new Date().getFullYear();
  const headerComment = `/*!
 * Copyright (c) ${currentYear}-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

`;

const compName = componentName.name.substring(3);
const title = changeCase.capitalCase(compName);

const attrs = jsx.openingElement.attributes;
const classNameIndex = attrs.findIndex((att) => att.name.name === 'className');
jsx.openingElement.attributes = [
  ...attrs.slice(0, classNameIndex), 
  ...attrs.slice(classNameIndex + 1)
];

const icon = `<Icon
  title="${title}"
  ref={ref}
  {...props}
>
  ${generate(jsx).code}
</Icon>`;

  return typeScriptTpl.ast`
${headerComment}
import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import Icon from './Icon';

export type Props = {
  title?: string;
  titleId?: string;
  size?: string;
  color?: string;
} & ComponentPropsWithRef<'svg'>;

const ${compName} = forwardRef<SVGSVGElement, Props>((props, ref) => (
  ${icon}
));

export default ${compName}
  `
}
module.exports = odysseyIconTemplate
