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

import { Button } from "../Buttons";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from ".././OdysseyDesignTokensContext";
import { Heading5, Paragraph, Subordinate } from ".././Typography";
import { Box } from ".././Box";

export const APP_TILE_COMPACT_IMAGE_HEIGHT = "2.85714286rem"; // 40px
export const APP_TILE_IMAGE_HEIGHT = "4.57142857rem"; // 64px
export const APP_TILE_PLACEHOLDER_IMAGE_WIDTH = "4.57142857rem"; // 64px

export const appTileVariantValues = ["comfortable", "compact"] as const;

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
  // A string for the tile title
  title?: string;
  // Whether the tile is comfortable or compact
  variant?: (typeof appTileVariantValues)[number];
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
  title: boolean;
  variant: AppTileProps["variant"];
};

const ImageContainerStyles = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: AppTileProps["variant"];
}>(({ odysseyDesignTokens, variant }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: variant === "compact" ? "center" : "flex-start",
  maxHeight:
    variant === "compact"
      ? APP_TILE_COMPACT_IMAGE_HEIGHT
      : APP_TILE_IMAGE_HEIGHT,
  marginBlockEnd:
    variant === "compact"
      ? odysseyDesignTokens.Spacing4
      : odysseyDesignTokens.Spacing3,

  ["img"]: {
    height:
      variant === "compact"
        ? APP_TILE_COMPACT_IMAGE_HEIGHT
        : APP_TILE_IMAGE_HEIGHT,
    width: variant === "compact" ? "100%" : "auto",
    maxWidth: "100%",
  },
}));

const ActionContainerStyles = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
})<{ odysseyDesignTokens: DesignTokens; variant: AppTileProps["variant"] }>(
  ({ odysseyDesignTokens, variant = "comfortable" }) => ({
    alignItems: "center",
    display: "flex",
    minHeight: odysseyDesignTokens.Spacing6,
    position: "absolute",
    right: variant === "compact" ? 0 : odysseyDesignTokens.Spacing2,
    top: variant === "compact" ? 0 : odysseyDesignTokens.Spacing2,
    gap: odysseyDesignTokens.Spacing1,
    zIndex: 1,

    ["& > .MuiTypography-root:last-child"]: {
      marginInlineEnd: odysseyDesignTokens.Spacing2,
    },
  }),
);

const ContentContainerStyles = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "hasTopSection" &&
    prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  hasTopSection: boolean;
  variant: AppTileProps["variant"];
}>(({ odysseyDesignTokens, hasTopSection, variant }) => ({
  alignItems: "flex-start",
  paddingBlockStart: hasTopSection ? odysseyDesignTokens.Spacing4 : 0,
  height: "100%",

  [".MuiTypography-root"]: {
    fontSize:
      variant === "compact"
        ? odysseyDesignTokens.TypographySizeSubordinate
        : "auto",
    textAlign: variant === "compact" ? "center" : "left",
  },

  ["& :last-child"]: {
    marginBlockEnd: "0 !important",
  },
}));

const ChildrenContainerStyles = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  ["&:not(:first-child)"]: {
    marginBlockStart: odysseyDesignTokens.Spacing4,
  },
}));

