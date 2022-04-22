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

import { CSSProperties, RefObject } from "react";

function getPosition(
  position: "top" | "end" | "bottom" | "start",
  rect: DOMRect,
  paddingValue: number,
  direction: string
) {
  switch (position) {
    default:
    case "top":
      return {
        left: rect.x + rect.width / 2,
        top: rect.y - paddingValue,
      };
    case "bottom":
      return {
        left: rect.x + rect.width / 2,
        top: rect.y + rect.height + paddingValue,
      };
    case "end":
      return direction === "ltr"
        ? {
            left: rect.x + rect.width,
            top: rect.y + rect.height / 2,
          }
        : {
            left: rect.x,
            top: rect.y + rect.height / 2,
          };
    case "start":
      return direction === "ltr"
        ? {
            left: rect.x,
            top: rect.y + rect.height / 2,
          }
        : {
            left: rect.x + rect.width,
            top: rect.y + rect.height / 2,
          };
  }
}

export function getShowTooltipStyles(
  position: "top" | "end" | "bottom" | "start",
  tooltipRef: RefObject<HTMLDivElement>,
  themePadding: string
): CSSProperties {
  if (!tooltipRef || !tooltipRef.current) {
    return {};
  }
  const remPadding = Number(themePadding.replace("rem", ""));
  const paddingValue =
    remPadding *
    parseFloat(getComputedStyle(document.documentElement).fontSize);

  const rect = tooltipRef.current.getBoundingClientRect();
  const direction = window
    .getComputedStyle(tooltipRef.current, null)
    .getPropertyValue("direction");
  const location = getPosition(position, rect, paddingValue, direction);
  return {
    ...location,
    position: "absolute",
    visibility: "visible",
    opacity: 1,
  };
}

export function getHideTooltipStyles(): CSSProperties {
  return { visibility: "hidden", opacity: 0 };
}
