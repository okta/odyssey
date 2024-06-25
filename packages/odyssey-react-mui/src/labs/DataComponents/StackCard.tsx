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
  useState,
} from "react";
import {
  IconButton as MuiIconButton,
  Card as MuiCard,
  CardActions as MuiCardActions,
  CardActionArea as MuiCardActionArea,
  Tooltip as MuiTooltip,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Box } from "../../Box";
import { Button } from "../../Button";
import { ButtonContext } from "../../ButtonContext";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Heading5, Paragraph, Support } from "../../Typography";
import { MenuButton, MenuButtonProps } from "../../MenuButton";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreIcon,
} from "../../icons.generated";

export const CARD_IMAGE_HEIGHT = "64px";

export type StackCardProps = {
  children?: ReactNode;
  description?: string;
  detailPanel?: ReactNode;
  image?: ReactElement;
  overline?: string;
  title?: string;
} & (
  | {
      Accessory?: never;
      button?: never;
      menuButtonChildren?: never;
      onClick: MouseEventHandler;
    }
  | {
      Accessory?: ReactNode;
      button?: ReactElement<typeof Button>;
      menuButtonChildren?: MenuButtonProps["children"];
      onClick?: never;
    }
);

const AccessoryContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing2,
}));

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "hasMenuButtonChildren",
})<{
  odysseyDesignTokens: DesignTokens;
  hasMenuButtonChildren: boolean;
}>(({ odysseyDesignTokens, hasMenuButtonChildren }) => ({
  display: "flex",
  alignItems: "flex-start",
  maxHeight: `${CARD_IMAGE_HEIGHT}`,
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

const CardContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing3,
}));

const CardChildrenContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  ["* + &"]: {
    marginBlockStart: odysseyDesignTokens.Spacing3,
  },
}));

const buttonProviderValue = { isFullWidth: true };

const StackCard = ({
  Accessory: AccessoryProp,
  button,
  children,
  description,
  detailPanel,
  image,
  menuButtonChildren,
  onClick,
  overline,
  title,
}: StackCardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState<boolean>(false);

  const Accessory = useMemo(
    () => (
      <AccessoryContainer odysseyDesignTokens={odysseyDesignTokens}>
        {AccessoryProp}
        <MuiTooltip
          title={
            isDetailPanelOpen
              ? t("table.rowexpansion.close")
              : t("table.rowexpansion.open")
          }
        >
          <MuiIconButton
            children={
              isDetailPanelOpen ? <ChevronUpIcon /> : <ChevronDownIcon />
            }
            onClick={() => setIsDetailPanelOpen(!isDetailPanelOpen)}
            aria-label={
              isDetailPanelOpen
                ? t("table.rowexpansion.close")
                : t("table.rowexpansion.open")
            }
          />
        </MuiTooltip>
      </AccessoryContainer>
    ),
    [AccessoryProp, isDetailPanelOpen, odysseyDesignTokens, t],
  );

  const cardContent = useMemo(
    () => (
      <CardContentContainer odysseyDesignTokens={odysseyDesignTokens}>
        {Accessory && <Box>{Accessory}</Box>}
        <Box>
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

          {children && (
            <CardChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
              {children}
            </CardChildrenContainer>
          )}

          {detailPanel && isDetailPanelOpen && (
            <CardChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
              {detailPanel}
            </CardChildrenContainer>
          )}
        </Box>
      </CardContentContainer>
    ),
    [
      odysseyDesignTokens,
      Accessory,
      detailPanel,
      image,
      menuButtonChildren,
      overline,
      title,
      description,
      button,
      children,
      isDetailPanelOpen,
    ],
  );

  return (
    <MuiCard
      className={`${onClick ? "isClickable" : ""} ${Accessory ? "hasAccessory" : ""}`}
    >
      {onClick ? (
        <MuiCardActionArea onClick={onClick}>{cardContent}</MuiCardActionArea>
      ) : (
        cardContent
      )}

      {menuButtonChildren && (
        <MenuButtonContainer odysseyDesignTokens={odysseyDesignTokens}>
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
        </MenuButtonContainer>
      )}
    </MuiCard>
  );
};

const MemoizedStackCard = memo(StackCard);
MemoizedStackCard.displayName = "StackCard";

export { MemoizedStackCard as StackCard };
