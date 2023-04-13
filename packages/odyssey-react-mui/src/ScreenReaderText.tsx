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
import { Box, visuallyHidden } from "./";

export type ScreenReaderTextProps = {
  /**
   * The visually-hidden text.
   */
  children: ReactNode;
};

/**
 * MUI sx expects you pass in a CSS object, not an object with CSS.
 * They seem identical, but only if you create a new object like this will MUI be happy with the type of visuallyHidden.
 * It's otherwise a regular object with CSS properties.
 */
const style = { ...visuallyHidden };

const ScreenReaderText = ({ children }: ScreenReaderTextProps) => (
  <Box sx={style}>{children}</Box>
);

const MemoizedScreenReaderText = memo(ScreenReaderText);

export { MemoizedScreenReaderText as ScreenReaderText };
