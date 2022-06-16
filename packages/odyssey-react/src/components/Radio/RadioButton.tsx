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
import DOMPurify from "dompurify";
import { withTheme } from "@okta/odyssey-react-theme";
import { useRadioGroup } from "./context";
import { Box } from "../Box";
import { useCx, useOid, useOmit } from "../../utils";
import type { CommonFieldProps } from "../Field/types";
import { theme } from "./RadioButton.theme";
import styles from "./RadioButton.module.scss";

export interface RadioButtonProps
  extends Pick<CommonFieldProps, "label" | "hint" | "error" | "required">,
    Omit<ComponentPropsWithRef<"input">, "style" | "className"> {
  /**
   * The underlying input element id attribute. Automatically generated if not provided
   */
  id?: string;

  /**
   * The underlying input element value attribute
   */
  value: string;
}

/**
 * Radios appear as a ring shaped UI accompanied by a caption that allows
 * the user to choose only one option at a time.
 */
export const RadioButton = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
    const { id, label, value, ...rest } = props;

    const {
      value: controlledValue,
      onChange,
      disabled,
      required,
      name,
      groupid,
      hint,
      error,
    } = useRadioGroup();

    const oid = useOid(id);

    const omitProps = useOmit(rest);

    const checked = value === controlledValue;

    const ariaDescribedBy = useCx(
      hint && `${groupid}-hint`,
      typeof error === "undefined" && `${groupid}-error`
    );

    return (
      <Box className={styles.root} position="relative">
        <input
          {...omitProps}
          aria-describedby={ariaDescribedBy}
          className={styles.radio}
          checked={checked}
          disabled={disabled}
          id={oid}
          onChange={onChange}
          name={name}
          ref={ref}
          required={required}
          type="radio"
          value={value}
        />
        <label
          children={
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(label) }}
            />
          }
          className={styles.label}
          htmlFor={oid}
        />
      </Box>
    );
  })
);

RadioButton.displayName = "RadioButton";
