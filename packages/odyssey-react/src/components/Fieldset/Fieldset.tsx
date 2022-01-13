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
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Box } from "../Box";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOmit } from "../../utils";
import styles from "./Fieldset.module.scss";

export interface FieldsetProps
  extends Omit<
    ComponentPropsWithRef<"fieldset">,
    "style" | "color" | "className"
  > {
  /**
   * The human readable section title to be visually displayed
   */
  children: ReactNode;
}

/**
 * The <fieldset> HTML element is used to group several controls as
 * well as labels (<label>) within a Form component instance.
 */
export const Fieldset = withTheme(
  () => ({}),
  styles
)(
  forwardRef<HTMLFieldSetElement, FieldsetProps>((props, ref) => {
    const { children, ...rest } = props;

    const omitProps = useOmit(rest);

    return (
      <Box as="fieldset" {...omitProps} ref={ref} className={styles.root}>
        {children}
      </Box>
    );
  })
);

Fieldset.displayName = "Fieldset";
