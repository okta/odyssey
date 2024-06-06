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
import { Card as MuiCard, Checkbox as MuiCheckbox } from "@mui/material";
import { Box } from "../../Box";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import styled from "@emotion/styled";
import { MRT_RowData } from "material-react-table";

export type StackItemProps = {
  children: ReactNode;
  isSelectable?: boolean;
  isSelected?: boolean;
  onToggleRowSelection?: (row: MRT_RowData) => void;
  menuActions?: ReactNode;
};

const MenuButtonContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  position: "absolute",
  right: odysseyDesignTokens.Spacing3,
  top: odysseyDesignTokens.Spacing3,
}));

const StackItem = ({
  children,
  isSelectable,
  onToggleRowSelection,
  isSelected,
  menuActions,
}: StackItemProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <MuiCard>
      {isSelectable && (
        <Box
          sx={{
            marginBlockEnd: 4,
          }}
        >
          <MuiCheckbox checked={isSelected} onChange={onToggleRowSelection} />
        </Box>
      )}
      {children}

      <MenuButtonContainer odysseyDesignTokens={odysseyDesignTokens}>
        {menuActions}
      </MenuButtonContainer>
    </MuiCard>
  );
};

const MemoizedStackItem = memo(StackItem);
MemoizedStackItem.displayName = "StackItem";

export { MemoizedStackItem as StackItem };
