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
  MouseEventHandler,
  ReactElement,
  memo,
  useMemo,
  useEffect,
} from "react";
import {
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardActionArea as MuiCardActionArea,
} from "@mui/material";
import styled from "@emotion/styled";

import {
  Button,
  ButtonContext,
  MenuButton,
  MenuButtonProps,
} from "./Buttons/index.js";
import { MoreIcon } from "./icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { Heading5, Paragraph, Support } from "./Typography.js";

export const CARD_IMAGE_HEIGHT = "64px";
export const CARD_IMAGE_HEIGHT_COMPACT = "48px";

export const cardVariantValues = ["tile", "stack", "compact"] as const;

export type CardProps = {
  description?: string;
  image?: ReactElement;
  overline?: string;
  title?: string;
  variant?: (typeof cardVariantValues)[number];
} & (
  | {
      onClick: MouseEventHandler;
      button?: never;
      menuButtonChildren?: never;
    }
  | {
      onClick?: never;
      button?: ReactElement<typeof Button>;
      menuButtonChildren?: MenuButtonProps["children"];
    }
);

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "hasMenuButtonChildren" &&
    prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  hasMenuButtonChildren: boolean;
  variant: (typeof cardVariantValues)[number];
}>(({ odysseyDesignTokens, hasMenuButtonChildren, variant }) => ({
  display: "flex",
  alignItems: "flex-start",
  height: variant === "compact" ? CARD_IMAGE_HEIGHT_COMPACT : CARD_IMAGE_HEIGHT,
  maxHeight:
    variant === "compact" ? CARD_IMAGE_HEIGHT_COMPACT : CARD_IMAGE_HEIGHT,
  marginBlockEnd: variant === "tile" ? odysseyDesignTokens.Spacing5 : 0,
  paddingRight:
    hasMenuButtonChildren || ["stack", "compact"].includes(variant)
      ? odysseyDesignTokens.Spacing5
      : 0,
}));

const MenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: (typeof cardVariantValues)[number];
}>(({ odysseyDesignTokens, variant }) => ({
  position: "absolute",
  right: odysseyDesignTokens.Spacing3,
  top:
    variant === "compact"
      ? odysseyDesignTokens.Spacing4
      : odysseyDesignTokens.Spacing3,
  height: variant === "compact" ? CARD_IMAGE_HEIGHT_COMPACT : "auto",
  display: "flex",
  alignItems: "center",
}));

const CardContentContainer = styled("div")(() => ({
  display: "flex",
}));

const CardImageAndContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "variant",
})<{ variant: (typeof cardVariantValues)[number] }>(({ variant }) => ({
  display: "flex",
  flexDirection: variant === "tile" ? "column" : "row",
}));

const CardContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: (typeof cardVariantValues)[number];
}>(({ odysseyDesignTokens, variant }) => ({
  "& > .MuiTypography-h5:not(:last-child)": {
    marginBlockEnd: `${variant === "compact" ? odysseyDesignTokens.Spacing1 : odysseyDesignTokens.Spacing3} !important`,
  },
  "& > *:last-child": {
    marginBlockEnd: 0,
  },
}));

const buttonProviderValue = { isFullWidth: true };

const Card = ({
  button,
  description,
  image,
  menuButtonChildren,
  onClick,
  overline,
  title,
  variant = "tile",
}: CardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const cardContent = useMemo(
    () => (
      <CardContentContainer>
        <CardImageAndContentContainer variant={variant}>
          {image && (
            <ImageContainer
              odysseyDesignTokens={odysseyDesignTokens}
              hasMenuButtonChildren={Boolean(menuButtonChildren)}
              variant={variant}
            >
              {image}
            </ImageContainer>
          )}

          <CardContent
            odysseyDesignTokens={odysseyDesignTokens}
            variant={variant}
          >
            {overline && <Support component="div">{overline}</Support>}
            {title && <Heading5 component="div">{title}</Heading5>}
            {description && (
              <Paragraph color="textSecondary">{description}</Paragraph>
            )}

            {button && (
              <MuiCardActions>
                <ButtonContext.Provider value={buttonProviderValue}>
                  {button}
                </ButtonContext.Provider>
              </MuiCardActions>
            )}
          </CardContent>
        </CardImageAndContentContainer>
      </CardContentContainer>
    ),
    [
      button,
      description,
      image,
      menuButtonChildren,
      overline,
      title,
      odysseyDesignTokens,
      variant,
    ],
  );

  return (
    <MuiCard className={`${onClick ? "isClickable" : ""} ods-card-${variant}`}>
      {onClick ? (
        <MuiCardActionArea onClick={onClick}>{cardContent}</MuiCardActionArea>
      ) : (
        cardContent
      )}

      {menuButtonChildren && (
        <MenuButtonContainer
          odysseyDesignTokens={odysseyDesignTokens}
          variant={variant}
        >
          <MenuButton
            endIcon={<MoreIcon />}
            ariaLabel="Card menu"
            buttonVariant="floating"
            menuAlignment="right"
            size="small"
            tooltipText="Actions"
          >
            {menuButtonChildren}
          </MenuButton>
        </MenuButtonContainer>
      )}
    </MuiCard>
  );
};

const MemoizedCard = memo(Card);
MemoizedCard.displayName = "Card";

/**
 * @deprecated The 'Tile' component is now called 'Card'. Please update your references as 'Tile' will be deprecated soon.
 */
const Tile = (props: CardProps) => {
  useEffect(() => {
    console.warn(
      "Warning: The 'Tile' component is now called 'Card'. Please update your references as 'Tile' will be deprecated soon.",
    );
  }, []);

  return <MemoizedCard {...props} />;
};

const MemoizedTile = memo(Tile);
MemoizedTile.displayName = "Tile";

export { MemoizedCard as Card, MemoizedTile as Tile };
