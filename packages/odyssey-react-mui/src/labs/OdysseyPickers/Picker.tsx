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

// import { AutocompleteProps } from "../../Autocomplete";
import { AdaptablePicker, type BasePickerProps } from "./AdaptablePicker";
import { Heading6 } from "../../Typography";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
// import { Title } from "@mui/icons-material";
// import { useAutocomplete } from "../useAutocomplete";

export const StyledOption = styled.li<{ hasAdornment?: boolean }>(
  ({ hasAdornment }) => ({
    ...(!hasAdornment && {
      display: "block !important",
    }),
  }),
);

// const OptionAdornmentContainer = styled("div", {
//   shouldForwardProp: (prop) =>
//     prop !== "odysseyDesignTokens" && prop !== "isLogo",
// })<{ isLogo?: boolean; odysseyDesignTokens: DesignTokens }>(
//   ({ isLogo, odysseyDesignTokens }) => ({
//     position: "relative",
//     overflow: "hidden",
//     width: isLogo ? odysseyDesignTokens.Spacing8 : odysseyDesignTokens.Spacing5,
//     height: isLogo
//       ? odysseyDesignTokens.Spacing8
//       : odysseyDesignTokens.Spacing5,
//     marginInlineEnd: odysseyDesignTokens.Spacing3,

//     ...(!isLogo && {
//       alignSelf: "flex-start",
//       // push icon up by one px for better visual alignment
//       bottom: "1px",
//     }),

//     svg: {
//       width: "100%",
//       height: "auto",
//     },

//     img: {
//       position: "absolute",
//       top: "50%",
//       width: "100%",
//       transform: "translateY(-50%)",
//     },
//   }),
// );

// const OptionContent = styled("div", {
//   shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
// })<{ odysseyDesignTokens: DesignTokens }>(({  }) => ({
//   // paddingInlineStart: `calc(
//   //   ${odysseyDesignTokens.Spacing3} + ${odysseyDesignTokens.Spacing5}
//   // )`,
// }));

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

// type OptionIconProps = {
//   icon: IconLabelDescription["icon"];
//   odysseyDesignTokens: DesignTokens;
// };

// const OptionIcon = ({ icon, odysseyDesignTokens }: OptionIconProps) => {
//   const isImageLogo = typeof icon === "string";

//   if (isImageLogo) {
//     return (
//       <OptionAdornmentContainer odysseyDesignTokens={odysseyDesignTokens}>
//         {/* NOTE: Intentionally leaving alt as an empty string here so screen readers will ignore this image */}
//         {/* Image should be suffciently described by the adjacent title and/or description of the option */}
//         <img src={icon} alt="" role="presentation" />
//       </OptionAdornmentContainer>
//     );
//   } else {
//     return (
//       <OptionAdornmentContainer odysseyDesignTokens={odysseyDesignTokens}>
//         {icon}
//       </OptionAdornmentContainer>
//     );
//   }
// };

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

// type OptionLogoProps = {
//   logo: LogoLabelDescription["logo"];
//   odysseyDesignTokens: DesignTokens;
// };

// const OptionLogo = ({ logo, odysseyDesignTokens }: OptionLogoProps) => {
//   const isImageLogo = typeof logo === "string";

//   if (isImageLogo) {
//     return (
//       <OptionAdornmentContainer
//         isLogo
//         odysseyDesignTokens={odysseyDesignTokens}
//       >
//         {/* NOTE: Intentionally leaving alt as an empty string here so screen readers will ignore this image */}
//         {/* Image should be suffciently described by the adjacent title and/or description of the option */}
//         <img src={logo} alt="" role="presentation" />
//       </OptionAdornmentContainer>
//     );
//   } else {
//     return (
//       <OptionAdornmentContainer
//         isLogo
//         odysseyDesignTokens={odysseyDesignTokens}
//       >
//         {logo}
//       </OptionAdornmentContainer>
//     );
//   }
// };

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

