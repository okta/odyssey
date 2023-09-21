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
  Avatar as MuiAvatar,
  Box,
  Chip as MuiChip,
  InputBase,
} from "@mui/material";
import { avatarClasses } from "@mui/material/Avatar";
import { memo, useCallback } from "react";

import { AutocompleteProps } from "../Autocomplete";
import { Field } from "../Field";
import { Subordinate } from "../Typography";
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext";
import { UserIcon, GridIcon, GroupIcon } from "../icons.generated";

export type GroupPickerOptionType = {
  appsCount?: number;
  description: string;
  groupPushMappingsCount?: number;
  id: string;
  logo?: string;
  name: string;
  usersCount?: number;
};

export type GroupPickerProps<
  GroupPickerOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
> = AutocompleteProps<
  GroupPickerOptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
> & {
  /**
   * Hide selected options
   */
  isFilterSelectedOptions?: MuiAutocompleteProps<
    GroupPickerOptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["filterSelectedOptions"];
};

const GroupPicker = <
  OptionType extends GroupPickerOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined
>({
  hasMultipleChoices,
  isCustomValueAllowed,
  isDisabled,
  isFilterSelectedOptions,
  isLoading,
  isOptional = false,
  isReadOnly,
  hint,
  label,
  onChange,
  onInputChange,
  options,
  value,
  testId,
}: GroupPickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const avatarImageSize = 24;

  const isOptionEqualToValue = useCallback((sourceValue, targetValue) => {
    return sourceValue.id === targetValue.id;
  }, []);

  const getOptionLabel = useCallback((option) => {
    return option.name;
  }, []);

  const renderOption = useCallback(
    (props, option) => {
      return (
        <li {...props} key={option.id}>
          <Box
            sx={{
              alignItems: "top",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box sx={{ paddingRight: odysseyDesignTokens.Spacing2 }}>
              <MuiAvatar
                src={option.logo}
                sx={{
                  [`.${avatarClasses.fallback}`]: {
                    visibility: "hidden",
                  },
                  backgroundColor: "transparent",
                  height: avatarImageSize,
                  width: avatarImageSize,
                }}
              />
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
                {typeof option.usersCount === "number" && (
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
                {typeof option.appsCount === "number" && (
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
                {typeof option.groupPushMappingsCount === "number" && (
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
    (values: OptionType[], getTagProps: AutocompleteGetTagProps) =>
      values.map((option, index) => (
        <MuiChip
          avatar={
            <MuiAvatar
              src={option.logo}
              sx={{
                left: `-${odysseyDesignTokens.Spacing2}`,
                backgroundColor: "transparent",
              }}
            />
          }
          label={option.name}
          size="small"
          sx={{
            [`.${avatarClasses.fallback}`]: {
              visibility: "hidden",
            },
            margin: odysseyDesignTokens.Spacing1,
          }}
          {...getTagProps({ index })}
        />
      )),
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
      filterSelectedOptions={isFilterSelectedOptions}
      freeSolo={isCustomValueAllowed}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={isOptionEqualToValue}
      loading={isLoading}
      multiple={hasMultipleChoices}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      renderOption={renderOption}
      renderTags={renderTags}
      value={value}
    />
  );
};

const MemoizedGroupPicker = memo(GroupPicker) as typeof GroupPicker;

export { MemoizedGroupPicker as GroupPicker };
