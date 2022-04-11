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

import React, { forwardRef, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOmit, useSharedRef } from "../../utils";
import { TextInput, TextInputProps } from "../TextInput";
import { CloseCircleFilledIcon, SearchIcon } from "../Icon";
import { Button } from "../Button";
import { theme } from "./SearchInput.theme";
import styles from "./SearchInput.module.scss";

export interface SearchInputProps
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
  PrefixButton?: never;
  PrefixIcon?: never;
  PrefixText?: never;
  SuffixButton?: never;
  SuffixIcon?: never;
  SuffixText?: never;
}
/**
 * Search inputs allow users to enter text search criteria
 */
export const SearchInput = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLInputElement, SearchInputProps>((props, ref) => {
    const { defaultValue, onChange, label, labelHidden, name, value, ...rest } =
      props;

    const omitProps = useOmit(rest);
    const internalRef = useSharedRef(ref);
    const [isControlled, setIsControlled] = useState(
      typeof value !== "undefined"
    );
    const [canShowClearButton, setCanShowClearButton] = useState(
      isControlled ? !!value : !!defaultValue
    );

    useEffect(() => {
      if (typeof value === "undefined") {
        setIsControlled(false);
      } else {
        setIsControlled(true);
        setCanShowClearButton(!!value);
      }
    }, [value]);

    const setFocus = () => {
      requestAnimationFrame(() => {
        internalRef.current?.focus();
      });
    };

    const onClear = () => {
      if (internalRef.current) {
        setFocus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window?.HTMLInputElement?.prototype,
          "value"
        )?.set;
        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(internalRef.current, "");
          const aChangeEvent = new Event("change", { bubbles: true });
          internalRef.current.dispatchEvent(aChangeEvent);
        }
      }
    };

    const internalOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setCanShowClearButton(!!event.target.value);
      }
      onChange?.(event, event.target.value);
    };

    return (
      <span className={styles.search}>
        {/*
        // @ts-expect-error using a type="search" intentionally here */}
        <TextInput
          {...omitProps}
          type="search"
          ref={internalRef}
          defaultValue={defaultValue}
          label={label}
          labelHidden={typeof labelHidden === "undefined" ? true : labelHidden}
          name={name}
          value={value}
          onChange={internalOnChange}
          PrefixIcon={<SearchIcon />}
          SuffixButton={
            canShowClearButton ? (
              <span className={styles.clear}>
                <Button
                  name={name}
                  variant="affix"
                  icon={<CloseCircleFilledIcon />}
                  onClick={onClear}
                />
              </span>
            ) : undefined
          }
        />
      </span>
    );
  })
);

SearchInput.displayName = "SearchInput";
