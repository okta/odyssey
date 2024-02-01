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
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../OdysseyDesignTokensContext";

import styled from "@emotion/styled";

import type { AllowedProps } from "../AllowedProps";

export const variantValues = ["temporary", "persistent"] as const;

export type DrawerProps = {
  /**
   * An optional Button object to be situated in the Dialog footer. Should almost always be of variant `primary`.
   */
  callToActionFirstComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Dialog footer, alongside the `callToActionPrimaryComponent`.
   */
  callToActionSecondComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the Dialog footer, alongside the other two `callToAction` components.
   */
  callToActionLastComponent?: ReactElement<typeof Button>;
  /**
   * The content of the Dialog. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children: ReactNode;
  /**
   * When set to `true`, the Dialog will be visible.
   */
  isOpen: boolean;
  /**
   * Callback that controls what happens when the Dialog is dismissed
   */
  onClose: () => void;
  /**
   * The title of the Dialog
   */
  title: string;
  /**
   * Side from which drawer will appear.
   */
  variant?: (typeof variantValues)[number];
  ariaLabel: string;
} & AllowedProps;

const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  position: relative;
  font-size: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.TypographySizeHeading5};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block-end: 0;
  padding: 0 0 ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4} 0;
  font-family: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.TypographyFamilyHeading};
  color: ${({ odysseyDesignTokens }) => odysseyDesignTokens.HueNeutral900};
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
  isOpen,
  onClose,
  testId,
  title,
  translate,
  variant = "temporary",
  ariaLabel,
}: DrawerProps) => {
  const [isContentScrollable, setIsContentScrollable] = useState(false);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const odysseyDesignTokens = useOdysseyDesignTokens();

  useEffect(() => {
    let frameId: number;

    const handleContentScroll = () => {
      const dialogContentElement = dialogContentRef.current;
      if (dialogContentElement) {
        setIsContentScrollable(
          dialogContentElement.scrollHeight > dialogContentElement.clientHeight
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
      anchor="right"
      open={isOpen}
      onClose={onClose}
      variant={variant}
    >
      <div>
        <DrawerHeader odysseyDesignTokens={odysseyDesignTokens}>
          {title}
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
          ref={dialogContentRef}
          {...(isContentScrollable && {
            tabIndex: 0,
          })}
        >
          {content}
        </Box>
      </div>
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

const MemoizedDrawer = memo(Drawer);
MemoizedDrawer.displayName = "Drawer";

export { MemoizedDrawer as Drawer };
