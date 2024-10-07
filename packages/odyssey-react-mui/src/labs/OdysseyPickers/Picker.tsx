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

import {
  AdaptablePicker,
  type BasePickerProps,
  type BasePickerType,
} from "./AdaptablePicker";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Heading6 } from "../../Typography";

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
  key: string | number;
  muiProps: BaseOptionProps["muiProps"];
};

export const Option = ({
  children,
  hasAdornment = false,
  key,
  muiProps,
}: PropsWithChildren<OptionComponentProps>) => (
  <StyledOption {...muiProps} hasAdornment={hasAdornment} key={key}>
    {children}
  </StyledOption>
);

export const OptionMetaDataComponent = ({
  metaData,
  odysseyDesignTokens,
}: {
  metaData: OptionMetaData[];
  odysseyDesignTokens: DesignTokens;
}) => {
  return (
    <OptionDetails odysseyDesignTokens={odysseyDesignTokens}>
      {metaData.map((meta: OptionMetaData, index: number) => {
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

const OptionLabelDescription = <OptionType extends LabelDescription>({
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps & OptionProps<OptionType>) => {
  const { description, label, value } = option;

  return (
    <Option muiProps={muiProps} key={value}>
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

const OptionLabelDescriptionMetaData = <
  OptionType extends LabelDescriptionMetaData,
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
      <OptionMetaDataComponent
        metaData={metaData}
        odysseyDesignTokens={odysseyDesignTokens}
      />
    </Option>
  );
};

export type OptionMetaData = {
  icon: ReactElement;
  detailText: string | number;
};

export type Value = { value: string | number };
export type MetaData = {
  metaData: OptionMetaData[];
};

export type LabelDescription = Value & { label: string; description?: string };
export type LabelDescriptionMetaData = LabelDescription & MetaData;

export type PickerProps<
  OptionType extends LabelDescription | LabelDescriptionMetaData,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = BasePickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>;

export type PickerComponentType = {
  <
    OptionType extends LabelDescription,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  ): ReactElement;
  <
    OptionType extends LabelDescriptionMetaData,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  ): ReactElement;
};

const Picker: PickerComponentType = <
  OptionType extends LabelDescription | LabelDescriptionMetaData,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  ariaDescribedBy,
  defaultValue,
  errorMessage,
  errorMessageList,
  getIsOptionEqualToValue,
  // getOptionLabel,
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
  // renderOption,
  // renderTags,
  value,
  testId,
  translate,
}: PickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const customOptionRender = useCallback<
    (props: HTMLAttributes<HTMLLIElement>, option: OptionType) => ReactNode
  >(
    (muiProps, option) => {
      console.log("rendering picker", { option });
      const hasMetaData = "metaData" in option && option.metaData;

      if (hasMetaData) {
        return (
          <OptionLabelDescriptionMetaData
            muiProps={muiProps}
            odysseyDesignTokens={odysseyDesignTokens}
            option={option}
          />
        );
      }

      return (
        <OptionLabelDescription
          muiProps={muiProps}
          odysseyDesignTokens={odysseyDesignTokens}
          option={option}
        />
      );
    },
    [odysseyDesignTokens],
  );

  return (
    <AdaptablePicker<OptionType, HasMultipleChoices, IsCustomValueAllowed>
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
      onBlur={onBlur}
      onChange={onChangeProp}
      onInputChange={onInputChangeProp}
      onFocus={onFocus}
      options={options}
      renderOption={customOptionRender}
      // renderTags={// renderTags}
      value={value}
      testId={testId}
      translate={translate}
    />
  );
};

// Need the `as BasePickerType` because generics don't get passed through
const MemoizedPicker = memo(Picker) as BasePickerType;
// @ts-expect-error displayName is expected to not be on `typeof AdaptablePicker`
MemoizedPicker.displayName = "Picker";

export { MemoizedPicker as Picker };
