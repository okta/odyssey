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

export type AutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
> = {
  hasMultipleChoices?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["multiple"];
  hint?: string;
  isCustomValueAllowed?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["freeSolo"];
  isDisabled?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["disabled"];
  label: string;
  onChange?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onChange"];
  options: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["options"];
  value?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["value"];
};

const Autocomplete = <
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
>({
  isCustomValueAllowed,
  hasMultipleChoices,
  isDisabled,
  hint,
  label,
  onChange,
  options,
  value,
}: AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const renderInput = useCallback(
    ({ InputLabelProps, InputProps, ...params }) => (
      <Field
        {...InputLabelProps}
        hasVisibleLabel
        hint={hint}
        label={label}
        renderFieldComponent={({ ariaDescribedBy, id }) => (
          <InputBase
            {...params}
            {...InputProps}
            aria-describedby={ariaDescribedBy}
            id={id}
          />
        )}
      />
    ),
    [hint, label]
  );

  return (
    <MuiAutocomplete
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      multiple={hasMultipleChoices}
      onChange={onChange}
      options={options}
      renderInput={renderInput}
      value={value}
    />
  );
};

const MemoizedAutocomplete = memo(Autocomplete) as typeof Autocomplete;

export { MemoizedAutocomplete as Autocomplete };
