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
  ReactNode,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";
import { Drawer as MuiDrawer } from "@mui/material";

import type { AllowedProps } from "../AllowedProps";
import { Box } from "../Box";
import { Button } from "../Button";
import { CloseIcon } from "../icons.generated";
import { Heading5 } from "../Typography";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";

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
  ariaLabel: string;
} & AllowedProps;

interface DrawerStyleProps {
  odysseyDesignTokens: DesignTokens;
  showDividers: boolean;
}
const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<DrawerStyleProps>`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutralWhite};
  margin: 0;
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4}
    ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing5};
  font-family: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.TypographyFamilyHeading};
  color: ${({ odysseyDesignTokens }) => odysseyDesignTokens.HueNeutral900};
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  bottom: 0;
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutralWhite};
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4};
  align-content: center;
  border-top: ${({ showDividers, odysseyDesignTokens }) =>
    showDividers ? `1px solid ${odysseyDesignTokens.HueNeutral200}` : "none"};
`;

const Drawer = ({
  primaryCallToActionComponent,
  secondaryCallToActionComponent,
  tertiaryCallToActionComponent,
  children,
  isOpen,
  onClose,
  showDividers,
  testId,
  title,
  translate,
  variant = "temporary",
  ariaLabel,
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
        setIsContentScrollable(
          drawerContentElement.scrollHeight > drawerContentElement.clientHeight
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
  const content =
    typeof children === "string" ? (
      <Box translate={translate}>{children}</Box>
    ) : (
      children
    );

  return (
    <MuiDrawer
      data-se={testId}
      anchor={anchorDirection}
      open={isOpen}
      onClose={onClose}
      variant={variant}
      sx={{
        ...(variant === "persistent" && {
          "& .MuiDrawer-paper": {
            transition: "none",
          },
        }),
      }}
    >
      <DrawerContentWrapper
        odysseyDesignTokens={odysseyDesignTokens}
        ref={drawerContentRef}
        {...(isContentScrollable && {
          tabIndex: 0,
        })}
      >
        <DrawerHeader
          odysseyDesignTokens={odysseyDesignTokens}
          showDividers={showDividers || isContentScrollable}
        >
          <Heading5>{title}</Heading5>
          <Button
            ariaLabel={ariaLabel}
            label=""
            onClick={onClose}
            size="small"
            startIcon={<CloseIcon />}
            variant="floating"
          />
        </DrawerHeader>
        <DrawerContent
          showDividers={showDividers || isContentScrollable}
          odysseyDesignTokens={odysseyDesignTokens}
        >
          {content}
        </DrawerContent>
      </DrawerContentWrapper>
      {(primaryCallToActionComponent ||
        secondaryCallToActionComponent ||
        tertiaryCallToActionComponent) && (
        <DrawerFooter
          odysseyDesignTokens={odysseyDesignTokens}
          showDividers={showDividers || isContentScrollable}
        >
          {tertiaryCallToActionComponent}
          {secondaryCallToActionComponent}
          {primaryCallToActionComponent}
        </DrawerFooter>
      )}
    </MuiDrawer>
  );
};

Drawer.defaultProps = {
  variant: "temporary",
};

const MemoizedDrawer = memo(Drawer);
MemoizedDrawer.displayName = "Drawer";

export { MemoizedDrawer as Drawer };
