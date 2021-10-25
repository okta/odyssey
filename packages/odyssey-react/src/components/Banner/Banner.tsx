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

import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { useCx, useOmit, withStyles } from "../../utils";
import { Heading } from "../Heading";
import { Button } from "../Button";
import type { ButtonProps } from "../Button";
import { CautionIcon, CloseIcon, ErrorIcon, GetInfoIcon } from "../Icon";
import styles from "./Banner.module.scss";

interface CommonProps
  extends Omit<ComponentPropsWithRef<"div">, "style" | "className" | "role"> {
  /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  variant?: "info" | "danger" | "caution";

  /**
   * Human-readable title for the banner.
   */
  title: string;

  /**
   * Human-readable descriptive content for the banner.
   */
  content: string;

  /**
   * Determines whether the banner should be displayed to the user.
   */
  open?: boolean;
}

type DismissProps =
  | { onDismiss?: never; dismissButtonLabel?: never }
  | {
      onDismiss: ButtonProps["onClick"];
      dismissButtonLabel: string;
    };

export type BannerProps = CommonProps & DismissProps;

const icon = {
  caution: <CautionIcon />,
  danger: <ErrorIcon />,
  info: <GetInfoIcon />,
};

/**
 * Banners let users know important messages related to their overall experience
 * on the website. They can be purely informational messages or critical errors
 * to act upon.
 */
let Banner = forwardRef<HTMLDivElement, BannerProps>((props, ref) => {
  const {
    children,
    title,
    content,
    open,
    variant = "info",
    onDismiss,
    dismissButtonLabel,
    ...rest
  } = props;

  const componentClass = useCx(
    styles.root,
    styles[`${variant}Variant`],
    !open && styles.isDismissed,
    onDismiss && styles.isDismissable
  );

  const omitProps = useOmit(rest);

  return (
    <div {...omitProps} ref={ref} className={componentClass} role="status">
      <span className={styles.icon}>{icon[variant]}</span>
      {title && (
        <div className={styles.title}>
          <Heading
            visualLevel="6"
            lineHeight="title"
            noEndMargin
            children={title}
          />
        </div>
      )}
      {content && <p className={styles.content}>{content}</p>}
      {children && <section className={styles.actions}>{children}</section>}
      {onDismiss && (
        <span className={styles.dismiss}>
          <Button
            variant="dismiss"
            onClick={onDismiss}
            aria-label={dismissButtonLabel}
            icon={<CloseIcon />}
          />
        </span>
      )}
    </div>
  );
});

Banner.displayName = "Banner";

Banner = withStyles(styles)(Banner);

export { Banner };
