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
  ComponentProps,
  ReactElement,
  ReactNode,
  ReactText,
} from "react";
import { ScreenReaderText } from "../ScreenReaderText";
import { withStyles } from "../../utils";
import { SharedFieldTypes } from "./types";
import { Text } from "../Text";

import styles from "./Field.module.scss";

interface Props extends SharedFieldTypes {
  /**
   * Input to be rendered within the Field
   */
  children: ReactElement | ReactElement[];

  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  inputId: string;

  /**
   * The underlying parent semantic HTML element.
   * @default div
   */
  as?: "div" | "fieldset";
}

interface PropsLabel {
  inputId: string;
  optionalLabel?: string;
  required: boolean;
  labelHidden?: boolean;
  children: ReactNode;
  as?: "label" | "legend";
}
interface PropsHint {
  id: string;
  children: ReactText;
}
interface PropsError {
  id: string;
  children: ReactNode;
}

interface Statics {
  Label: typeof Label;
  Hint: typeof Hint;
  Error: typeof Error;
}

let Field: FunctionComponent<Props> & Statics = Object.assign(
  (props: Props) => {
    const {
      error,
      hint,
      inputId,
      label,
      optionalLabel,
      required = true,
      children,
      labelHidden,
      as = "div",
    } = props;

    const Tag = as;
    const TagLabel = as === "fieldset" ? "legend" : "label";

    return (
      <Tag className={styles.root}>
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
      </Tag>
    );
  },
  {
    Label,
    Error,
    Hint,
  }
);

function Label(props: PropsLabel) {
  const {
    inputId,
    optionalLabel = "Optional",
    required,
    children,
    labelHidden,
    as = "label",
  } = props;

  const Tag = as;

  const label = (
    <Tag className={styles.label} htmlFor={inputId}>
      <Text color="heading" weight="bold">
        {children}
      </Text>
      {!required && optionalLabel && (
        <span className={styles.optionalLabel}>
          <Text color="sub" size="caption" weight="regular" lineHeight="normal">
            {optionalLabel}
          </Text>
        </span>
      )}
    </Tag>
  );

  const labelVisuallyHidden = (
    <ScreenReaderText>
      <Tag htmlFor={inputId}>
        {children}
        {!required && optionalLabel && <span children={optionalLabel} />}
      </Tag>
    </ScreenReaderText>
  );

  return labelHidden ? labelVisuallyHidden : label;
}

function Hint({ id, children }: PropsHint) {
  return (
    <p className={styles.hint} id={`${id}-hint`}>
      <Text color="body" size="caption">
        {children}
      </Text>
    </p>
  );
}

function Error({ id, children }: PropsError) {
  return (
    <p className={styles.error} id={`${id}-error`}>
      <Text color="danger" size="caption">
        {children}
      </Text>
    </p>
  );
}

Field.displayName = "Field";
Label.displayName = "FieldLabel";
Hint.displayName = "FieldHint";
Error.displayName = "FieldError";

Field = withStyles(styles)(Field);

export type FieldProps = ComponentProps<typeof Field>;
export { Field };
