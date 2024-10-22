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

import { Box } from "../../Box";
import {
  ComposablePicker,
  ComposablePickerProps,
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
  type Metadata,
  Option,
  OptionDescriptionComponent,
  OptionLabelContainer,
  OptionMetadataComponent,
  OptionProps,
} from "./BasicPicker";
import { Heading6 } from "../../Typography";
import { Tag } from "../../Tag";

type Adornment = ReactNode | string;

type AdornmentLabelDescription = LabelDescription & {
  adornment: Adornment;
};

type AdornmentLabelDescriptionMetadata = AdornmentLabelDescription & Metadata;

export type AdornmentOptionType =
  | AdornmentLabelDescription
  | AdornmentLabelDescriptionMetadata;

const OptionAdornmentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "adornmentSize" &&
    prop !== "isTagContainer",
})<{
  adornmentSize?: AdornmentSize;
  isTagContainer?: boolean;
  odysseyDesignTokens: DesignTokens;
}>(
  ({
    adornmentSize = "small",
    isTagContainer = false,
    odysseyDesignTokens,
  }) => ({
    position: "relative",
    // push icon up by one px for better visual alignment
    bottom: "1px",
    alignSelf: "flex-start",
    width: odysseyDesignTokens.Spacing5,
    height: odysseyDesignTokens.Spacing5,
    overflow: "hidden",
    marginInlineEnd: odysseyDesignTokens.Spacing3,

    svg: {
      width: "100%",
      height: "auto",
    },

    img: {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "100%",
      transform: "translate(-50%, -50%)",
    },

    ...(adornmentSize === "large" &&
      !isTagContainer && {
        bottom: 0,
        width: odysseyDesignTokens.Spacing8,
        height: odysseyDesignTokens.Spacing8,
      }),

    ...(isTagContainer && {
      bottom: 0,
      alignSelf: "center",
      width: odysseyDesignTokens.Spacing4,
      height: "auto",
      maxHeight: odysseyDesignTokens.Spacing4,
      marginInlineEnd: odysseyDesignTokens.Spacing2,

      svg: {
        display: "flex",
        width: "100%",
        height: "auto",
      },
    }),
  }),
);

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
  const isImageAdornment = typeof adornment === "string";

  if (isImageAdornment) {
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
        {adornment}
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

const OptionWithLabelDescriptionMetadata = <
  OptionType extends AdornmentLabelDescriptionMetadata,
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
        <OptionMetadataComponent
          metaData={metaData}
          odysseyDesignTokens={odysseyDesignTokens}
        />
      </div>
    </Option>
  );
};

type TagAdornmentProps = {
  adornment: Adornment;
};

const TagAdornment = ({ adornment }: TagAdornmentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const isImageAdornment = typeof adornment === "string";

  if (isImageAdornment) {
    return (
      <OptionAdornmentContainer
        isTagContainer
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <img src={adornment} alt="" role="presentation" />
      </OptionAdornmentContainer>
    );
  }

  return (
    <OptionAdornmentContainer
      isTagContainer
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {adornment}
    </OptionAdornmentContainer>
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
    OptionType extends AdornmentLabelDescriptionMetadata,
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
  groupOptionsBy,
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
}: PickerWithOptionAdornmentProps<
  OptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const customTagRender = useCallback<
    NonNullable<
      ComposablePickerProps<
        OptionType,
        HasMultipleChoices,
        IsCustomValueAllowed
      >["renderTags"]
    >
  >(
    (values, getTagProps) =>
      values.map((value, index) => {
        const { key, onDelete } = getTagProps({ index });
        const { adornment, label } = value;

        return (
          <Box
            key={key}
            sx={{
              margin: odysseyDesignTokens.Spacing1,
              marginInlineEnd: 0,
            }}
          >
            <Tag
              icon={<TagAdornment adornment={adornment} />}
              label={label}
              onRemove={onDelete}
            />
          </Box>
        );
      }),
    [odysseyDesignTokens],
  );

  const customOptionRender = useCallback<
    (props: HTMLAttributes<HTMLLIElement>, option: OptionType) => ReactNode
  >(
    (muiProps, option) => {
      const hasMetadata = "metaData" in option && option.metaData;

      if (hasMetadata) {
        return (
          <OptionWithLabelDescriptionMetadata
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
      groupOptionsBy={groupOptionsBy}
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
      renderTags={customTagRender}
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
