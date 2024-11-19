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

import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext";
import { Box, buttonSizeValues, buttonVariantValues, useUniqueId } from "..";
import { BaseButton } from "./BaseButton";
import { ChevronDownIcon, MoreIcon } from "../icons.generated";
import { FieldComponentProps } from "../FieldComponentProps";
import { MenuContext, MenuContextType } from "./MenuContext";
// import { NullElement } from "../NullElement";
import type { HtmlProps } from "../HtmlProps";

export const menuAlignmentValues = ["left", "right"] as const;

type BaseMenuButtonLabelProps =
  | {
      buttonLabel: string;
    }
  | (
      | (Required<Pick<HtmlProps, "ariaLabelledBy">> &
          Partial<Pick<HtmlProps, "ariaLabel">> & {
            buttonLabel?: undefined | "";
          })
      | (Required<Pick<HtmlProps, "ariaLabel">> &
          Partial<Pick<HtmlProps, "ariaLabelledBy">> & {
            buttonLabel?: undefined | "";
          })
    );

export type AdditionalBaseMenuButtonProps = Pick<
  HtmlProps,
  "ariaDescribedBy" | "ariaLabel" | "ariaLabelledBy" | "testId" | "translate"
> &
  Pick<FieldComponentProps, "isDisabled">;

export type BaseMenuButtonProps = {
  /**
   * The button children for the triggering Button. Only available internal to Odyssey here in BaseMenuButton. If set, buttonLabel is ignored.
   */
  buttonChildren?: ReactNode;
  /**
   * The variant of the triggering Button
   */
  buttonVariant?: (typeof buttonVariantValues)[number];
  /**
   * The end Icon on the triggering Button
   */
  endIcon?: ReactElement;
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
} & BaseMenuButtonLabelProps &
  AdditionalBaseMenuButtonProps;

export type BaseMenuButtonWithPopoverContentProps = {
  /**
   * The content for the popover that is triggered on click.
   */
  popoverContent: ReactNode;
} & BaseMenuButtonProps;

export type BaseMenuButtonWithChildrenProps = {
  /**
   * The <MenuItem> components within the Menu.
   */
  children: ReactNode;
} & BaseMenuButtonProps;

export type BaseButtonWithNoButtonChildren = { buttonChildren?: never };
export type BaseButtonWithNoIconOmit = { omitEndIcon?: never };

const BaseMenuButton = ({
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  buttonChildren,
  buttonLabel = "",
  buttonVariant = "secondary",
  shouldCloseOnSelect = true,
  endIcon: endIconProp,
  id: idOverride,
  isDisabled,
  isOverflow,
  menuAlignment = "left",
  omitEndIcon = false,
  size,
  testId,
  tooltipText,
  translate,
  ...conditionalProps
}: BaseMenuButtonWithPopoverContentProps | BaseMenuButtonWithChildrenProps) => {
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

  const endIcon = useMemo(
    () =>
      omitEndIcon ? undefined : endIconProp ? (
        endIconProp
      ) : isOverflow ? (
        <MoreIcon />
      ) : (
        <ChevronDownIcon />
      ),
    [endIconProp, isOverflow, omitEndIcon],
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

  const renderBaseButton = useCallback(() => {
    if (buttonLabel || endIcon) {
      return (
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
          onClick={openMenu}
          size={size}
          tooltipText={tooltipText}
          translate={translate}
          variant={buttonVariant}
        />
      );
    }

    if (buttonChildren) {
      return (
        <BaseButton
          ariaControls={isOpen ? `${uniqueId}-menu` : undefined}
          ariaExpanded={isOpen ? "true" : undefined}
          ariaHasPopup="true"
          ariaDescribedBy={ariaDescribedBy}
          ariaLabel={ariaLabel}
          ariaLabelledBy={ariaLabelledBy}
          id={`${uniqueId}-button`}
          isDisabled={isDisabled}
          children={buttonChildren}
          onClick={openMenu}
          size={size}
          tooltipText={tooltipText}
          testId={testId}
          translate={translate}
          variant={buttonVariant}
        />
      );
    }

    return null;
  }, [
    ariaDescribedBy,
    ariaLabel,
    ariaLabelledBy,
    buttonChildren,
    buttonLabel,
    buttonVariant,
    endIcon,
    isDisabled,
    isOpen,
    openMenu,
    size,
    tooltipText,
    testId,
    translate,
    uniqueId,
  ]);

  return (
    <div>
      {renderBaseButton()}

      {"children" in conditionalProps && (
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
            {conditionalProps.children}
          </MenuContext.Provider>
        </MuiMenu>
      )}

      {"popoverContent" in conditionalProps && (
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
            {conditionalProps.popoverContent}
          </Box>
        </MuiPopover>
      )}
    </div>
  );
};

const MemoizedBaseMenuButton = memo(BaseMenuButton);
MemoizedBaseMenuButton.displayName = "BaseMenuButton";

export { MemoizedBaseMenuButton as BaseMenuButton };
