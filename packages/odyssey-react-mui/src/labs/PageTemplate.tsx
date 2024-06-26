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

import { memo, ReactElement, ReactNode } from "react";
import { Box } from "../Box";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Heading4, Subordinate } from "../Typography";
import { Link } from "../Link";
import { DocumentationIcon } from "../icons.generated";

export type PageTemplateProps = {
  /**
   * The title of the layout to be situated in the layout header
   */
  title?: string;
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
  drawer?: ReactElement;
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
   * The content of the layout. May be a `string` or any other `ReactNode` or array of `ReactNode`s. Will often be `Grid` objects.
   */
  children?: ReactNode;
  /**
   * When set to `true`, the layout expands past its max width of 1440px and spans the entire available screen width.
   */
  isFullWidth?: boolean;
};

interface TemplateContentProps {
  odysseyDesignTokens: DesignTokens;
  isDrawerOpen?: boolean;
  drawerVariant?: string;
}

const TemplateHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({}) => ({
  top: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
}));

const TemplateContent = styled("div", {
  shouldForwardProp: (prop) =>
    !["odysseyDesignTokens", "isDrawerOpen", "drawerVariant"].includes(prop),
})<TemplateContentProps>(
  ({ odysseyDesignTokens, isDrawerOpen, drawerVariant }) => ({
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
      drawerVariant === "persistent" && isDrawerOpen
        ? "animate-drawer-open 225ms cubic-bezier(0, 0, 0.2, 1)"
        : "animate-drawer-close 225ms cubic-bezier(0, 0, 0.2, 1)",
  }),
);

const PageTemplate = ({
  title,
  description,
  documentationLink,
  documentationText,
  primaryCallToActionComponent,
  secondaryCallToActionComponent,
  tertiaryCallToActionComponent,
  children,
  drawer,
  isFullWidth = false,
}: PageTemplateProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { isOpen: isDrawerOpen, variant: drawerVariant } = drawer?.props ?? {};

  return (
    <Box
      sx={{
        maxWidth: isFullWidth ? "100%" : "1440px",
        marginInline: isFullWidth ? odysseyDesignTokens.Spacing6 : "auto",
      }}
    >
      <TemplateHeader odysseyDesignTokens={odysseyDesignTokens}>
        <Box>
          <Heading4>{title}</Heading4>
          <Subordinate>{description}</Subordinate>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            rowGap: odysseyDesignTokens.Spacing4,
          }}
        >
          {documentationLink && (
            <Link href={documentationLink} icon={<DocumentationIcon />}>
              {documentationText}
            </Link>
          )}
          <Box
            sx={{
              display: "flex",
              columnGap: odysseyDesignTokens.Spacing2,
            }}
          >
            {tertiaryCallToActionComponent}
            {secondaryCallToActionComponent}
            {primaryCallToActionComponent}
          </Box>
        </Box>
      </TemplateHeader>
      <TemplateContent
        odysseyDesignTokens={odysseyDesignTokens}
        isDrawerOpen={isDrawerOpen}
        drawerVariant={drawerVariant}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: odysseyDesignTokens.Spacing4,
          }}
        >
          {children}
        </Box>
        {drawer}
      </TemplateContent>
    </Box>
  );
};

const MemoizedPageTemplate = memo(PageTemplate);
MemoizedPageTemplate.displayName = "PageTemplate";

export { MemoizedPageTemplate as PageTemplate };
