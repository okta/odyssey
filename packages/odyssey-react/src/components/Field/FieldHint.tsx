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
import type { ComponentPropsWithRef, ReactText } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { Box } from "../Box";
import { Text } from "../Text";
import { useOmit } from "../../utils";
import { theme } from "./FieldHint.theme";
import styles from "./FieldHint.module.scss";

interface FieldHintProps
  extends Omit<ComponentPropsWithRef<"p">, "style" | "className" | "color"> {
  id: string;
  children: ReactText;
}

export const FieldHint = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLParagraphElement, FieldHintProps>((props, ref) => {
    const { children, id, ...rest } = props;
    const omitProps = useOmit(rest);

    return (
      <Box
        {...omitProps}
        ref={ref}
        as="p"
        className={styles.root}
        id={`${id}-hint`}
      >
        <Text color="body" fontSize="caption">
          {children}
        </Text>
      </Box>
    );
  })
);

FieldHint.displayName = "FieldHint";
