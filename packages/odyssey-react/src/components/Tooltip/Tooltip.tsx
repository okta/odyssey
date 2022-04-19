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

import React, { cloneElement, forwardRef, useRef, useState } from "react";
import type { ReactElement, ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useCx, useOid, useOmit } from "../../utils";
import { Box } from "../Box";
import styles from "./Tooltip.module.scss";
import { theme } from "./Tooltip.theme";
import { Portal } from "./Portal";
import { useTheme } from "@okta/odyssey-react-theme";

export interface TooltipProps
  extends Omit<
    ComponentPropsWithRef<"aside">,
    "style" | "className" | "role" | "color"
  > {
  /**
   * Content to be rendered that needs a tooltip label
   */
  children: ReactElement;

  /**
   * The position the tooltip will be displayed
   * @default top
   */
  position?: "top" | "end" | "bottom" | "start";

  /**
   * The tooltip content itself
   */
  label: string;
}

/**
 * A transient element that provides additional context for an element when it receives hover or focus.
 */
export const Tooltip = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLElement, TooltipProps>((props, ref) => {
    const { children, id, label, position = "top", ...rest } = props;

    const tooltipRef = useRef<HTMLDivElement>(null);
    const oid = useOid(id);
    const omitProps = useOmit(rest);
    const tooltipClasses = useCx(styles.root, styles[`${position}Position`]);
    const clone = cloneElement(children, { "aria-describedby": oid });
    const [coords, setCoords] = useState({});
    const [timeoutFn, setTimeoutFn] = useState<NodeJS.Timeout | null>();
    const { SpaceScale1 } = useTheme();
    const remValue = Number(SpaceScale1.replace("rem", ""));
    const pxValue =
      remValue *
      parseFloat(getComputedStyle(document.documentElement).fontSize);
    const getPosition = (rect: DOMRect) => {
      switch (position) {
        default:
        case "top":
          return {
            left: rect.x + rect.width / 2,
            top: rect.y - pxValue,
          };
        case "bottom":
          return {
            left: rect.x + rect.width / 2,
            top: rect.y + rect.height + pxValue,
          };
        case "end":
          return {
            left: rect.x + rect.width,
            top: rect.y + rect.height / 2,
          };
        case "start":
          return {
            left: rect.x,
            top: rect.y + rect.height / 2,
          };
      }
    };
    const showTooltip = () => {
      if (!tooltipRef || !tooltipRef.current) {
        return;
      }
      const rect = tooltipRef.current.getBoundingClientRect();
      const location = getPosition(rect);
      const timeout = setTimeout(
        () =>
          setCoords({
            ...location,
            position: "absolute",
            visibility: "visible",
            opacity: 1,
          }),
        1000
      );
      setTimeoutFn(timeout);
    };

    const hideTooltip = () => {
      setCoords({ ...coords, visibility: "hidden", opacity: 0 });
      if (timeoutFn) {
        clearTimeout(timeoutFn);
      }
      setTimeoutFn(null);
    };

    return (
      <span className={styles.hasTooltip}>
        <span
          ref={tooltipRef}
          onMouseOver={showTooltip}
          onFocus={showTooltip}
          onMouseOut={hideTooltip}
          onBlur={hideTooltip}
        >
          {clone}
        </span>
        <Portal>
          <span style={{ ...coords }}>
            <Box
              as="aside"
              {...omitProps}
              ref={ref}
              id={oid}
              className={tooltipClasses}
              role="tooltip"
              color={false}
              fontSize={false}
              fontWeight={false}
              lineHeight={false}
            >
              {label}
            </Box>
          </span>
        </Portal>
      </span>
    );
  })
);

Tooltip.displayName = "Tooltip";
