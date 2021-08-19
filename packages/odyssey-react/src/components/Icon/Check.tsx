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

function SvgCheck({
  title = "Check",
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
        d="M0 6.533l1.867-1.866L5.6 8.517l6.533-6.65L14 3.617 5.6 12.25 0 6.533z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgCheck;
