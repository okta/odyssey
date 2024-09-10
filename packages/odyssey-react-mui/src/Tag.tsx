/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";
import { memo, ReactElement, useCallback, useContext } from "react";
import styled from "@emotion/styled";
import { TagListContext } from "./TagListContext";
import { MuiPropsContext, MuiPropsContextType } from "./MuiPropsContext";
import { HtmlProps } from "./HtmlProps";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";
import { CloseCircleFilledIcon } from "./icons.generated";

export const tagColorVariants = [
  "default",
  "info",
  "accentOne",
  "accentTwo",
  "accentThree",
  "accentFour",
] as const;

type TagColorVariant = (typeof tagColorVariants)[number];

export type TagProps = {
  icon?: ReactElement;
  isDisabled?: boolean;
  /**
   * The label text for the Tag
   */
  label: string;
  /**
   * Callback fired when the Tag is clicked
   */
  onClick?: MuiChipProps["onClick"];
  /**
   * Callback fired when the remove button of the Tag is clicked
   */
  onRemove?: MuiChipProps["onDelete"];
  /**
   * Color variant of the Tag, affecting its appearance
   */
  colorVariant?: TagColorVariant;
} & Pick<HtmlProps, "testId" | "translate">;

const getChipColors = (
  colorVariant: TagColorVariant,
  odysseyDesignTokens: DesignTokens,
) => {
  const colors = {
    default: {
      background: odysseyDesignTokens.HueNeutral100,
      hover: odysseyDesignTokens.HueNeutral200,
      active: odysseyDesignTokens.HueNeutral300,
      text: odysseyDesignTokens.HueNeutral700,
      border: odysseyDesignTokens.HueNeutral200,
      deleteIcon: odysseyDesignTokens.HueNeutral500,
      deleteIconHover: odysseyDesignTokens.HueNeutral600,
    },
    info: {
      background: odysseyDesignTokens.HueBlue100,
      hover: odysseyDesignTokens.HueBlue200,
      active: odysseyDesignTokens.HueBlue300,
      text: odysseyDesignTokens.HueBlue700,
      border: odysseyDesignTokens.HueBlue200,
      deleteIcon: odysseyDesignTokens.HueBlue500,
      deleteIconHover: odysseyDesignTokens.HueBlue600,
    },
    accentOne: {
      background: odysseyDesignTokens.HueAccentOne100,
      hover: odysseyDesignTokens.HueAccentOne200,
      active: odysseyDesignTokens.HueAccentOne300,
      text: odysseyDesignTokens.HueAccentOne700,
      border: odysseyDesignTokens.HueAccentOne200,
      deleteIcon: odysseyDesignTokens.HueAccentOne500,
      deleteIconHover: odysseyDesignTokens.HueAccentOne600,
    },
    accentTwo: {
      background: odysseyDesignTokens.HueAccentTwo100,
      hover: odysseyDesignTokens.HueAccentTwo200,
      active: odysseyDesignTokens.HueAccentTwo300,
      text: odysseyDesignTokens.HueAccentTwo700,
      border: odysseyDesignTokens.HueAccentTwo200,
      deleteIcon: odysseyDesignTokens.HueAccentTwo500,
      deleteIconHover: odysseyDesignTokens.HueAccentTwo600,
    },
    accentThree: {
      background: odysseyDesignTokens.HueAccentThree100,
      hover: odysseyDesignTokens.HueAccentThree200,
      active: odysseyDesignTokens.HueAccentThree300,
      text: odysseyDesignTokens.HueAccentThree700,
      border: odysseyDesignTokens.HueAccentThree200,
      deleteIcon: odysseyDesignTokens.HueAccentThree500,
      deleteIconHover: odysseyDesignTokens.HueAccentThree600,
    },
    accentFour: {
      background: odysseyDesignTokens.HueAccentFour100,
      hover: odysseyDesignTokens.HueAccentFour200,
      active: odysseyDesignTokens.HueAccentFour300,
      text: odysseyDesignTokens.HueAccentFour700,
      border: odysseyDesignTokens.HueAccentFour200,
      deleteIcon: odysseyDesignTokens.HueAccentFour500,
      deleteIconHover: odysseyDesignTokens.HueAccentFour600,
    },
  };

  return colors[colorVariant] || colors.default;
};

