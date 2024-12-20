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
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useMemo,
} from "react";
import {
  CardActionArea as MuiCardActionArea,
  Card as MuiCard,
  CardActions as MuiCardActions,
  Skeleton as MuiSkeleton,
} from "@mui/material";
import {
  Button,
  ButtonContext,
  DesignTokens,
  MenuButton,
  MenuButtonProps,
  Paragraph,
  Support,
  Typography,
  useOdysseyDesignTokens,
} from ".";
import styled from "@emotion/styled";
import { MoreIcon } from "./icons.generated";
import { useTranslation } from "react-i18next";

export const cardVariantValues = ["tile", "stack", "compact"] as const;

export type CardProps = {
  children?: ReactNode;
  description?: string;
  detailPanel?: ReactNode;
  image?: ReactElement;
  isLoading?: boolean;
  overline?: string;
  title?: string;
  variant?: (typeof cardVariantValues)[number];
} & (
  | {
      accessory?: never;
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
    prop !== "odysseyDesignTokens" && prop !== "isClickable",
})<{
  odysseyDesignTokens: DesignTokens;
  isClickable: boolean;
}>(({ odysseyDesignTokens, isClickable }) => ({
  border: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.BorderColorDisplay} ${odysseyDesignTokens.BorderStyleMain}`,
  boxShadow: "none",
  padding: 0,
  display: "flex",

  ["&:hover"]: isClickable
    ? {
        borderColor: odysseyDesignTokens.HueNeutralWhite,
        boxShadow: odysseyDesignTokens.DepthMedium,
      }
    : {},

  "& .MuiSkeleton-root": {
    transform: "none",
  },

  "& .MuiCardActions-root .MuiSkeleton-root": {
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

  "& .MuiSkeleton-root": {
    width: odysseyDesignTokens.Spacing5,
    height: odysseyDesignTokens.Spacing5,
  },
}));

const InnerContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
}>(({ odysseyDesignTokens, variant }) => ({
  display: "flex",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  padding:
    variant === "compact"
      ? odysseyDesignTokens.Spacing4
      : odysseyDesignTokens.Spacing5,
  flexDirection: variant === "tile" ? "column" : "row",
  gap: odysseyDesignTokens.Spacing4,
  width: "100%",
}));

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "variant" &&
    prop !== "hasMenuButton",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
  hasMenuButton: boolean;
}>(({ odysseyDesignTokens, variant, hasMenuButton }) => ({
  height:
    variant === "compact" ? odysseyDesignTokens.Spacing8 : "4.5714285714rem",
  paddingInlineEnd:
    variant === "tile" && hasMenuButton ? odysseyDesignTokens.Spacing4 : 0,

  "& > .MuiSkeleton-root": {
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

  "& .MuiSkeleton-root + .MuiSkeleton-root": {
    marginBlockStart: odysseyDesignTokens.Spacing1,
  },
}));

const UpperContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "variant" &&
    prop !== "hasMenuButton",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: CardProps["variant"];
  hasMenuButton: boolean;
}>(({ odysseyDesignTokens, variant, hasMenuButton }) => ({
  display: "flex",
  flexDirection: "column",
  gap:
    variant === "compact"
      ? odysseyDesignTokens.Spacing1
      : odysseyDesignTokens.Spacing4,
  paddingInlineEnd:
    variant !== "tile" && hasMenuButton ? odysseyDesignTokens.Spacing4 : 0,

  "& > .MuiTypography-root": {
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

  "& > .MuiTypography-root": {
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

  "& .MuiSkeleton-root": {
    width: odysseyDesignTokens.Spacing5,
    height: odysseyDesignTokens.Spacing5,
    margin: odysseyDesignTokens.Spacing1,
  },
}));

const Card = ({
  children,
  description,
  detailPanel,
  image,
  isLoading,
  overline,
  title,
  variant,
  accessory,
  button,
  menuButtonChildren,
  onClick,
}: CardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const loadingContent = useMemo(
    () => (
      <InnerContainer
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {image && (
          <ImageContainer
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
            hasMenuButton={Boolean(menuButtonChildren)}
          >
            <MuiSkeleton variant="circular" />
          </ImageContainer>
        )}
        <ContentContainer odysseyDesignTokens={odysseyDesignTokens}>
          <UpperContentContainer
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
            hasMenuButton={Boolean(menuButtonChildren)}
          >
            <OverlineTitleContainer odysseyDesignTokens={odysseyDesignTokens}>
              {overline && (
                <Support>
                  <MuiSkeleton width="50%" />
                </Support>
              )}
              {title && (
                <Typography
                  variant={variant === "tile" ? "h4" : "h5"}
                  component="div"
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
              <MuiSkeleton />
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
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {image && (
          <ImageContainer
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
            hasMenuButton={Boolean(menuButtonChildren)}
          >
            {image}
          </ImageContainer>
        )}
        <ContentContainer odysseyDesignTokens={odysseyDesignTokens}>
          <UpperContentContainer
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
            hasMenuButton={Boolean(menuButtonChildren)}
          >
            <OverlineTitleContainer odysseyDesignTokens={odysseyDesignTokens}>
              {overline && <Support component="div">{overline}</Support>}
              {title && (
                <Typography
                  variant={variant === "tile" ? "h4" : "h5"}
                  component="div"
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
    variant,
  ]);

  return (
    <StyledCard
      odysseyDesignTokens={odysseyDesignTokens}
      isClickable={Boolean(onClick)}
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
              endIcon={<MoreIcon />}
              ariaLabel={t("table.moreactions.arialabel")}
              buttonVariant="floating"
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
