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

import type {
  AutocompleteFreeSoloValueMapping,
  AutocompleteGetTagProps,
} from "@mui/material/useAutocomplete";

import {
  Autocomplete as MuiAutocomplete,
  Avatar as MuiAvatar,
  Box,
  InputBase,
  AutocompleteRenderInputParams,
} from "@mui/material";
import { avatarClasses } from "@mui/material/Avatar";
import { HTMLAttributes, memo, useCallback } from "react";

import { AutocompleteProps } from "../Autocomplete";
import { Field } from "../Field";
import { Subordinate } from "../Typography";
import { Tag } from "../Tag";
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
  IsCustomValueAllowed extends boolean | undefined,
> = AutocompleteProps<
  GroupPickerOptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>;

const avatarImageSizeSmall = 16;
const avatarImageSizeMedium = 24;

const GroupPicker = <
  OptionType extends GroupPickerOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
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
  testId,
}: GroupPickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const isOptionEqualToValue = useCallback(
    (sourceValue: OptionType, targetValue: OptionType) => {
      return sourceValue.id === targetValue.id;
    },
    [],
  );

  const getOptionLabel = useCallback(
    (
      option:
        | OptionType
        | AutocompleteFreeSoloValueMapping<IsCustomValueAllowed>,
    ) => {
      return (option as OptionType).name;
    },
    [],
  );

  const renderOption = useCallback(
    (props: HTMLAttributes<HTMLElement>, option: OptionType) => {
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
                alt={option.name}
                src={option.logo}
                sx={{
                  [`.${avatarClasses.fallback}`]: {
                    visibility: "hidden",
                  },
                  background: "transparent",
                  height: avatarImageSizeMedium,
                  width: avatarImageSizeMedium,
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
    [odysseyDesignTokens],
  );

  const renderTags = useCallback(
    (values: OptionType[], getTagProps: AutocompleteGetTagProps) =>
      values.map((option, index) => {
        const { key, onDelete } = getTagProps({ index });
        return (
          <Box
            key={key}
            sx={{
              margin: odysseyDesignTokens.Spacing1,
            }}
          >
            <Tag
              icon={
                <MuiAvatar
                  alt={option.name}
                  src={option.logo}
                  sx={{
                    [`.${avatarClasses.fallback}`]: {
                      visibility: "hidden",
                    },
                    background: "transparent",
                    height: avatarImageSizeSmall,
                    width: avatarImageSizeSmall,
                  }}
                />
              }
              label={option.name}
              onRemove={onDelete}
            />
          </Box>
        );
      }),
    [odysseyDesignTokens],
  );

  const renderInput = useCallback(
    ({
      InputLabelProps,
      InputProps,
      ...params
    }: AutocompleteRenderInputParams) => (
      <Field
        fieldType="single"
        hasVisibleLabel
        // @ts-expect-error The `htmlFor` prop doesn't exist `HTMLAttributes` for a `<label>` element even though it exists in JavaScript.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    [hint, isOptional, label],
  );

  return (
    <MuiAutocomplete
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      data-se={testId}
      disabled={isDisabled}
      filterSelectedOptions={true}
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
