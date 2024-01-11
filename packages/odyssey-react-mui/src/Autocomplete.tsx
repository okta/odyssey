/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  InputBase,
  UseAutocompleteProps,
  AutocompleteValue,
} from "@mui/material";
import { memo, useCallback, useMemo, useRef } from "react";

import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { AllowedProps } from "./AllowedProps";
import {
  ComponentControlledState,
  useInputValues,
  getControlState,
} from "./inputUtils";

export type AutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
> = {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["defaultValue"];
  /**
   * Enables multiple choice selection
   */
  hasMultipleChoices?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["multiple"];
  /**
   * The value for the input
   */
  inputValue?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["inputValue"];
  /**
   * Allows the input of custom values
   */
  isCustomValueAllowed?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["freeSolo"];
  /**
   * Disables the Autocomplete input
   */
  isDisabled?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["disabled"];
  /**
   * Displays a loading indicator
   */
  isLoading?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["loading"];
  /**
   * Makes the Autocomplete input read-only
   */
  isReadOnly?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["readOnly"];
  /**
   * The label text for the autocomplete input
   */
  label: string;
  /**
   * Callback fired when the autocomplete loses focus.
   */
  onBlur?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onBlur"];
  /**
   * Callback fired when a selection is made.
   */
  onChange?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onChange"];
  /**
   * Callback fired when the textbox receives typed characters.
   */
  onInputChange?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onInputChange"];
  /**
   * Callback fired when the autocomplete gains focus.
   */
  onFocus?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onFocus"];
  /**
   * The options for the Autocomplete input
   */
  options: ReadonlyArray<OptionType>;
  /**
   * The value of the Autocomplete input
   */
  value?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["value"];

  /**
   * Used to determine if the option represents the given value. Uses strict equality by default if none provided.
   * Both arguments need to be handled, an option can only match with one value.
   * option: the option to test
   * value: the value to test against
   *
   * You will need to implement this function if your `option` items are objects.
   */
  getIsOptionEqualToValue?: (option: OptionType, value: OptionType) => boolean;
} & Pick<
  FieldComponentProps,
  | "errorMessage"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isFullWidth"
  | "isOptional"
  | "name"
> &
  AllowedProps;

const Autocomplete = <
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
>({
  defaultValue,
  errorMessage,
  hasMultipleChoices,
  id: idOverride,
  inputValue,
  isCustomValueAllowed,
  isDisabled,
  isFullWidth = false,
  isLoading,
  isOptional = false,
  isReadOnly,
  hint,
  HintLinkComponent,
  label,
  name: nameOverride,
  onBlur,
  onChange: onChangeProp,
  onInputChange: onInputChangeProp,
  onFocus,
  options,
  value,
  getIsOptionEqualToValue,
  testId,
  translate,
}: AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const controlledStateRef = useRef(
    getControlState({ controlledValue: value, uncontrolledValue: defaultValue })
  );
  const defaultValueProp = useMemo<
    | AutocompleteValue<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >
    | undefined
  >(() => {
    if (hasMultipleChoices) {
      if (value === undefined) {
        return defaultValue;
      }
      return [] as AutocompleteValue<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >;
    }
    return value === undefined ? defaultValue : undefined;
  }, [defaultValue, hasMultipleChoices, value]);

  const valueProps = useInputValues({
    defaultValue: defaultValueProp,
    value: value,
    controlState: controlledStateRef.current,
  });

  const inputValueProp = useMemo(() => {
    if (controlledStateRef.current === ComponentControlledState.CONTROLLED) {
      return { inputValue };
    }
    return undefined;
  }, [inputValue]);

  const renderInput = useCallback(
    ({ InputLabelProps, InputProps, ...params }) => (
      <Field
        errorMessage={errorMessage}
        fieldType="single"
        hasVisibleLabel
        id={InputLabelProps.htmlFor}
        hint={hint}
        HintLinkComponent={HintLinkComponent}
        label={label}
        isOptional={isOptional}
        renderFieldComponent={({
          ariaDescribedBy,
          id,
          errorMessageElementId,
          labelElementId,
        }) => (
          <InputBase
            {...params}
            {...InputProps}
            inputProps={{
              ...params.inputProps,
              "aria-errormessage": errorMessageElementId,
              "aria-labelledby": labelElementId,
            }}
            aria-describedby={ariaDescribedBy}
            id={id}
            name={nameOverride ?? id}
            required={!isOptional}
          />
        )}
      />
    ),
    [errorMessage, hint, HintLinkComponent, isOptional, label, nameOverride]
  );
  const onChange = useCallback<
    NonNullable<
      UseAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["onChange"]
    >
  >(
    (event, value, reason, details) => {
      onChangeProp?.(event, value, reason, details);
    },
    [onChangeProp]
  );

  const onInputChange = useCallback<
    NonNullable<
      UseAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["onInputChange"]
    >
  >(
    (event, value, reason) => {
      onInputChangeProp?.(event, value, reason);
    },
    [onInputChangeProp]
  );

  return (
    <MuiAutocomplete
      {...valueProps}
      {...inputValueProp}
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      data-se={testId}
      disableCloseOnSelect={hasMultipleChoices}
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      filterSelectedOptions={true}
      id={idOverride}
      fullWidth={isFullWidth}
      loading={isLoading}
      multiple={hasMultipleChoices}
      onBlur={onBlur}
      onChange={onChange}
      onInputChange={onInputChange}
      onFocus={onFocus}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      isOptionEqualToValue={getIsOptionEqualToValue}
      translate={translate}
    />
  );
};

// Need the `typeof Autocomplete` because generics don't get passed through
const MemoizedAutocomplete = memo(Autocomplete) as typeof Autocomplete;
// @ts-expect-error displayName is expected to not be on `typeof Autocomplete`
MemoizedAutocomplete.displayName = "Autocomplete";

export { MemoizedAutocomplete as Autocomplete };
