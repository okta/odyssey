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

// Code automatically generated by svgr; DO NOT EDIT.

import React, { forwardRef } from "react";
import { useOmit } from "../../utils";
import { SvgIcon } from "./SvgIcon";
import type { SvgIconNoChildrenProps } from "./types";

export type CaretDownIconProps = SvgIconNoChildrenProps;

const CaretDownIcon = forwardRef<SVGSVGElement, CaretDownIconProps>(
  (props, ref) => {
    const omitProps = useOmit(props);
    return (
      <SvgIcon ref={ref} {...omitProps}>
        <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.72595 4.31113L6.00121 6.7285L7 7.73909L7.99879 6.7285L10.274 4.31113C10.6672 3.89337 11.3272 3.89777 11.7204 4.31553C12.099 4.71781 12.0932 5.35957 11.7024 5.74959L7.34957 10.0937C7.15539 10.2875 6.84461 10.2875 6.65043 10.0937L2.29763 5.74959C1.90683 5.35957 1.90095 4.71781 2.27958 4.31553C2.67278 3.89777 3.33275 3.89337 3.72595 4.31113Z"
            fill="currentColor"
          />
        </svg>
      </SvgIcon>
    );
  }
);

CaretDownIcon.displayName = "CaretDownIcon";

export { CaretDownIcon };
