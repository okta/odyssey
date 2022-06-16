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
import type { ComponentPropsWithRef, ReactElement } from "react";
import DOMPurify from "dompurify";
import type { PolymorphicForwardRef } from "../../utils";
import { withTheme } from "@okta/odyssey-react-theme";
import { CommonFieldProps } from "./types";
import { useCx, useOmit } from "../../utils";
import { Box } from "../Box";
import { FieldError } from "./FieldError";
import { FieldHint } from "./FieldHint";
import { FieldLabel } from "./FieldLabel";
import { theme } from "./Field.theme";
import styles from "./Field.module.scss";

export type FieldProps = CommonFieldProps &
  Omit<ComponentPropsWithRef<"div">, "color" | "style" | "className"> & {
    /**
     * Input to be rendered within the Field
     */
    children: ReactElement | ReactElement[];

    /**
     * The underlying input element id attribute.
     */
    inputId: string;

    /**
     * The underlying parent semantic HTML element.
     * @default div
     */
    as?: "div" | "fieldset";
  };

interface Statics {
  Error: typeof FieldError;
  Hint: typeof FieldHint;
  Label: typeof FieldLabel;
}

export const Field = withTheme(
  theme,
  styles
)(
  forwardRef((props, ref) => {
    const {
      as = "div",
      children,
      error,
      hint,
      inputId,
      label,
      labelHidden,
      optionalLabel,
      required = false,
      ...rest
    } = props;

    const isFieldset = as === "fieldset";
    const classNames = useCx(styles.root, isFieldset && styles.fieldset);
    const omitProps = useOmit(rest);

    return (
      <Box
        {...omitProps}
        ref={ref}
        as={as}
        className={classNames}
        display="flex"
        flexDirection="column"
      >
        <FieldLabel
          inputId={inputId}
          required={required}
          optionalLabel={optionalLabel}
          labelHidden={labelHidden}
          as={isFieldset ? "legend" : "label"}
        >
          {label}
        </FieldLabel>
        {hint && (
          <FieldHint id={inputId}>
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(hint) }}
            />
          </FieldHint>
        )}
        {children}
        {error && <FieldError id={inputId}>{error}</FieldError>}
      </Box>
    );
  })
) as unknown as Statics & PolymorphicForwardRef<"div", FieldProps>;

Field.displayName = "Field";

Field.Label = FieldLabel;
Field.Error = FieldError;
Field.Hint = FieldHint;
