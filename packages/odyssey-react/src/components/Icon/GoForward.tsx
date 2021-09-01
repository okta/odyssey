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

const GoForward = forwardRef<SVGSVGElement, Props>((props, ref) => {
  const omitProps = useOmit(props);
  return (
    <Icon ref={ref} {...omitProps}>
      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.48941 6.00121L7.07204 3.72595C6.65428 3.33275 6.65868 2.67278 7.07644 2.27958C7.47872 1.90095 8.12048 1.90683 8.5105 2.29763L12.8546 6.65043C13.0484 6.84461 13.0484 7.15539 12.8546 7.34957L8.5105 11.7024C8.12048 12.0932 7.47872 12.099 7.07644 11.7204C6.65868 11.3272 6.65428 10.6672 7.07204 10.274L9.48941 7.99879H1.50848C1.22765 7.99879 1 7.7752 1 7.4994V6.5006C1 6.2248 1.22765 6.00121 1.50848 6.00121H9.48941Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
});

export default GoForward;
