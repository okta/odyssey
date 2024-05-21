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

import { memo, ReactElement, useCallback } from "react";
import styled from "@emotion/styled";
import type {
  AutocompleteFreeSoloValueMapping,
  AutocompleteGetTagProps,
} from "@mui/material/useAutocomplete";
import { Box } from "@mui/material";

import { Autocomplete, AutocompleteProps } from "../Autocomplete";
import { Heading6 } from "../Typography";
import { Tag } from "../Tag";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";
import { UserIcon, GridIcon, GroupIcon } from "../icons.generated";

const GroupOption = styled("li", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "flex-start !important",
  gap: odysseyDesignTokens.Spacing3,
}));

const GroupOptionLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  position: "relative",
  bottom: "2px", // to visually align icon with title
  width: odysseyDesignTokens.Spacing5,
  height: odysseyDesignTokens.Spacing5,

  svg: {
    width: "100%",
    height: "100%",
  },
}));

const GroupOptionContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  "[data-option-title='true']": {
    margin: 0,
  },

  p: {
    margin: 0,
  },

  "p + p": {
    marginBlockStart: odysseyDesignTokens.Spacing1,
  },
}));

const GroupOptionDescription = styled("p", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  marginBlockStart: odysseyDesignTokens.Spacing1,
}));

const GroupOptionDetails = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing2,
  marginBlockStart: odysseyDesignTokens.Spacing2,
}));

const GroupOptionDetail = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing1,

  svg: {
    width: odysseyDesignTokens.Spacing4,
    color: odysseyDesignTokens.HueNeutral400,
  },
}));

export type CustomDetail = {
  icon: ReactElement;
  detailText: string | number;
};

export type GroupPickerOptionType = {
  appsCount?: number;
  description: string;
  customDetails?: CustomDetail[];
  groupPushMappingsCount?: number;
  id: string;
  logo?: ReactElement;
  title: string;
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

const GroupPicker = <
  OptionType extends GroupPickerOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  defaultValue,
  hasMultipleChoices,
  isCustomValueAllowed,
  isDisabled,
  isLoading,
  isOptional = false,
  isReadOnly,
  isVirtualized,
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
    (sourceValue: OptionType, targetValue: OptionType) =>
      sourceValue.id === targetValue.id,
    [],
  );

  const getOptionLabel = useCallback(
    (
      option:
        | OptionType
        | AutocompleteFreeSoloValueMapping<IsCustomValueAllowed>,
    ) => (option as OptionType).title,
    [],
  );

  const renderOption = useCallback<
    NonNullable<
      AutocompleteProps<
        OptionType,
        HasMultipleChoices,
        IsCustomValueAllowed
      >["renderOption"]
    >
  >(
    (props, option) => {
      const {
        appsCount,
        customDetails,
        description,
        groupPushMappingsCount,
        id,
        logo,
        title,
        usersCount,
      } = option;

      const hasOptionDetails =
        typeof usersCount === "number" ||
        typeof appsCount === "number" ||
        typeof groupPushMappingsCount === "number" ||
        (customDetails && customDetails.length > 0);

      return (
        <GroupOption
          {...props}
          key={id}
          odysseyDesignTokens={odysseyDesignTokens}
        >
          <GroupOptionLogoContainer odysseyDesignTokens={odysseyDesignTokens}>
            {logo}
          </GroupOptionLogoContainer>
          <div>
            <GroupOptionContent odysseyDesignTokens={odysseyDesignTokens}>
              <Heading6 component="p">{title}</Heading6>
              {description && (
                <GroupOptionDescription
                  odysseyDesignTokens={odysseyDesignTokens}
                >
                  {description}
                </GroupOptionDescription>
              )}
            </GroupOptionContent>
            {hasOptionDetails && (
              <GroupOptionDetails odysseyDesignTokens={odysseyDesignTokens}>
                {typeof usersCount === "number" && (
                  <GroupOptionDetail odysseyDesignTokens={odysseyDesignTokens}>
                    <UserIcon />
                    {usersCount}
                  </GroupOptionDetail>
                )}
                {typeof appsCount === "number" && (
                  <GroupOptionDetail odysseyDesignTokens={odysseyDesignTokens}>
                    <GridIcon />
                    {appsCount}
                  </GroupOptionDetail>
                )}
                {typeof groupPushMappingsCount === "number" && (
                  <GroupOptionDetail odysseyDesignTokens={odysseyDesignTokens}>
                    <GroupIcon />
                    {groupPushMappingsCount}
                  </GroupOptionDetail>
                )}
                {customDetails?.map(({ icon, detailText }, index) => (
                  <GroupOptionDetail
                    key={`${index}-${detailText}`}
                    odysseyDesignTokens={odysseyDesignTokens}
                  >
                    {icon}
                    {detailText}
                  </GroupOptionDetail>
                ))}
              </GroupOptionDetails>
            )}
          </div>
        </GroupOption>
      );
    },
    [odysseyDesignTokens],
  );

  const renderTags = useCallback(
    (values: OptionType[], getTagProps: AutocompleteGetTagProps) =>
      values.map((option, index) => {
        const { key, onDelete } = getTagProps({ index });
        const { logo, title } = option;

        return (
          <Box
            key={key}
            sx={{
              margin: odysseyDesignTokens.Spacing1,

              "& + &": {
                marginInlineStart: 0,
              },
            }}
          >
            <Tag icon={logo} label={title} onRemove={onDelete} />
          </Box>
        );
      }),
    [odysseyDesignTokens],
  );

  return (
    <Autocomplete
      defaultValue={defaultValue}
      isCustomValueAllowed={isCustomValueAllowed}
      isDisabled={isDisabled}
      isOptional={isOptional}
      getOptionLabel={getOptionLabel}
      getIsOptionEqualToValue={isOptionEqualToValue}
      isLoading={isLoading}
      hasMultipleChoices={hasMultipleChoices}
      hint={hint}
      label={label}
      onChange={onChange}
      onInputChange={onInputChange}
      options={options}
      isReadOnly={isReadOnly}
      isVirtualized={isVirtualized}
      renderOption={renderOption}
      renderTags={renderTags}
      testId={testId}
      value={value}
    />
  );
};

const MemoizedGroupPicker = memo(GroupPicker) as typeof GroupPicker;

export { MemoizedGroupPicker as GroupPicker };
