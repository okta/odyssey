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

import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { useOmit } from "../../utils";

import styles from "./List.module.scss";

type Props = Omit<ComponentPropsWithoutRef<"li">, "style" | "className">;

const DescriptionDetails = forwardRef<HTMLElement, Props>((props, ref) => {
  const { children, ...rest } = props;

  const omitProps = useOmit(rest);

  return (
    <dd {...omitProps} ref={ref} className={styles.details}>
      {children}
    </dd>
  );
});

DescriptionDetails.displayName = "DescriptionDetails";

export default DescriptionDetails;
