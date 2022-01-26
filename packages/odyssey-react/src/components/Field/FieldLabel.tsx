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
import type { PolymorphicForwardRef } from "../../utils";
import { withTheme } from "@okta/odyssey-react-theme";
import { ScreenReaderText } from "../ScreenReaderText";
import { useOmit } from "../../utils";
import { CommonFieldProps } from "./types";
import { Text } from "../Text";
import { Box } from "../Box";
import { theme } from "./FieldLabel.theme";
import styles from "./FieldLabel.module.scss";

interface FieldLabelProps
  extends Omit<ComponentPropsWithRef<"label">, "color" | "style" | "className">,
    Pick<CommonFieldProps, "labelHidden" | "required" | "optionalLabel"> {
  inputId: string;
  children: ReactNode;
  as?: "label" | "legend";
}

export const FieldLabel = withTheme(
  theme,
  styles
)(
  forwardRef((props, ref) => {
    const {
      as = "label",
      children,
      inputId,
      labelHidden,
      optionalLabel,
      required,
      ...rest
    } = props;

    const omitProps = useOmit(rest);

    const label = (
      <Box
        {...omitProps}
        as={as}
        ref={ref}
        className={styles.root}
        htmlFor={inputId}
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text fontWeight="bold">{children}</Text>
        {!required && optionalLabel && (
          <span className={styles.optionalLabel}>
            <Text
              color="sub"
              fontSize="caption"
              fontWeight="normal"
              lineHeight="normal"
            >
              {optionalLabel}
            </Text>
          </span>
        )}
      </Box>
    );

    const labelVisuallyHidden = (
      <ScreenReaderText>
        <Box {...omitProps} as={as} htmlFor={inputId}>
          {children}
          {!required && optionalLabel && <span children={optionalLabel} />}
        </Box>
      </ScreenReaderText>
    );

    return labelHidden ? labelVisuallyHidden : label;
  })
) as PolymorphicForwardRef<"label", FieldLabelProps>;

FieldLabel.displayName = "FieldLabel";
