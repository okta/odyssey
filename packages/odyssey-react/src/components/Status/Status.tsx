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
import type { ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useCx, useOmit } from "../../utils";
import { ScreenReaderText } from "../ScreenReaderText";
import { Box } from "../Box";
import styles from "./Status.module.scss";
import { theme } from "./Status.theme";

export interface StatusProps
  extends Omit<ComponentPropsWithRef<"div">, "style" | "className" | "role"> {
  /**
   * The status label.
   */
  label: string;

  /**
   * Visually hides the status label.
   * @default false
   */
  labelHidden?: boolean;

  /**
   * The description of the present state/status.
   */
  descriptor: string;

  /**
   * The visual variant to be displayed to the user.
   * @default neutral
   */
  variant?: "neutral" | "success" | "caution" | "danger";
}

/**
 * Status is used to inform users by providing feedback on system states. Status can display broad
 * operational states as well as granular states like user status.
 */
export const Status = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLDivElement, StatusProps>((props, ref) => {
    const {
      label,
      descriptor,
      labelHidden = false,
      variant = "neutral",
      ...rest
    } = props;

    const omitProps = useOmit(rest);
    const valueClass = useCx(styles.value, styles[`${variant}Variant`]);
    const labelElement = labelHidden ? (
      <ScreenReaderText children={label} />
    ) : (
      <span className={styles.label} children={label} />
    );

    return (
      <Box {...omitProps} className={styles.status} role="status" ref={ref}>
        {labelElement}
        <span className={valueClass}>{descriptor}</span>
      </Box>
    );
  })
);

Status.displayName = "Status";
