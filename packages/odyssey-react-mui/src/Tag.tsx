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

import { CloseCircleFilledIcon } from "./icons.generated/index.js";
import { HtmlProps } from "./HtmlProps.js";
import { MuiPropsContext, MuiPropsContextType } from "./MuiPropsContext.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { TagListContext } from "./TagListContext.js";
import { ContrastMode, useContrastModeContext } from "./useContrastMode.js";

export const tagSizeValues = ["medium", "small"] as const;

export const tagColorVariants = [
  "accentFour",
  "accentOne",
  "accentThree",
  "accentTwo",
  "default",
  "info",
] as const;

type TagColorVariant = (typeof tagColorVariants)[number];
type TagSize = (typeof tagSizeValues)[number];

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
  /*
   *  Size variant of the Tag
   */
  size?: TagSize;
} & Pick<HtmlProps, "testId" | "translate">;

const getChipColors = ({
  colorVariant,
  contrastMode,
  odysseyDesignTokens,
}: {
  colorVariant: TagColorVariant;
  contrastMode: ContrastMode;
  odysseyDesignTokens: DesignTokens;
}) => {
  const colors = {
    default: {
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueNeutral200,
        text: odysseyDesignTokens.HueNeutral700,
        textDisabled: odysseyDesignTokens.HueNeutral400,
      }),
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueNeutral100,
        text: odysseyDesignTokens.HueNeutral700,
        textDisabled: odysseyDesignTokens.HueNeutral300,
      }),
      hover: odysseyDesignTokens.HueNeutral200,
      active: odysseyDesignTokens.HueNeutral300,
      border: odysseyDesignTokens.HueNeutral200,
      deleteIcon: odysseyDesignTokens.HueNeutral500,
      deleteIconHover: odysseyDesignTokens.HueNeutral700,
      icon: odysseyDesignTokens.HueNeutral700,
      iconDisabled: odysseyDesignTokens.HueNeutral300,
    },
    info: {
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueBlue200,
        text: odysseyDesignTokens.HueBlue700,
        textDisabled: odysseyDesignTokens.HueBlue400,
      }),
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueBlue100,
        text: odysseyDesignTokens.HueBlue700,
        textDisabled: odysseyDesignTokens.HueBlue300,
      }),
      hover: odysseyDesignTokens.HueBlue200,
      active: odysseyDesignTokens.HueBlue300,
      border: odysseyDesignTokens.HueBlue200,
      deleteIcon: odysseyDesignTokens.HueBlue500,
      deleteIconHover: odysseyDesignTokens.HueBlue700,
      icon: odysseyDesignTokens.HueBlue700,
      iconDisabled: odysseyDesignTokens.HueBlue300,
    },
    accentOne: {
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentOne200,
        text: odysseyDesignTokens.HueAccentOne700,
        textDisabled: odysseyDesignTokens.HueAccentOne400,
      }),
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentOne100,
        text: odysseyDesignTokens.HueAccentOne700,
        textDisabled: odysseyDesignTokens.HueAccentOne300,
      }),
      hover: odysseyDesignTokens.HueAccentOne200,
      active: odysseyDesignTokens.HueAccentOne300,
      border: odysseyDesignTokens.HueAccentOne200,
      deleteIcon: odysseyDesignTokens.HueAccentOne500,
      deleteIconHover: odysseyDesignTokens.HueAccentOne700,
      icon: odysseyDesignTokens.HueAccentOne700,
      iconDisabled: odysseyDesignTokens.HueAccentOne300,
    },
    accentTwo: {
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentTwo200,
        text: odysseyDesignTokens.HueAccentTwo800,
        textDisabled: odysseyDesignTokens.HueAccentTwo400,
      }),
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentTwo100,
        text: odysseyDesignTokens.HueAccentTwo700,
        textDisabled: odysseyDesignTokens.HueAccentTwo300,
      }),
      hover: odysseyDesignTokens.HueAccentTwo200,
      active: odysseyDesignTokens.HueAccentTwo300,
      border: odysseyDesignTokens.HueAccentTwo200,
      deleteIcon: odysseyDesignTokens.HueAccentTwo500,
      deleteIconHover: odysseyDesignTokens.HueAccentTwo700,
      icon: odysseyDesignTokens.HueAccentTwo700,
      iconDisabled: odysseyDesignTokens.HueAccentTwo300,
    },
    accentThree: {
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentThree200,
        text: odysseyDesignTokens.HueAccentThree700,
        textDisabled: odysseyDesignTokens.HueAccentThree400,
      }),
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentThree100,
        text: odysseyDesignTokens.HueAccentThree700,
        textDisabled: odysseyDesignTokens.HueAccentThree300,
      }),
      hover: odysseyDesignTokens.HueAccentThree200,
      active: odysseyDesignTokens.HueAccentThree300,
      border: odysseyDesignTokens.HueAccentThree200,
      deleteIcon: odysseyDesignTokens.HueAccentThree500,
      deleteIconHover: odysseyDesignTokens.HueAccentThree700,
      icon: odysseyDesignTokens.HueAccentThree700,
      iconDisabled: odysseyDesignTokens.HueAccentThree300,
    },
    accentFour: {
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentFour200,
        text: odysseyDesignTokens.HueAccentFour700,
        textDisabled: odysseyDesignTokens.HueAccentFour400,
      }),
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentFour100,
        text: odysseyDesignTokens.HueAccentFour700,
        textDisabled: odysseyDesignTokens.HueAccentFour300,
      }),
      hover: odysseyDesignTokens.HueAccentFour200,
      active: odysseyDesignTokens.HueAccentFour300,
      border: odysseyDesignTokens.HueAccentFour200,
      deleteIcon: odysseyDesignTokens.HueAccentFour500,
      deleteIconHover: odysseyDesignTokens.HueAccentFour700,
      icon: odysseyDesignTokens.HueAccentFour700,
      iconDisabled: odysseyDesignTokens.HueAccentFour300,
    },
  };

  return colors[colorVariant] || colors.default;
};

