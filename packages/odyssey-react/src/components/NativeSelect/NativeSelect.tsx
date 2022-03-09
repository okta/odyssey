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

import React from "react";
import { NativeSelectOption } from "./NativeSelectOption";
import { NativeSelectOptionGroup } from "./NativeSelectOptionGroup";
import { Field } from "../Field";
import { withTheme } from "@okta/odyssey-react-theme";
import { forwardRefWithStatics, useOmit, useOid } from "../../utils";
import { theme } from "./NativeSelect.theme";
import styles from "./NativeSelect.module.scss";

import type { ComponentPropsWithRef, ReactNode } from "react";
import type { CommonFieldProps } from "../Field/types";
import { ChevronDownIcon } from "../Icon";

export interface NativeSelectProps
  extends CommonFieldProps,
    Omit<ComponentPropsWithRef<"select">, "style" | "className"> {
  /**
   * Select options
   */
  children: ReactNode;
  /**
   * Allow for multiple selections
   */
  multiple?: boolean;
}

type Statics = {
  Option: typeof NativeSelectOption;
  OptionGroup: typeof NativeSelectOptionGroup;
};

/**
 * Native select input to choose one option from a list
 */
export const NativeSelect = withTheme(
  theme,
  styles
)(
  forwardRefWithStatics<HTMLSelectElement, NativeSelectProps, Statics>(
    (props) => {
      const { children, id, label, error, multiple, ...rest } = props;
      const omitProps = useOmit(rest);
      const oid = useOid(id);

      const select = (
        <div className={styles.outer}>
          <select
            {...omitProps}
            className={styles.root}
            id={oid}
            multiple={multiple}
          >
            {children}
          </select>
          <div className={styles.indicator}>
            <ChevronDownIcon />
          </div>
        </div>
      );

      const multiselect = (
        <select
          {...omitProps}
          className={styles.root}
          id={oid}
          multiple={multiple}
        >
          {children}
        </select>
      );

      return (
        <Field label={label} inputId={oid} error={error}>
          {multiple ? multiselect : select}
        </Field>
      );
    }
  )
);

NativeSelect.displayName = "NativeSelect";

NativeSelect.Option = NativeSelectOption;
NativeSelect.OptionGroup = NativeSelectOptionGroup;
