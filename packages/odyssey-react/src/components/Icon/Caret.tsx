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

import { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { useOmit } from "../../utils";
import Icon from "./Icon";

export interface Props
  extends Omit<ComponentPropsWithRef<"svg">, "style" | "className"> {
  title?: string;
  titleId?: string;
}

const Caret = forwardRef<SVGSVGElement, Props>((props, ref) => {
  const omitProps = useOmit(props);
  return (
    <Icon ref={ref} {...omitProps}>
      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.63967 8.06464C7.29376 8.43526 6.70625 8.43526 6.36032 8.06464L2.73967 4.18536C2.39376 3.81474 1.80625 3.81474 1.46032 4.18536L1.43223 4.21547C1.11846 4.55165 1.11846 5.07335 1.43223 5.40953L6.35589 10.6849C6.70344 11.0573 7.29436 11.0552 7.63934 10.6804L12.5605 5.33417C12.8759 4.99164 12.8644 4.46128 12.5347 4.13263C12.1876 3.78665 11.623 3.79684 11.2886 4.15514L7.63967 8.06464Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
});

export default Caret;
