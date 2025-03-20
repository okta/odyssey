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
} from "./ComposablePicker.js";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import {
  type BaseOptionProps,
  type LabelDescription,
  type Metadata,
  Option,
  OptionDescriptionComponent,
  OptionLabelContainer,
  OptionMetadataComponent,
  OptionProps,
} from "./Picker.js";
import { Heading6 } from "../../Typography.js";

type Adornment = ReactNode | string;
type ExtraType = {
  content: ReactNode | string;
  size?: AdornmentSize;
  onClick: () => void;
};

type AdornmentLabelDescription = LabelDescription & {
  adornment: Adornment;
  extra?: ExtraType;
  onClick?: () => void;
  isInteractive?: boolean;
};

export type CustomOptionType = AdornmentLabelDescription & Partial<Metadata>;

const OptionAdornmentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "adornmentSize" &&
    prop !== "isTagContainer",
})<{
  adornmentSize?: AdornmentSize;
  isTagContainer?: boolean;
  odysseyDesignTokens: DesignTokens;
  position?: "left" | "right";
}>(
  ({
    adornmentSize = "small",
    isTagContainer = false,

    odysseyDesignTokens,
    position = "left",
  }) => ({
    position: "relative",
    // push icon up by one px for better visual alignment
    bottom: "1px",
    alignSelf: "flex-start",
    width: odysseyDesignTokens.Spacing5,
    height: odysseyDesignTokens.Spacing5,
    overflow: "hidden",

    ...(position === "left" && {
      marginInlineEnd: odysseyDesignTokens.Spacing3,
    }),
    ...(position === "right" && {
      marginInlineStart: odysseyDesignTokens.Spacing3,
    }),

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

type ExtraProps = {
  content: Adornment;
  size?: AdornmentSize;
  odysseyDesignTokens: DesignTokens;
  onClick: () => void;
};

const CustomOptionContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(() => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
}));

const CustomOptionLeftContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(() => ({
  display: "flex",
}));

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

const Extra = ({ content, size, odysseyDesignTokens, onClick }: ExtraProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <OptionAdornmentContainer
      adornmentSize={size}
      odysseyDesignTokens={odysseyDesignTokens}
      onClick={handleClick}
    >
      {content}
    </OptionAdornmentContainer>
  );
};

const CustomOption = <OptionType extends CustomOptionType>({
  adornmentSize,
  muiProps,
  odysseyDesignTokens,
  option,
}: BaseOptionProps &
  OptionProps<OptionType> & {
    adornmentSize: AdornmentSize;
  }) => {
  const {
    adornment,
    description,
    label,
    metaData,
    extra,
    value,
    onClick,
    isInteractive = true,
  } = option;

  const handleOptionClick = (event: React.MouseEvent) => {
    if (!isInteractive) {
      event.preventDefault();
      return;
    }
    event.stopPropagation();
    onClick?.();
  };

  return (
    <Option
      hasAdornment
      key={value}
      muiProps={{
        ...muiProps,
        onClick: isInteractive ? handleOptionClick : undefined,
        "aria-disabled": !isInteractive ? "true" : undefined,
        role: "option",
      }}
    >
      <CustomOptionContainer odysseyDesignTokens={odysseyDesignTokens}>
        <CustomOptionLeftContainer odysseyDesignTokens={odysseyDesignTokens}>
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
            {metaData && (
              <OptionMetadataComponent
                metaData={metaData}
                odysseyDesignTokens={odysseyDesignTokens}
              />
            )}
          </div>
        </CustomOptionLeftContainer>
        {extra && (
          <Extra
            content={extra.content}
            size={extra.size || adornmentSize}
            onClick={extra.onClick}
            odysseyDesignTokens={odysseyDesignTokens}
          />
        )}
      </CustomOptionContainer>
    </Option>
  );
};

export type SearchDropdownProps<
  OptionType extends CustomOptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = BasePickerProps<OptionType, HasMultipleChoices, IsCustomValueAllowed> & {
  adornmentSize?: AdornmentSize;
};

type PickerWithOptionAdornmentComponentType = {
  <
    OptionType extends CustomOptionType,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: SearchDropdownProps<
      OptionType,
      HasMultipleChoices,
      IsCustomValueAllowed
    >,
  ): ReactElement;
  <
    OptionType extends CustomOptionType,
    HasMultipleChoices extends boolean | undefined,
    IsCustomValueAllowed extends boolean | undefined,
  >(
    props: SearchDropdownProps<
      OptionType,
      HasMultipleChoices,
      IsCustomValueAllowed
    >,
  ): ReactElement;
};

const SearchDropdown: PickerWithOptionAdornmentComponentType = <
  OptionType extends CustomOptionType,
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
}: SearchDropdownProps<
  OptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const customOptionRender = useCallback<
    (props: HTMLAttributes<HTMLLIElement>, option: OptionType) => ReactNode
  >(
    (muiProps, option) => {
      return (
        <CustomOption
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
      value={value}
      testId={testId}
      translate={translate}
    />
  );
};

// Need the `as BasePickerType` because generics don't get passed through
const MemoizedSearchDropdown = memo(SearchDropdown) as BasePickerType;

MemoizedSearchDropdown.displayName = "MemoizedSearchDropdown";

export { MemoizedSearchDropdown as SearchDropdown };
