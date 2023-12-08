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

import {
  FormHelperText as MuiFormHelperText,
  List as MuiList,
  ListItem as MuiListItem,
} from "@mui/material";

export type ErrorMessagesListProps = {
  id?: string;
  errorMessages: string[];
};

export const ErrorMessagesList = ({
  id,
  errorMessages,
}: ErrorMessagesListProps) => {
  return (
    <MuiFormHelperText id={id} role="alert" error sx={{ textAlign: "start" }}>
      <MuiList disablePadding dense>
        {errorMessages.map((error) => (
          <MuiListItem
            disablePadding
            dense
            sx={{
              paddingInlineStart: 0,
            }}
          >
            {error}
          </MuiListItem>
        ))}
      </MuiList>
    </MuiFormHelperText>
  );
};