const StyledTag = styled(MuiChip, {
  shouldForwardProp: (prop) =>
    !["colorVariant", "contrastMode", "odysseyDesignTokens", "size"].includes(
      prop,
    ),
})<{
  as?: React.ElementType; // Allow the 'as' prop to be forwarded
  clickable?: boolean;
  colorVariant: TagColorVariant;
  contrastMode: ContrastMode;
  odysseyDesignTokens: DesignTokens;
  size?: TagSize;
}>(({ colorVariant, contrastMode, odysseyDesignTokens, clickable, size }) => {
  const colors = getChipColors({
    colorVariant,
    odysseyDesignTokens,
    contrastMode,
  });

  return {
    backgroundColor: colors.background,
    color: colors.text,

    ...(clickable === true && {
      borderColor: colors.border,
    }),

    ...(clickable === false && {
      borderColor: "transparent",
    }),

    ...(size === "small" && {
      paddingBlock: `calc(${odysseyDesignTokens.Spacing1})`,
    }),

    "&.MuiChip-clickable:hover": {
      backgroundColor: colors.hover,
    },

    "&.MuiChip-clickable:active": {
      backgroundColor: colors.active,
    },

    "&.Mui-disabled": {
      color: colors.textDisabled,
      borderColor: colors.border,
      "& .MuiChip-icon, & .MuiChip-deleteIcon": {
        color: colors.iconDisabled,
      },
    },

    "& .MuiChip-icon": {
      color: colors.icon,
    },

    "& .MuiChip-deleteIcon": {
      color: colors.deleteIcon,
      "&:hover": {
        color: colors.deleteIconHover,
      },
    },
  };
});

const Tag = ({
  colorVariant = "default",
  icon,
  isDisabled,
  label,
  onClick,
  onRemove,
  size = "medium",
  testId,
  translate,
}: TagProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { chipElementType } = useContext(TagListContext);
  const { contrastMode } = useContrastModeContext();

  const renderTag = useCallback(
    (muiProps: MuiPropsContextType) => (
      <StyledTag
        {...muiProps}
        aria-disabled={isDisabled}
        as={chipElementType}
        clickable={Boolean(onClick)}
        colorVariant={colorVariant}
        contrastMode={contrastMode}
        data-se={testId}
        deleteIcon={<CloseCircleFilledIcon />}
        disabled={isDisabled}
        icon={icon}
        label={label}
        odysseyDesignTokens={odysseyDesignTokens}
        onClick={onClick}
        onDelete={onRemove}
        size={size}
        translate={translate}
      />
    ),
    [
      chipElementType,
      colorVariant,
      contrastMode,
      icon,
      isDisabled,
      label,
      odysseyDesignTokens,
      onClick,
      onRemove,
      size,
      testId,
      translate,
    ],
  );

  return <MuiPropsContext.Consumer>{renderTag}</MuiPropsContext.Consumer>;
};

const MemoizedTag = memo(Tag);
MemoizedTag.displayName = "Tag";

export { MemoizedTag as Tag };
