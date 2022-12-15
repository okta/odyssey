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

import React, { forwardRef, useState } from "react";
import {
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputBase,
  InputLabel,
  SearchIcon,
  Typography,
  visuallyHidden,
  useUniqueId,
} from "../..";

export interface TextFieldProps {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete?: string;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: React.ReactNode;
  /**
   * If `error` is not undefined, the `input` will indicate an error.
   */
  error?: string;
  /**
   * The helper text content.
   */
  hint?: string;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * The label for the `input` element.
   */
  label?: string;
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   */
  multiline?: boolean;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback fired when the `input` element get focus.
   */
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * The label for the `input` element if the it's not optional
   */
  optionalLabel?: string;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * It prevents the user from changing the value of the field
   */
  readOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  required?: boolean;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: React.ReactNode;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: "email" | "password" | "search" | "tel" | "text";
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const {
      autoComplete,
      disabled = false,
      endAdornment,
      error,
      hint,
      id: idOverride,
      label,
      multiline = false,
      onChange,
      onFocus,
      optionalLabel,
      placeholder,
      readOnly,
      required = true,
      startAdornment,
      type: inType = "text",
      value,
    } = props;

    const [inputType, setInputType] = useState(inType);
    const handleClickShowPassword = () => {
      setInputType((currentType) =>
        currentType === "password" ? "text" : "password"
      );
    };
    const handleMouseDownPassword = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      event.preventDefault();
    };

    const id = useUniqueId(idOverride);
    const hintId = hint && id ? `${id}-hint` : undefined;
    const errorId = error && id ? `${id}-error` : undefined;
    const labelId = label && id ? `${id}-label` : undefined;

    return (
      <FormControl disabled={disabled} error={!!error}>
        <InputLabel htmlFor={id} id={labelId}>
          {label}
          {!required && (
            <Typography variant="subtitle1">{optionalLabel}</Typography>
          )}
        </InputLabel>
        {hint && <FormHelperText id={hintId}>{hint}</FormHelperText>}
        <InputBase
          autoComplete={autoComplete}
          endAdornment={
            inType === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {inputType === "password" ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
              </InputAdornment>
            ) : (
              endAdornment
            )
          }
          id={id}
          inputProps={
            hintId || errorId
              ? {
                  "aria-describedby":
                    hintId && errorId
                      ? `${hintId} ${errorId}`
                      : hintId || errorId,
                }
              : undefined
          }
          multiline={multiline}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          readOnly={readOnly}
          ref={ref}
          startAdornment={
            inType === "search" ? (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ) : (
              startAdornment
            )
          }
          type={inputType}
          value={value}
        />
        {error && (
          <FormHelperText id={errorId} error>
            {/* TODO - why Error here??? */}
            <span style={visuallyHidden}>Error:</span>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);
