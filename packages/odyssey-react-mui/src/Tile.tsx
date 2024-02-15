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

import { ReactElement, memo, useMemo } from "react";

import { NullElement } from "./NullElement";
import {
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardActionArea as MuiCardActionArea,
} from "@mui/material";
import { Button } from "./Button";
import { ButtonContext } from "./ButtonContext";
import { Heading5, Paragraph, Support } from "./Typography";
import { MoreIcon } from "./icons.generated";
import { HtmlProps } from "./HtmlProps";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";
import { MenuButton } from "./MenuButton";

export type TileProps = {
  description?: string;
  image?: ReactElement | NullElement; // Icon or image
  menuItems?: ReactElement;
  overline?: string;
  title?: string;
} & ( // You can't have actions and onClick at the same time
  | {
      onClick: () => void;
      button?: never;
      menuItems?: never;
    }
  | {
      onClick?: never;
      button?: ReactElement<typeof Button> | NullElement;
      menuItems?: ReactElement;
    }
) &
  HtmlProps;

const ImageContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
  hasMenuItems: boolean;
}>`
  display: flex;
  align-items: flex-start;
  max-height: 64px;
  margin-block-end: ${(props) => props.odysseyDesignTokens.Spacing5};
  padding-right: ${(props) =>
    props.hasMenuItems ? props.odysseyDesignTokens.Spacing5 : 0};
`;

const MenuButtonContainer = styled.div<{ odysseyDesignTokens: DesignTokens }>`
  position: absolute;
  right: ${(props) => props.odysseyDesignTokens.Spacing3};
  top: ${(props) => props.odysseyDesignTokens.Spacing3};
`;

const Tile = ({
  button,
  description,
  image,
  menuItems,
  onClick,
  overline,
  title,
}: TileProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const cardContent = useMemo(() => {
    return (
      <>
        {image && (
          <ImageContainer
            odysseyDesignTokens={odysseyDesignTokens}
            hasMenuItems={Boolean(menuItems)}
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
            <ButtonContext.Provider value={{ isFullWidth: true }}>
              {button}
            </ButtonContext.Provider>
          </MuiCardActions>
        )}
      </>
    );
  }, [
    button,
    description,
    image,
    menuItems,
    overline,
    title,
    odysseyDesignTokens,
  ]);

  return (
    <MuiCard className={onClick ? "isClickable" : ""}>
      {onClick && (
        <MuiCardActionArea onClick={onClick}>{cardContent}</MuiCardActionArea>
      )}

      {!onClick && cardContent}

      {menuItems && (
        <MenuButtonContainer odysseyDesignTokens={odysseyDesignTokens}>
          <MenuButton
            endIcon={<MoreIcon />}
            ariaLabel="Tile menu"
            buttonVariant="floating"
            menuAlignment="right"
            size="small"
          >
            {menuItems}
          </MenuButton>
        </MenuButtonContainer>
      )}
    </MuiCard>
  );
};

const MemoizedTile = memo(Tile);
MemoizedTile.displayName = "Tile";

export { MemoizedTile as Tile };