// const OptionIconLabelDescription = <OptionType extends IconLabelDescription>({
//   muiProps,
//   odysseyDesignTokens,
//   option,
// }: BaseOptionProps & OptionProps<OptionType>) => {
//   const { description, icon, label, value } = option;
//   return (
//     <Option hasAdornment key={value} muiProps={muiProps}>
//       <OptionIcon icon={icon} odysseyDesignTokens={odysseyDesignTokens} />
//       <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
//         <Heading6 component="p">{label}</Heading6>
//         <OptionDescriptionComponent
//           description={description}
//           odysseyDesignTokens={odysseyDesignTokens}
//         />
//       </OptionLabelContainer>
//     </Option>
//   );
// };

// const OptionLogoLabelDescription = <OptionType extends LogoLabelDescription>({
//   muiProps,
//   odysseyDesignTokens,
//   option,
// }: BaseOptionProps & OptionProps<OptionType>) => {
//   const { description, label, logo, value } = option;
//   return (
//     <Option hasAdornment key={value} muiProps={muiProps}>
//       <OptionLogo logo={logo} odysseyDesignTokens={odysseyDesignTokens} />
//       <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
//         <Heading6 component="p">{label}</Heading6>
//         <OptionDescriptionComponent
//           description={description}
//           odysseyDesignTokens={odysseyDesignTokens}
//         />
//       </OptionLabelContainer>
//     </Option>
//   );
// };

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

// const OptionIconLabelDescriptionMetaData = <
//   OptionType extends IconLabelDescriptionMetadata,
// >({
//   muiProps,
//   odysseyDesignTokens,
//   option,
// }: BaseOptionProps & OptionProps<OptionType>) => {
//   const { description, icon, label, metaData, value } = option;

//   return (
//     <Option hasAdornment key={value} muiProps={muiProps}>
//       <OptionIcon icon={icon} odysseyDesignTokens={odysseyDesignTokens} />
//       <div>
//         <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
//           <Heading6 component="p">{label}</Heading6>
//           <OptionDescriptionComponent
//             description={description}
//             odysseyDesignTokens={odysseyDesignTokens}
//           />
//         </OptionLabelContainer>
//         <OptionMetaDataComponent
//           metaData={metaData}
//           odysseyDesignTokens={odysseyDesignTokens}
//         />
//       </div>
//     </Option>
//   );
// };

// const OptionLogoLabelDescriptionMetaData = <
//   OptionType extends LogoLabelDescriptionMetadata,
// >({
//   muiProps,
//   odysseyDesignTokens,
//   option,
// }: BaseOptionProps & OptionProps<OptionType>) => {
//   const { description, label, logo, metaData, value } = option;

//   return (
//     <Option hasAdornment key={value} muiProps={muiProps}>
//       <OptionLogo logo={logo} odysseyDesignTokens={odysseyDesignTokens} />
//       <div>
//         <OptionLabelContainer odysseyDesignTokens={odysseyDesignTokens}>
//           <Heading6 component="p">{label}</Heading6>
//           <OptionDescriptionComponent
//             description={description}
//             odysseyDesignTokens={odysseyDesignTokens}
//           />
//         </OptionLabelContainer>
//         <OptionMetaDataComponent
//           metaData={metaData}
//           odysseyDesignTokens={odysseyDesignTokens}
//         />
//       </div>
//     </Option>
//   );
// };

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
// type IconLabelDescription = LabelDescription & {
//   icon: ReactNode | string;
// };
// type IconLabelDescriptionMetadata = IconLabelDescription & MetaData;
// type LogoLabelDescription = LabelDescription & {
//   logo: ReactNode | string;
// };
// type LogoLabelDescriptionMetadata = LogoLabelDescription & MetaData;

// type OptionsWithIcon = IconLabelDescription | IconLabelDescriptionMetadata;
// type OptionsWithLogo = LogoLabelDescription | LogoLabelDescriptionMetadata;

// export type AdaptablePickerOptionType =
//   | LabelDescription
//   | LabelDescriptionMetaData
//   | OptionsWithIcon
//   | OptionsWithLogo;
// type Small = {
//   adornmentSize: "small"
// }
// type Large = {
//   adornmentSize: "small";
// };

// type RenderOptionComponentProps<OptionType> = {
//   // muiProps:
//   option: OptionType;
// }

