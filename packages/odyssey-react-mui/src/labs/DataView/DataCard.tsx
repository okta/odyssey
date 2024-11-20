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
import {
  Button,
  ButtonContext,
  MenuButton,
  MenuButtonProps,
} from "../../Buttons";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Heading5, Paragraph, Support } from "../../Typography";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreIcon,
} from "../../icons.generated";
import { CardLayoutProps } from "./componentTypes";
import { MRT_RowData } from "material-react-table";

export const CARD_IMAGE_SIZE = "64px";
export const CARD_IMAGE_SIZE_COMPACT = "48px";

export const cardVariantValues = ["tile", "stack", "compact"] as const;

export type DataCardProps = {
  children?: ReactNode;
  description?: string;
  image?: ReactElement;
  overline?: string;
  renderDetailPanel?: CardLayoutProps["renderDetailPanel"];
  row: MRT_RowData;
  title?: string;
  variant?: (typeof cardVariantValues)[number];
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
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: (typeof cardVariantValues)[number];
}>(({ odysseyDesignTokens, variant }) => ({
  display: "flex",
  flexDirection: variant === "compact" ? "row" : "column",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing2,
  height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : "auto",
}));

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
  height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : CARD_IMAGE_SIZE,
  maxHeight: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : CARD_IMAGE_SIZE,
  marginBlockEnd: variant === "tile" ? odysseyDesignTokens.Spacing5 : 0,
  paddingRight: hasMenuButtonChildren ? odysseyDesignTokens.Spacing5 : 0,
}));

const MenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
  variant: (typeof cardVariantValues)[number];
}>(({ odysseyDesignTokens, variant }) => ({
  position: "absolute",
  right: odysseyDesignTokens.Spacing3,
  top: odysseyDesignTokens.Spacing3,
  height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : "auto",
  display: "flex",
  alignItems: "center",
}));

const CardInnerContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing3,
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
  "& > .MuiTypography-h5": {
    marginBlockEnd: `${variant === "compact" ? odysseyDesignTokens.Spacing1 : odysseyDesignTokens.Spacing3} !important`,
  },
}));

const CardChildrenContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  ["&:not(:first-child)"]: {
    marginBlockStart: odysseyDesignTokens.Spacing3,
  },
}));

const AccessoryPlaceholder = styled(MuiIconButton)(() => ({
  visibility: "hidden",
}));
const buttonProviderValue = { isFullWidth: true };

const DataCard = ({
  Accessory: AccessoryProp,
  button,
  children,
  description,
  image,
  menuButtonChildren,
  onClick,
  overline,
  renderDetailPanel,
  row,
  title,
  variant = "tile",
}: DataCardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState<boolean>(false);

  const ExpansionToggle = useMemo(() => {
    return renderDetailPanel?.({ row }) ? (
      <MuiTooltip
        title={
          isDetailPanelOpen
            ? t("table.rowexpansion.collapse")
            : t("table.rowexpansion.expand")
        }
      >
        <MuiIconButton
          children={isDetailPanelOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsDetailPanelOpen(!isDetailPanelOpen)}
          aria-label={
            isDetailPanelOpen
              ? t("table.rowexpansion.collapse")
              : t("table.rowexpansion.expand")
          }
        />
      </MuiTooltip>
    ) : (
      <AccessoryPlaceholder disabled>
        <ChevronDownIcon />
      </AccessoryPlaceholder>
    );
  }, [isDetailPanelOpen, renderDetailPanel, row, t]);

  const Accessory = useMemo(() => {
    return (
      <AccessoryContainer
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {AccessoryProp}
        {renderDetailPanel && ExpansionToggle}
      </AccessoryContainer>
    );
  }, [
    AccessoryProp,
    ExpansionToggle,
    odysseyDesignTokens,
    renderDetailPanel,
    variant,
  ]);

  const cardContent = useMemo(
    () => (
      <CardInnerContainer odysseyDesignTokens={odysseyDesignTokens}>
        {(AccessoryProp || renderDetailPanel) && <Box>{Accessory}</Box>}
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

            {children && (
              <CardChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
                {children}
              </CardChildrenContainer>
            )}

            {renderDetailPanel && isDetailPanelOpen && (
              <CardChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
                {renderDetailPanel({ row })}
              </CardChildrenContainer>
            )}
          </CardContent>
        </CardImageAndContentContainer>
      </CardInnerContainer>
    ),
    [
      odysseyDesignTokens,
      AccessoryProp,
      renderDetailPanel,
      Accessory,
      variant,
      image,
      menuButtonChildren,
      overline,
      title,
      description,
      button,
      children,
      isDetailPanelOpen,
      row,
    ],
  );

  return (
    <MuiCard
      className={`${onClick ? "isClickable" : ""} ${Accessory ? "hasAccessory" : ""} ods-card-${variant}`}
      role="listitem"
    >
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

const MemoizedDataCard = memo(DataCard);
MemoizedDataCard.displayName = "DataCard";

export { MemoizedDataCard as DataCard };
