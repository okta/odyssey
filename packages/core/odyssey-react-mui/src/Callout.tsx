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
   * Used to optionally pass a text list to the component
   */
  children?: ReactNode;
  /**
   * Sets the ARIA role of the Callout
   * ("status" for something that dynamically updates, "alert" for errors, null for something
   * unchanging)
   */
  role?: (typeof calloutRoleValues)[number];
  /**
   * Determine the color and icon of the Callout
   */
  severity: (typeof calloutSeverityValues)[number];
  /**
   * The text content of the Callout
   */
  text?: string;
  /**
   * The title of the Callout
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
        linkRel?: LinkProps["rel"];
        linkTarget?: LinkProps["target"];
        linkText: string;
        linkUrl: LinkProps["href"];
        onLinkClick?: never;
      }
    | {
        linkRel?: never;
        linkTarget?: never;
        linkText: string;
        linkUrl?: never;
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
