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

import React, { useCallback, useRef, useEffect, forwardRef } from "react";
import type { ComponentPropsWithRef, ChangeEvent } from "react";
import DOMPurify from "dompurify";
import { withTheme } from "@okta/odyssey-react-theme";
import { Box } from "../Box";
import { CheckIcon, SubtractIcon } from "../Icon";
import { useCx, useOid, useOmit } from "../../utils";
import { Field } from "../Field";
import type { CommonFieldProps } from "../Field/types";
import { theme } from "./Checkbox.theme";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps
  extends Omit<
    ComponentPropsWithRef<"input">,
    "onChange" | "style" | "className" | "type" | "children"
  > {
  /**
   * Children are never rendered.
   */
  children?: never;
  /**
   * The form field label
   */
  label: string;

  /**
   * The input element indeterminate state for controlled components
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Callback executed when the input fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the input
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;

  error?: CommonFieldProps["error"];
}

/**
 * A clickable Checkbox used for form submissions and most in-page interactions.
 */
export const Checkbox = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const {
      id,
      label,
      onChange,
      required,
      indeterminate = false,
      error,
      ...rest
    } = props;

    const oid = useOid(id);
    const omitProps = useOmit(rest);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event, event.target.value);
      },
      [onChange]
    );

    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (!ref) return;
      typeof ref === "function"
        ? ref(internalRef.current)
        : (ref.current = internalRef.current);
    }, [ref, internalRef]);

    useEffect(() => {
      if (!internalRef.current) return;
      internalRef.current.indeterminate = indeterminate;
    }, [indeterminate, internalRef]);

    const ariaDescribedBy = useCx(!!error && `${oid}-error`);
    const ariaProps = error ? { "aria-describedby": ariaDescribedBy } : {};

    return (
      <Box position="relative">
        <input
          {...omitProps}
          {...ariaProps}
          className={styles.checkbox}
          id={oid}
          onChange={handleChange}
          ref={internalRef}
          required={required}
          type="checkbox"
        />
        <label className={styles.label} htmlFor={oid}>
          <span className={styles.box} role="presentation">
            <span className={styles.indicator}>
              {indeterminate ? <SubtractIcon /> : <CheckIcon />}
            </span>
          </span>
          <span
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label) }}
          />
        </label>
        {error && <Field.Error id={oid}>{error}</Field.Error>}
      </Box>
    );
  })
);

Checkbox.displayName = "Checkbox";
