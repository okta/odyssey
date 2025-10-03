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

import styled from "@emotion/styled";
import { IconButton, InputAdornment, InputBase } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  memo,
  useCallback,
  useRef,
} from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { Field } from "./Field.js";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps.js";
import { useTranslation } from "./i18n.generated/i18n.js";
import { CloseCircleFilledIcon, SearchIcon } from "./icons.generated/index.js";
import { getControlState, useInputValues } from "./inputUtils.js";
import { OdysseyThemeProvider } from "./OdysseyThemeProvider.js";

export const searchVariantValues = ["outline", "filled"] as const;

const StyledContainerToEnsureThemeProviderDivIsFullWidth = styled("div")({
  width: "100%",
});

export type SearchFieldProps = {
  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoCompleteType?: InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  /**
   * The value of the `input` element to use when uncontrolled.
   */
  defaultValue?: string;
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
   * Callback fired when the value is changed.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  /**
   * Callback fired when the clear button is pressed.
   */
  onClear?: () => void;
  /**
   * Callback fired when the `input` element get focus.
   */
  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;

  tabIndex?: HTMLAttributes<HTMLElement>["tabIndex"];
  /**
   * The value of the `input` element, to use when controlled.
   */
  value?: string;
  /**
   * Whether the SearchField has a gray or white background
   */
  variant?: (typeof searchVariantValues)[number];
} & Pick<FieldComponentProps, "id" | "isDisabled" | "name" | "isFullWidth"> &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

type FieldRenderProps = Partial<Pick<HtmlProps, "ariaDescribedBy">> &
  Pick<FieldComponentRenderProps, "id">;

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      ariaDescribedBy,
      autoCompleteType,
      defaultValue,
      hasInitialFocus,
      id: idOverride,
      isDisabled = false,
      isFullWidth = false,
      label,
      name: nameOverride,
      onChange: onChangeProp,
      onFocus,
      onBlur,
      onClear: onClearProp,
      placeholder,
      tabIndex,
      testId,
      translate,
      value,
      variant = "outline",
    },
    ref,
  ) => {
    const { t } = useTranslation();

    const onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
      useCallback(
        (event) => {
          onChangeProp?.(event);
        },
        [onChangeProp],
      );

    const onClear = useCallback(() => {
      onClearProp?.();
    }, [onClearProp]);

    const controlledStateRef = useRef(
      getControlState({
        controlledValue: value,
        uncontrolledValue: defaultValue,
      }),
    );
    const inputValues = useInputValues({
      defaultValue,
      value,
      controlState: controlledStateRef.current,
    });

    const renderFieldComponent = useCallback(
      ({ ariaDescribedBy, id }: FieldRenderProps) => (
        <InputBase
          {...inputValues}
          aria-describedby={ariaDescribedBy}
          autoComplete={autoCompleteType}
          /* eslint-disable-next-line jsx-a11y/no-autofocus */
          autoFocus={hasInitialFocus}
          data-ods-type="search"
          data-ods-variant={variant}
          data-se={testId}
          endAdornment={
            (inputValues?.defaultValue || inputValues?.value) && (
              <InputAdornment position="end">
                <IconButton
                  aria-label={t("clear.text")}
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
          inputProps={{
            tabIndex,
          }}
          name={nameOverride ?? id}
          onBlur={onBlur}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          ref={ref}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          translate={translate}
          type="search"
        />
      ),
      [
        autoCompleteType,
        hasInitialFocus,
        inputValues,
        isDisabled,
        nameOverride,
        onBlur,
        onChange,
        onClear,
        onFocus,
        placeholder,
        ref,
        t,
        tabIndex,
        testId,
        translate,
        variant,
      ],
    );

    return (
      <StyledContainerToEnsureThemeProviderDivIsFullWidth>
        <OdysseyThemeProvider>
          <Field
            ariaDescribedBy={ariaDescribedBy}
            fieldType="single"
            hasVisibleLabel={false}
            id={idOverride}
            isDisabled={isDisabled}
            isFullWidth={isFullWidth}
            isOptional={true}
            label={label}
            renderFieldComponent={renderFieldComponent}
          />
        </OdysseyThemeProvider>
      </StyledContainerToEnsureThemeProviderDivIsFullWidth>
    );
  },
);

const MemoizedSearchField = memo(SearchField);
MemoizedSearchField.displayName = "SearchField";

export { MemoizedSearchField as SearchField };
