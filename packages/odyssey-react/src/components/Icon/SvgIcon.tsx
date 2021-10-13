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

import {
  Children,
  cloneElement,
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
} from "react";
import type { ReactElement } from "react";
import { useOid, useOmit, useCx, withStyles } from "../../utils";

import styles from "./Icon.module.scss";

interface Props
  extends Omit<ComponentPropsWithoutRef<"svg">, "style" | "className"> {
  /**
   * Title text used by screen readers
   */
  title?: string;

  /**
   * Inset used for optical alignment of icon with text
   */
  insetBlockStart?: "initial" | "auto";

  children: ReactElement;
}

/**
 * A thin wrapper to augment icon svgs with proper attributes and accessibility features
 */

let SvgIcon = forwardRef<SVGSVGElement, Props>(
  ({ title, children, insetBlockStart, ...rest }, ref) => {
    const autoId = "icon_" + useOid();
    const omitProps = useOmit(rest);

    let insetBlockStartClass;
    if (insetBlockStart !== "auto") {
      insetBlockStartClass = styles.initialInsetBlockStart;
    }

    const componentClass = useCx(styles.root, insetBlockStartClass);

    return Children.only(
      cloneElement(
        children,
        {
          ...omitProps,
          "aria-labelledby": title && autoId,
          className: componentClass,
          ref: ref,
          role: title ? "img" : "presentation",
        },
        [
          title && (
            <title id={autoId} key={autoId}>
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

type SvgProps = ComponentProps<typeof SvgIcon>;
export type { SvgProps as Props };

export default withStyles(styles)(SvgIcon);
