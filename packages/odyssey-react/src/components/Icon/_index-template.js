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

const path = require('path');
const fs = require('fs');

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

function odysseyIconIndexTemplate(filePaths) {

  const otherFilePaths = fs.readdirSync(__dirname).filter(
    file => path.extname(file).toLowerCase() === '.tsx' && 
    !filePaths.includes(`${__dirname}/${file}`) &&
    !file.includes('.stories') &&
    file !== 'index.tsx' &&
    file !== '_Icon.tsx'
  ).map( file => `${__dirname}/${file}`);

  const allFilePaths = [...filePaths, ...otherFilePaths].sort();

  const exportEntries = allFilePaths.map(filePath => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as ${exportName} } from './${basename}'`;
  });

  return headerComment + exportEntries.join('\n');
}

module.exports = odysseyIconIndexTemplate;
