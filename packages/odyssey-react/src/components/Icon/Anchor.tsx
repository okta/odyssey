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

function SvgAnchor({
  title = "Anchor",
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
        d="M8.32 5.678a2.8 2.8 0 00-3.958 0L1.818 8.223a2.8 2.8 0 003.957 3.961l2.1-2.1a.2.2 0 00-.142-.341h-.08a3.365 3.365 0 01-1.28-.249.2.2 0 00-.218.045l-1.51 1.511a1.2 1.2 0 11-1.697-1.697l2.553-2.551a1.2 1.2 0 011.696 0 .819.819 0 001.123 0 .8.8 0 00.232-.508.8.8 0 00-.232-.616z"
        fill="currentColor"
      />
      <path
        d="M12.178 1.82a2.8 2.8 0 00-3.959 0L6.122 3.915a.2.2 0 00.145.343h.074c.438-.001.872.084 1.278.25a.2.2 0 00.218-.044L9.343 2.96a1.2 1.2 0 111.697 1.697L9.165 6.531l-.016.018-.656.652a1.2 1.2 0 01-1.696 0 .82.82 0 00-1.123 0 .8.8 0 000 1.128c.23.232.501.422.799.56.042.02.084.036.126.054.042.018.086.032.129.048.041.016.085.03.127.042l.118.031c.08.02.16.037.242.05.099.015.199.024.298.029h.151l.121-.014c.044-.002.09-.012.142-.012h.068l.138-.02.064-.012.116-.024h.022a2.8 2.8 0 001.298-.736l2.545-2.546a2.8 2.8 0 000-3.959z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgAnchor;
