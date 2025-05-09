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

import { Box } from "../../Box.js";
import {
  Button,
  ButtonContext,
  MenuButton,
  MenuButtonProps,
} from "../../Buttons/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Heading5, Paragraph, Support } from "../../Typography.js";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MoreIcon,
} from "../../icons.generated/index.js";
import { CardLayoutProps } from "./componentTypes.js";
import { MRT_RowData } from "material-react-table";

export const CARD_IMAGE_SIZE = "64px";
export const CARD_IMAGE_SIZE_COMPACT = "48px";

export const cardVariantValues = ["tile", "stack", "compact"] as const;

export type DataCardProps<TData extends MRT_RowData> = {
  children?: ReactNode;
  description?: string;
  image?: ReactElement;
  overline?: string;
  renderDetailPanel?: CardLayoutProps<TData>["renderDetailPanel"];
  row: TData;
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

type DataCardComponent = (<TData extends MRT_RowData>(
  props: DataCardProps<TData>,
) => JSX.Element) & {
  displayName?: string;
};

const StyledAccessoryContainer = styled("div", {
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

const StyledImageContainer = styled("div", {
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

const StyledMenuButtonContainer = styled("div", {
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
  height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : "auto",
  display: "flex",
  alignItems: "center",
}));

const StyledCardInnerContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing3,
}));

const StyledCardImageAndContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "variant" && prop !== "centerContent",
})<{ variant: (typeof cardVariantValues)[number]; centerContent: boolean }>(
  ({ variant, centerContent }) => ({
    display: "flex",
    flexDirection: variant === "tile" ? "column" : "row",
    alignItems: centerContent ? "center" : "flex-start",
  }),
);

const StyledCardContent = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "variant",
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

const StyledCardChildrenContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  ["&:not(:first-child)"]: {
    marginBlockStart: odysseyDesignTokens.Spacing3,
  },
}));

const StyledAccessoryPlaceholder = styled(MuiIconButton)({
  visibility: "hidden",
});

const buttonProviderValue = { isFullWidth: true };

const DataCard: DataCardComponent = <TData extends MRT_RowData>({
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
}: DataCardProps<TData>) => {
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
      <StyledAccessoryPlaceholder disabled>
        <ChevronDownIcon />
      </StyledAccessoryPlaceholder>
    );
  }, [isDetailPanelOpen, renderDetailPanel, row, t]);

  const Accessory = useMemo(() => {
    return (
      <StyledAccessoryContainer
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {AccessoryProp}
        {renderDetailPanel && ExpansionToggle}
      </StyledAccessoryContainer>
    );
  }, [
    AccessoryProp,
    ExpansionToggle,
    odysseyDesignTokens,
    renderDetailPanel,
    variant,
  ]);

  const cardContent = useMemo(() => {
    const countDefinedProps = (
      props: Array<string | ReactNode | undefined>,
    ) => {
      return props.filter((prop) => prop !== undefined).length;
    };

    const shouldCenterContent =
      variant === "compact" &&
      (!renderDetailPanel || !isDetailPanelOpen) &&
      countDefinedProps([title, description, overline, button, children]) <= 2;

    return (
      <StyledCardInnerContainer odysseyDesignTokens={odysseyDesignTokens}>
        {(AccessoryProp || renderDetailPanel) && <Box>{Accessory}</Box>}
        <StyledCardImageAndContentContainer
          variant={variant}
          centerContent={shouldCenterContent}
        >
          {image && (
            <StyledImageContainer
              odysseyDesignTokens={odysseyDesignTokens}
              hasMenuButtonChildren={Boolean(menuButtonChildren)}
              variant={variant}
            >
              {image}
            </StyledImageContainer>
          )}

          <StyledCardContent
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
              <StyledCardChildrenContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {children}
              </StyledCardChildrenContainer>
            )}

            {renderDetailPanel && isDetailPanelOpen && (
              <StyledCardChildrenContainer
                odysseyDesignTokens={odysseyDesignTokens}
              >
                {renderDetailPanel({ row })}
              </StyledCardChildrenContainer>
            )}
          </StyledCardContent>
        </StyledCardImageAndContentContainer>
      </StyledCardInnerContainer>
    );
  }, [
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
  ]);

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
        <StyledMenuButtonContainer
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
        </StyledMenuButtonContainer>
      )}
    </MuiCard>
  );
};

const MemoizedDataCard = memo(DataCard) as DataCardComponent;
MemoizedDataCard.displayName = "DataCard";

export { MemoizedDataCard as DataCard };
