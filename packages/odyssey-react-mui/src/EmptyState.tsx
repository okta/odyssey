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

import { ReactNode, memo } from "react";
import { Heading4, Paragraph } from "./Typography.js";
import { Box } from "./Box.js";
import styled from "@emotion/styled";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "./OdysseyDesignTokensContext.js";

const EmptyContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  marginBlock: odysseyDesignTokens.Spacing9,
  padding: odysseyDesignTokens.Spacing5,
  textAlign: "center",
  width: "100%",
  alignItems: "center",
}));

export type EmptyStateProps = {
  /**
   * Main heading of the empty state
   */
  heading: string;
  /**
   * A descriptive text explaining more context as to why we don't have data.
   */
  description: string;
  /**
   * Primary call to action
   */
  PrimaryCallToActionComponent?: ReactNode;
  /**
   * Secondary call to action
   */
  SecondaryCallToActionComponent?: ReactNode;
};

const EmptyState = ({
  heading,
  description,
  PrimaryCallToActionComponent,
  SecondaryCallToActionComponent,
}: EmptyStateProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <EmptyContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Heading4>{heading}</Heading4>
      <Paragraph>{description}</Paragraph>
      {(PrimaryCallToActionComponent || SecondaryCallToActionComponent) && (
        <Box sx={{ marginBlockStart: 5 }}>
          {SecondaryCallToActionComponent}
          {PrimaryCallToActionComponent}
        </Box>
      )}
    </EmptyContainer>
  );
};

const MemoizedEmptyState = memo(EmptyState);
MemoizedEmptyState.displayName = "EmptyState";

export { MemoizedEmptyState as EmptyState };
export { MemoizedEmptyState as DataTableEmptyState };
