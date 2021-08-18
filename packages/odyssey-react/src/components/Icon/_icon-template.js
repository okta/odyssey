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

function odysseyIconTemplate(
  { template },
  opts,
  { componentName, jsx, exports },
) {
  const plugins = ['jsx']
  if (opts.typescript) {
    plugins.push('typescript')
  }
  const typeScriptTpl = template.smart({ plugins, preserveComments: true })
  
  const headerComment = `/*!
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

`;

const title = changeCase.capitalCase(componentName.name.substring(3));

  return typeScriptTpl.ast`
${headerComment}
import { useMemo } from 'react';
import type { SVGProps, CSSProperties } from 'react';
import { nanoid } from 'nanoid';
import styles from './Icon.module.scss';

interface Props {
  title?: string;
  titleId?: string;
  size?: string;
  color?: string;
}

function ${componentName}({
  title = '${title}',
  titleId,
  size,
  color,
  ...props
}: SVGProps<SVGSVGElement> & Props): JSX.Element {
  if(!titleId){
    titleId = useMemo(() => ('icon_'+nanoid(6)), [titleId]);
  }
  const sizeAndColor:CSSProperties = new Object();
  if(size){
    sizeAndColor.fontSize = size;
  }
  if(color){
    sizeAndColor.color = color;
  }
  return ${jsx};
}

${exports}
  `
}
module.exports = odysseyIconTemplate
