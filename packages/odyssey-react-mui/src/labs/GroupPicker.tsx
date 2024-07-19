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
import type { AutocompleteFreeSoloValueMapping } from "@mui/material/useAutocomplete";

import { AutocompleteProps } from "../Autocomplete";
import { Box } from "../Box";
import {
  CustomizableAutocomplete,
  CustomizableAutocompleteProps,
} from "../CustomizableAutocomplete";
import { Tag } from "../Tag";
import { Heading6 } from "../Typography";
import { AppsIcon, GroupIcon, UserIcon } from "../icons.generated";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";

const GroupOption = styled.li({
  // Needed to override MUI's display: flex in this use case
  display: "block !important",
});

const GroupOptionLogoContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  position: "relative",
  overflow: "hidden",
  width: odysseyDesignTokens.Spacing5,
  height: odysseyDesignTokens.Spacing5,

  svg: {
    width: "100%",
    height: "100%",
  },

  img: {
    position: "absolute",
    top: "50%",
    width: "100%",
    transform: "translateY(-50%)",
  },
}));

const GroupOptionContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  paddingInlineStart: `calc(
    ${odysseyDesignTokens.Spacing3} + ${odysseyDesignTokens.Spacing5}
  )`,
}));

const GroupOptionTitleContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing3,

  p: {
    margin: 0,
  },
}));

const GroupOptionDescription = styled("p", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  margin: `${odysseyDesignTokens.Spacing1} 0 0`,
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

type OptionLogoProps = {
  logo: GroupPickerOptionType["logo"];
  odysseyDesignTokens: DesignTokens;
};

const OptionLogo = ({ logo, odysseyDesignTokens }: OptionLogoProps) => {
  const isImageLogo = typeof logo === "string";

  if (isImageLogo) {
    return (
      <GroupOptionLogoContainer odysseyDesignTokens={odysseyDesignTokens}>
        {/* NOTE: Intentionally leaving alt as an empty string here so screen readers will ignore this image */}
        {/* Image should be suffciently described by the adjacent title and/or description of the option */}
        <img src={logo} alt="" role="presentation" />
      </GroupOptionLogoContainer>
    );
  } else {
    return (
      <GroupOptionLogoContainer odysseyDesignTokens={odysseyDesignTokens}>
        {logo}
      </GroupOptionLogoContainer>
    );
  }
};
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
  logo?: ReactElement | string;
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

  const hasLogoOptions = options.some((option) => Boolean(option.logo));

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
      CustomizableAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        IsCustomValueAllowed
      >["renderOption"]
    >
  >(
    (muiProps, option) => {
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
        <GroupOption {...muiProps} key={id}>
          <GroupOptionTitleContainer odysseyDesignTokens={odysseyDesignTokens}>
            {hasLogoOptions && (
              <OptionLogo
                logo={logo}
                odysseyDesignTokens={odysseyDesignTokens}
              />
            )}
            <Heading6 component="p">{title}</Heading6>
          </GroupOptionTitleContainer>
          <GroupOptionContent odysseyDesignTokens={odysseyDesignTokens}>
            {description && (
              <GroupOptionDescription odysseyDesignTokens={odysseyDesignTokens}>
                {description}
              </GroupOptionDescription>
            )}
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
                    <AppsIcon />
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
          </GroupOptionContent>
        </GroupOption>
      );
    },
    [hasLogoOptions, odysseyDesignTokens],
  );

  const renderTags = useCallback<
    NonNullable<
      CustomizableAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        IsCustomValueAllowed
      >["renderTags"]
    >
  >(
    (values, getTagProps) =>
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
            {typeof logo !== "string" ? (
              <Tag icon={logo} label={title} onRemove={onDelete} />
            ) : (
              <Tag label={title} onRemove={onDelete} />
            )}
          </Box>
        );
      }),
    [odysseyDesignTokens],
  );

  return (
    <CustomizableAutocomplete
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
