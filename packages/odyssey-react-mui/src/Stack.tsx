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
import { Stack as MuiStack, StackProps as MuiStackProps } from "@mui/material";

export type StackProps = {
  children?: MuiStackProps["children"];
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   */
  component?: MuiStackProps["component"];
  /**
   * Defines the flex-direction style property. It is applied for all screen sizes.
   */
  direction?: MuiStackProps["direction"];
  /**
   * Defines the space between immediate children.
   */
  spacing?: MuiStackProps["spacing"];
};

const Stack = ({ children, spacing }: StackProps) => {
  return <MuiStack spacing={spacing}>{children}</MuiStack>;
};

const MemoizedStack = memo(Stack);
MemoizedStack.displayName = "Stack";

export { MemoizedStack as Stack };
