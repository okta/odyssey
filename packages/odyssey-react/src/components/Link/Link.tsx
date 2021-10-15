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

import type {
  ComponentPropsWithoutRef,
  ComponentProps,
  ReactText,
  ReactElement,
} from "react";
import { forwardRef } from "react";
import { ExternalIcon } from "../Icon";
import { useCx, useOmit, withStyles } from "../../utils";
import styles from "./Link.module.scss";

interface Props
  extends Omit<
    ComponentPropsWithoutRef<"a">,
    "style" | "className" | "children" | "href"
  > {
  /**
   * The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers.
   */
  href: string;

  /**
   * The visual variant to be displayed to the user.
   * @default primary
   */
  variant?: "primary" | "secondary";

  /**
   * The human readable/percievable value shown to the user
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
let Link = forwardRef<HTMLAnchorElement, Props>((props, ref) => {
  const { children, variant = "primary", icon, ...rest } = props;
  const classNames = useCx(styles.root, styles[`${variant}Variant`]);
  const omitProps = useOmit(rest);
  const external = rest.target === `_blank`;

  return (
    <a {...omitProps} ref={ref} className={classNames}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
      {external && (
        <span className={styles.indicator} role="presentation">
          <ExternalIcon />
        </span>
      )}
    </a>
  );
});

Link.displayName = "Link";

Link = withStyles(styles)(Link);

type LinkProps = ComponentProps<typeof Link>;
export type { LinkProps as Props };

export default Link;
