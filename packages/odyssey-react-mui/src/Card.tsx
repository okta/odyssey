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
} from "@mui/material";
import {
  Button,
  ButtonContext,
  DesignTokens,
  Heading5,
  MenuButtonProps,
  Paragraph,
  Support,
  useOdysseyDesignTokens,
} from ".";
import styled from "@emotion/styled";

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

  ["&:hover"]: isClickable
    ? {
        borderColor: odysseyDesignTokens.HueNeutralWhite,
        boxShadow: odysseyDesignTokens.DepthMedium,
      }
    : {},
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
  // display: "flex",
  // TODO: remove the variant thing
  backgroundColor:
    variant === "tile"
      ? odysseyDesignTokens.HueNeutralWhite
      : odysseyDesignTokens.HueNeutralWhite,
  display: "none",
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
  padding: odysseyDesignTokens.Spacing5,
  flexDirection: variant === "tile" ? "column" : "row",
  gap: odysseyDesignTokens.Spacing4,
}));

const ImageContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  height: "4.5714285714rem",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite, // TODO: remove
}));

const ContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
  gap: odysseyDesignTokens.Spacing4,

  "& > *": {
    marginBlock: 0,
  },
}));

const UpperContentContainer = styled("div", {
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
  backgroundColor: odysseyDesignTokens.HueNeutralWhite,
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

  console.log(isLoading, variant, menuButtonChildren, onClick);

  const cardContent = useMemo(() => {
    const buttonProviderValue = { isFullWidth: true };
    return (
      <InnerContainer
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {image && (
          <ImageContainer odysseyDesignTokens={odysseyDesignTokens}>
            {image}
          </ImageContainer>
        )}
        <ContentContainer odysseyDesignTokens={odysseyDesignTokens}>
          <UpperContentContainer odysseyDesignTokens={odysseyDesignTokens}>
            {overline && <Support component="div">{overline}</Support>}
            {title && <Heading5 component="div">{title}</Heading5>}
          </UpperContentContainer>
          {description && (
            <Paragraph color="textSecondary">{description}</Paragraph>
          )}

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
      <AccessoriesContainer
        odysseyDesignTokens={odysseyDesignTokens}
        variant={variant}
      >
        {accessory}
      </AccessoriesContainer>
      {onClick ? (
        <StyledCardActionArea onClick={onClick}>
          {cardContent}
        </StyledCardActionArea>
      ) : (
        cardContent
      )}
    </StyledCard>
  );
};

const MemoizedCard = memo(Card);
MemoizedCard.displayName = "Card";

export { MemoizedCard as Card };

// import {
//   MouseEventHandler,
//   ReactElement,
//   memo,
//   useMemo,
//   ReactNode,
// } from "react";
// import {
//   Card as MuiCard,
//   CardActions as MuiCardActions,
//   CardActionArea as MuiCardActionArea,
// } from "@mui/material";
// import styled from "@emotion/styled";
// import { useTranslation } from "react-i18next";

// import { Box } from "./Box";
// import {
//   Button,
//   ButtonContext,
//   MenuButton,
//   MenuButtonProps,
// } from "./Buttons";
// import {
//   DesignTokens,
//   useOdysseyDesignTokens,
// } from "./OdysseyDesignTokensContext";
// import { Heading5, Paragraph, Support } from "./Typography";
// import {
//   MoreIcon,
// } from "./icons.generated";

// export const CARD_IMAGE_SIZE = "64px";
// export const CARD_IMAGE_SIZE_COMPACT = "48px";

// export const cardVariantValues = ["tile", "stack", "compact"] as const;

// export type CardProps = {
//   children?: ReactNode;
//   description?: string;
//   image?: ReactElement;
//   overline?: string;
//   title?: string;
//   variant?: (typeof cardVariantValues)[number];
// } & (
//     | {
//       Accessory?: never;
//       button?: never;
//       menuButtonChildren?: never;
//       onClick: MouseEventHandler;
//     }
//     | {
//       Accessory?: ReactNode;
//       button?: ReactElement<typeof Button>;
//       menuButtonChildren?: MenuButtonProps["children"];
//       onClick?: never;
//     }
//   );

// const StyledMuiCard = styled(MuiCard, {
//   shouldForwardProp: (prop) =>
//     prop !== "odysseyDesignTokens" &&
//     prop !== "hasAccessory" &&
//     prop !== "variant",
// })<{
//   odysseyDesignTokens: DesignTokens;
//   hasAccessory?: boolean;
//   variant: (typeof cardVariantValues)[number];
// }>(({ odysseyDesignTokens, hasAccessory = false, variant = "tile" }) => ({
//   border: `${odysseyDesignTokens.BorderWidthMain} ${odysseyDesignTokens.HueNeutral200} ${odysseyDesignTokens.BorderStyleMain}`,
// }));

// const AccessoryContainer = styled("div", {
//   shouldForwardProp: (prop) =>
//     prop !== "odysseyDesignTokens" && prop !== "variant",
// })<{
//   odysseyDesignTokens: DesignTokens;
//   variant: (typeof cardVariantValues)[number];
// }>(({ odysseyDesignTokens, variant }) => ({
//   display: "flex",
//   flexDirection: variant === "compact" ? "row" : "column",
//   alignItems: "center",
//   gap: odysseyDesignTokens.Spacing2,
//   height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : "auto",
// }));

// const ImageContainer = styled("div", {
//   shouldForwardProp: (prop) =>
//     prop !== "odysseyDesignTokens" &&
//     prop !== "hasMenuButtonChildren" &&
//     prop !== "variant",
// })<{
//   odysseyDesignTokens: DesignTokens;
//   hasMenuButtonChildren: boolean;
//   variant: (typeof cardVariantValues)[number];
// }>(({ odysseyDesignTokens, hasMenuButtonChildren, variant }) => ({
//   display: "flex",
//   alignItems: "flex-start",
//   height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : CARD_IMAGE_SIZE,
//   maxHeight: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : CARD_IMAGE_SIZE,
//   marginBlockEnd: variant === "tile" ? odysseyDesignTokens.Spacing5 : 0,
//   paddingRight: hasMenuButtonChildren ? odysseyDesignTokens.Spacing5 : 0,
// }));

// const MenuButtonContainer = styled("div", {
//   shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
// })<{
//   odysseyDesignTokens: DesignTokens;
//   variant: (typeof cardVariantValues)[number];
// }>(({ odysseyDesignTokens, variant }) => ({
//   position: "absolute",
//   right: odysseyDesignTokens.Spacing3,
//   top:
//     variant === "compact"
//       ? odysseyDesignTokens.Spacing4
//       : odysseyDesignTokens.Spacing3,
//   height: variant === "compact" ? CARD_IMAGE_SIZE_COMPACT : "auto",
//   display: "flex",
//   alignItems: "center",
// }));

// const CardInnerContainer = styled("div", {
//   shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
// })<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
//   display: "flex",
//   gap: odysseyDesignTokens.Spacing3,
// }));

// const CardImageAndContentContainer = styled("div", {
//   shouldForwardProp: (prop) => prop !== "variant",
// })<{ variant: (typeof cardVariantValues)[number]; }>(
//   ({ variant }) => ({
//     display: "flex",
//     flexDirection: variant === "tile" ? "column" : "row",
//     alignItems: "flex-start",
//   }),
// );

// const CardContent = styled("div", {
//   shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
// })<{
//   odysseyDesignTokens: DesignTokens;
//   variant: (typeof cardVariantValues)[number];
// }>(({ odysseyDesignTokens, variant }) => ({
//   "& > .MuiTypography-h5:not(:last-child)": {
//     marginBlockEnd: `${variant === "compact" ? odysseyDesignTokens.Spacing1 : odysseyDesignTokens.Spacing3} !important`,
//   },
//   "& > *:last-child": {
//     marginBlockEnd: 0,
//   },
// }));

// const CardChildrenContainer = styled("div", {
//   shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
// })<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
//   ["&:not(:first-child)"]: {
//     marginBlockStart: odysseyDesignTokens.Spacing3,
//   },
// }));

// const buttonProviderValue = { isFullWidth: true };

// const Card = ({
//   Accessory: AccessoryProp,
//   button,
//   children,
//   description,
//   image,
//   menuButtonChildren,
//   onClick,
//   overline,
//   title,
//   variant = "tile",
// }: CardProps) => {
//   const odysseyDesignTokens = useOdysseyDesignTokens();
//   const { t } = useTranslation();

//   const Accessory = useMemo(() => {
//     return (
//       <AccessoryContainer
//         odysseyDesignTokens={odysseyDesignTokens}
//         variant={variant}
//       >
//         {AccessoryProp}
//       </AccessoryContainer>
//     );
//   }, [AccessoryProp, odysseyDesignTokens, variant]);

//   const cardContent = useMemo(() => {
//     return (
//       <CardInnerContainer odysseyDesignTokens={odysseyDesignTokens}>
//         {AccessoryProp && <Box>{Accessory}</Box>}
//         <CardImageAndContentContainer
//           variant={variant}
//         >
//           {image && (
//             <ImageContainer
//               odysseyDesignTokens={odysseyDesignTokens}
//               hasMenuButtonChildren={Boolean(menuButtonChildren)}
//               variant={variant}
//             >
//               {image}
//             </ImageContainer>
//           )}

//           <CardContent
//             odysseyDesignTokens={odysseyDesignTokens}
//             variant={variant}
//           >
//             {overline && <Support component="div">{overline}</Support>}
//             {title && <Heading5 component="div">{title}</Heading5>}
//             {description && (
//               <Paragraph color="textSecondary">{description}</Paragraph>
//             )}

//             {button && (
//               <MuiCardActions>
//                 <ButtonContext.Provider value={buttonProviderValue}>
//                   {button}
//                 </ButtonContext.Provider>
//               </MuiCardActions>
//             )}

//             {children && (
//               <CardChildrenContainer odysseyDesignTokens={odysseyDesignTokens}>
//                 {children}
//               </CardChildrenContainer>
//             )}

//           </CardContent>
//         </CardImageAndContentContainer>
//       </CardInnerContainer>
//     );
//   }, [odysseyDesignTokens, AccessoryProp, Accessory, variant, image, menuButtonChildren, overline, title, description, button, children]);

//   return (
//     <StyledMuiCard
//       hasAccessory={Boolean(Accessory)}
//       role="listitem"
//       variant={variant}
//     >
//       {onClick ? (
//         <MuiCardActionArea onClick={onClick}>{cardContent}</MuiCardActionArea>
//       ) : (
//         cardContent
//       )}

//       {menuButtonChildren && (
//         <MenuButtonContainer
//           odysseyDesignTokens={odysseyDesignTokens}
//           variant={variant}
//         >
//           <MenuButton
//             endIcon={<MoreIcon />}
//             ariaLabel={t("table.moreactions.arialabel")}
//             buttonVariant="floating"
//             menuAlignment="right"
//             size="small"
//             tooltipText={t("table.actions")}
//           >
//             {menuButtonChildren}
//           </MenuButton>
//         </MenuButtonContainer>
//       )}
//     </StyledMuiCard>
//   );
// };

// const MemoizedCard = memo(Card);
// MemoizedCard.displayName = "Card";

// export { MemoizedCard as Card };
