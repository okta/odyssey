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

import React, { forwardRef, useMemo, useState } from "react";
import { useOmit } from "../../utils";
import { TextInput, TextInputProps } from "../TextInput";
import { EyeIcon, EyeOffIcon } from "../Icon";
import { Button } from "../Button";
import { Tooltip } from "../Tooltip";
import type { TooltipProps } from "../Tooltip";

interface PasswordInputProps
  extends Omit<
  TextInputProps,
  | "type"
  | "PrefixButton"
  | "PrefixIcon"
  | "PrefixText"
  | "SuffixButton"
  | "SuffixIcon"
  | "SuffixText"
  > {
  type?: never;
  tooltipLabel:
  | TooltipProps["label"]
  | ((isHidden: boolean) => TooltipProps["label"]);
  tooltipPosition?: TooltipProps["position"];
  PrefixButton?: never;
  PrefixIcon?: never;
  PrefixText?: never;
  SuffixButton?: never;
  SuffixIcon?: never;
  SuffixText?: never;
}

/**
 * Password inputs exposes hide/show capability
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const { name, label, tooltipLabel, tooltipPosition, ...rest } = props;

    const omitProps = useOmit(rest);
    const [internalType, setInternalType] = useState<"password" | "text">(
      "password"
    );

    const onHideShowPasswordClick = () => {
      setInternalType(internalType === "password" ? "text" : "password");
    };

    const _tooltipLabel = useMemo(() => {
      if (typeof tooltipLabel === "function") {
        return tooltipLabel(internalType === "password");
      }
      return tooltipLabel;
    }, [internalType, tooltipLabel]);

    return (
      <>
        {/*
        @ts-expect-error using a type="password" intentionally here */}
        <TextInput {...omitProps} type={internalType}
          ref={ref}
          name={name}
          label={label}
          SuffixButton={
            <Tooltip
              label={_tooltipLabel}
              position={tooltipPosition || "bottom"}
            >
              <Button
                name={name}
                variant="affix"
                aria-label={_tooltipLabel}
                icon={
                  internalType === "password" ? <EyeIcon /> : <EyeOffIcon />
                }
                onClick={onHideShowPasswordClick}
              />
            </Tooltip>
          }
        />
      </>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