// const OptionComponent = <OptionType extends string>({ option }: RenderOptionComponentProps<OptionType>) => {
//   return (
//     <></>
//   )
// }
// const SmallOption = () => <div>Small Option</div>;
// const LargeOption = () => <p>Large Option</p>;
// type OptionComponent =
//   | ReturnType<typeof SmallOption>
//   | ReturnType<typeof LargeOption>;
// type RenderOption = (props: unknown, option: unknown) => OptionComponent;

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
      // const hasIcon = "icon" in option && option.icon;
      // const hasLogo = "logo" in option && option.logo;
      // const hasNoLogoOrIcon = !hasLogo && !hasIcon;
      const hasMetaData = "metaData" in option && option.metaData;
      // const hasIconAndMetaData = hasIcon && hasMetaData;
      // const hasLogoAndMetaData = hasLogo && hasMetaData;

      // if (hasOptionsThatHaveLogo) {
      //   console.log("hey")
      //   if (hasMetaData) {
      //     return (
      //       <OptionLogoLabelDescriptionMetaData
      //         muiProps={muiProps}
      //         odysseyDesignTokens={odysseyDesignTokens}
      //         option={{...option, logo: option?.logo || }}
      //       />
      //     );
      //   }

      //   if (hasLogo && !hasMetaData) {
      //     return (
      //       <OptionLogoLabelDescription
      //         muiProps={muiProps}
      //         odysseyDesignTokens={odysseyDesignTokens}
      //         option={option}
      //       />
      //     );
      //   }
      // }

      // if (hasIconAndMetaData) {
      //   return (
      //     <OptionIconLabelDescriptionMetaData
      //       muiProps={muiProps}
      //       odysseyDesignTokens={odysseyDesignTokens}
      //       option={option}
      //     />
      //   );
      // }

      // if (hasLogoAndMetaData) {
      //   return (
      //     <OptionLogoLabelDescriptionMetaData
      //       muiProps={muiProps}
      //       odysseyDesignTokens={odysseyDesignTokens}
      //       option={option}
      //     />
      //   );
      // }

      // if (hasIcon && !hasMetaData) {
      //   return (
      //     <OptionIconLabelDescription
      //       muiProps={muiProps}
      //       odysseyDesignTokens={odysseyDesignTokens}
      //       option={option}
      //     />
      //   );
      // }

      // if (hasLogo && !hasMetaData) {
      //   return (
      //     <OptionLogoLabelDescription
      //       muiProps={muiProps}
      //       odysseyDesignTokens={odysseyDesignTokens}
      //       option={option}
      //     />
      //   );
      // }

      // if (hasNoLogoOrIcon && hasMetaData) {
      //   return (
      //     <OptionLabelDescriptionMetaData
      //       muiProps={muiProps}
      //       odysseyDesignTokens={odysseyDesignTokens}
      //       option={option}
      //     />
      //   );
      // }

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

// Need the `typeof Autocomplete` because generics don't get passed through
const MemoizedPicker = memo(Picker) as typeof AdaptablePicker;
// @ts-expect-error displayName is expected to not be on `typeof AdaptablePicker`
MemoizedPicker.displayName = "Picker";

export { MemoizedPicker as Picker };
// const TitleDescription = (
//   props: PickerProps<
//     TitleDescription,
//     boolean | undefined,
//     boolean | undefined
//   >,
// ) => (
//   <AdaptablePicker<TitleDescription, boolean | undefined, boolean | undefined> {...props} />
// );

// AdaptablePicker.TitleDescription = TitleDescription;

// const IconTitleDescription = (
//   props: BasePickerProps<
//     IconTitleDescription,
//     boolean | undefined,
//     boolean | undefined
//   >,
// ) => (
//   <AdaptablePicker<
//     IconTitleDescription,
//     boolean | undefined,
//     boolean | undefined
//   >
//     {...props}
//   />
// );

// AdaptablePicker.IconTitleDescription = IconTitleDescription;

// const IconTitleDescriptionMetadata = (
//   props: BasePickerProps<
//     IconTitleDescriptionMetadata,
//     boolean | undefined,
//     boolean | undefined
//   >,
// ) => (
//   <AdaptablePicker<
//     IconTitleDescriptionMetadata,
//     boolean | undefined,
//     boolean | undefined
//   >
//     {...props}
//   />
// );

// AdaptablePicker.IconTitleDescriptionMetadata = IconTitleDescriptionMetadata;
