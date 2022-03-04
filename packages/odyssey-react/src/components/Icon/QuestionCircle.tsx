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

// Code automatically generated by svgr; DO NOT EDIT.

import React, { forwardRef } from "react";
import { useOmit } from "../../utils";
import { SvgIcon } from "./SvgIcon";
import type { SvgIconNoChildrenProps } from "./types";

export type QuestionCircleIconProps = SvgIconNoChildrenProps;

export const QuestionCircleIcon = forwardRef<
  SVGSVGElement,
  QuestionCircleIconProps
>((props, ref) => {
  const omitProps = useOmit(props);
  return (
    <SvgIcon ref={ref} {...omitProps}>
      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM8 12C8.14834 12 8.29334 11.956 8.41668 11.8736C8.54001 11.7912 8.63614 11.6741 8.69291 11.537C8.74968 11.4 8.76453 11.2492 8.73559 11.1037C8.70665 10.9582 8.63522 10.8246 8.53033 10.7197C8.42544 10.6148 8.29181 10.5434 8.14632 10.5144C8.00083 10.4855 7.85003 10.5003 7.71299 10.5571C7.57594 10.6139 7.45881 10.71 7.3764 10.8333C7.29399 10.9567 7.25 11.1017 7.25 11.25C7.25 11.4489 7.32902 11.6397 7.46967 11.7803C7.61032 11.921 7.80109 12 8 12ZM6.35355 5.85355C6.82015 5.38695 7.45845 5 8 5C8.82843 5 9.5 5.67157 9.5 6.5C9.5 6.86272 9.35225 7.11627 9.02777 7.42945C8.87892 7.5731 8.7078 7.7151 8.50541 7.88304L8.50539 7.88306L8.41463 7.95843C8.17828 8.15503 7.91352 8.37937 7.64645 8.64645C7.45118 8.84171 7.45118 9.15829 7.64645 9.35355C7.84171 9.54882 8.15829 9.54882 8.35355 9.35355C8.58648 9.12063 8.82172 8.92054 9.05412 8.72723L9.14187 8.65439L9.1419 8.65437C9.34083 8.48943 9.54414 8.32086 9.72223 8.14898C10.1477 7.7383 10.5 7.24185 10.5 6.5C10.5 5.11929 9.38071 4 8 4C7.06099 4 6.17985 4.61305 5.64645 5.14645L6.35355 5.85355Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
});

QuestionCircleIcon.displayName = "QuestionCircleIcon";
