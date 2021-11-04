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

import React, { Children, cloneElement, forwardRef } from "react";
import type { ReactElement, ComponentPropsWithRef } from "react";
import { useOid, useOmit, withStyles } from "../../utils";
import styles from "./SvgIcon.module.scss";

export interface SvgIconProps
  extends Omit<
    ComponentPropsWithRef<"svg">,
    "style" | "className" | "aria-labelledby" | "role"
  > {
  /**
   * Title text used by screen readers
   */
  title?: string;

  /**
   * A single SVG icon element
   */
  children: ReactElement;
}

/**
 * A thin wrapper to augment icon svgs with proper attributes and accessibility features
 */

let SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  ({ title, children, ...rest }, ref) => {
    const oid = useOid();
    const omitProps = useOmit(rest);

    return Children.only(
      cloneElement(
        children,
        {
          ...omitProps,
          "aria-labelledby": oid,
          className: styles.root,
          ref: ref,
          role: title ? "img" : "presentation",
        },
        [
          title && (
            <title id={oid} key={oid}>
              {title}
            </title>
          ),
          children.props.children,
        ]
      )
    );
  }
);

SvgIcon.displayName = "SvgIcon";

SvgIcon = withStyles(styles)(SvgIcon);

export { SvgIcon };
