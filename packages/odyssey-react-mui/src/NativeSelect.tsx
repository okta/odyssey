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

import React, {
  ReactElement,
  forwardRef,
  memo,
  useCallback,
  useMemo,
} from "react";
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { SeleniumProps } from "./SeleniumProps";
import { useControlledState } from "./useControlledState";
import { ForwardRefWithType } from "./@types/react-augment";

export type NativeSelectOption = {
  text: string;
  value?: string;
  type?: "heading" | "option";
};

export type NativeSelectValueType<HasMultipleChoices> =
  HasMultipleChoices extends true ? string[] : string;

export type NativeSelectProps<
  Value extends NativeSelectValueType<HasMultipleChoices>,
  HasMultipleChoices extends boolean
> = {
  /**
   * The options or optgroup elements within the NativeSelect
   */
  children?: ReactElement<"option"> | ReactElement<"optgroup">;
  /**
   * The default value of the NativeSelect. Use when component is uncontrolled
   */
  defaultValue?: Value;
  /**
   * If `true`, the Select allows multiple selections
   */
  hasMultipleChoices?: HasMultipleChoices;
  /**
   * @deprecated Use `hasMultipleChoices` instead
   */
  /** **Deprecated:** use `hasMultipleChoices` */
  isMultiSelect?: HasMultipleChoices;
  /**
   * The label text for the NativeSelect
   */
  label: string;
  /**
   * Callback fired when the NativeSelect loses focus
   */
  onBlur?: MuiSelectProps<Value>["onBlur"];
  /**
   * Callback fired when the value of the NativeSelect changes
   */
  onChange?: MuiSelectProps<Value>["onChange"];
  /**
   * Callback fired when the NativeSelect gains focus
   */
  onFocus?: MuiSelectProps<Value>["onFocus"];
  options: Value;
  /**
   * The value or values selected in the NativeSelect. Use when component is controlled
   */
  value?: Value;
} & Pick<
  FieldComponentProps,
  "errorMessage" | "hint" | "id" | "isDisabled" | "isOptional"
> &
  SeleniumProps;

const NativeSelect: ForwardRefWithType = forwardRef(
  <
    Value extends NativeSelectValueType<HasMultipleChoices>,
    HasMultipleChoices extends boolean
  >(
    {
      defaultValue,
      errorMessage,
      hasMultipleChoices: hasMultipleChoicesProp,
      hint,
      id: idOverride,
      isDisabled = false,
      isMultiSelect,
      isOptional = false,
      label,
      onBlur,
      onChange: onChangeProp,
      onFocus,
      testId,
      value: valueProp,
      children,
    }: NativeSelectProps<Value, HasMultipleChoices>,
    ref?: React.Ref<ReactElement>
  ) => {
    const [localValue, setLocalValue] = useControlledState({
      controlledValue: valueProp,
      uncontrolledValue: defaultValue,
    });

    const inputValues = useMemo(() => {
      if (localValue === undefined) {
        return { defaultValue };
      }
      return { value: localValue };
    }, [defaultValue, localValue]);

    const onChange = useCallback<
      NonNullable<MuiSelectProps<Value>["onChange"]>
    >(
      (event, child) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        const { options } = event.target as HTMLSelectElement;
        const selectedOptions = [...options]
          .filter((option) => option.selected)
          .map((selectedOption) => selectedOption.value);
        setLocalValue(selectedOptions as Value);
        onChangeProp?.(event, child);
      },
      [onChangeProp, setLocalValue]
    );

    const hasMultipleChoices = useMemo(
      () =>
        hasMultipleChoicesProp === undefined
          ? isMultiSelect
          : hasMultipleChoicesProp,
      [hasMultipleChoicesProp, isMultiSelect]
    );
    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, errorMessageElementId, labelElementId }) => (
        <MuiSelect
          {...inputValues}
          aria-describedby={ariaDescribedBy}
          children={children}
          data-se={testId}
          id={idOverride}
          inputProps={{
            "aria-errormessage": errorMessageElementId,
            "aria-labelledby": labelElementId,
          }}
          name={idOverride}
          multiple={hasMultipleChoices}
          native={true}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          ref={ref}
        />
      ),
      [
        children,
        idOverride,
        inputValues,
        hasMultipleChoices,
        onBlur,
        onChange,
        onFocus,
        ref,
        testId,
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
