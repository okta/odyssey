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

import { InputLabel as MuiInputLabel } from "@mui/material";
import { memo, useMemo } from "react";

import { useTranslation } from "react-i18next";
import { ScreenReaderText } from "./ScreenReaderText";
import { Typography } from "./Typography";

export type FieldLabelProps = {
  hasVisibleLabel: boolean;
  id: string;
  inputId: string;
  isOptional: boolean;
  text: string;
};

const FieldLabel = ({
  hasVisibleLabel,
  id,
  inputId,
  isOptional,
  text,
}: FieldLabelProps) => {
  const { t } = useTranslation();

  const inputLabel = useMemo(
    () => (
      <MuiInputLabel htmlFor={inputId} id={id}>
        <span>{text}</span>
        {isOptional && (
          <Typography variant="caption">
            {t("fieldlabel.optional.text")}
          </Typography>
        )}
      </MuiInputLabel>
    ),
    [id, inputId, isOptional, text, t]
  );

  return hasVisibleLabel ? (
    inputLabel
  ) : (
    <ScreenReaderText>{inputLabel}</ScreenReaderText>
  );
};

const MemoizedFieldLabel = memo(FieldLabel);
MemoizedFieldLabel.displayName = "FieldLabel";

export { MemoizedFieldLabel as FieldLabel };
