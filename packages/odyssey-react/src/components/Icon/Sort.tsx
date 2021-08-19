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

function SvgSort({
  title = "Sort",
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
      <g
        clipPath="url(#sort_svg__clip0)"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
      >
        <path d="M2.675.342a1.167 1.167 0 011.65 0l2.333 2.333a1.167 1.167 0 01-1.65 1.65l-.341-.342v7.684a1.167 1.167 0 01-2.334 0V3.983l-.341.342a1.167 1.167 0 01-1.65-1.65L2.675.342zM10.5 14c-.31 0-.606-.123-.825-.342l-2.333-2.333a1.167 1.167 0 011.65-1.65l.341.342V2.333a1.167 1.167 0 012.334 0v7.684l.341-.342a1.167 1.167 0 111.65 1.65l-2.333 2.333A1.167 1.167 0 0110.5 14z" />
      </g>
      <defs>
        <clipPath id="sort_svg__clip0">
          <path fill="#fff" d="M0 0h14v14H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default SvgSort;
