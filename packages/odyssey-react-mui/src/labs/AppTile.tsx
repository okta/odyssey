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
  Skeleton as MuiSkeleton,
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
export const APP_TILE_PLACEHOLDER_IMAGE_WIDTH = "64px";

export type AppTileProps = {
  // Text that appears in the upper right corner of the tile
  auxiliaryText?: string;
  // Arbitrary content to render underneath any other tile content
  children?: ReactNode;
  // A string description
  description?: string;
  // An image or icon at the top of the tile
  image?: ReactElement;
  // If true, the AppTile is loading
  isLoading?: boolean;
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

type LoadingTileProps = {
  children: boolean;
  description: boolean;
  hasTopSection: boolean;
  image: boolean;
  overline: boolean;
  title: boolean;
};

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "flex-start",
  maxHeight: APP_TILE_IMAGE_HEIGHT,
  marginBlockEnd: odysseyDesignTokens.Spacing5,

  ["& img"]: {
    maxWidth: "100%",
  },
}));

const ActionContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  alignItems: "center",
  display: "flex",
  minHeight: odysseyDesignTokens.Spacing6,
  position: "absolute",
  right: odysseyDesignTokens.Spacing2,
  top: odysseyDesignTokens.Spacing2,
  gap: odysseyDesignTokens.Spacing1,
  zIndex: 1,

  ["& > .MuiTypography-root:last-child"]: {
    marginInlineEnd: odysseyDesignTokens.Spacing2,
  },
}));

const ContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "hasTopSection",
})<{ odysseyDesignTokens: DesignTokens; hasTopSection: boolean }>(
  ({ odysseyDesignTokens, hasTopSection }) => ({
    alignItems: "flex-start",
    paddingBlockStart: hasTopSection ? odysseyDesignTokens.Spacing4 : 0,
  }),
);

const ChildrenContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  ["&:not(:first-child)"]: {
    marginBlockStart: odysseyDesignTokens.Spacing3,
  },
}));

const LoadingTile = ({
  image,
  overline,
  title,
  description,
  children,
  hasTopSection,
}: LoadingTileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <MuiCard className="isClickable">
      <ContentContainer
        odysseyDesignTokens={odysseyDesignTokens}
        hasTopSection={hasTopSection}
      >
        {hasTopSection && (
          <ActionContainer odysseyDesignTokens={odysseyDesignTokens}>
            <Subordinate>
              <MuiSkeleton width={50} />
            </Subordinate>
          </ActionContainer>
        )}
        <Box sx={{ width: "100%" }}>
          {image && (
            <ImageContainer odysseyDesignTokens={odysseyDesignTokens}>
              <MuiSkeleton
                height={APP_TILE_IMAGE_HEIGHT}
                width={APP_TILE_PLACEHOLDER_IMAGE_WIDTH}
                variant="rectangular"
              />
            </ImageContainer>
          )}

          {overline && (
            <Support>
              <MuiSkeleton />
            </Support>
          )}
          {title && (
            <Heading5>
              <MuiSkeleton />
            </Heading5>
          )}
          {description && (
            <Paragraph>
              <MuiSkeleton />
            </Paragraph>
          )}
          {children && (
            <ChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
              <MuiSkeleton
                variant="rounded"
                width="100%"
                height={odysseyDesignTokens.Spacing6}
              />
            </ChildrenContainer>
          )}
        </Box>
      </ContentContainer>
    </MuiCard>
  );
};

const StyledMuiCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  position: "relative",
  boxShadow: "none",
  overflow: "unset",

  "&::after": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    boxShadow: odysseyDesignTokens.DepthMedium,
    borderRadius: odysseyDesignTokens.BorderRadiusOuter,
    transition: `opacity ${odysseyDesignTokens.TransitionDurationMain}`,
    zIndex: "-1",
    content: '""',
  },

  "&:hover": {
    "&::after": {
      opacity: 1,
    },
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
  isLoading,
  onActionClick,
  onClick,
  overline,
  title,
}: AppTileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const tileContent = useMemo(
    () => (
      <ContentContainer
        odysseyDesignTokens={odysseyDesignTokens}
        hasTopSection={typeof onActionClick === "function" || !!auxiliaryText}
      >
        {image && (
          <ImageContainer odysseyDesignTokens={odysseyDesignTokens}>
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
      </ContentContainer>
    ),
    [
      image,
      auxiliaryText,
      onActionClick,
      odysseyDesignTokens,
      overline,
      title,
      description,
      children,
    ],
  );

  return isLoading ? (
    <LoadingTile
      image={Boolean(image)}
      overline={Boolean(overline)}
      title={Boolean(title)}
      description={Boolean(description)}
      children={Boolean(children)}
      hasTopSection={typeof onActionClick === "function" || !!auxiliaryText}
    />
  ) : (
    <StyledMuiCard odysseyDesignTokens={odysseyDesignTokens}>
      {(onActionClick || auxiliaryText) && (
        <ActionContainer odysseyDesignTokens={odysseyDesignTokens}>
          {auxiliaryText && !isLoading && (
            <Subordinate>{auxiliaryText}</Subordinate>
          )}
          {onActionClick && !isLoading && (
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

      <MuiCardActionArea onClick={onClick}>{tileContent}</MuiCardActionArea>
    </StyledMuiCard>
  );
};

const MemoizedAppTile = memo(AppTile);
MemoizedAppTile.displayName = "AppTile";

export { MemoizedAppTile as AppTile };
