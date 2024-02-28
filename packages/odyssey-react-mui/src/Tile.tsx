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

import { MouseEventHandler, ReactElement, memo, useMemo } from "react";

import {
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardActionArea as MuiCardActionArea,
} from "@mui/material";
import styled from "@emotion/styled";

import { Button } from "./Button";
import { ButtonContext } from "./ButtonContext";
import { MoreIcon } from "./icons.generated";
import { MenuButton, MenuButtonProps } from "./MenuButton";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";
import { Heading5, Paragraph, Support } from "./Typography";

export const TILE_IMAGE_HEIGHT = "64px";

export type TileProps = {
  /**
   * The body text of the tile. The consumer is responsible for truncating this string.
   */
  description?: string;
  /**
   * An optional image or icon at the top of the tile, preferably as an <img> or <svg> element.
   */
  image?: ReactElement; // Icon or image
  /**
   * The "eyebrow" text above the tile title.
   */
  overline?: string;
  /**
   * The heading of the tile.
   */
  title?: string;
} & ( // You can't have actions and onClick at the same time
  | {
      /**
       * The event handler for when the user clicks the tile.
       */
      onClick: MouseEventHandler;
      button?: never;
      menuButtonChildren?: never;
    }
  | {
      onClick?: never;
      /**
       * The main action button for the tile. Not valid if the tile itself is clickable.
       */
      button?: ReactElement<typeof Button>;
      /**
       * Menu items to be rendered in the tile's optional menu button. If this prop is undefined, the
       * menu button will not be shown. Not valid if the tile itself is clickable.
       */
      menuButtonChildren?: MenuButtonProps["children"];
    }
);

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "hasMenuButtonChildren",
})<{
  odysseyDesignTokens: DesignTokens;
  hasMenuButtonChildren: boolean;
}>`
  display: flex;
  align-items: flex-start;
  max-height: ${TILE_IMAGE_HEIGHT};
  margin-block-end: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.Spacing5};
  padding-right: ${({ odysseyDesignTokens, hasMenuButtonChildren }) =>
    hasMenuButtonChildren ? odysseyDesignTokens.Spacing5 : 0};
`;

const MenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>`
  position: absolute;
  right: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing3};
  top: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing3};
`;

const buttonProviderValue = { isFullWidth: true };

const Tile = ({
  button,
  description,
  image,
  menuButtonChildren,
  onClick,
  overline,
  title,
}: TileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const cardContent = useMemo(
    () => (
      <>
        {image && (
          <ImageContainer
            odysseyDesignTokens={odysseyDesignTokens}
            hasMenuButtonChildren={Boolean(menuButtonChildren)}
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
      </>
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
            endIcon={<MoreIcon />}
            ariaLabel="Tile menu"
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

const MemoizedTile = memo(Tile);
MemoizedTile.displayName = "Tile";

export { MemoizedTile as Tile };
