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

import { memo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material";

import { AutocompleteProps } from "../../Autocomplete.js";
import { PickerVirtualizationListBox } from "./PickerVirtualizationListBox.js";
import { useAutocomplete } from "../../useAutocomplete.js";

export const adornmentSizeValues = ["small", "large"] as const;
export type AdornmentSize = (typeof adornmentSizeValues)[number];

export type BasePickerProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed> & {
  adornmentSize?: AdornmentSize;
  groupOptionsBy?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["groupBy"];
};

export type BasePickerType = {
  displayName: string;
  <
    OptionType,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: BasePickerProps<
      OptionType,
      HasMultipleChoices,
      IsCustomValueAllowed
    >,
  ): ReactNode;
};

export type ComposablePickerProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = BasePickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed> & {
  getOptionLabel?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["getOptionLabel"];

  renderOption: MuiAutocompleteProps<
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

const ComposablePicker = <
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
  groupOptionsBy,
  hasMultipleChoices,
  id: idOverride,
  inputValue,
  isCustomValueAllowed,
  isDisabled,
  isFullWidth = false,
  isLoading,
  isOptional = false,
  isReadOnly,
  isVirtualized = false,
  hint,
  HintLinkComponent,
  label,
  name: nameOverride,
  onBlur,
  onChange,
  onInputChange,
  onFocus,
  options,
  renderOption,
  renderTags,
  value,
  testId,
  translate,
}: ComposablePickerProps<
  OptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>) => {
  const { t } = useTranslation();
  const { inputValueProp, isVirtualizedRef, renderInput, valueProps } =
    useAutocomplete<OptionType, HasMultipleChoices, IsCustomValueAllowed>({
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
      isVirtualized,
      label,
      name: nameOverride,
      testId,
      value,
    });

  return (
    <MuiAutocomplete
      {...valueProps}
      {...inputValueProp}
      // conditionally provide the ListboxComponent if this needs to be virtualized
      {...(isVirtualizedRef.current && {
        ListboxComponent: PickerVirtualizationListBox,
      })}
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      clearText={t("clear.text")}
      closeText={t("close.text")}
      disableCloseOnSelect={hasMultipleChoices}
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      filterSelectedOptions={true}
      fullWidth={isFullWidth}
      getOptionLabel={getOptionLabel}
      groupBy={groupOptionsBy}
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

// Need the `typeof ComposablePicker` because generics don't get passed through
const MemoizedComposablePicker = memo(
  ComposablePicker,
) as typeof ComposablePicker;
// @ts-expect-error displayName is expected to not be on `typeof ComposablePicker`
MemoizedComposablePicker.displayName = "ComposablePicker";

export { MemoizedComposablePicker as ComposablePicker };
