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

import { ReactElement, memo, useCallback, useMemo } from "react";

import type { SeleniumProps } from "./SeleniumProps";
import { NullElement } from "./NullElement";
import {
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardActionArea as MuiCardActionArea,
} from "@mui/material";
import { Button, ButtonContext } from "./Button";
import { Box } from "./Box";
import { Heading5, Paragraph, Support } from "./Typography";
import { MenuButton } from ".";
import { MoreIcon } from "./icons.generated";

export type TileProps = {
  description?: string;
  image?: ReactElement | NullElement; // Icon or image
  menuItems?: ReactElement;
  overline?: string;
  title?: string;
} & ( // You can't have actions and onClick at the same time
  | {
      button?: ReactElement<typeof Button> | NullElement;
      onClick: () => void;
    }
  | {
      button: ReactElement<typeof Button> | NullElement;
      onClick?: () => void;
    }
  | {
      button: undefined | null;
      onClick: undefined | null;
    }
) &
  SeleniumProps;

const Tile = ({
  button,
  description,
  image,
  menuItems,
  onClick,
  overline,
  title,
}: TileProps) => {
  const preventClickPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const cardContent = useMemo(() => {
    return (
      <>
        {image && (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              maxHeight: "64px",
              marginBlockEnd: 5,
              paddingRight: menuItems ? "20px" : 0,
            }}
          >
            {image}
          </Box>
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
  }, [button, description, image, menuItems, overline, title]);

  return (
    <MuiCard className={onClick ? "isClickable" : ""}>
      {onClick && (
        <MuiCardActionArea onClick={onClick}>{cardContent}</MuiCardActionArea>
      )}

      {!onClick && cardContent}

      {menuItems && (
        <Box
          sx={{
            position: "absolute",
            right: "8px",
            top: "8px",
          }}
        >
          <MenuButton
            endIcon={<MoreIcon />}
            ariaLabel="Tile menu"
            buttonVariant="floating"
            menuAlignment="right"
            size="small"
            onClick={preventClickPropagation}
            onClose={preventClickPropagation}
          >
            {menuItems}
          </MenuButton>
        </Box>
      )}
    </MuiCard>
  );
};

const MemoizedTile = memo(Tile);
MemoizedTile.displayName = "Tile";

export { MemoizedTile as Tile };
