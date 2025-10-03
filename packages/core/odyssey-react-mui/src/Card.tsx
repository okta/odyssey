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

import styled from "@emotion/styled";
import {
  Card as MuiCard,
  CardActionArea as MuiCardActionArea,
  CardActions as MuiCardActions,
  Skeleton as MuiSkeleton,
} from "@mui/material";
import { cardActionsClasses } from "@mui/material/CardActions";
import { skeletonClasses } from "@mui/material/Skeleton";
import { typographyClasses } from "@mui/material/Typography";
import {
  AriaRole,
  Children,
  memo,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";

import { Button } from "./Buttons/Button.js";
import { ButtonContext } from "./Buttons/ButtonContext.js";
import { MenuButton, MenuButtonProps } from "./Buttons/MenuButton.js";
import { useTranslation } from "./i18n.generated/i18n.js";
import { MoreIcon } from "./icons.generated/More.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { Paragraph, Support, Typography } from "./Typography.js";

export const cardVariantValues = ["tile", "stack", "compact"] as const;

export const CARD_IMAGE_SIZE = "64px";
export const CARD_IMAGE_SIZE_COMPACT = "48px";

export type CardProps = {
  /** @experimental: Temporary internal property, do not use. */
  __role?: AriaRole;
  children?: ReactNode;
  description?: string;
  detailPanel?: ReactNode;
  image?: ReactElement;
  isLoading?: boolean;
  overline?: string;
  title?: string;
  titleId?: string;
  variant?: (typeof cardVariantValues)[number];
} & (
  | {
      accessory?: ReactNode;
      button?: never;
      menuButtonChildren?: never;
      onClick: MouseEventHandler;
    }
  | {
      accessory?: ReactNode;
      button?: ReactElement<typeof Button>;
      menuButtonChildren?: MenuButtonProps["children"];
      onClick?: never;
    }
);

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) =>
    prop !== "cardVariant" &&
    prop !== "isClickable" &&
    prop !== "odysseyDesignTokens",
})<{
  cardVariant: CardProps["variant"];
  isClickable: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ cardVariant, isClickable, odysseyDesignTokens }) => ({
  border: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderColorDisplay} ${odysseyDesignTokens.BorderStyleMain}`,
  boxShadow: "none",
  padding: 0,
  display: "flex",

  ...(cardVariant === "compact" && {
    marginBlockEnd: odysseyDesignTokens.Spacing2,
  }),

  ["&:hover"]: isClickable
    ? {
        borderColor: odysseyDesignTokens.HueNeutralWhite,
        boxShadow: odysseyDesignTokens.DepthMedium,
      }
    : {},

  [`& .${skeletonClasses.root}`]: {
    transform: "none",
  },

  [`& .${cardActionsClasses.root} .${skeletonClasses.root}`]: {
    height: odysseyDesignTokens.Spacing7,
  },
}));

const StyledCardActionArea = styled(MuiCardActionArea)(() => ({
  margin: 0,
  padding: 0,
}));

const AccessoriesContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
}>(({ odysseyDesignTokens, variant }) => ({
  display: "flex",
  flexDirection: variant === "compact" ? "row" : "column",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing1,
  marginBlockStart:
    variant === "compact"
      ? odysseyDesignTokens.Spacing4
      : odysseyDesignTokens.Spacing5,
  marginInlineStart:
    variant === "compact"
      ? odysseyDesignTokens.Spacing4
      : odysseyDesignTokens.Spacing4,
  marginInlineEnd: `-${odysseyDesignTokens.Spacing2}`,
  height: variant === "compact" ? odysseyDesignTokens.Spacing8 : "auto",

  [`& .${skeletonClasses.root}`]: {
    width: odysseyDesignTokens.Spacing5,
    height: odysseyDesignTokens.Spacing5,
  },
}));

const InnerContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "hasDetailPanel" &&
    prop !== "numberOfChildNodes" &&
    prop !== "odysseyDesignTokens" &&
    prop !== "variant",
})<{
  hasDetailPanel?: boolean;
  numberOfChildNodes?: number;
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
}>(
  ({
    hasDetailPanel,
    numberOfChildNodes = 0,
    odysseyDesignTokens,
    variant,
  }) => ({
    alignItems:
      variant === "compact" && !hasDetailPanel && numberOfChildNodes <= 2
        ? "center"
        : "flex-start",
    display: "flex",
    backgroundColor: odysseyDesignTokens.HueNeutralWhite,
    padding:
      variant === "compact"
        ? odysseyDesignTokens.Spacing4
        : odysseyDesignTokens.Spacing5,
    flexDirection: variant === "tile" ? "column" : "row",
    gap: odysseyDesignTokens.Spacing4,
    width: "100%",
  }),
);

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "variant" &&
    prop !== "hasMenuButton",
})<{
  hasMenuButton: boolean;
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
}>(({ odysseyDesignTokens, variant, hasMenuButton }) => ({
  height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : CARD_IMAGE_SIZE,
  paddingInlineEnd:
    variant === "tile" && hasMenuButton ? odysseyDesignTokens.Spacing4 : 0,
  [`& > .${skeletonClasses.root}`]: {
    height: "100%",
    aspectRatio: 1,
  },
}));

const ContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing4,
  width: "100%",

  "& > *": {
    marginBlock: 0,
  },

  [`& .${skeletonClasses.root} + .${skeletonClasses.root}`]: {
    marginBlockStart: odysseyDesignTokens.Spacing1,
  },
}));

const UpperContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "variant" &&
    prop !== "hasMenuButton",
})<{
  hasMenuButton: boolean;
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
}>(({ odysseyDesignTokens, variant, hasMenuButton }) => ({
  display: "flex",
  flexDirection: "column",
  gap:
    variant === "compact"
      ? odysseyDesignTokens.Spacing1
      : odysseyDesignTokens.Spacing4,
  paddingInlineEnd:
    variant !== "tile" && hasMenuButton ? odysseyDesignTokens.Spacing4 : 0,

  [`& > .${typographyClasses.root}`]: {
    marginBlockEnd: 0,
  },
}));

const OverlineTitleContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing1,

  [`& > .${typographyClasses.root}`]: {
    marginBlockEnd: 0,
  },
}));

const Content = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
}));

const MenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
}>(({ odysseyDesignTokens, variant }) => ({
  position: "absolute",
  right: odysseyDesignTokens.Spacing2,
  top:
    variant === "compact"
      ? odysseyDesignTokens.Spacing4
      : odysseyDesignTokens.Spacing2,
  height: variant === "compact" ? odysseyDesignTokens.Spacing8 : "auto",
  display: "flex",
  alignItems: "center",

  [`& .${skeletonClasses.root}`]: {
    width: odysseyDesignTokens.Spacing5,
    height: odysseyDesignTokens.Spacing5,
    margin: odysseyDesignTokens.Spacing1,
  },
}));

const getNumberOfDefinedReactNodes = (props: Array<ReactNode>) =>
  Children.toArray(props).length;

const Card = ({
  children,
  description,
  detailPanel,
  image,
  isLoading,
  overline,
  title,
  titleId,
  variant,
  accessory,
  button,
  menuButtonChildren,
  onClick,
  __role: role,
}: CardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const loadingContent = useMemo(
    () => (
      <InnerContainer
        numberOfChildNodes={getNumberOfDefinedReactNodes([
          button,
          children,
          description,
          overline,
          title,
        ])}
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {image && (
          <ImageContainer
            hasMenuButton={Boolean(menuButtonChildren)}
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            <MuiSkeleton variant="circular" />
          </ImageContainer>
        )}
        <ContentContainer odysseyDesignTokens={odysseyDesignTokens}>
          <UpperContentContainer
            hasMenuButton={Boolean(menuButtonChildren)}
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            <OverlineTitleContainer odysseyDesignTokens={odysseyDesignTokens}>
              {overline && (
                <Support>
                  <MuiSkeleton width="50%" />
                </Support>
              )}
              {title && (
                <Typography
                  component="div"
                  variant={variant === "tile" ? "h4" : "h5"}
                >
                  <MuiSkeleton width="33%" />
                </Typography>
              )}
            </OverlineTitleContainer>
            {description && (
              <Paragraph>
                <MuiSkeleton width="100%" />
                <MuiSkeleton width="50%" />
              </Paragraph>
            )}
          </UpperContentContainer>

          {children && (
            <Content odysseyDesignTokens={odysseyDesignTokens}>
              <MuiSkeleton width="50%" />
            </Content>
          )}

          {button && (
            <MuiCardActions>
              <MuiSkeleton variant="rounded" width="100%" />
            </MuiCardActions>
          )}
        </ContentContainer>
      </InnerContainer>
    ),
    [
      button,
      children,
      description,
      image,
      menuButtonChildren,
      odysseyDesignTokens,
      overline,
      title,
      variant,
    ],
  );

  const cardContent = useMemo(() => {
    const buttonProviderValue = { isFullWidth: true };
    return (
      <InnerContainer
        hasDetailPanel={Boolean(detailPanel)}
        numberOfChildNodes={getNumberOfDefinedReactNodes([
          button,
          children,
          description,
          overline,
          title,
        ])}
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {image && (
          <ImageContainer
            hasMenuButton={Boolean(menuButtonChildren)}
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            {image}
          </ImageContainer>
        )}
        <ContentContainer odysseyDesignTokens={odysseyDesignTokens}>
          <UpperContentContainer
            hasMenuButton={Boolean(menuButtonChildren)}
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            <OverlineTitleContainer odysseyDesignTokens={odysseyDesignTokens}>
              {overline && <Support component="div">{overline}</Support>}
              {title && (
                <Typography
                  component="div"
                  id={titleId}
                  variant={variant === "tile" ? "h4" : "h5"}
                >
                  {title}
                </Typography>
              )}
            </OverlineTitleContainer>
            {description && (
              <Paragraph color="textSecondary">{description}</Paragraph>
            )}
          </UpperContentContainer>

          {children && (
            <Content odysseyDesignTokens={odysseyDesignTokens}>
              {children}
            </Content>
          )}

          {button && (
            <MuiCardActions>
              <ButtonContext.Provider value={buttonProviderValue}>
                {button}
              </ButtonContext.Provider>
            </MuiCardActions>
          )}

          {detailPanel && (
            <Content odysseyDesignTokens={odysseyDesignTokens}>
              {detailPanel}
            </Content>
          )}
        </ContentContainer>
      </InnerContainer>
    );
  }, [
    button,
    children,
    description,
    detailPanel,
    image,
    menuButtonChildren,
    odysseyDesignTokens,
    overline,
    title,
    titleId,
    variant,
  ]);

  return (
    <StyledCard
      cardVariant={variant}
      isClickable={Boolean(onClick)}
      odysseyDesignTokens={odysseyDesignTokens}
      role={role}
    >
      {Boolean(accessory) && (
        <AccessoriesContainer
          odysseyDesignTokens={odysseyDesignTokens}
          variant={variant}
        >
          {isLoading ? <MuiSkeleton variant="circular" /> : accessory}
        </AccessoriesContainer>
      )}
      {isLoading ? (
        loadingContent
      ) : onClick ? (
        <StyledCardActionArea onClick={onClick}>
          {cardContent}
        </StyledCardActionArea>
      ) : (
        cardContent
      )}

      {menuButtonChildren && (
        <MenuButtonContainer
          odysseyDesignTokens={odysseyDesignTokens}
          variant={variant}
        >
          {isLoading ? (
            <MuiSkeleton variant="circular" />
          ) : (
            <MenuButton
              ariaLabel={t("table.moreactions.arialabel")}
              buttonVariant="floating"
              endIcon={<MoreIcon />}
              menuAlignment="right"
              size="small"
              tooltipText={t("table.actions")}
            >
              {menuButtonChildren}
            </MenuButton>
          )}
        </MenuButtonContainer>
      )}
    </StyledCard>
  );
};

const MemoizedCard = memo(Card);
MemoizedCard.displayName = "Card";

export { MemoizedCard as Card };
