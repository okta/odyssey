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

import type { ComponentPropsWithRef } from "react";
import { forwardRef } from "react";
import { useOmit, withStyles } from "../../utils";
import styles from "./CircularLoadIndicator.module.scss";

export interface CircularLoadIndicatorProps
  extends Omit<
    ComponentPropsWithRef<"span">,
    "style" | "className" | "role" | "aria-valuemin" | "aria-valuemax"
  > {
  /**
   * id used as reference by loading region
   */
  id: string;
  /**
   * Accessible text to communicate current state, eg: "Loading..."
   */
  "aria-valuetext": string;
  /**
   * Accessible name of loader
   */
  "aria-label": string;
}

/**
 * Indicates content is loading
 * When describing the loading progress of a particular region of a page,
 * the author should use `aria-describedby` to point to the indicator, and
 * set the `aria-busy` attribute to `true` on the region until it is finished loading.
 */
let CircularLoadIndicator = forwardRef<
  HTMLSpanElement,
  CircularLoadIndicatorProps
>((props, ref) => {
  const {
    "aria-label": ariaLabel,
    "aria-valuetext": ariaValuetext,
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  return (
    <span
      {...omitProps}
      className={styles.root}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={1}
      aria-valuetext={ariaValuetext}
      aria-label={ariaLabel}
      ref={ref}
    >
      <svg className={styles.svg} viewBox="0 0 24 24">
        <circle
          className={styles.circle}
          cx="12"
          cy="12"
          r="10"
          fill="none"
        ></circle>
        <circle
          className={styles.animatedCircle}
          cx="12"
          cy="12"
          r="10"
          fill="none"
        ></circle>
      </svg>
    </span>
  );
});

CircularLoadIndicator.displayName = "CircularLoadIndicator";

CircularLoadIndicator = withStyles(styles)(CircularLoadIndicator);

export { CircularLoadIndicator };
