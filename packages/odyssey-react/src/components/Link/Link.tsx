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

import React, { forwardRef } from "react";
import type { ComponentPropsWithRef, ReactText, ReactElement } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { ExternalLinkIcon } from "../Icon";
import { useCx, useOmit } from "../../utils";
import { Box } from "../Box";
import styles from "./Link.module.scss";
import { theme } from "./Link.theme";

export interface LinkProps
  extends Omit<
    ComponentPropsWithRef<"a">,
    "style" | "className" | "children" | "href" | "color"
  > {
  /**
   * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
   */
  href: string;

  /**
   * The visual variant to be displayed to the user.
   * @default default
   */
  variant?: "default" | "monochrome";

  /**
   * The human readable/perceivable value shown to the user
   */
  children: ReactText;

  /**
   * An icon component to be inserted into the Link.
   */
  icon?: ReactElement;
}

/**
 * Links are navigation elements displayed as text. Use a Link to bring a user to another page or start a download.
 */
export const Link = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const { children, variant = "default", icon, ...rest } = props;
    const classNames = useCx(styles.root, styles[`${variant}Variant`]);
    const omitProps = useOmit(rest);
    const external = rest.target === `_blank`;

    return (
      <Box
        as="a"
        color={false}
        fontStyle={false}
        {...omitProps}
        ref={ref}
        className={classNames}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
        {external && (
          <span className={styles.indicator} role="presentation">
            <ExternalLinkIcon />
          </span>
        )}
      </Box>
    );
  })
);

Link.displayName = "Link";
