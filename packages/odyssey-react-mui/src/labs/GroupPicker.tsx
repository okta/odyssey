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

import type { AutocompleteGetTagProps } from "@mui/material/useAutocomplete";

import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  Box,
  Chip as MuiChip,
  InputBase,
  Avatar as MuiAvatar,
} from "@mui/material";
import { HTMLAttributes, memo, useCallback } from "react";

import { AutocompleteProps } from "../Autocomplete";
import { Field } from "../Field";
import { Subordinate } from "../Typography";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext";

import { UserIcon, GridIcon, GroupIcon } from "../icons.generated";

export type GroupPickerOptionType = {
  id: string;
  name: string;
  description: string;
  logo?: string;
  usersCount?: number;
  appsCount?: number;
  groupPushMappingsCount?: number;
};

export type GroupPickerProps<
  GroupPickerOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
> = {
  /**
   * Hide selected options
   */
  filterSelectedOptions?: MuiAutocompleteProps<
    GroupPickerOptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["filterSelectedOptions"];
} & AutocompleteProps<
  GroupPickerOptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>;

const GroupPicker = <
  optionType extends GroupPickerOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
>({
  hasMultipleChoices,
  isCustomValueAllowed,
  isDisabled,
  isLoading,
  isOptional = false,
  isReadOnly,
  hint,
  label,
  onChange,
  onInputChange,
  options,
  value,
  filterSelectedOptions,
  testId,
}: GroupPickerProps<optionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const isOptionEqualToValue = useCallback(
    (sourceValue: optionType, targetValue: optionType) => {
      return sourceValue.id === targetValue.id;
    },
    []
  );

  const getOptionLabel = useCallback((option: string | optionType) => {
    return typeof option === "string" ? option : option.name;
  }, []);

  const renderOption = useCallback(
    (props: HTMLAttributes<HTMLLIElement>, option: optionType) => {
      return (
        <li {...props} key={option.id}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "top",
            }}
          >
            <Box sx={{ paddingRight: odysseyDesignTokens.Spacing2 }}>
              <MuiAvatar
                sx={{
                  backgroundColor: "transparent",
                  width: 24,
                  height: 24,
                }}
                src={option.logo}
              >
                &nbsp;
              </MuiAvatar>
            </Box>
            <Box>
              {option.name}
              <Subordinate>{option.description}</Subordinate>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: odysseyDesignTokens.Spacing1,
                }}
              >
                {option.usersCount !== undefined && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      paddingRight: odysseyDesignTokens.Spacing4,
                    }}
                  >
                    <UserIcon />
                    {option.usersCount}
                  </Box>
                )}
                {option.appsCount !== undefined && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      paddingRight: odysseyDesignTokens.Spacing4,
                    }}
                  >
                    <GridIcon />
                    {option.appsCount}
                  </Box>
                )}
                {option.groupPushMappingsCount !== undefined && (
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <GroupIcon />
                    {option.groupPushMappingsCount}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </li>
      );
    },
    [odysseyDesignTokens]
  );

  const renderTags = useCallback(
    (values: optionType[], getTagProps: AutocompleteGetTagProps) =>
      values.map((option: optionType, index: number) => {
        const { onDelete } = getTagProps({ index });

        return (
          <div key={option.id}>
            <MuiChip
              sx={{ margin: odysseyDesignTokens.Spacing1 }}
              size="small"
              avatar={
                <MuiAvatar
                  sx={{
                    left: `-${odysseyDesignTokens.Spacing2}`,
                    backgroundColor: "transparent",
                  }}
                  src={option.logo}
                >
                  &nbsp;
                </MuiAvatar>
              }
              label={option.name}
              onDelete={onDelete}
            />
          </div>
        );
      }),
    [odysseyDesignTokens]
  );

  const renderInput = useCallback(
    ({ InputLabelProps, InputProps, ...params }) => (
      <Field
        fieldType="single"
        hasVisibleLabel
        id={InputLabelProps.htmlFor}
        hint={hint}
        label={label}
        isOptional={isOptional}
        renderFieldComponent={({ ariaDescribedBy, id }) => (
          <InputBase
            {...params}
            {...InputProps}
            aria-describedby={ariaDescribedBy}
            id={id}
            required={!isOptional}
          />
        )}
      />
    ),
    [hint, isOptional, label]
  );

  return (
    <MuiAutocomplete
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      data-se={testId}
      disableCloseOnSelect={hasMultipleChoices}
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      loading={isLoading}
      multiple={hasMultipleChoices}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      value={value}
      filterSelectedOptions={filterSelectedOptions}
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderTags={renderTags}
    />
  );
};

const MemoizedGroupPicker = memo(GroupPicker) as typeof GroupPicker;

export { MemoizedGroupPicker as GroupPicker };
