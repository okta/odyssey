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

import { memo, ReactNode } from "react";
import { Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { HtmlProps } from "./HtmlProps";

export type ScreenReaderTextProps = {
  /**
   * The visually-hidden text.
   */
  children: ReactNode;
  id?: string;
} & Pick<HtmlProps, "ariaHidden" | "translate">;

/**
 * MUI sx expects you pass in a CSS object, not an object with CSS.
 * They seem identical, but only if you create a new object like this will MUI be happy with the type of visuallyHidden.
 * It's otherwise a regular object with CSS properties.
 */
const style = { ...visuallyHidden };

const ScreenReaderText = ({
  ariaHidden,
  children,
  id,
  translate,
}: ScreenReaderTextProps) => (
  <Box
    aria-hidden={ariaHidden}
    sx={style}
    component="span"
    id={id}
    translate={translate}
  >
    {children}
  </Box>
);

const MemoizedScreenReaderText = memo(ScreenReaderText);
MemoizedScreenReaderText.displayName = "ScreenReaderText";

export { MemoizedScreenReaderText as ScreenReaderText };
