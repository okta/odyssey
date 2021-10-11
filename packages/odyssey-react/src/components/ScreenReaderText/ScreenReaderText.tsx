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

import type {
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactText,
} from "react";
import { withStyles, useOmit } from "../../utils";
import styles from "./ScreenReaderText.module.scss";

interface Props
  extends Omit<ComponentPropsWithoutRef<"span">, "style" | "className"> {
  /**
   * Visibly hidden / SR-only text
   */
  children: ReactText;

  /**
   * The underlying parent semantic HTML element.
   * @default span
   */
  as?: "span" | "em" | "strong";
}

const ScreenReaderText: FunctionComponent<Props> = (props) => {
  const { children, as = "span", ...rest } = props;

  const Tag = as;

  const omitProps = useOmit(rest);

  return (
    <Tag {...omitProps} className={styles.root}>
      {children}
    </Tag>
  );
};

ScreenReaderText.displayName = "ScreenReaderText";

export default withStyles(styles)(ScreenReaderText);
