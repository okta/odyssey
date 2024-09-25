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
import { useBackground, ContrastMode } from "./BackgroundContext";

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
  contrastMode: ContrastMode,
) => {
  const colors = {
    default: {
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueNeutral200,
        text: odysseyDesignTokens.HueNeutral700,
      }),
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueNeutral100,
        text: odysseyDesignTokens.HueNeutral600,
      }),
      hover: odysseyDesignTokens.HueNeutral200,
      active: odysseyDesignTokens.HueNeutral300,
      border: odysseyDesignTokens.HueNeutral200,
      deleteIcon: odysseyDesignTokens.HueNeutral500,
      deleteIconHover: odysseyDesignTokens.HueNeutral600,
    },
    info: {
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueBlue200,
        text: odysseyDesignTokens.HueBlue700,
      }),
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueBlue100,
        text: odysseyDesignTokens.HueBlue600,
      }),
      hover: odysseyDesignTokens.HueBlue200,
      active: odysseyDesignTokens.HueBlue300,
      border: odysseyDesignTokens.HueBlue200,
      deleteIcon: odysseyDesignTokens.HueBlue500,
      deleteIconHover: odysseyDesignTokens.HueBlue600,
    },
    accentOne: {
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentOne200,
        text: odysseyDesignTokens.HueAccentOne700,
      }),
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentOne100,
        text: odysseyDesignTokens.HueAccentOne600,
      }),
      hover: odysseyDesignTokens.HueAccentOne200,
      active: odysseyDesignTokens.HueAccentOne300,
      border: odysseyDesignTokens.HueAccentOne200,
      deleteIcon: odysseyDesignTokens.HueAccentOne500,
      deleteIconHover: odysseyDesignTokens.HueAccentOne600,
    },
    accentTwo: {
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentTwo200,
        text: odysseyDesignTokens.HueAccentTwo700,
      }),
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentTwo100,
        text: odysseyDesignTokens.HueAccentTwo600,
      }),
      hover: odysseyDesignTokens.HueAccentTwo200,
      active: odysseyDesignTokens.HueAccentTwo300,
      border: odysseyDesignTokens.HueAccentTwo200,
      deleteIcon: odysseyDesignTokens.HueAccentTwo500,
      deleteIconHover: odysseyDesignTokens.HueAccentTwo600,
    },
    accentThree: {
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentThree200,
        text: odysseyDesignTokens.HueAccentThree700,
      }),
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentThree100,
        text: odysseyDesignTokens.HueAccentThree600,
      }),
      hover: odysseyDesignTokens.HueAccentThree200,
      active: odysseyDesignTokens.HueAccentThree300,
      border: odysseyDesignTokens.HueAccentThree200,
      deleteIcon: odysseyDesignTokens.HueAccentThree500,
      deleteIconHover: odysseyDesignTokens.HueAccentThree600,
    },
    accentFour: {
      ...(contrastMode === "lowContrast" && {
        background: odysseyDesignTokens.HueAccentFour200,
        text: odysseyDesignTokens.HueAccentFour700,
      }),
      ...(contrastMode === "highContrast" && {
        background: odysseyDesignTokens.HueAccentFour100,
        text: odysseyDesignTokens.HueAccentFour600,
      }),
      hover: odysseyDesignTokens.HueAccentFour200,
      active: odysseyDesignTokens.HueAccentFour300,
      border: odysseyDesignTokens.HueAccentFour200,
      deleteIcon: odysseyDesignTokens.HueAccentFour500,
      deleteIconHover: odysseyDesignTokens.HueAccentFour600,
    },
  };

  return colors[colorVariant] || colors.default;
};

const StyledTag = styled(MuiChip, {
  shouldForwardProp: (prop) =>
    !["colorVariant", "contrastMode", "odysseyDesignTokens"].includes(
      prop as string,
    ),
})<{
  colorVariant: TagColorVariant;
  contrastMode: ContrastMode;
  odysseyDesignTokens: DesignTokens;
  as?: React.ElementType; // Allow the 'as' prop to be forwarded
}>(({ colorVariant, contrastMode, odysseyDesignTokens }) => {
  const colors = getChipColors(colorVariant, odysseyDesignTokens, contrastMode);

  return {
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
      "& .MuiChip-deleteIcon": {
        color: odysseyDesignTokens.HueNeutral300,
      },
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
  testId,
  translate,
}: TagProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { chipElementType } = useContext(TagListContext);
  const { contrastMode } = useBackground();

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
        contrastMode={contrastMode}
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
      contrastMode,
    ],
  );

  return <MuiPropsContext.Consumer>{renderTag}</MuiPropsContext.Consumer>;
};

const MemoizedTag = memo(Tag);
MemoizedTag.displayName = "Tag";

export { MemoizedTag as Tag };
