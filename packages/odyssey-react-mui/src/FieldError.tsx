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
import { ErrorMessagesList } from "./ErrorMessagesList";
import { useTranslation } from "react-i18next";

import type { SeleniumProps } from "./SeleniumProps";

export type FieldErrorProps = {
  id?: string;
  text: string | string[];
} & SeleniumProps;

const FieldError = ({ id, testId, text }: FieldErrorProps) => {
  const { t } = useTranslation();

  return (
    <FormHelperText data-se={testId} error id={id}>
      <ScreenReaderText>{`${t(
        "fielderror.screenreader.text"
      )}:`}</ScreenReaderText>
      {Array.isArray(text) ? (
        <ErrorMessagesList id={id} errorMessages={text} />
      ) : (
        text
      )}
    </FormHelperText>
  );
};

const MemoizedFieldError = memo(FieldError);
MemoizedFieldError.displayName = "FieldError";

export { MemoizedFieldError as FieldError };
