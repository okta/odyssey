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
} from "@mui/material";
import { memo, useCallback } from "react";

import { Field } from "./Field";
import type { SeleniumProps } from "./SeleniumProps";

export type AutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
> = {
  /**
   * The error message for the Select
   */
  errorMessage?: string;
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
   * The hint text for the Autocomplete input
   */
  hint?: string;
  /**
   * The id attribute of the Select
   */
  id?: string;
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
   * If `true`, the `input` element is not required.
   */
  isOptional?: boolean;
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
   * The name of the `input` element. Defaults to the `id` if not set.
   */
  name?: string;
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
  onChange?: MuiAutocompleteProps<
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
  options: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["options"];
  /**
   * The value of the Autocomplete input
   */
  value?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["value"];
} & SeleniumProps;

const Autocomplete = <
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
>({
  errorMessage,
  hasMultipleChoices,
  id: idOverride,
  isCustomValueAllowed,
  isDisabled,
  isLoading,
  isOptional = false,
  isReadOnly,
  hint,
  label,
  name: nameOverride,
  onBlur,
  onChange,
  onInputChange,
  onFocus,
  options,
  value,
  testId,
}: AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const renderInput = useCallback(
    ({ InputLabelProps, InputProps, ...params }) => (
      <Field
        errorMessage={errorMessage}
        fieldType="single"
        hasVisibleLabel
        id={InputLabelProps.htmlFor}
        hint={hint}
        label={label}
        isOptional={isOptional}
        renderFieldComponent={({
          ariaDescribedBy,
          id,
          errorMessageId,
          labelElementId,
        }) => (
          <InputBase
            {...params}
            {...InputProps}
            inputProps={{
              ...params.inputProps,
              "aria-errormessage": errorMessageId,
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
    [errorMessage, hint, isOptional, label, nameOverride]
  );

  return (
    <MuiAutocomplete
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      data-se={testId}
      disableCloseOnSelect={hasMultipleChoices}
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      filterSelectedOptions={true}
      id={idOverride}
      loading={isLoading}
      multiple={hasMultipleChoices}
      onBlur={onBlur}
      onChange={onChange}
      onInputChange={onInputChange}
      onFocus={onFocus}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      value={value}
    />
  );
};

// Need the `typeof Autocomplete` because generics don't get passed through
const MemoizedAutocomplete = memo(Autocomplete) as typeof Autocomplete;
// @ts-expect-error displayName is expected to not be on `typeof Autocomplete`
MemoizedAutocomplete.displayName = "Autocomplete";

export { MemoizedAutocomplete as Autocomplete };
