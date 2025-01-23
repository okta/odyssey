/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Drawer as MuiDrawer } from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Button } from "./Buttons/index.js";
import { CloseIcon } from "./icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { Heading5 } from "./Typography.js";
import type { HtmlProps } from "./HtmlProps.js";

export const variantValues = ["temporary", "persistent"] as const;

export type DrawerProps = {
  /**
   * An optional Button object to be situated in the Drawerfooter. Should almost always be of variant `primary`.
   */
  primaryCallToActionComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Drawer footer, alongside the `callToActionPrimaryComponent`.
   */
  secondaryCallToActionComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Drawer footer, alongside the other two `callToAction` components.
   */
  tertiaryCallToActionComponent?: ReactElement<typeof Button>;
  /**
   * The content of the Drawer. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children?: ReactNode;
  /**
   * When set to `true`, the Drawer will be visible.
   */
  isOpen?: boolean;
  /**
   * Callback that controls what happens when the Drawer is dismissed
   */
  onClose: () => void;
  /**
   * Shows divider lines separating header, content, and footer (if using action buttons)
   */
  showDividers: boolean;
  /**
   * The title of the Drawer
   */
  title?: string;
  /**
   * Type of Drawer
   */
  variant?: (typeof variantValues)[number];
} & Pick<HtmlProps, "ariaLabel" | "testId" | "translate">;

interface DrawerStyleProps {
  odysseyDesignTokens: DesignTokens;
  showDividers: boolean;
}
const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<DrawerStyleProps>`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4}
    ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing5};
  color: ${({ odysseyDesignTokens }) => odysseyDesignTokens.HueNeutral900};
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutralWhite};
  border-bottom: ${({ showDividers, odysseyDesignTokens }) =>
    showDividers ? `1px solid ${odysseyDesignTokens.HueNeutral200}` : "none"};
`;

const DrawerContentWrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  overflow-y: auto;
`;

const DrawerContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<DrawerStyleProps>`
  padding: ${({ showDividers, odysseyDesignTokens }) =>
    showDividers
      ? `${odysseyDesignTokens.Spacing5}`
      : `0 ${odysseyDesignTokens.Spacing5}`};
`;

const DrawerFooter = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<DrawerStyleProps>`
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4};
  border-top: ${({ showDividers, odysseyDesignTokens }) =>
    showDividers ? `1px solid ${odysseyDesignTokens.HueNeutral200}` : "none"};
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutralWhite};
`;

const Drawer = ({
  ariaLabel,
  children,
  isOpen,
  onClose,
  primaryCallToActionComponent,
  secondaryCallToActionComponent,
  showDividers = false,
  tertiaryCallToActionComponent,
  testId,
  title,
  translate,
  variant = "temporary",
}: DrawerProps) => {
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const drawerContentRef = useRef<HTMLDivElement>(null);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  //If RTL is set in the theme, align the drawer on the left side of the screen, uses right by default.
  const { i18n } = useTranslation();
  const anchorDirection = i18n.dir() === "rtl" ? "left" : "right";

  useEffect(() => {
    let frameId: number;

    const handleContentScroll = () => {
      const drawerContentElement = drawerContentRef.current;
      if (drawerContentElement) {
        cancelAnimationFrame(frameId);
        setIsContentScrollable(
          drawerContentElement.scrollHeight > drawerContentElement.clientHeight,
        );
      }
      frameId = requestAnimationFrame(handleContentScroll);
    };

    if (isOpen) {
      frameId = requestAnimationFrame(handleContentScroll);
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isOpen]);

  const dividersVisible = useMemo(() => {
    return showDividers || isContentScrollable;
  }, [showDividers, isContentScrollable]);

  const hasFooter = useMemo(
    () =>
      primaryCallToActionComponent ||
      secondaryCallToActionComponent ||
      tertiaryCallToActionComponent,
    [
      primaryCallToActionComponent,
      secondaryCallToActionComponent,
      tertiaryCallToActionComponent,
    ],
  );

  return (
    <MuiDrawer
      data-se={testId}
      anchor={anchorDirection}
      open={isOpen}
      onClose={onClose}
      variant={variant}
      sx={{
        //Overrides defualt MUI inline style
        ...(variant === "persistent" && {
          "& .MuiDrawer-paper": {
            transition: "none",
          },
        }),
      }}
    >
      <DrawerContentWrapper
        {...(isContentScrollable && {
          //Sets tabIndex on content element if scrollable so content is easier to navigate with the keyboard
          tabIndex: 0,
        })}
        odysseyDesignTokens={odysseyDesignTokens}
        ref={drawerContentRef}
      >
        <DrawerHeader
          translate={translate}
          odysseyDesignTokens={odysseyDesignTokens}
          showDividers={dividersVisible}
        >
          <Heading5>{title}</Heading5>
          <Button
            ariaLabel={ariaLabel}
            onClick={onClose}
            size="small"
            startIcon={<CloseIcon />}
            variant="floating"
          />
        </DrawerHeader>
        <DrawerContent
          showDividers={dividersVisible}
          odysseyDesignTokens={odysseyDesignTokens}
        >
          {children}
        </DrawerContent>
      </DrawerContentWrapper>
      {hasFooter && (
        <DrawerFooter
          odysseyDesignTokens={odysseyDesignTokens}
          showDividers={dividersVisible}
        >
          {tertiaryCallToActionComponent}
          {secondaryCallToActionComponent}
          {primaryCallToActionComponent}
        </DrawerFooter>
      )}
    </MuiDrawer>
  );
};

const MemoizedDrawer = memo(Drawer);
MemoizedDrawer.displayName = "Drawer";

export { MemoizedDrawer as Drawer };
