/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { ReactElement, forwardRef, memo, useCallback } from "react";
import { Select as MuiSelect } from "@mui/material";
import { SelectProps as MuiSelectProps } from "@mui/material";
import { Field } from "./Field";

import type { SeleniumProps } from "./SeleniumProps";

export type NativeSelectOption = {
  text: string;
  value?: string;
  type?: "heading" | "option";
};

export type NativeSelectProps = {
  /**
   * The options or optgroup elements within the NativeSelect
   */
  children?: ReactElement<"option"> | ReactElement<"optgroup">;
  /**
   * The default value of the NativeSelect. Only applicable if `value` is not provided
   */
  defaultValue?: string;
  /**
   * The error message for the NativeSelect
   */
  errorMessage?: string;
  /**
   * The hint text for the NativeSelect
   */
  hint?: string;
  /**
   * The id attribute of the NativeSelect
   */
  id?: string;
  /**
   * If `true`, the NativeSelect is disabled
   */
  isDisabled?: boolean;
  /**
   * If `true`, the NativeSelect allows multiple selections
   */
  isMultiSelect?: boolean;
  /**
   * If `true`, the NativeSelect is optional
   */
  isOptional?: boolean;
  /**
   * The label text for the NativeSelect
   */
  label: string;
  /**
   * Callback fired when the NativeSelect loses focus
   */
  onBlur?: MuiSelectProps["onBlur"];
  /**
   * Callback fired when the value of the NativeSelect changes
   */
  onChange?: MuiSelectProps["onChange"];
  /**
   * Callback fired when the NativeSelect gains focus
   */
  onFocus?: MuiSelectProps["onFocus"];
  /**
   * The value or values selected in the NativeSelect
   */
  value?: string | string[];
} & SeleniumProps;

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    {
      defaultValue,
      errorMessage,
      hint,
      id: idOverride,
      isDisabled = false,
      isMultiSelect = false,
      isOptional = false,
      label,
      onBlur,
      onChange,
      onFocus,
      testId,
      value,
      children,
    },
    ref
  ) => {
    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, errorMessageId, labelId }) => (
        <MuiSelect
          aria-describedby={ariaDescribedBy}
          children={children}
          data-se={testId}
          defaultValue={defaultValue}
          id={idOverride}
          inputProps={{
            "aria-errormessage": errorMessageId,
            "aria-labelledby": labelId,
          }}
          name={idOverride}
          multiple={isMultiSelect}
          native={true}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
          value={value}
        />
      ),
      [
        children,
        defaultValue,
        idOverride,
        isMultiSelect,
        onBlur,
        onChange,
        onFocus,
        ref,
        testId,
        value,
      ]
    );

    return (
      <Field
        errorMessage={errorMessage}
        fieldType="single"
        hasVisibleLabel
        hint={hint}
        id={idOverride}
        isDisabled={isDisabled}
        isOptional={isOptional}
        label={label}
        renderFieldComponent={renderFieldComponent}
      />
    );
  }
);

const MemoizedNativeSelect = memo(NativeSelect);
MemoizedNativeSelect.displayName = "NativeSelect";

export { MemoizedNativeSelect as NativeSelect };
