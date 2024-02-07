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

import { Drawer as MuiDrawer } from "@mui/material";

import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";

import { Button } from "../Button";
import { Box } from "../Box";
import { CloseIcon } from "../icons.generated";
import {
  memo,
  ReactNode,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from "react";
import { useTheme } from "@mui/material/styles";
import styled from "@emotion/styled";

import type { AllowedProps } from "../AllowedProps";

export const variantValues = ["temporary", "persistent"] as const;

export type DrawerProps = {
  /**
   * An optional Button object to be situated in the Drawerfooter. Should almost always be of variant `primary`.
   */
  callToActionFirstComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Drawer footer, alongside the `callToActionPrimaryComponent`.
   */
  callToActionSecondComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Drawer footer, alongside the other two `callToAction` components.
   */
  callToActionLastComponent?: ReactElement<typeof Button>;
  /**
   * The content of the Drawer. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children?: ReactNode;
  /**
   * When set to `true`, title text is visible
   */
  hasVisibleTitle: boolean;
  /**
   * When set to `true`, the Drawer will be visible.
   */
  isOpen?: boolean;
  /**
   * Callback that controls what happens when the Drawer is dismissed
   */
  onClose: () => void;
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

const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  position: sticky;
  display: flex;
  top: 0;
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutralWhite};
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4} 0;
  font-family: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.TypographyFamilyHeading};
  color: ${({ odysseyDesignTokens }) => odysseyDesignTokens.HueNeutral900};

  h2 {
    margin: 0;
    font-size: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.TypographySizeHeading5};
    font-weight: 500;
  }
`;

const VisuallyHiddenTitle = styled.h2`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const DrawerFooter = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  position: sticky;
  bottom: 0;
  background-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutralWhite};
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4};
  align-content: center;

  .MuiButton-root {
    margin-inline-end: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.Spacing1};
  }
`;

const Drawer = ({
  callToActionFirstComponent,
  callToActionSecondComponent,
  callToActionLastComponent,
  children,
  hasVisibleTitle,
  isOpen,
  onClose,
  testId,
  title,
  translate,
  variant = "temporary",
  ariaLabel,
}: DrawerProps) => {
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const drawerontentRef = useRef<HTMLDivElement>(null);
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const theme = useTheme();
  //If RTL is set in the theme, align the drawer on the left side of the screen, uses right by default.
  const anchorDirection = theme.direction === "rtl" ? "left" : "right";

  useEffect(() => {
    let frameId: number;

    const handleContentScroll = () => {
      const drawerontentElement = drawerontentRef.current;
      if (drawerontentElement) {
        setIsContentScrollable(
          drawerontentElement.scrollHeight > drawerontentElement.clientHeight
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
    >
      <Box>
        <DrawerHeader odysseyDesignTokens={odysseyDesignTokens}>
          {hasVisibleTitle ? (
            <h2>{title}</h2>
          ) : (
            <Box>
              <VisuallyHiddenTitle>{title}</VisuallyHiddenTitle>
            </Box>
          )}
          <Button
            ariaLabel={ariaLabel}
            label=""
            onClick={onClose}
            size="small"
            startIcon={<CloseIcon />}
            variant="floating"
          />
        </DrawerHeader>
        <Box
          ref={drawerontentRef}
          {...(isContentScrollable && {
            tabIndex: 0,
          })}
        >
          {content}
        </Box>
      </Box>
      {(callToActionFirstComponent ||
        callToActionSecondComponent ||
        callToActionLastComponent) && (
        <DrawerFooter odysseyDesignTokens={odysseyDesignTokens}>
          {callToActionLastComponent}
          {callToActionSecondComponent}
          {callToActionFirstComponent}
        </DrawerFooter>
      )}
    </MuiDrawer>
  );
};
Drawer.defaultProps = {
  variant: "temporary",
  hasVisibleTitle: true,
};

const MemoizedDrawer = memo(Drawer);
MemoizedDrawer.displayName = "Drawer";

export { MemoizedDrawer as Drawer };
