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

import {
  memo,
  type ReactElement,
  useCallback,
  useMemo,
  useState,
  ReactNode,
} from "react";
import {
  Menu as MuiMenu,
  Popover as MuiPopover,
  PopoverOrigin,
} from "@mui/material";
import styled from "@emotion/styled";

import { Box } from "../Box.js";
import {
  BaseButton,
  buttonSizeValues,
  buttonVariantValues,
} from "./BaseButton.js";
import { FieldComponentProps } from "../FieldComponentProps.js";
import type { HtmlProps } from "../HtmlProps.js";
import { ChevronDownIcon, MoreIcon } from "../icons.generated/index.js";
import { MenuContext, MenuContextType } from "./MenuContext.js";
import { NullElement } from "../NullElement.js";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { useUniqueId } from "../useUniqueId.js";

export const menuAlignmentValues = ["left", "right"] as const;
export const verticalDividerAlignmentValues = ["start", "end"] as const;

const StyledMenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "hasVerticalDivider" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "verticalDividerAlignment",
})<{
  hasVerticalDivider: BaseMenuButtonProps["hasVerticalDivider"];
  odysseyDesignTokens: DesignTokens;
  verticalDividerAlignment: BaseMenuButtonProps["verticalDividerAlignment"];
}>(({ hasVerticalDivider, odysseyDesignTokens, verticalDividerAlignment }) => ({
  position: "relative",

  ...(hasVerticalDivider && {
    display: "inline-block",

    "&:before": {
      position: "absolute",
      top: "50%",
      left: 0,
      width: 1,
      height: odysseyDesignTokens.Spacing6,
      backgroundColor: odysseyDesignTokens.HueNeutral300,
      content: '""',
      transform: "translate3d(0, -50%, 0)",
      transition: `opacity 200ms`,

      ...(verticalDividerAlignment === "end" && {
        left: "unset",
        right: 0,
      }),
    },

    ":has(> button:hover)": {
      "&:before": {
        opacity: 0,
      },
    },

    ":dir(rtl)": {
      "&:before": {
        left: "unset",
        right: 0,
        ...(verticalDividerAlignment === "end" && {
          right: "unset",
          left: 0,
        }),
      },
    },
  }),
}));

export type BaseMenuButtonProps = {
  /**
   * The button children for the triggering Button. Only available internal to Odyssey here in BaseMenuButton. If set, buttonLabel is ignored.
   */
  buttonChildren?: ReactNode;
  /**
   * The label on the triggering Button
   */
  buttonLabel?: string;
  /**
   * The variant of the triggering Button
   */
  buttonVariant?: (typeof buttonVariantValues)[number];
  /**
   * The end Icon on the trigggering Button
   */
  endIcon?: ReactElement;
  /**
   * Add a vertical rule to divide the button from surrounding content
   */
  hasVerticalDivider?: boolean;
  /**
   * Whether to omit the endIcon if not set (rather than use a default value for it based on overflow)
   */
  omitEndIcon?: boolean;
  /**
   * The id of the Button
   */
  id?: string;
  /**
   * If the MenuButton is an overflow menu or standard menu.
   */
  isOverflow?: boolean;
  /**
   * The horizontal alignment of the menu.
   */
  menuAlignment?: (typeof menuAlignmentValues)[number];
  /**
   * If true (the default), the menu will close when a child MenuItem is clicked.
   * Otherwise, it will remain open.
   */
  shouldCloseOnSelect?: boolean;
  /**
   * The size of the button
   */
  size?: (typeof buttonSizeValues)[number];
  /**
   * The tooltip text for the Button if it's icon-only
   */
  tooltipText?: string;

  /**
   * Show vertical rule before or after the button
   */
  verticalDividerAlignment?: (typeof verticalDividerAlignmentValues)[number];
};

// These are split and exported separately from the above because wrappers of this (e.g. MenuButton) will
// want to omit buttonChildren, which they cannot do from the combined union type. Instead, they should
// omit from BaseMenuButtonProps, then union with the AdditionalBaseMenuButtonProps (as seen in MenuButton)
export type AdditionalBaseMenuButtonProps = Pick<
  HtmlProps,
  "ariaDescribedBy" | "ariaLabel" | "ariaLabelledBy" | "testId" | "translate"
