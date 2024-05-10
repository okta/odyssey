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
import { Alert, AlertTitle, Box, Link as MuiLink } from "@mui/material";
import { memo, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import type { HtmlProps } from "./HtmlProps";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";
import { type FeatureTestSelector } from "./test-selectors";
import { Paragraph } from "./Typography";
import { useUniqueId } from "./useUniqueId";

export const CalloutTestSelectors = {
  feature: {
    link: {
      selector: {
        method: "ByRole",
        options: {
          name: "${linkText}",
        },
        role: "link",
        templateVariableNames: ["linkText"],
      },
    },
    text: {
      selector: {
        method: "ByText",
        templateVariableNames: ["text"],
        text: "${text}",
      },
    },
    title: {
      selector: {
        method: "ByText",
        templateVariableNames: ["title"],
        text: "${title}",
      },
    },
  },
  selector: {
    method: "ByRole",
    options: {
      name: "${title}",
    },
    role: "${role}",
    templateVariableNames: ["role", "title"],
  },
} as const satisfies FeatureTestSelector;

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
  (
    | {
        /**
         * If linkUrl is not undefined, this is the text of the link.
         * If left blank, it defaults to "Learn more".
         * Note that linkText does nothing if linkUrl is not defined
         */
        linkUrl: string;
        /**
         * If defined, the Toast will include a link to the URL
         */
        linkText: string;
      }
    | {
        linkUrl?: never;
        linkText?: never;
      }
  ) &
  Pick<HtmlProps, "testId" | "translate">;

const ContentContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  "& > * + *": {
    marginBlockStart: odysseyDesignTokens.Spacing4,
  },
}));

const Callout = ({
  children,
  linkText,
  linkUrl,
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
        {linkUrl && (
          <Box>
            <MuiLink href={linkUrl} variant="monochrome">
              {linkText}
            </MuiLink>
          </Box>
        )}
      </ContentContainer>
    </Alert>
  );
};

const MemoizedCallout = memo(Callout);
MemoizedCallout.displayName = "Callout";

export { MemoizedCallout as Callout };
