/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import styled from "@emotion/styled";
import { formHelperTextClasses } from "@mui/material/FormHelperText";

import { DesignTokens } from "../index.js";

export const HintContainerWithInlineStartSpacing = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  paddingInlineStart: `calc(${odysseyDesignTokens.TypographyLineHeightUi}em + ${odysseyDesignTokens.Spacing2})`,
  marginBlockEnd: odysseyDesignTokens.Spacing2,

  // MUI applies the '.Mui-error' class to this hint text when the checkbox is invalid which turns the copy red
  // We want to keep the hint text gray in the error state
  [`.${formHelperTextClasses.root}.${formHelperTextClasses.error}`]: {
    color: odysseyDesignTokens.TypographyColorSubordinate,
  },
}));
