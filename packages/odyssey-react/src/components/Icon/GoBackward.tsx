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

function SvgGoBackward({
  title = "Go Backward",
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
      className={styles.icon}
      style={sizeAndColor}
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <path
        d="M4.51059 6.00121L6.92796 3.72595C7.34572 3.33275 7.34132 2.67278 6.92356 2.27958C6.52128 1.90095 5.87952 1.90683 5.4895 2.29763L1.14535 6.65043C0.95155 6.84461 0.95155 7.15539 1.14535 7.34957L5.4895 11.7024C5.87952 12.0932 6.52128 12.099 6.92356 11.7204C7.34132 11.3272 7.34572 10.6672 6.92796 10.274L4.51059 7.99879H12.4915C12.7723 7.99879 13 7.7752 13 7.49939V6.50061C13 6.2248 12.7723 6.00121 12.4915 6.00121H4.51059Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgGoBackward;
