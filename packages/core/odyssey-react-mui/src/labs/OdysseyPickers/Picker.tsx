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

import styled from "@emotion/styled";
import { AutocompleteProps as MuiAutocompleteProps } from "@mui/material";
import {
  Fragment,
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";

import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Heading6, Paragraph } from "../../Typography.js";
import {
  type BasePickerProps,
  type BasePickerType,
  type BaseRenderOptionProps,
  ComposablePicker,
} from "./ComposablePicker.js";

export const StyledOption = styled.li<{ hasAdornment?: boolean }>(
  ({ hasAdornment }) => ({
    ...(!hasAdornment && {
      display: "block !important",
    }),
  }),
);

export const OptionLabelContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(() => ({
  p: {
    margin: 0,
  },
}));

export const OptionDescription = styled("p", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  margin: `${odysseyDesignTokens.Spacing1} 0 0 !important`,
  color: odysseyDesignTokens.TypographyColorSubordinate,
}));

export const OptionDetails = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing3,
  marginBlockStart: odysseyDesignTokens.Spacing2,
}));

export const OptionDetail = styled("div", {
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

export type BaseOptionProps = {
  muiProps: BaseRenderOptionProps;
  odysseyDesignTokens: DesignTokens;
};

type OptionComponentProps = {
  hasAdornment?: boolean;
  muiProps: BaseOptionProps["muiProps"];
};

export const Option = ({
  children,
  hasAdornment = false,
  muiProps,
}: PropsWithChildren<OptionComponentProps>) => {
  const { key, ...props } = muiProps;
  return (
    <StyledOption {...props} hasAdornment={hasAdornment} key={key}>
      {children}
    </StyledOption>
  );
};

export const OptionMetadataComponent = ({
  metaData,
  odysseyDesignTokens,
}: {
  metaData: OptionMetadata[];
  odysseyDesignTokens: DesignTokens;
}) => {
  return (
    <OptionDetails odysseyDesignTokens={odysseyDesignTokens}>
      {metaData.map((meta: OptionMetadata, index: number) => {
        const { detailText, icon } = meta;
        return (
          <OptionDetail
            key={`${detailText}-${index}`}
            odysseyDesignTokens={odysseyDesignTokens}
          >
            {icon}
            {detailText}
          </OptionDetail>
        );
      })}
    </OptionDetails>
  );
};

export const OptionDescriptionComponent = ({
  description,
  odysseyDesignTokens,
}: {
  description?: LabelDescription["description"];
  odysseyDesignTokens: DesignTokens;
}) => {
  return (
    description && (
      <OptionDescription odysseyDesignTokens={odysseyDesignTokens}>
        {description}
      </OptionDescription>
    )
  );
};

export type OptionProps<OptionType> = {
  option: OptionType;
};

export const OptionLabelOnlyComponent = <OptionType extends OptionLabelOnly>({
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps & OptionProps<OptionType>) => {
  const { label } = option;

  return (
    <Option muiProps={muiProps}>
      <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Paragraph>{label}</Paragraph>
      </OptionLabelContainer>
    </Option>
  );
};

const OptionLabelDescription = <OptionType extends LabelDescription>({
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps & OptionProps<OptionType>) => {
  const { description, label } = option;

  return (
    <Option muiProps={muiProps}>
      <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Heading6 component="p">{label}</Heading6>
        <OptionDescriptionComponent
          description={description}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      </OptionLabelContainer>
    </Option>
  );
};

const OptionLabelDescriptionMetadata = <
  OptionType extends LabelDescriptionMetadata,
>({
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps & OptionProps<OptionType>) => {
  const { description, label, metaData } = option;

  return (
    <Option muiProps={muiProps}>
      <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Heading6 component="p">{label}</Heading6>
        <OptionDescriptionComponent
          description={description}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      </OptionLabelContainer>
      <OptionMetadataComponent
        metaData={metaData}
        odysseyDesignTokens={odysseyDesignTokens}
      />
    </Option>
  );
};

export type OptionMetadata = {
  detailText: string | number;
  icon: ReactElement;
};

export type OptionGroupType = { group?: string };
export type OptionValueType = { value: string | number };
export type OptionLabelType = { label: string };
export type BaseOptionType = OptionValueType &
  OptionGroupType &
  OptionLabelType;
export type Metadata = {
  metaData: OptionMetadata[];
};

export type OptionLabelOnly = BaseOptionType;
export type LabelDescription = BaseOptionType & { description?: string };
export type LabelDescriptionMetadata = LabelDescription & Metadata;

export type PickerProps<
  OptionType extends LabelDescription | LabelDescriptionMetadata,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = BasePickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>;

export type PickerComponentType = {
  <
    OptionType extends OptionLabelOnly,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  ): ReactNode;
  <
    OptionType extends LabelDescriptionMetadata,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  ): ReactNode;
  <
    OptionType extends LabelDescription,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  ): ReactNode;
  <
    OptionType extends LabelDescriptionMetadata,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  ): ReactNode;
};

const Picker: PickerComponentType = <
  OptionType extends
    | OptionLabelOnly
    | LabelDescription
    | LabelDescriptionMetadata,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  ariaDescribedBy,
  defaultValue,
  emptyOptionsText,
  errorMessage,
  errorMessageList,
  getIsOptionEqualToValue,
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
  value,
  testId,
  translate,
}: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const customOptionRender = useCallback<
    NonNullable<
      MuiAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["renderOption"]
    >
  >(
    (muiProps, option) => {
      const hasDescription = "description" in option && option.description;
      const hasMetadata = "metaData" in option && option.metaData;
      const isLabelOnly = !hasMetadata && !hasDescription;

      return (
        <Fragment key={option.value}>
          {isLabelOnly ? (
            <OptionLabelOnlyComponent
              muiProps={muiProps}
              odysseyDesignTokens={odysseyDesignTokens}
              option={option}
            />
          ) : hasMetadata ? (
            <OptionLabelDescriptionMetadata
              muiProps={muiProps}
              odysseyDesignTokens={odysseyDesignTokens}
              option={option}
            />
          ) : (
            <OptionLabelDescription
              muiProps={muiProps}
              odysseyDesignTokens={odysseyDesignTokens}
              option={option}
            />
          )}
        </Fragment>
      );
    },
    [odysseyDesignTokens],
  );

  return (
    <ComposablePicker<OptionType, HasMultipleChoices, IsCustomValueAllowed>
      ariaDescribedBy={ariaDescribedBy}
      defaultValue={defaultValue}
      emptyOptionsText={emptyOptionsText}
      errorMessage={errorMessage}
      errorMessageList={errorMessageList}
      getIsOptionEqualToValue={getIsOptionEqualToValue}
      hasMultipleChoices={hasMultipleChoices}
      hint={hint}
      HintLinkComponent={HintLinkComponent}
      id={idOverride}
      inputValue={inputValue}
      isCustomValueAllowed={isCustomValueAllowed}
      isDisabled={isDisabled}
      isFullWidth={isFullWidth}
      isLoading={isLoading}
      isOptional={isOptional}
      isReadOnly={isReadOnly}
      isVirtualized={isVirtualizedProp}
      label={label}
      name={nameOverride}
      onBlur={onBlur}
      onChange={onChangeProp}
      onFocus={onFocus}
      onInputChange={onInputChangeProp}
      options={options}
      renderOption={customOptionRender}
      testId={testId}
      translate={translate}
      value={value}
    />
  );
};

// Need the `as BasePickerType` because generics don't get passed through
const MemoizedPicker = memo(Picker) as BasePickerType;

MemoizedPicker.displayName = "Picker";

export { MemoizedPicker as Picker };
