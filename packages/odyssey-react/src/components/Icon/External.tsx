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

import { useMemo } from "react";
import type { SVGProps, CSSProperties } from "react";
import { nanoid } from "nanoid";
import styles from "./Icon.module.scss";
interface Props {
  title?: string;
  titleId?: string;
  size?: string;
  color?: string;
}

function SvgExternal({
  title = "External",
  titleId,
  size,
  color,
  ...props
}: SVGProps<SVGSVGElement> & Props): JSX.Element {
  if (!titleId) {
    titleId = useMemo(() => "icon_" + nanoid(6), [titleId]);
  }

  const sizeAndColor: CSSProperties = new Object();

  if (size) {
    sizeAndColor.fontSize = size;
  }

  if (color) {
    sizeAndColor.color = color;
  }

  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={sizeAndColor}
      className={styles.icon}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.375 4.75c0-.76.616-1.375 1.375-1.375H5a.625.625 0 010 1.25H2.75a.125.125 0 00-.125.125v6.5c0 .069.056.125.125.125h6.5a.125.125 0 00.125-.125V9a.625.625 0 011.25 0v2.25c0 .76-.616 1.375-1.375 1.375h-6.5c-.76 0-1.375-.616-1.375-1.375v-6.5z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.375 2c0-.345.28-.625.625-.625h4c.345 0 .625.28.625.625v4a.625.625 0 11-1.25 0V3.509L5.442 9.442a.625.625 0 11-.884-.884l5.933-5.933H8A.625.625 0 017.375 2z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgExternal;
