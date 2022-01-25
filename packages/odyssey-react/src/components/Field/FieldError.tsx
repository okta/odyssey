/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { forwardRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import type { ReactNode, FunctionComponent } from "react";
import styles from "./FieldError.module.scss";
import { Box } from "../Box";

interface FieldErrorProps {
  id: string;
  children: ReactNode;
}

export const FieldError: FunctionComponent<FieldErrorProps> = withTheme(
  () => ({}),
  styles
)(
  forwardRef<HTMLParagraphElement, FieldErrorProps>(({ children, id }, ref) => {
    return (
      <Box as="p" className={styles.root} id={`${id}-error`} ref={ref}>
        {children}
      </Box>
    );
  })
);

FieldError.displayName = "FieldError";
