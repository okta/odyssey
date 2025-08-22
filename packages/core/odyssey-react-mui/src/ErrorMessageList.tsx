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

import { List as MuiList, ListItem as MuiListItem } from "@mui/material";
import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext.js";
import { memo, useMemo } from "react";

export type ErrorMessageListProps = {
  errorMessages: string[];
};

const listItemStyles = {
  display: "list-item",
  paddingInlineStart: 0,
};

const ErrorMessageList = ({ errorMessages }: ErrorMessageListProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const listStyles = useMemo(
    () => ({
      listStyle: "disc",
      paddingInlineStart: odysseyDesignTokens.Spacing4,
    }),
    [odysseyDesignTokens],
  );

  return (
    <MuiList disablePadding dense sx={listStyles}>
      {errorMessages.map((errorMessage) => (
        <MuiListItem
          key={errorMessage}
          disablePadding
          dense
          sx={listItemStyles}
        >
          {errorMessage}
        </MuiListItem>
      ))}
    </MuiList>
  );
};

const MemoizedErrorMessageList = memo(ErrorMessageList);
MemoizedErrorMessageList.displayName = "ErrorMessageList";

export { MemoizedErrorMessageList as ErrorMessageList };
