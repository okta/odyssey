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
  useRef,
} from "react";
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { AllowedProps } from "./AllowedProps";
import { getControlState, useInputValues } from "./inputUtils";
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
  | "errorMessage"
  | "errorMessagesList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "isFullWidth"
  | "isOptional"
> &
  AllowedProps;

const NativeSelect: ForwardRefWithType = forwardRef(
  <
    Value extends NativeSelectValueType<HasMultipleChoices>,
    HasMultipleChoices extends boolean
  >(
    {
      defaultValue,
      errorMessage,
      errorMessagesList,
      hasMultipleChoices: hasMultipleChoicesProp,
      hint,
      HintLinkComponent,
      id: idOverride,
      isDisabled = false,
      isFullWidth = false,
      isMultiSelect,
      isOptional = false,
      label,
      onBlur,
      onChange: onChangeProp,
      onFocus,
      testId,
      translate,
      value,
      children,
    }: NativeSelectProps<Value, HasMultipleChoices>,
    ref?: React.Ref<ReactElement>
  ) => {
    const controlledStateRef = useRef(
      getControlState({
        controlledValue: value,
        uncontrolledValue: defaultValue,
      })
    );
    const inputValues = useInputValues({
      defaultValue,
      value,
      controlState: controlledStateRef.current,
    });

    const onChange = useCallback<
      NonNullable<MuiSelectProps<Value>["onChange"]>
    >(
      (event, child) => {
        onChangeProp?.(event, child);
      },
      [onChangeProp]
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
          translate={translate}
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
        translate,
      ]
    );

    return (
      <Field
        errorMessage={errorMessage}
        errorMessagesList={errorMessagesList}
        fieldType="single"
        hasVisibleLabel
        hint={hint}
        HintLinkComponent={HintLinkComponent}
        id={idOverride}
        isDisabled={isDisabled}
        isFullWidth={isFullWidth}
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
