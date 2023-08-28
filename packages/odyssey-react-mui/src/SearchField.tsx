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

import { useState, useEffect } from "react";
import { InputAdornment, InputBase, IconButton } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  memo,
  useCallback,
} from "react";

import { CloseCircleFilledIcon, SearchIcon } from "./icons.generated";
import { Field } from "./Field";

export type SearchFieldProps = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoCompleteType?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  /**
   * If `true`, the component will receive focus automatically.
   */
  hasInitialFocus?: boolean;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * If `true`, the component is disabled.
   */
  isDisabled?: boolean;
  /**
   * This label won't show up visually, but it's required for accessibility.
   */
  label: string;
  /**
   * Callback fired when the `input` element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback fired when the clear button is pressed.
   */
  onClear?: () => void;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback fired when the `input` element get focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: string;
};

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      autoCompleteType,
      hasInitialFocus,
      id: idOverride,
      isDisabled = false,
      label,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      onClear: onClearProp,
      placeholder,
      value: controlledValue,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState("");

    const onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
      useCallback(
        (event) => {
          setUncontrolledValue(event.currentTarget.value);
          onChangeProp?.(event);
        },
        [onChangeProp]
      );

    const onClear = useCallback(() => {
      setUncontrolledValue("");
      onClearProp?.();
    }, [onClearProp]);

    useEffect(() => {
      if (controlledValue !== undefined) {
        setUncontrolledValue(controlledValue);
      }
    }, [controlledValue]);

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id }) => (
        <InputBase
          aria-describedby={ariaDescribedBy}
          autoComplete={autoCompleteType}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          endAdornment={
            uncontrolledValue && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear"
                  disabled={isDisabled}
                  onClick={onClear}
                  size="small"
                >
                  <CloseCircleFilledIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          id={id}
          name={id}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          ref={ref}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          type="search"
          value={
            controlledValue === undefined ? uncontrolledValue : controlledValue
          }
        />
      ),
      [
        autoCompleteType,
        hasInitialFocus,
        isDisabled,
        onClear,
        onChange,
        onFocus,
        onBlur,
        placeholder,
        ref,
        controlledValue,
        uncontrolledValue,
      ]
    );

    return (
      <Field
        fieldType="single"
        hasVisibleLabel={false}
        id={idOverride}
        isDisabled={isDisabled}
        isOptional={true}
        label={label}
        renderFieldComponent={renderFieldComponent}
      />
    );
  }
);

const MemoizedSearchField = memo(SearchField);
MemoizedSearchField.displayName = "SearchField";

export { MemoizedSearchField as SearchField };
