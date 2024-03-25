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
import { Heading4, Paragraph } from "./Typography";
import { Box } from "./Box";
import styled from "@emotion/styled";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "./OdysseyDesignTokensContext";

const EmptyContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  flexDirection: "column",
  marginBlock: odysseyDesignTokens.Spacing9,
  padding: odysseyDesignTokens.Spacing5,
  textAlign: "center",
  width: "100%",
  alignItems: "center",
}));

export type EmptyDataStateProps = {
  /**
   * Main heading of the empty state
   */
  heading: string;
  /**
   * A descriptive text explaining more context as to why we don't have data.
   */
  text: string;
  /**
   * Primary call to action
   */
  primaryCallToActionComponent?: ReactNode;
  /**
   * Secondary call to action
   */
  secondaryCallToActionComponent?: ReactNode;
};

const EmptyDataState = ({
  heading,
  text,
  primaryCallToActionComponent,
  secondaryCallToActionComponent,
}: EmptyDataStateProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <EmptyContainer odysseyDesignTokens={odysseyDesignTokens}>
      <Heading4>{heading}</Heading4>
      <Paragraph>{text}</Paragraph>
      {(primaryCallToActionComponent || secondaryCallToActionComponent) && (
        <Box sx={{ marginBlockStart: 5 }}>
          {secondaryCallToActionComponent}
          {primaryCallToActionComponent}
        </Box>
      )}
    </EmptyContainer>
  );
};

const MemoizedEmptyDataState = memo(EmptyDataState);
MemoizedEmptyDataState.displayName = "EmptyDataState";

export { MemoizedEmptyDataState as EmptyDataState };
