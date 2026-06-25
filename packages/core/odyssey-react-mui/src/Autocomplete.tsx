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
  UseAutocompleteProps as MuiUseAutocompleteProps,
} from "@mui/material";
import { memo } from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { FieldComponentProps } from "./FieldComponentProps.js";
import { useTranslation } from "./i18n.generated/i18n.js";
import { PickerVirtualizationListBox } from "./labs/OdysseyPickers/PickerVirtualizationListBox.js";
import { useAutocomplete } from "./useAutocomplete.js";

export type AutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: MuiUseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["defaultValue"];
  /**
   * Used to determine if the option represents the given value. Uses strict equality by default if
   * none provided. Both arguments need to be handled, an option can only match with one value.
   * option: the option to test
   * value: the value to test against
   *
   * You will need to implement this function if your `option` items are objects.
   */
  getIsOptionEqualToValue?: (option: OptionType, value: OptionType) => boolean;

  /**
   * Used to determine the string value for a given option. It's used to fill the input (and the
   * list box options if renderOption is not provided). If used in free solo mode, it must accept
   * both the type of the options and a string.
   *
   * `function(option: Value) => string`
   */
  getOptionLabel?: MuiUseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["getOptionLabel"];
  /**
   * Whether multiple options can be selected simultaneously.
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
  inputValue?: MuiUseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["inputValue"];
  /**
   * If `true`, the user can type a custom value not present in the options list.
   */
  isCustomValueAllowed?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["freeSolo"];
  /**
   * If `true`, the Autocomplete input is disabled.
   */
  isDisabled?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["disabled"];
  /**
   * If `true`, a loading indicator is shown in place of the options list.
   */
  isLoading?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["loading"];
  /**
   * If `true`, the Autocomplete input is read-only.
   */
  isReadOnly?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["readOnly"];
  /**
   * If `true`, renders the options list using virtualization.
   * Recommended when the list contains hundreds of items or more.
   */
  isVirtualized?: boolean;
  /**
   * The label text for the autocomplete input
   */
  label: string;
  /**
   * The text to display when no options are available.
   * @default "No options"
   */
  noOptionsText?: string;
  /**
   * Called when the Autocomplete loses focus.
   */
  onBlur?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onBlur"];
  /**
   * Called when the selected value changes.
   */
  onChange?: MuiUseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onChange"];
  /**
   * Called when the Autocomplete gains focus.
   */
  onFocus?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onFocus"];
  /**
   * Called when the text input value changes. Receives the new input string.
   */
  onInputChange?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onInputChange"];
  /**
   * The options for the Autocomplete input
   */
  options: ReadonlyArray<OptionType>;
  /**
   * The value of the Autocomplete input
   */
  value?: MuiUseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["value"];
} & Pick<
  FieldComponentProps,
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isFullWidth"
  | "isOptional"
  | "name"
> &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

/**
 * An input field with a dropdown list of selectable options that supports filtering, multi-select,
 * and free-text entry. Use when users need to search or choose from a potentially large set of
 * values.
 */
const Autocomplete = <
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
  hint,
  HintLinkComponent,
  id: idOverride,
  inputValue,
  isCustomValueAllowed,
  isDisabled,
  isFullWidth = false,
  isLoading,
  isOptional = false,
  isReadOnly,
  isVirtualized = false,
  label,
  name: nameOverride,
  noOptionsText,
  onBlur,
  onChange,
  onFocus,
  onInputChange,
  options,
  testId,
  translate,
  value,
}: AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
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
      isReadOnly,
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
      // MUI's value type is incompatible between single (null) and multiple (array)
      // modes. Changing `multiple` on a live instance causes a null.length crash,
      // so we force a remount when the mode changes. This resets internal UI state.
      key={hasMultipleChoices ? "multiple" : "single"}
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
      filterSelectedOptions={true}
      freeSolo={isCustomValueAllowed}
      fullWidth={isFullWidth}
      getOptionLabel={getOptionLabel}
      id={idOverride}
      isOptionEqualToValue={getIsOptionEqualToValue}
      loading={isLoading}
      multiple={hasMultipleChoices}
      noOptionsText={noOptionsText || t("autocomplete.nooptions")}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      onInputChange={onInputChange}
      openText={t("open.text")}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      translate={translate}
    />
  );
};

const MemoizedAutocomplete = memo(Autocomplete) as typeof Autocomplete & {
  displayName?: string;
};
MemoizedAutocomplete.displayName = "Autocomplete";

export { MemoizedAutocomplete as Autocomplete };
