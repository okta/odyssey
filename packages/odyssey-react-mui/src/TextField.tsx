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

import {
  InputAdornment,
  InputBase,
  InputBaseProps,
  InputLabel,
} from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormHelperText,
  IconButton,
  SearchIcon,
  Typography,
  useUniqueId,
  visuallyHidden,
} from "./";

export type TextFieldProps = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoCompleteType?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  /**
   * End `InputAdornment` for this component.
   */
  endAdornment?: ReactNode;
  /**
   * If `error` is not undefined, the `input` will indicate an error.
   */
  errorMessage?: string;
  /**
   * The helper text content.
   */
  hint?: string;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Props that go onto the HTML `input` element.
   */
  inputProps?: InputBaseProps["inputProps"];
  /**
   * If `true`, the component is disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, a [TextareaAutosize](/material-ui/react-textarea-autosize/) element is rendered.
   */
  isMultiline?: boolean;
  /**
   * It prevents the user from changing the value of the field
   */
  isReadOnly?: boolean;
  /**
   * If `true`, the `input` element is required.
   */
  isRequired?: boolean;
  /**
   * The label for the `input` element.
   */
  label?: string;
  /**
   * Callback fired when the `input` element loses focus.
   */
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * Callback fired when the value is changed.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback fired when the `input` element get focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * The label for the `input` element if the it's not optional
   */
  optionalLabel?: string;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment?: ReactNode;
  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   */
  type?: string;
  /**
   * The value of the `input` element, required for a controlled component.
   */
  value?: unknown;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      autoCompleteType,
      endAdornment,
      errorMessage,
      hint,
      id: idOverride,
      inputProps = {},
      isDisabled = false,
      isMultiline = false,
      isReadOnly,
      isRequired = true,
      label,
      onChange,
      onFocus,
      onBlur,
      optionalLabel,
      placeholder,
      startAdornment,
      type = "text",
      value,
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);

    useEffect(() => {
      setInputType(type);
    }, [type]);

    const togglePasswordVisibility = useCallback(() => {
      setInputType((currentType) =>
        currentType === "password" ? "text" : "password"
      );
    }, []);

    const id = useUniqueId(idOverride);
    const hintId = hint ? `${id}-hint` : undefined;
    const errorId = errorMessage ? `${id}-error` : undefined;
    const labelId = label ? `${id}-label` : undefined;

    const localInputProps = useMemo(() => {
      const ariaDescribedBy =
        errorId && hintId ? `${hintId} ${errorId}` : errorId || hintId;

      return {
        ...inputProps,
        "aria-describedby":
          inputProps["aria-describedby"]?.concat(` ${ariaDescribedBy}`) ??
          ariaDescribedBy,
      };
    }, [errorId, hintId, inputProps]);

    return (
      <FormControl disabled={isDisabled} error={Boolean(errorMessage)}>
        <InputLabel htmlFor={id} id={labelId}>
          {label}
          {!isRequired && (
            <Typography variant="subtitle1">{optionalLabel}</Typography>
          )}
        </InputLabel>
        {hint && <FormHelperText id={hintId}>{hint}</FormHelperText>}
        <InputBase
          autoComplete={autoCompleteType}
          endAdornment={
            inputType === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={togglePasswordVisibility}
                >
                  {inputType === "password" ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
              </InputAdornment>
            ) : (
              endAdornment
            )
          }
          id={id}
          inputProps={localInputProps}
          multiline={isMultiline}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={isReadOnly}
          ref={ref}
          startAdornment={
            inputType === "search" ? (
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
        {errorMessage && (
          <FormHelperText error id={errorId}>
            <span style={visuallyHidden}>Error:</span>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

const MemoizedTextField = memo(TextField);

export { MemoizedTextField as TextField };
