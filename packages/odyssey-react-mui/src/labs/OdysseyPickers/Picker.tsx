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
  HTMLAttributes,
  memo,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useCallback,
} from "react";
import styled from "@emotion/styled";
import { AutocompleteProps as MuiAutocompleteProps } from "@mui/material";

import {
  ComposablePicker,
  type BasePickerProps,
  type BasePickerType,
} from "./ComposablePicker";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Heading6, Paragraph } from "../../Typography";

export const StyledOption = styled.li<{ hasAdornment?: boolean }>(
  ({ hasAdornment }) => ({
    ...(!hasAdornment && {
      display: "block !important",
    }),
  }),
);

export const OptionLabelContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({}) => ({
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
  muiProps: HTMLAttributes<HTMLLIElement>;
  odysseyDesignTokens: DesignTokens;
};

type OptionComponentProps = {
  hasAdornment?: boolean;
  // key: string | number;
  muiProps: BaseOptionProps["muiProps"];
};

export const Option = ({
  children,
  hasAdornment = false,
  muiProps,
}: PropsWithChildren<OptionComponentProps>) => (
  <StyledOption {...muiProps} hasAdornment={hasAdornment}>
    {children}
  </StyledOption>
);

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
            key={`${index}-${detailText}`}
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
  const { description, label, metaData, value } = option;

  return (
    <Option key={value} muiProps={muiProps}>
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
  icon: ReactElement;
  detailText: string | number;
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
  noOptionsText,
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
      const { key, ...restMuiProps } = muiProps;

      if (isLabelOnly) {
        return (
          <div key={key}>
            <OptionLabelOnlyComponent
              muiProps={restMuiProps}
              odysseyDesignTokens={odysseyDesignTokens}
              option={option}
            />
          </div>
        );
      }

      if (hasMetadata) {
        return (
          <div key={key}>
            <OptionLabelDescriptionMetadata
              muiProps={restMuiProps}
              odysseyDesignTokens={odysseyDesignTokens}
              option={option}
            />
          </div>
        );
      }

      return (
        <div key={key}>
          <OptionLabelDescription
            muiProps={restMuiProps}
            odysseyDesignTokens={odysseyDesignTokens}
            option={option}
          />
        </div>
      );
    },
    [odysseyDesignTokens],
  );

  return (
    <ComposablePicker<OptionType, HasMultipleChoices, IsCustomValueAllowed>
      ariaDescribedBy={ariaDescribedBy}
      defaultValue={defaultValue}
      errorMessage={errorMessage}
      errorMessageList={errorMessageList}
      getIsOptionEqualToValue={getIsOptionEqualToValue}
      // getOptionLabel={// getOptionLabel}
      hasMultipleChoices={hasMultipleChoices}
      id={idOverride}
      inputValue={inputValue}
      isCustomValueAllowed={isCustomValueAllowed}
      isDisabled={isDisabled}
      isFullWidth={isFullWidth}
      isLoading={isLoading}
      isOptional={isOptional}
      isReadOnly={isReadOnly}
      isVirtualized={isVirtualizedProp}
      hint={hint}
      HintLinkComponent={HintLinkComponent}
      label={label}
      name={nameOverride}
      noOptionsText={noOptionsText}
      onBlur={onBlur}
      onChange={onChangeProp}
      onInputChange={onInputChangeProp}
      onFocus={onFocus}
      options={options}
      renderOption={customOptionRender}
      value={value}
      testId={testId}
      translate={translate}
    />
  );
};

// Need the `as BasePickerType` because generics don't get passed through
const MemoizedPicker = memo(Picker) as BasePickerType;

MemoizedPicker.displayName = "Picker";

export { MemoizedPicker as Picker };
