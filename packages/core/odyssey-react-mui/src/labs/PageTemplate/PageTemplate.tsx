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

import styled from "@emotion/styled";
import { memo, ReactElement, ReactNode, useCallback, useRef } from "react";

import { DrawerProps } from "../../Drawer.js";
import { DocumentationIcon } from "../../icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";
import { Heading4, Paragraph } from "../../Typography.js";
import { useHasUiShell } from "../../ui-shell/useHasUiShell.js";
import { useMountLifecycleEffect } from "../../useMountLifecycleEffect.js";
import { DocumentationLink } from "./DocumentationLink.js";

export type PageTemplateProps = {
  /**
   * The content of the layout. May be a `string` or any other `ReactNode` or array of `ReactNode`s. Will often be `Grid` objects.
   */
  children?: ReactNode;
  /**
   * A supplementary description to be situated in the layout header
   */
  description?: string;
  /**
   * The destination for a documentation `Link` to be situated in the layout header
   */
  documentationLink?: string;
  /**
   * The text for a documentation `Link` to be situated in the layout header
   */
  documentationText?: string;
  /**
   * An optional `Drawer` object. Can be of variant 'temporary' or 'persistent'.
   */
  drawer?: ReactElement<DrawerProps>;
  /**
   * When set to `true`, the layout expands past its max width of 1440px and spans the entire available screen width.
   */
  isFullWidth?: boolean;
  /**
   * An optional `Button` object to be situated in the layout header. Should almost always be of variant `primary`.
   */
  primaryCallToActionComponent?: ReactElement;
  /**
   * An optional `Button` object to be situated in the layout header, alongside the `callToActionPrimaryComponent`.
   */
  secondaryCallToActionComponent?: ReactElement;
  /**
   * An optional `Button` object to be situated in the layout header, alongside the other two `callToAction` components.
   */
  tertiaryCallToActionComponent?: ReactElement;
  /**
   * The title of the layout to be situated in the layout header
   */
  title?: string;
};

type TemplateContentProps = {
  drawerVariant?: string;
  isDrawerOpen?: boolean;
  isFirstRender: boolean;
  odysseyDesignTokens: DesignTokens;
};

const TemplateContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "hasUiShell" &&
    prop !== "isFullWidth",
})<{
  hasUiShell: boolean;
  isFullWidth: boolean;
  odysseyDesignTokens: DesignTokens;
}>(({ hasUiShell, isFullWidth, odysseyDesignTokens }) => ({
  maxWidth: isFullWidth
    ? "100%"
    : `calc(1440px + ${odysseyDesignTokens.Spacing6} + ${odysseyDesignTokens.Spacing6})`,
  marginInline:
    isFullWidth && !hasUiShell ? odysseyDesignTokens.Spacing6 : "auto",
  padding: hasUiShell ? 0 : odysseyDesignTokens.Spacing6,
}));

const TemplateHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: odysseyDesignTokens.Spacing4,
}));

const TemplateHeaderPrimaryContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  maxWidth: odysseyDesignTokens.TypographyLineLengthMax,
  [".MuiTypography-root:last-child"]: {
    marginBlockEnd: "0",
  },
}));

const TemplateHeaderSecondaryContent = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  alignItems: "flex-end",
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing4,
  minHeight: odysseyDesignTokens.Spacing7,
  justifyContent: "center",
  whiteSpace: "nowrap",
}));

const TemplateHeaderButtons = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  display: "flex",
  gap: odysseyDesignTokens.Spacing2,
}));

const TemplateContent = styled("div", {
  shouldForwardProp: (prop) =>
    ![
      "drawerVariant",
      "isDrawerOpen",
      "isFirstRender",
      "odysseyDesignTokens",
    ].includes(prop),
})<TemplateContentProps>(
  ({ drawerVariant, isDrawerOpen, isFirstRender, odysseyDesignTokens }) => ({
    "@keyframes animate-drawer-open": {
      "0%": {
        gridTemplateColumns: "minmax(0, 1fr) 0",
      },
      "100%": {
        gridTemplateColumns: "minmax(0, 1fr) 360px",
      },
    },
    "@keyframes animate-drawer-close": {
      "0%": {
        gridTemplateColumns: "minmax(0, 1fr) 360px",
      },
      "100%": {
        gridTemplateColumns: "minmax(0, 1fr) 0",
      },
    },
    display: "grid",
    gridGap:
      drawerVariant === "persistent" && !isDrawerOpen
        ? 0
        : odysseyDesignTokens.Spacing4,
    gap:
      drawerVariant === "persistent" && !isDrawerOpen
        ? 0
        : odysseyDesignTokens.Spacing4,
    marginBlock: odysseyDesignTokens.Spacing4,
    gridTemplateColumns:
      drawerVariant === "persistent"
        ? isDrawerOpen
          ? "minmax(0, 1fr) 360px"
          : "minmax(0, 1fr) 0"
        : "minmax(0, 1fr)",
    animation:
      drawerVariant === "persistent" && (!isFirstRender || isDrawerOpen)
        ? `animate-drawer-${isDrawerOpen ? "open" : "close"} 225ms cubic-bezier(0, 0, 0.2, 1)`
        : undefined,
  }),
);

const PageTemplate = ({
  children,
  description,
  documentationLink,
  documentationText,
  drawer,
  isFullWidth = false,
  primaryCallToActionComponent,
  secondaryCallToActionComponent,
  tertiaryCallToActionComponent,
  title,
}: PageTemplateProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isOpen: isDrawerOpen, variant: drawerVariant } = drawer?.props ?? {};

  const hasUiShell = useHasUiShell();

  const firstRenderRef = useRef(true);

  const isFirstRender = firstRenderRef.current;

  const onMount = useCallback(() => {
    firstRenderRef.current = false;
  }, []);

  useMountLifecycleEffect({
    onMount,
  });

  return (
    <TemplateContainer
      hasUiShell={hasUiShell}
      isFullWidth={isFullWidth}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      <TemplateHeader odysseyDesignTokens={odysseyDesignTokens}>
        <TemplateHeaderPrimaryContent odysseyDesignTokens={odysseyDesignTokens}>
          {title && <Heading4>{title}</Heading4>}
          {description && <Paragraph>{description}</Paragraph>}
        </TemplateHeaderPrimaryContent>
        <TemplateHeaderSecondaryContent
          odysseyDesignTokens={odysseyDesignTokens}
        >
          {documentationLink && (
            <DocumentationLink
              href={documentationLink}
              icon={<DocumentationIcon />}
              target="_blank"
            >
              {documentationText}
            </DocumentationLink>
          )}
          {(primaryCallToActionComponent ||
            secondaryCallToActionComponent ||
            tertiaryCallToActionComponent) && (
            <TemplateHeaderButtons odysseyDesignTokens={odysseyDesignTokens}>
              {tertiaryCallToActionComponent}
              {secondaryCallToActionComponent}
              {primaryCallToActionComponent}
            </TemplateHeaderButtons>
          )}
        </TemplateHeaderSecondaryContent>
      </TemplateHeader>
      <TemplateContent
        drawerVariant={drawerVariant}
        isDrawerOpen={isDrawerOpen}
        isFirstRender={isFirstRender}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {children}
        {drawer}
      </TemplateContent>
    </TemplateContainer>
  );
};

const MemoizedPageTemplate = memo(PageTemplate);
MemoizedPageTemplate.displayName = "PageTemplate";

export { MemoizedPageTemplate as PageTemplate };
