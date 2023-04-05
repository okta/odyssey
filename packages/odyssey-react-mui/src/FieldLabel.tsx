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

import { InputLabel } from "@mui/material";
import { memo } from "react";

import { Typography, visuallyHidden } from ".";

export type FieldLabelProps = {
  hasVisibleLabel: boolean;
  id: string;
  inputId: string;
  isRequired: boolean;
  optionalText?: string;
  text: string;
};

const FieldLabel = ({
  hasVisibleLabel,
  id,
  inputId,
  isRequired,
  optionalText,
  text,
}: FieldLabelProps) => {
  return (
    <InputLabel
      htmlFor={inputId}
      id={id}
      style={hasVisibleLabel ? undefined : visuallyHidden}
    >
      {text}
      {!isRequired && (
        <Typography variant="subtitle1">{optionalText}</Typography>
      )}
    </InputLabel>
  );
};

const MemoizedFieldLabel = memo(FieldLabel);

export { MemoizedFieldLabel as FieldLabel };
