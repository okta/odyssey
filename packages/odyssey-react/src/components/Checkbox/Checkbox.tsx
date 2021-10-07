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

import { useCallback, useRef, useEffect, forwardRef } from "react";
import type { ComponentPropsWithRef, ChangeEvent } from "react";
import CheckIcon from "../Icon/Check";
import MinusIcon from "../Icon/Minus";
import styles from "./Checkbox.module.scss";
import { useOid, useOmit, withStyles } from "../../utils";

export interface Props
  extends Omit<
    ComponentPropsWithRef<"input">,
    "onChange" | "style" | "className" | "type" | "children"
  > {
  children?: never;
  /**
   * The form field label
   */
  label: string;

  /**
   * The input element indeterminate state for controlled components
   * @default false
   */
  indeterminate?: boolean;

  /**
   * Callback executed when the input fires a change event
   * @param {Object} event the event object
   * @param {string} value the string value of the input
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

/**
 * A clickable Checkbox used for form submissions and most in-page interactions.
 */
const Checkbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    id,
    label,
    onChange,
    required = true,
    indeterminate = false,
    ...rest
  } = props;

  const oid = useOid(id);
  const omitProps = useOmit(rest);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event, event.target.value);
    },
    [onChange]
  );

  const internalRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!ref) return;
    typeof ref === "function"
      ? ref(internalRef.current)
      : (ref.current = internalRef.current);
  }, [ref, internalRef]);

  useEffect(() => {
    if (!internalRef.current) return;
    internalRef.current.indeterminate = indeterminate;
  }, [indeterminate, internalRef]);

  return (
    <>
      <input
        {...omitProps}
        className={styles.checkbox}
        id={oid}
        onChange={handleChange}
        ref={internalRef}
        required={required}
        type="checkbox"
      />
      <label className={styles.label} htmlFor={oid}>
        <span className={styles.box} role="presentation">
          <span className={styles.indicator}>
            {indeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
        </span>

        {label}
      </label>
    </>
  );
});

Checkbox.displayName = "Checkbox";

export default withStyles(styles)(Checkbox);
