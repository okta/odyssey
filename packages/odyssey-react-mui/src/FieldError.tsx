/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo } from "react";

import { FormHelperText } from "@mui/material";
import { ScreenReaderText } from "./ScreenReaderText";
import { ErrorMessageList } from "./ErrorMessageList";
import { useTranslation } from "react-i18next";

import type { HtmlProps } from "./HtmlProps";
import { Box } from "./Box";

export type FieldErrorProps = {
  id?: string;
  message?: string;
  messageList?: string[];
} & HtmlProps;

const FieldError = ({
  id,
  message,
  messageList,
  testId,
  translate,
}: FieldErrorProps) => {
  const { t } = useTranslation();

  return (
    <FormHelperText data-se={testId} error id={id} translate={translate}>
      <ScreenReaderText translate={translate}>{`${t(
        "fielderror.screenreader.text",
      )}:`}</ScreenReaderText>
      <Box>
        {message}
        {messageList && <ErrorMessageList errorMessages={messageList} />}
      </Box>
    </FormHelperText>
  );
};

const MemoizedFieldError = memo(FieldError);
MemoizedFieldError.displayName = "FieldError";

export { MemoizedFieldError as FieldError };
