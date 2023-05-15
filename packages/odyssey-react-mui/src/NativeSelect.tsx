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

export type NativeSelectOption = {
  text: string;
  value?: string;
  type?: "heading" | "option";
};

export type NativeSelectProps = {
  children?: ReactElement<"option"> | ReactElement<"optgroup">;
  defaultValue?: string;
  errorMessage?: string;
  hint?: string;
  id?: string;
  isDisabled?: boolean;
  isMultiSelect?: boolean;
  isOptional?: boolean;
  label: string;
  onBlur?: MuiSelectProps["onBlur"];
  onChange?: MuiSelectProps["onChange"];
  onFocus?: MuiSelectProps["onFocus"];
  optionalLabel?: string;
  value?: string | string[];
};

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
      optionalLabel = "Optional",
      value,
      children,
    },
    ref
  ) => {
    const renderFieldComponent = useCallback(
      () => (
        <MuiSelect
          defaultValue={defaultValue}
          id={idOverride}
          name={idOverride}
          multiple={isMultiSelect}
          native={true}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
          value={value}
          children={children}
        />
      ),
      [
        defaultValue,
        idOverride,
        isMultiSelect,
        onBlur,
        onChange,
        onFocus,
        ref,
        children,
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
        optionalLabel={optionalLabel}
        renderFieldComponent={renderFieldComponent}
      />
    );
  }
);

const MemoizedNativeSelect = memo(NativeSelect);
MemoizedNativeSelect.displayName = "NativeSelect";

export { MemoizedNativeSelect as NativeSelect };
