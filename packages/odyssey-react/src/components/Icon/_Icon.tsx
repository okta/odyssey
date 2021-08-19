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

export type Props = {
  /**
   * Title text used by screen readers
   * @default the name of the icon
   */
  title?: string;

  /**
   * Id used to link title and svg elements, used by screen readers
   * @default a randomly generated id
   */
  titleId?: string;

  /**
   * Size in any valid css unit, `px`, `em`, `%`, etc...
   * @default 1em
   */
  size?: string;

  /**
   * Color of the icon fill in hex format, eg: #000000
   * @default current text color
   */
  color?: string;
}

function Icon({
  title,
  titleId,
  size,
  color
}:Props): JSX.Element {
  /*
   * Empty functional component used to document all Icons
   */
  return (
    <span>{title}{titleId}{size}{color}</span>
  );
}

export default Icon;
