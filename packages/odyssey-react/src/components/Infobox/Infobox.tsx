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
import type { ComponentPropsWithRef, ReactNode } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useCx, useOmit } from "../../utils";
import { Box } from "../Box";
import { Heading } from "../Heading";
import { Text } from "../Text";
import {
  AlertCircleFilledIcon,
  AlertTriangleFilledIcon,
  CheckCircleFilledIcon,
  InformationCircleFilledIcon,
} from "../Icon";
import styles from "./Infobox.module.scss";
import { theme } from "./Infobox.theme";

interface CommonProps
  extends Omit<
    ComponentPropsWithRef<"aside">,
    "style" | "className" | "children" | "content" | "color"
  > {
  /**
   * Children are never rendered.
   */
  children?: never;
  /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  variant?: "info" | "danger" | "caution" | "success";

  /**
   * The heading or headline of the Infobox. If Infobox.Content is not present it is required.
   */
  heading?: string;

  /**
   * Content to be rendered within the infobox.
   */
  content?: ReactNode;

  /**
   * Actions to be rendered within the infobox.
   */
  actions?: ReactNode;
}

interface HeadingProps extends CommonProps {
  heading: string;
}

interface ContentProps extends CommonProps {
  content: ReactNode;
}

export type InfoboxProps = HeadingProps | ContentProps;

const icon = {
  caution: <AlertTriangleFilledIcon />,
  danger: <AlertCircleFilledIcon />,
  info: <InformationCircleFilledIcon />,
  success: <CheckCircleFilledIcon />,
};

/**
 * An infobox is a type of alert that provides feedback in response to a
 * user action or system activity.
 */
export const Infobox = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLElement, InfoboxProps>((props, ref) => {
    const { content, actions, heading, variant = "info", ...rest } = props;

    const classNames = useCx(styles.root, styles[`${variant}Variant`]);
    const omitProps = useOmit(rest);

    return (
      <Box
        as="aside"
        {...omitProps}
        ref={ref}
        className={classNames}
        role="status"
      >
        <span className={styles.icon}>{icon[variant]}</span>

        <section className={styles.content}>
          {heading && <Heading visualLevel="6" children={heading} />}
          {content && <Text>{content}</Text>}
        </section>

        {actions && (
          <section className={styles.actions}>
            <Text>{actions}</Text>
          </section>
        )}
      </Box>
    );
  })
);

Infobox.displayName = "Infobox";
