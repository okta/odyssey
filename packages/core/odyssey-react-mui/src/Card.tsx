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
} from "@mui/material";
import {
  memo,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useMemo,
} from "react";

import { Box } from "./Box.js";
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

export type CardProps = {
  description?: string;
  image?: ReactElement;
  overline?: string;
  title?: string;
} & (
  | {
      button?: never;
      menuButtonChildren?: never;
      onClick: MouseEventHandler;
    }
  | {
      button?: ReactElement<typeof Button>;
      menuButtonChildren?: MenuButtonProps["children"];
      onClick?: never;
    }
);

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "hasMenuButtonChildren",
})<{
  hasMenuButtonChildren: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens, hasMenuButtonChildren }) => ({
  display: "flex",
  alignItems: "flex-start",
  maxHeight: CARD_IMAGE_HEIGHT,
  height: CARD_IMAGE_HEIGHT,
  marginBlockEnd: odysseyDesignTokens.Spacing5,
  paddingRight: hasMenuButtonChildren ? odysseyDesignTokens.Spacing5 : 0,
}));

const MenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  position: "absolute",
  right: odysseyDesignTokens.Spacing3,
  top: odysseyDesignTokens.Spacing3,
}));

const CardContentContainer = styled("div")(() => ({
  display: "flex",
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
}: CardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const cardContent = useMemo(
    () => (
      <CardContentContainer>
        <Box>
          {image && (
            <ImageContainer
              hasMenuButtonChildren={Boolean(menuButtonChildren)}
              odysseyDesignTokens={odysseyDesignTokens}
            >
              {image}
            </ImageContainer>
          )}

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
        </Box>
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
    ],
  );

  return (
    <MuiCard className={onClick ? "isClickable" : ""}>
      {onClick ? (
        <MuiCardActionArea onClick={onClick}>{cardContent}</MuiCardActionArea>
      ) : (
        cardContent
      )}

      {menuButtonChildren && (
        <MenuButtonContainer odysseyDesignTokens={odysseyDesignTokens}>
          <MenuButton
            ariaLabel="Card menu"
            buttonVariant="floating"
            endIcon={<MoreIcon />}
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
