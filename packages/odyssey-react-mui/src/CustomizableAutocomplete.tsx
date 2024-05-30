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
} from "@mui/material";
import { memo } from "react";

import { AutocompleteProps } from "./Autocomplete";
import { useAutocomplete } from "./useAutocomplete";

export type CustomizableAutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed> & {
  getOptionLabel?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["getOptionLabel"];

  renderOption?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["renderOption"];

  renderTags?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["renderTags"];
};

const CustomizableAutocomplete = <
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  ariaDescribedBy,
  defaultValue,
  errorMessage,
  errorMessageList,
  getIsOptionEqualToValue,
  getOptionLabel,
  hasMultipleChoices,
  id: idOverride,
  inputValue,
  isCustomValueAllowed,
  isDisabled,
  isFullWidth = false,
  isLoading,
  isOptional = false,
  isReadOnly,
  isVirtualized: isVirtualizedProp = false,
  hint,
  HintLinkComponent,
  label,
  name: nameOverride,
  onBlur,
  onChange: onChangeProp,
  onInputChange: onInputChangeProp,
  onFocus,
  options,
  renderOption,
  renderTags,
  value,
  testId,
  translate,
}: CustomizableAutocompleteProps<
  OptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>) => {
  const {
    inputValueProp,
    isVirtualized,
    onChange,
    onInputChange,
    renderInput,
    valueProps,
    VirtualizedListboxComponent,
  } = useAutocomplete<OptionType, HasMultipleChoices, IsCustomValueAllowed>({
    ariaDescribedBy,
    defaultValue,
    errorMessage,
    errorMessageList,
    hasMultipleChoices,
    hint,
    HintLinkComponent,
    inputValue,
    isFullWidth,
    isOptional,
    isVirtualized: isVirtualizedProp,
    label,
    name: nameOverride,
    onChange: onChangeProp,
    onInputChange: onInputChangeProp,
    testId,
    value,
  });

  return (
    <MuiAutocomplete
      {...valueProps}
      {...inputValueProp}
      // conditionally provide the ListboxComponent if this needs to be virtualized
      {...(isVirtualized.current && { VirtualizedListboxComponent })}
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      disableCloseOnSelect={hasMultipleChoices}
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      filterSelectedOptions={true}
      fullWidth={isFullWidth}
      getOptionLabel={getOptionLabel}
      id={idOverride}
      isOptionEqualToValue={getIsOptionEqualToValue}
      loading={isLoading}
      multiple={hasMultipleChoices}
      onBlur={onBlur}
      onChange={onChange}
      onInputChange={onInputChange}
      onFocus={onFocus}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      renderOption={renderOption}
      renderTags={renderTags}
      translate={translate}
    />
  );
};

// Need the `typeof Autocomplete` because generics don't get passed through
const MemoizedCustomizableAutocomplete = memo(
  CustomizableAutocomplete,
) as typeof CustomizableAutocomplete;
// @ts-expect-error displayName is expected to not be on `typeof CustomizableAutocomplete`
MemoizedCustomizableAutocomplete.displayName = "CustomizableAutocomplete";

export { MemoizedCustomizableAutocomplete as CustomizableAutocomplete };
