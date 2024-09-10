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
import { memo, ReactElement, useCallback } from "react";
import styled from "@emotion/styled";
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
  "accent1",
  "accent2",
  "accent3",
  "accent4",
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
    accent1: {
      background: odysseyDesignTokens.HueAccent1100,
      hover: odysseyDesignTokens.HueAccent1200,
      active: odysseyDesignTokens.HueAccent1300,
      text: odysseyDesignTokens.HueAccent1700,
      border: odysseyDesignTokens.HueAccent1200,
      deleteIcon: odysseyDesignTokens.HueAccent1500,
      deleteIconHover: odysseyDesignTokens.HueAccent1600,
    },
    accent2: {
      background: odysseyDesignTokens.HueAccent2100,
      hover: odysseyDesignTokens.HueAccent2200,
      active: odysseyDesignTokens.HueAccent2300,
      text: odysseyDesignTokens.HueAccent2700,
      border: odysseyDesignTokens.HueAccent2200,
      deleteIcon: odysseyDesignTokens.HueAccent2500,
      deleteIconHover: odysseyDesignTokens.HueAccent2600,
    },
    accent3: {
      background: odysseyDesignTokens.HueAccent3100,
      hover: odysseyDesignTokens.HueAccent3200,
      active: odysseyDesignTokens.HueAccent3300,
      text: odysseyDesignTokens.HueAccent3700,
      border: odysseyDesignTokens.HueAccent3200,
      deleteIcon: odysseyDesignTokens.HueAccent3500,
      deleteIconHover: odysseyDesignTokens.HueAccent3600,
    },
    accent4: {
      background: odysseyDesignTokens.HueAccent4100,
      hover: odysseyDesignTokens.HueAccent4200,
      active: odysseyDesignTokens.HueAccent4300,
      text: odysseyDesignTokens.HueAccent4700,
      border: odysseyDesignTokens.HueAccent4200,
      deleteIcon: odysseyDesignTokens.HueAccent4500,
      deleteIconHover: odysseyDesignTokens.HueAccent4600,
    },
  };

  return colors[colorVariant] || colors.default;
};

const StyledTag = styled(MuiChip, {
  shouldForwardProp: (prop) =>
    !["colorVariant", "odysseyDesignTokens"].includes(prop as string),
})<{ colorVariant: TagColorVariant; odysseyDesignTokens: DesignTokens }>(({
  colorVariant,
  odysseyDesignTokens,
}) => {
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

  const renderTag = useCallback(
    (muiProps: MuiPropsContextType) => (
      <StyledTag
        {...muiProps}
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
