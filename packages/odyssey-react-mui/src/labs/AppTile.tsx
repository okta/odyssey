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
  MouseEventHandler,
  ReactElement,
  memo,
  useMemo,
  ReactNode,
  HTMLAttributes,
} from "react";
import {
  Card as MuiCard,
  CardActionArea as MuiCardActionArea,
} from "@mui/material";
import styled from "@emotion/styled";

import { Button } from ".././Button";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from ".././OdysseyDesignTokensContext";
import { Heading5, Paragraph, Subordinate, Support } from ".././Typography";
import { Box } from ".././Box";

export const APP_TILE_IMAGE_HEIGHT = "64px";

export type AppTileProps = {
  // Text that appears in the upper right corner of the tile
  auxiliaryText?: string;
  // Arbitrary content to render underneath any other tile content
  children?: ReactNode;
  // A string description
  description?: string;
  // An image or icon at the top of the tile
  image?: ReactElement;
  // Event handler for when the user clicks the tile
  onClick: MouseEventHandler;
  // An 'eyebrow' of text above the title
  overline?: string;
  // A string for the tile title
  title?: string;
} & (
  | {
      // Event that fires when the user clicks the action button in the upper-right corner
      // If this isn't set, the other action props can't be set either
      onActionClick: MouseEventHandler;
      // The ID of the element which the button controls (for instance, a drawer or dialog), if any.
      actionAriaControls?: HTMLAttributes<HTMLElement>["aria-controls"];
      // Should be filled if the button controls a popup element such as a Drawer or Dialog
      actionAriaHasPopup?: HTMLAttributes<HTMLElement>["aria-haspopup"];
      // Should be true if the button controls a popup element that is currently expanded. Should be synced to
      // the state of the popup element
      actionAriaExpanded?: HTMLAttributes<HTMLElement>["aria-expanded"];
      // The label for the button, used as the aria-label and tooltip
      actionLabel: string;
      // An icon for the action button
      actionIcon: ReactElement;
    }
  | {
      onActionClick?: never;
      actionAriaControls?: never;
      actionAriaHasPopup?: never;
      actionAriaExpanded?: never;
      actionLabel?: never;
      actionIcon?: never;
    }
);

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "hasAction",
})<{
  odysseyDesignTokens: DesignTokens;
  hasAction: boolean;
}>(({ odysseyDesignTokens, hasAction }) => ({
  display: "flex",
  alignItems: "flex-start",
  maxHeight: APP_TILE_IMAGE_HEIGHT,
  marginBlockEnd: odysseyDesignTokens.Spacing5,
  paddingRight: hasAction ? odysseyDesignTokens.Spacing5 : 0,
}));

const ActionContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  display: "flex",
  minHeight: odysseyDesignTokens.Spacing6,
  gap: odysseyDesignTokens.Spacing1,
  position: "absolute",
  right: odysseyDesignTokens.Spacing3,
  top: odysseyDesignTokens.Spacing3,
}));

const ContentContainer = styled("div")(() => ({
  display: "flex",
}));

const ChildrenContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  ["&:not(:first-child)"]: {
    marginBlockStart: odysseyDesignTokens.Spacing3,
  },
}));

const AppTile = ({
  actionAriaControls,
  actionAriaHasPopup,
  actionAriaExpanded,
  actionLabel,
  actionIcon,
  auxiliaryText,
  children,
  description,
  image,
  onActionClick,
  onClick,
  overline,
  title,
}: AppTileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const tileContent = useMemo(
    () => (
      <ContentContainer>
        <Box>
          {image && (
            <ImageContainer
              odysseyDesignTokens={odysseyDesignTokens}
              hasAction={Boolean(onActionClick)}
            >
              {image}
            </ImageContainer>
          )}

          {overline && <Support component="div">{overline}</Support>}
          {title && <Heading5 component="div">{title}</Heading5>}
          {description && (
            <Paragraph color="textSecondary">{description}</Paragraph>
          )}
          {children && (
            <ChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
              {children}
            </ChildrenContainer>
          )}
        </Box>
      </ContentContainer>
    ),
    [
      image,
      odysseyDesignTokens,
      onActionClick,
      overline,
      title,
      description,
      children,
    ],
  );

  return (
    <MuiCard
      sx={{
        boxShadow: "none",
        "&::after": {
          opacity: 0,
          "box-shadow": odysseyDesignTokens.DepthMedium,
        },
        "&:hover::after": {
          opacity: 1,
        },
      }}
    >
      <MuiCardActionArea onClick={onClick}>{tileContent}</MuiCardActionArea>

      {(onActionClick || auxiliaryText) && (
        <ActionContainer odysseyDesignTokens={odysseyDesignTokens}>
          {auxiliaryText && <Subordinate>{auxiliaryText}</Subordinate>}
          {onActionClick && (
            <Button
              endIcon={actionIcon}
              ariaLabel={actionLabel}
              variant="floating"
              size="small"
              tooltipText={actionLabel}
              ariaControls={actionAriaControls}
              ariaExpanded={actionAriaExpanded}
              ariaHasPopup={actionAriaHasPopup}
              onClick={onActionClick}
            />
          )}
        </ActionContainer>
      )}
    </MuiCard>
  );
};

const MemoizedAppTile = memo(AppTile);
MemoizedAppTile.displayName = "AppTile";

export { MemoizedAppTile as AppTile };
