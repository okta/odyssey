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
import { Alert, AlertTitle, Box } from "@mui/material";
import { memo, ReactNode } from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { useTranslation } from "./i18n.generated/i18n.js";
import { Link, LinkProps } from "./Link.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext.js";
import { Paragraph } from "./Typography.js";
import { useUniqueId } from "./useUniqueId.js";

export const calloutRoleValues = ["status", "alert"] as const;
export const calloutSeverityValues = [
  "success",
  "info",
  "warning",
  "error",
] as const;

export type CalloutProps = {
  /**
   * Supplementary content rendered inside the callout body, typically a list or structured markup.
   */
  children?: ReactNode;
  /**
   * Sets the ARIA live-region role.
   * - If `'status'`, announces updates politely; use for non-critical dynamic messages.
   * - If `'alert'`, announces updates assertively; use for errors or urgent information.
   */
  role?: (typeof calloutRoleValues)[number];
  /**
   * Visual severity level that controls the callout's color and icon.
   */
  severity: (typeof calloutSeverityValues)[number];
  /**
   * Primary message text displayed inside the callout body.
   */
  text?: string;
  /**
   * Heading text displayed at the top of the callout, above the body content.
   */
  title?: string;
} & (
  | {
      children?: never;
      text: string;
    }
  | {
      children: ReactNode;
      text?: never;
    }
) &
  // if linkText is provided, either linkUrl or onLinkClick must be provided
  (| {
        /** The `rel` attribute forwarded to the action link. */
        linkRel?: LinkProps["rel"];
        /** The `target` attribute forwarded to the action link. */
        linkTarget?: LinkProps["target"];
        /** Visible label for the action link rendered below the Callout content. */
        linkText: string;
        /** URL the action link navigates to. Required when `onLinkClick` is not provided. */
        linkUrl: LinkProps["href"];
        onLinkClick?: never;
      }
    | {
        linkRel?: never;
        linkTarget?: never;
        /** Visible label for the action link rendered below the Callout content. */
        linkText: string;
        linkUrl?: never;
        /** Click handler for the action link. Required when `linkUrl` is not provided. */
        onLinkClick: LinkProps["onClick"];
      }
    | {
        linkRel?: never;
        linkTarget?: never;
        linkText?: never;
        linkUrl?: never;
        onLinkClick?: never;
      }
  ) &
  Pick<HtmlProps, "testId" | "translate">;

const ContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  "& > * + *": {
    marginBlockStart: odysseyDesignTokens.Spacing4,
  },
}));

/**
 * A non-dismissible inline message that draws attention to important contextual information. Use
 * Callout to surface status, warnings, errors, or supplementary guidance within a page or form.
 */
const Callout = ({
  children,
  linkRel,
  linkTarget,
  linkText,
  linkUrl,
  onLinkClick,
  role,
  severity,
  testId,
  text,
  title,
  translate,
}: CalloutProps) => {
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const titleId = useUniqueId();

  return (
    <Alert
      aria-label={t(`severity.${severity}`)}
      aria-labelledby={titleId}
      data-se={testId}
      role={role}
      severity={severity}
      variant="callout"
    >
      {title && (
        <AlertTitle aria-hidden id={titleId} translate={translate}>
          {title}
        </AlertTitle>
      )}

      <ContentContainer odysseyDesignTokens={odysseyDesignTokens}>
        {children && <Box component="div">{children}</Box>}
        {text && <Paragraph>{text}</Paragraph>}
        {linkText && (
          <Box>
            <Link
              href={linkUrl ?? "#"}
              onClick={onLinkClick}
              rel={linkRel}
              target={linkTarget}
              variant="monochrome"
            >
              {linkText}
            </Link>
          </Box>
        )}
      </ContentContainer>
    </Alert>
  );
};

const MemoizedCallout = memo(Callout);
MemoizedCallout.displayName = "Callout";

export { MemoizedCallout as Callout };