> &
  Pick<FieldComponentProps, "isDisabled"> &
  (
    | { buttonLabel: string }
    | (Required<Pick<HtmlProps, "ariaLabelledBy">> &
        Partial<Pick<HtmlProps, "ariaLabel">> & {
          buttonLabel?: undefined | "";
        })
    | (Required<Pick<HtmlProps, "ariaLabel">> &
        Partial<Pick<HtmlProps, "ariaLabelledBy">> & {
          buttonLabel?: undefined | "";
        })
  ) &
  (
    | {
        /**
         * The <MenuItem> components within the Menu.
         */
        children: ReactNode | NullElement;
        /**
         * popoverConten is disallowed if children are present
         */
        popoverContent?: never;
      }
    | {
        /**
         * children is disallowed if popoverContent is present
         */
        children?: never;
        /**
         * The content for the popover that is triggered on click.
         */
        popoverContent: ReactNode | NullElement;
      }
  );

const BaseMenuButton = ({
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  buttonChildren,
  buttonLabel = "",
  buttonVariant = "secondary",
  children,
  popoverContent,
  endIcon: endIconProp,
  hasVerticalDivider = false,
  id: idOverride,
  isDisabled,
  isOverflow,
  menuAlignment = "left",
  omitEndIcon = false,
  shouldCloseOnSelect = true,
  size,
  testId,
  tooltipText,
  translate,
  verticalDividerAlignment = "start",
}: BaseMenuButtonProps & AdditionalBaseMenuButtonProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isOpen = Boolean(anchorEl);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const openMenu = useCallback<MenuContextType["openMenu"]>((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const uniqueId = useUniqueId(idOverride);

  const menuListProps = useMemo(
    () => ({ "aria-labelledby": `${uniqueId}-button` }),
    [uniqueId],
  );

  const providerValue = useMemo<MenuContextType>(
    () => ({
      closeMenu,
      openMenu,
      shouldCloseOnSelect,
    }),
    [closeMenu, openMenu, shouldCloseOnSelect],
  );

  const endIcon = omitEndIcon ? undefined : endIconProp ? (
    endIconProp
  ) : isOverflow ? (
    <MoreIcon />
  ) : (
    <ChevronDownIcon />
  );

  const anchorOrigin = useMemo(
    () =>
      ({
        horizontal: menuAlignment,
        vertical: "bottom",
      }) as PopoverOrigin,
    [menuAlignment],
  );

  const transformOrigin = useMemo(
    () =>
      ({
        horizontal: menuAlignment,
        vertical: "top",
      }) as PopoverOrigin,
    [menuAlignment],
  );

  return (
    <StyledMenuButtonContainer
      hasVerticalDivider={hasVerticalDivider}
      odysseyDesignTokens={odysseyDesignTokens}
      verticalDividerAlignment={verticalDividerAlignment}
    >
      <BaseButton
        ariaControls={isOpen ? `${uniqueId}-menu` : undefined}
        ariaExpanded={isOpen ? "true" : undefined}
        ariaHasPopup="true"
        ariaDescribedBy={ariaDescribedBy}
        ariaLabel={ariaLabel}
        ariaLabelledBy={ariaLabelledBy}
        testId={testId}
        endIcon={endIcon}
        id={`${uniqueId}-button`}
        isDisabled={isDisabled}
        label={buttonLabel}
        children={buttonChildren}
        onClick={openMenu}
        size={size}
        tooltipText={tooltipText}
        translate={translate}
        variant={buttonVariant}
      />

      {children && (
        <MuiMenu
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
          anchorEl={anchorEl}
          id={`${uniqueId}-menu`}
          MenuListProps={menuListProps}
          onClose={closeMenu}
          open={isOpen}
        >
          <MenuContext.Provider value={providerValue}>
            {children}
          </MenuContext.Provider>
        </MuiMenu>
      )}

      {popoverContent && (
        <MuiPopover
          open={isOpen}
          anchorEl={anchorEl}
          onClose={closeMenu}
          anchorOrigin={anchorOrigin}
          transformOrigin={transformOrigin}
        >
          <Box
            sx={{
              padding: odysseyDesignTokens.Spacing4,
            }}
          >
            {popoverContent}
          </Box>
        </MuiPopover>
      )}
    </StyledMenuButtonContainer>
  );
};

const MemoizedBaseMenuButton = memo(BaseMenuButton);
MemoizedBaseMenuButton.displayName = "BaseMenuButton";

export { MemoizedBaseMenuButton as BaseMenuButton };