const StyledTag = styled(MuiChip, {
  shouldForwardProp: (prop) =>
    !["colorVariant", "odysseyDesignTokens"].includes(prop as string),
})<{
  colorVariant: TagColorVariant;
  odysseyDesignTokens: DesignTokens;
  as?: React.ElementType; // Allow the 'as' prop to be forwarded
}>(({ colorVariant, odysseyDesignTokens }) => {
  const colors = getChipColors(colorVariant, odysseyDesignTokens);

  return {
    height: "auto",
    paddingBlock: `calc(${odysseyDesignTokens.Spacing2} - ${odysseyDesignTokens.BorderWidthMain})`,
    paddingInline: odysseyDesignTokens.Spacing3,
    fontSize: odysseyDesignTokens.TypographySizeBody,
    lineHeight: odysseyDesignTokens.TypographyLineHeightUi,
    borderRadius: odysseyDesignTokens.BorderRadiusRound,
    borderWidth: odysseyDesignTokens.BorderWidthMain,
    borderStyle: odysseyDesignTokens.BorderStyleMain,
    backgroundColor: colors.background,
    color: colors.text,
    borderColor: colors.border,

    "&.MuiChip-clickable:hover": {
      backgroundColor: colors.hover,
    },

    "&.MuiChip-clickable:active": {
      backgroundColor: colors.active,
    },

    "&.Mui-disabled": {
      opacity: 1,
      pointerEvents: "none",
      borderColor: odysseyDesignTokens.BorderColorDisabled,
      color: odysseyDesignTokens.TypographyColorDisabled,

      "& .MuiChip-deleteIcon": {
        color: odysseyDesignTokens.HueNeutral300,
      },
    },

    "& .MuiChip-icon": {
      margin: 0,
      marginInlineEnd: odysseyDesignTokens.Spacing1,
    },

    "& .MuiChip-deleteIcon": {
      WebkitTapHighlightColor: "transparent",
      color: colors.deleteIcon,
      fontSize: "1em",
      cursor: "pointer",
      margin: 0,
      marginInlineStart: odysseyDesignTokens.Spacing2,

      "&:hover": {
        color: colors.deleteIconHover,
      },
    },

    "& .MuiChip-label": {
      padding: 0,
    },
  };
});

const Tag = ({
  icon,
  isDisabled,
  label,
  onClick,
  onRemove,
  testId,
  translate,
  colorVariant = "default",
}: TagProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { chipElementType } = useContext(TagListContext);

  const renderTag = useCallback(
    (muiProps: MuiPropsContextType) => (
      <StyledTag
        {...muiProps}
        as={chipElementType}
        aria-disabled={isDisabled}
        clickable={Boolean(onClick)}
        data-se={testId}
        colorVariant={colorVariant}
        odysseyDesignTokens={odysseyDesignTokens}
        disabled={isDisabled}
        icon={icon}
        label={label}
        onClick={onClick}
        onDelete={onRemove}
        deleteIcon={<CloseCircleFilledIcon />}
        translate={translate}
      />
    ),
    [
      chipElementType,
      icon,
      isDisabled,
      label,
      onClick,
      onRemove,
      testId,
      translate,
      colorVariant,
      odysseyDesignTokens,
    ],
  );

  return <MuiPropsContext.Consumer>{renderTag}</MuiPropsContext.Consumer>;
};

const MemoizedTag = memo(Tag);
MemoizedTag.displayName = "Tag";

export { MemoizedTag as Tag };
