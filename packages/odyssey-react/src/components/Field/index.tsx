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

import type { FunctionComponent, ReactElement, ReactText } from "react";
import ScreenReaderText from "../ScreenReaderText";

import styles from "./Field.module.scss";

export interface SharedFieldTypes {
  /**
   * the form field label
   */
  label: string;

  /**
   * Text to display when the field is optional, i.e. required prop is false
   */
  optionalLabel?: string;

  /**
   * Prefix to be read by SRs before announcing an error.
   */
  errorPrefix?: string;

  /**
   * the form field error
   */
  error?: string;

  /**
   * the form field hint
   */
  hint?: string;

  /**
   * The underlying input element required attribute
   * @default true
   */
  required?: boolean;
}

export interface Props extends SharedFieldTypes {
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
  children: ReactText;
  as?: "label" | "legend";
}
interface PropsHint {
  id: string;
  children: ReactText;
}
interface PropsError {
  id: string;
  children: ReactText;
  errorPrefix?: string;
}

export type StaticComponents = {
  Label: typeof Label;
  Hint: typeof Hint;
  Error: typeof Error;
};

const Field: FunctionComponent<Props> & StaticComponents = (props) => {
  const {
    error,
    hint,
    inputId,
    label,
    optionalLabel,
    errorPrefix,
    required = true,
    children,
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
        as={TagLabel}
      >
        {label}
      </Field.Label>
      {hint && <Field.Hint id={inputId}>{hint}</Field.Hint>}
      {children}
      {error && (
        <Field.Error id={inputId} errorPrefix={errorPrefix}>
          {error}
        </Field.Error>
      )}
    </Tag>
  );
};

const Label = (props: PropsLabel) => {
  const {
    inputId,
    optionalLabel = "Optional",
    required,
    children,
    as = "label",
  } = props;

  const Tag = as;

  return (
    <Tag
      // We'll also need the ability to hide or reposition this label for UI like Search
      className={styles.label}
      htmlFor={inputId}
    >
      {children}
      {!required && optionalLabel && (
        <span className={styles.optionalLabel} children={optionalLabel} />
      )}
    </Tag>
  );
};

const Hint = ({ id, children }: PropsHint) => (
  <p className={styles.hint} id={`${id}-hint`} children={children} />
);

const Error = ({ id, children, errorPrefix = "Error:" }: PropsError) => (
  <p className={styles.error} id={`${id}-error`}>
    <ScreenReaderText>{errorPrefix}</ScreenReaderText>
    {children}
  </p>
);

Field.Label = Label;
Field.Hint = Hint;
Field.Error = Error;

export default Field;
