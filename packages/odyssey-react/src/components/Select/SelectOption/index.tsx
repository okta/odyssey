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
import type { ComponentPropsWithRef } from "react";
import { useOmit } from "../../../utils";
import { Box } from "../../Box";

export interface SelectOptionProps
  extends Omit<
    ComponentPropsWithRef<"option">,
    "style" | "className" | "selected" | "color"
  > {
  /**
   * The underlying option element value attribute.
   */
  value?: string;
}

/**
 * Often referred to as a "dropdown menu" this input triggers a menu of
 * options a user can select.
 */
const SelectOption = forwardRef<HTMLOptionElement, SelectOptionProps>(
  (props, ref) => {
    const { children, ...rest } = props;

    const omitProps = useOmit(rest);

    return (
      <Box as="option" {...omitProps} ref={ref}>
        {children}
      </Box>
    );
  }
);

SelectOption.displayName = "SelectOption";

export { SelectOption };
