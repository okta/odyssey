/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

// Code automatically generated; DO NOT EDIT.

import { forwardRef, memo } from "react";

import { SvgIcon, type SvgIconNoChildrenProps } from "../SvgIcon.js";

export type SparkleIconProps = SvgIconNoChildrenProps;

const SparkleIcon = forwardRef<SVGSVGElement, SparkleIconProps>(
  (props, ref) => {
    return (
      <SvgIcon
        fill="none"
        ref={ref}
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <>
          <path
            clipRule="evenodd"
            d="M10.672.667v.666c0 .109-.002.216-.006.32.075 1.567.707 2.442 1.43 2.95.809.568 1.822.736 2.557.73l.667-.005v.01h.01L15.325 6l.005.662h-.01v.01l-.667-.005c-.735-.005-1.748.162-2.558.731-.722.508-1.354 1.382-1.43 2.95.005.104.007.21.007.32v.666H9.325v-.667c0-.108.002-.215.006-.32-.075-1.567-.707-2.441-1.43-2.949-.809-.569-1.822-.736-2.557-.73l-.667.004v-.01h-.01L4.672 6l-.005-.661h.01v-.01l.667.004c.735.006 1.748-.162 2.558-.73.722-.508 1.354-1.383 1.43-2.95a7.984 7.984 0 0 1-.007-.32V.667h1.347Zm.657 5.64a4.42 4.42 0 0 0-1.33 1.473 4.42 4.42 0 0 0-1.33-1.473 4.808 4.808 0 0 0-.5-.307c.17-.09.337-.192.5-.306a4.42 4.42 0 0 0 1.33-1.473 4.42 4.42 0 0 0 1.33 1.473c.162.114.33.216.5.306-.17.09-.338.193-.5.307Zm-7.326 5.184a2.812 2.812 0 0 1-.52.51c.191.144.366.314.52.51.154-.196.33-.366.52-.51a2.812 2.812 0 0 1-.52-.51Zm3.337-.152-.005.662.005.661h-.01v.01l-.667-.005c-.384-.002-.896.087-1.293.366-.357.251-.698.708-.698 1.634v.667H3.335v-.667c0-.926-.342-1.383-.699-1.634-.396-.279-.908-.368-1.293-.366l-.666.005v-.01h-.01l.005-.661-.005-.662h.01v-.01l.666.005c.385.003.897-.087 1.293-.366.357-.251.699-.708.699-1.634v-.667h1.337v.667c0 .926.341 1.383.698 1.634.397.28.909.369 1.293.366l.667-.005v.01h.01Z"
            fill="currentColor"
            fillRule="evenodd"
          />
        </>
      </SvgIcon>
    );
  },
);

const MemoizedSparkleIcon = memo(SparkleIcon);
MemoizedSparkleIcon.displayName = "SparkleIcon";

export { MemoizedSparkleIcon as SparkleIcon };