const StyledMuiCardStyles = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isPlaceholder" &&
    prop !== "isCompact",
})<{
  odysseyDesignTokens: DesignTokens;
  isPlaceholder?: boolean;
  isCompact: boolean;
}>(({ odysseyDesignTokens, isPlaceholder = false, isCompact = false }) => ({
  position: "relative",
  boxShadow: "none",
  overflow: "unset",
  display: "flex",
  justifyContent: isPlaceholder && isCompact ? "center" : "flex-start",
  padding: odysseyDesignTokens.Spacing4,
  border: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.HueNeutral200} ${odysseyDesignTokens.BorderStyleMain}`,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  transition: `border ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,

  "&::after": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0,
    boxShadow: odysseyDesignTokens.DepthMedium,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    transition: `opacity ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
    zIndex: "-1",
    content: '""',
  },

  "&:hover": {
    borderColor: "transparent",

    "&::after": {
      opacity: 1,
    },
  },
}));

const StyledMuiCardActionAreaStyles = styled(MuiCardActionArea, {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  margin: `-${odysseyDesignTokens.Spacing4}`,
  padding: odysseyDesignTokens.Spacing4,
}));

const LoadingTile = ({
  image,
  title,
  description,
  children,
  hasTopSection,
  variant,
}: LoadingTileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <StyledMuiCardStyles
      odysseyDesignTokens={odysseyDesignTokens}
      isPlaceholder
      isCompact={variant === "compact"}
    >
      <ContentContainerStyles
        odysseyDesignTokens={odysseyDesignTokens}
        hasTopSection={hasTopSection}
        variant={variant}
      >
        {hasTopSection && (
          <ActionContainerStyles
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            <Subordinate>
              {variant !== "compact" && <MuiSkeleton width={50} />}
            </Subordinate>
          </ActionContainerStyles>
        )}
        <Box sx={{ width: "100%" }}>
          {image && (
            <ImageContainerStyles
              odysseyDesignTokens={odysseyDesignTokens}
              variant={variant}
            >
              <MuiSkeleton
                height={
                  variant === "compact"
                    ? APP_TILE_COMPACT_IMAGE_HEIGHT
                    : APP_TILE_IMAGE_HEIGHT
                }
                width={
                  variant === "compact"
                    ? APP_TILE_COMPACT_IMAGE_HEIGHT
                    : APP_TILE_PLACEHOLDER_IMAGE_WIDTH
                }
                variant="rectangular"
              />
            </ImageContainerStyles>
          )}

          {title && (
            <Heading5>
              <MuiSkeleton />
            </Heading5>
          )}
          {description && variant !== "compact" && (
            <Paragraph>
              <MuiSkeleton />
            </Paragraph>
          )}
          {children && (
            <ChildrenContainerStyles odysseyDesignTokens={odysseyDesignTokens}>
              <MuiSkeleton
                variant="rounded"
                width="100%"
                height={odysseyDesignTokens.Spacing6}
              />
            </ChildrenContainerStyles>
          )}
        </Box>
      </ContentContainerStyles>
    </StyledMuiCardStyles>
  );
};

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
  title,
  variant = "comfortable",
}: AppTileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const tileContent = useMemo(
    () => (
      <ContentContainerStyles
        odysseyDesignTokens={odysseyDesignTokens}
        hasTopSection={
          typeof onActionClick === "function" || Boolean(auxiliaryText)
        }
        variant={variant}
      >
        {image && (
          <ImageContainerStyles
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            {image}
          </ImageContainerStyles>
        )}

        {title && <Heading5 component="div">{title}</Heading5>}
        {description && variant !== "compact" && (
          <Paragraph color="textSecondary">{description}</Paragraph>
        )}

        {children && (
          <ChildrenContainerStyles odysseyDesignTokens={odysseyDesignTokens}>
            {children}
          </ChildrenContainerStyles>
        )}
      </ContentContainerStyles>
    ),
    [
      auxiliaryText,
      children,
      description,
      image,
      odysseyDesignTokens,
      onActionClick,
      title,
      variant,
    ],
  );

  return isLoading ? (
    <LoadingTile
      image={Boolean(image)}
      title={Boolean(title)}
      description={Boolean(description)}
      children={Boolean(children)}
      hasTopSection={
        typeof onActionClick === "function" || Boolean(auxiliaryText)
      }
      variant={variant}
    />
  ) : (
    <StyledMuiCardStyles
      odysseyDesignTokens={odysseyDesignTokens}
      isCompact={variant === "compact"}
    >
      {(onActionClick || auxiliaryText) && (
        <ActionContainerStyles
          odysseyDesignTokens={odysseyDesignTokens}
          variant={variant}
        >
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
        </ActionContainerStyles>
      )}

      <StyledMuiCardActionAreaStyles
        odysseyDesignTokens={odysseyDesignTokens}
        onClick={onClick}
      >
        {tileContent}
      </StyledMuiCardActionAreaStyles>
    </StyledMuiCardStyles>
  );
};

const MemoizedAppTile = memo(AppTile);
MemoizedAppTile.displayName = "AppTile";

export { MemoizedAppTile as AppTile };
