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

const Sort = forwardRef<SVGSVGElement, Props>((props, ref) => {
  const omitProps = useOmit(props);
  return (
    <Icon ref={ref} {...omitProps}>
      <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g
          clipPath="url(#clip0)"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
        >
          <path d="M2.67504.341709C3.13066-.113903 3.86934-.113903 4.32496.341709L6.65829 2.67504C7.1139 3.13066 7.1139 3.86934 6.65829 4.32496 6.20268 4.78057 5.46399 4.78057 5.00837 4.32496L4.66667 3.98325V11.6667C4.66667 12.311 4.14433 12.8333 3.5 12.8333 2.85567 12.8333 2.33333 12.311 2.33333 11.6667V3.98325L1.99163 4.32496C1.53601 4.78057.79732 4.78057.341709 4.32496-.113903 3.86934-.113903 3.13066.341709 2.67504L2.67504.341709zM10.5 14C10.1906 14 9.89383 13.877 9.67504 13.6583L7.3417 11.325C6.8861 10.8693 6.8861 10.1307 7.3417 9.67504 7.79732 9.21943 8.53601 9.21943 8.99163 9.67504L9.33333 10.0168V2.33333C9.33333 1.689 9.85567 1.16667 10.5 1.16667 11.1443 1.16667 11.6667 1.689 11.6667 2.33333V10.0168L12.0084 9.67504C12.464 9.21943 13.2027 9.21943 13.6583 9.67504 14.1139 10.1307 14.1139 10.8693 13.6583 11.325L11.325 13.6583C11.1062 13.877 10.8094 14 10.5 14z" />
        </g>
        <defs>
          <clipPath id="clip0">
            <path fill="currentColor" d="M0 0H14V14H0z" />
          </clipPath>
        </defs>
      </svg>
    </Icon>
  );
});

export default Sort;
