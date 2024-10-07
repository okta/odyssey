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
  ReactElement,
  ReactNode,
  useCallback,
} from "react";
import styled from "@emotion/styled";

import {
  ComposablePicker,
  type AdornmentSize,
  type BasePickerProps,
  type BasePickerType,
} from "./ComposablePicker";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
import {
  type BaseOptionProps,
  type LabelDescription,
  type MetaData,
  Option,
  OptionDescriptionComponent,
  OptionLabelContainer,
  OptionMetaDataComponent,
  OptionProps,
} from "./BasicPicker";
import { Heading6 } from "../../Typography";

type Adornment = ReactNode | string;

type AdornmentLabelDescription = LabelDescription & {
  adornment: Adornment;
};

type AdornmentLabelDescriptionMetaData = AdornmentLabelDescription & MetaData;

export type AdornmentOptionType =
  | AdornmentLabelDescription
  | AdornmentLabelDescriptionMetaData;

const OptionAdornmentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "adornmentSize",
})<{
  adornmentSize: AdornmentSize;
  odysseyDesignTokens: DesignTokens;
}>(({ adornmentSize, odysseyDesignTokens }) => ({
  position: "relative",
  // push icon up by one px for better visual alignment
  bottom: "1px",
  alignSelf: "flex-start",
  width: odysseyDesignTokens.Spacing5,
  height: odysseyDesignTokens.Spacing5,
  overflow: "hidden",
  marginInlineEnd: odysseyDesignTokens.Spacing3,

  ...(adornmentSize === "large" && {
    // display: "flex",
    // alignItems: "center",
    bottom: 0,
    width: odysseyDesignTokens.Spacing8,
    height: odysseyDesignTokens.Spacing8,
  }),

  svg: {
    width: "100%",
    height: "auto",
  },

  img: {
    position: "absolute",
    top: "50%",
    width: "100%",
    transform: "translateY(-50%)",
  },
}));

type OptionAdornmentProps = {
  adornment: Adornment;
  adornmentSize: AdornmentSize;
  odysseyDesignTokens: DesignTokens;
};

const OptionAdornment = ({
  adornment,
  adornmentSize,
  odysseyDesignTokens,
}: OptionAdornmentProps) => {
  const isImageLogo = typeof adornment === "string";

  if (isImageLogo) {
    return (
      <OptionAdornmentContainer
        adornmentSize={adornmentSize}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {/* NOTE: Intentionally leaving alt as an empty string here so screen readers will ignore this image */}
        {/* Image should be suffciently described by the adjacent title and/or description of the option */}
        <img src={adornment} alt="" role="presentation" />
      </OptionAdornmentContainer>
    );
  } else {
    return (
      <OptionAdornmentContainer
        adornmentSize={adornmentSize}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <>{adornment}</>
      </OptionAdornmentContainer>
    );
  }
};

const OptionWithLabelDescriptionOnly = <
  OptionType extends AdornmentLabelDescription,
>({
  adornmentSize,
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps &
  OptionProps<OptionType> & { adornmentSize: AdornmentSize }) => {
  const { adornment, description, label, value } = option;
  return (
    <Option hasAdornment key={value} muiProps={muiProps}>
      <OptionAdornment
        adornment={adornment}
        adornmentSize={adornmentSize}
        odysseyDesignTokens={odysseyDesignTokens}
      />
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

const OptionWithLabelDescriptionMetaData = <
  OptionType extends AdornmentLabelDescriptionMetaData,
>({
  adornmentSize,
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps &
  OptionProps<OptionType> & {
    adornmentSize: AdornmentSize;
  }) => {
  const { adornment, description, label, metaData, value } = option;

  return (
    <Option hasAdornment key={value} muiProps={muiProps}>
      <OptionAdornment
        adornment={adornment}
        adornmentSize={adornmentSize}
        odysseyDesignTokens={odysseyDesignTokens}
      />
      <div>
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
      </div>
    </Option>
  );
};

export type PickerWithOptionAdornmentProps<
  OptionType extends AdornmentOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = BasePickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed> & {
  adornmentSize?: AdornmentSize;
};

type PickerWithOptionAdornmentComponentType = {
  <
    OptionType extends AdornmentLabelDescription,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerWithOptionAdornmentProps<
      OptionType,
      HasMultipleChoices,
      IsCustomValueAllowed
    >,
  ): ReactElement;
  <
    OptionType extends AdornmentLabelDescriptionMetaData,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: PickerWithOptionAdornmentProps<
      OptionType,
      HasMultipleChoices,
      IsCustomValueAllowed
    >,
  ): ReactElement;
};

const PickerWithOptionAdornment: PickerWithOptionAdornmentComponentType = <
  OptionType extends AdornmentOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  adornmentSize = "small",
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
  // renderTags,
  value,
  testId,
  translate,
}: PickerWithOptionAdornmentProps<
  OptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const customOptionRender = useCallback<
    (props: HTMLAttributes<HTMLLIElement>, option: OptionType) => ReactNode
  >(
    (muiProps, option) => {
      const hasMetaData = "metaData" in option && option.metaData;

      if (hasMetaData) {
        return (
          <OptionWithLabelDescriptionMetaData
            adornmentSize={adornmentSize}
            muiProps={muiProps}
            odysseyDesignTokens={odysseyDesignTokens}
            option={option}
          />
        );
      }

      return (
        <OptionWithLabelDescriptionOnly
          adornmentSize={adornmentSize}
          muiProps={muiProps}
          odysseyDesignTokens={odysseyDesignTokens}
          option={option}
        />
      );
    },
    [adornmentSize, odysseyDesignTokens],
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
const MemoizedPickerWithOptionAdornment = memo(
  PickerWithOptionAdornment,
) as BasePickerType;

MemoizedPickerWithOptionAdornment.displayName = "PickerWithOptionAdornment";

export { MemoizedPickerWithOptionAdornment as PickerWithOptionAdornment };
