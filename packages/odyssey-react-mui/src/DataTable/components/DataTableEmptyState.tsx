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

import { ReactElement, memo } from "react";
import { Heading4, Paragraph } from "../../Typography";
import { Box } from "../../Box";
import styled from "@emotion/styled";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Button } from "../../Button";

const EmptyContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  flex-direction: column;
  margin-block: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing9};
  padding: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing5};
  text-align: center;
  width: 100%;
`;
export type DataTableEmptyStateProps = {
  heading: string;
  text: string;
  primaryButton?: ReactElement<typeof Button>;
  secondaryButton?: ReactElement<typeof Button>;
};

const DataTableEmptyState = ({
  heading,
  text,
  primaryButton,
  secondaryButton,
}: DataTableEmptyStateProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  return (
    <EmptyContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Heading4>{heading}</Heading4>
      <Paragraph>{text}</Paragraph>
      {(primaryButton || secondaryButton) && (
        <Box sx={{ marginBlockStart: 5 }}>
          {secondaryButton}
          {primaryButton}
        </Box>
      )}
    </EmptyContainer>
  );
};

const MemoizedDataTableEmptyState = memo(DataTableEmptyState);
export { MemoizedDataTableEmptyState as DataTableEmptyState };
