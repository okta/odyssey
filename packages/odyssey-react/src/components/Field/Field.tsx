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

import React from "react";
import type {
  FunctionComponent,
  ReactElement,
  ReactNode,
  ReactText,
} from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { ScreenReaderText } from "../ScreenReaderText";
import { CommonFieldProps } from "./types";
import { Text } from "../Text";
import { Box } from "../Box";
import { useCx } from "../../utils";
import styles from "./Field.module.scss";
import { theme } from "./Field.theme";
import { FieldError } from "./FieldError";

export type FieldProps = CommonFieldProps & {
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

interface LabelProps
  extends Pick<CommonFieldProps, "labelHidden" | "required" | "optionalLabel"> {
  inputId: string;
  children: ReactNode;
  as?: "label" | "legend";
}

interface HintProps {
  id: string;
  children: ReactText;
}
interface Statics {
  Label: typeof Label;
  Hint: typeof Hint;
  Error: typeof FieldError;
}

export const Field: FunctionComponent<FieldProps> & Statics = withTheme(
  theme,
  styles
)(
  Object.assign(
    (props: FieldProps) => {
      const {
        error,
        hint,
        inputId,
        label,
        optionalLabel,
        required = false,
        children,
        labelHidden,
        as = "div",
      } = props;

      const TagLabel = as === "fieldset" ? "legend" : "label";
      const componentClass = useCx(
        styles.root,
        as === "fieldset" && styles.fieldset
      );

      return (
        <Box
          as={as}
          className={componentClass}
          display="flex"
          flexDirection="column"
        >
          <Field.Label
            inputId={inputId}
            required={required}
            optionalLabel={optionalLabel}
            labelHidden={labelHidden}
            as={TagLabel}
          >
            {label}
          </Field.Label>
          {hint && <Field.Hint id={inputId}>{hint}</Field.Hint>}
          {children}
          {error && <Field.Error id={inputId}>{error}</Field.Error>}
        </Box>
      );
    },
    {
      Label,
      Error: FieldError,
      Hint,
    }
  )
);

function Label(props: LabelProps) {
  const {
    inputId,
    optionalLabel,
    required,
    children,
    labelHidden,
    as = "label",
  } = props;

  const label = (
    <Box
      as={as}
      className={styles.label}
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
      <Box as={as} htmlFor={inputId}>
        {children}
        {!required && optionalLabel && <span children={optionalLabel} />}
      </Box>
    </ScreenReaderText>
  );

  return labelHidden ? labelVisuallyHidden : label;
}

function Hint({ id, children }: HintProps) {
  return (
    <Box as="p" className={styles.hint} id={`${id}-hint`}>
      <Text color="body" fontSize="caption">
        {children}
      </Text>
    </Box>
  );
}

Field.displayName = "Field";
Label.displayName = "FieldLabel";
Hint.displayName = "FieldHint";
