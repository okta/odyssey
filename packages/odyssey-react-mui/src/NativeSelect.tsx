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
  InputHTMLAttributes,
  ReactElement,
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { Field } from "./Field";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";
import { FocusHandle, getControlState, useInputValues } from "./inputUtils";

export type NativeSelectOption = {
  text: string;
  value?: string;
  type?: "heading" | "option";
};

export type NativeSelectValueType<HasMultipleChoices> =
  HasMultipleChoices extends true ? string[] : string;

export type NativeSelectProps<
  Value extends NativeSelectValueType<HasMultipleChoices>,
  HasMultipleChoices extends boolean,
> = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
   */
  autoCompleteType?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
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
   * The ref forwarded to the NativeSelect
   */
  inputRef?: React.RefObject<FocusHandle>;
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
  | "errorMessageList"
  | "hasVisibleLabel"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "isFullWidth"
  | "isOptional"
> &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

type NativeSelectRenderProps = Partial<
  Pick<FieldComponentRenderProps, "ariaDescribedBy" | "errorMessageElementId">
> &
  Pick<FieldComponentRenderProps, "labelElementId">;

const NativeSelect = forwardRef(
  <
    Value extends NativeSelectValueType<HasMultipleChoices>,
    HasMultipleChoices extends boolean,
  >(
    {
      ariaDescribedBy,
      autoCompleteType,
      defaultValue,
      errorMessage,
      errorMessageList,
      hasMultipleChoices: hasMultipleChoicesProp,
      hasVisibleLabel = true,
      hint,
      HintLinkComponent,
      id: idOverride,
      inputRef,
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
    ref?: React.Ref<ReactElement>,
  ) => {
    const controlledStateRef = useRef(
      getControlState({
        controlledValue: value,
        uncontrolledValue: defaultValue,
      }),
    );
    const localInputRef = useRef<HTMLSelectElement>(null);

    useImperativeHandle(
      inputRef,
      () => {
        return {
          focus: () => {
            localInputRef.current?.focus();
          },
        };
      },
      [],
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
      [onChangeProp],
    );

    const hasMultipleChoices = useMemo(
      () =>
        hasMultipleChoicesProp === undefined
          ? isMultiSelect
          : hasMultipleChoicesProp,
      [hasMultipleChoicesProp, isMultiSelect],
    );
    const renderFieldComponent = useCallback(
      ({
        ariaDescribedBy,
        errorMessageElementId,
        labelElementId,
      }: NativeSelectRenderProps) => (
        <MuiSelect
          {...inputValues}
          aria-describedby={ariaDescribedBy}
          autoComplete={autoCompleteType}
          children={children}
          id={idOverride}
          inputProps={{
            "aria-errormessage": errorMessageElementId,
            "aria-labelledby": labelElementId,
            "data-se": testId,
          }}
          inputRef={localInputRef}
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
        autoCompleteType,
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
      ],
    );

    return (
      <Field
        ariaDescribedBy={ariaDescribedBy}
        errorMessage={errorMessage}
        errorMessageList={errorMessageList}
        fieldType="single"
        hasVisibleLabel={hasVisibleLabel}
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
  },
);

const MemoizedNativeSelect = memo(NativeSelect);
MemoizedNativeSelect.displayName = "NativeSelect";

export { MemoizedNativeSelect as NativeSelect };
