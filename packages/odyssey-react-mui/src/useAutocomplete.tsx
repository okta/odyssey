/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useCallback, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  InputBase,
  UseAutocompleteProps as MuiUseAutocompleteProps,
  AutocompleteValue,
  AutocompleteRenderInputParams,
} from "@mui/material";

import { AutocompleteProps } from "./Autocomplete";
import { Field } from "./Field";
import {
  ComponentControlledState,
  useInputValues,
  getControlState,
} from "./inputUtils";

export type UseAutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = Pick<
  AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>,
  | "ariaDescribedBy"
  | "defaultValue"
  | "errorMessage"
  | "errorMessageList"
  | "hasMultipleChoices"
  | "hint"
  | "HintLinkComponent"
  | "inputValue"
  | "isFullWidth"
  | "isOptional"
  | "isVirtualized"
  | "label"
  | "name"
  | "onChange"
  | "onInputChange"
  | "testId"
  | "value"
>;

export const useAutocomplete = <
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  ariaDescribedBy,
  defaultValue,
  errorMessage,
  errorMessageList,
  hasMultipleChoices,
  hint,
  HintLinkComponent,
  inputValue,
  isFullWidth,
  isOptional,
  isVirtualized: isVirtualizedProp,
  label,
  name: nameOverride,
  onChange: onChangeProp,
  onInputChange: onInputChangeProp,
  testId,
  value,
}: UseAutocompleteProps<
  OptionType,
  HasMultipleChoices,
  IsCustomValueAllowed
>) => {
  const { t } = useTranslation();
  const controlledStateRef = useRef(
    getControlState({
      controlledValue: value,
      uncontrolledValue: defaultValue,
    }),
  );

  const isVirtualizedRef = useRef(Boolean(isVirtualizedProp));

  const defaultValueProp = useMemo<
    | AutocompleteValue<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >
    | undefined
  >(() => {
    if (hasMultipleChoices) {
      if (value === undefined) {
        return defaultValue;
      }
      return [] as AutocompleteValue<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >;
    }
    return value === undefined ? defaultValue : undefined;
  }, [defaultValue, hasMultipleChoices, value]);

  const valueProps = useInputValues({
    defaultValue: defaultValueProp,
    value: value,
    controlState: controlledStateRef.current,
  });

  const inputValueProp = useMemo(() => {
    if (controlledStateRef.current === ComponentControlledState.CONTROLLED) {
      return { inputValue };
    }
    return undefined;
  }, [inputValue]);

  const onChange = useCallback<
    NonNullable<
      MuiUseAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["onChange"]
    >
  >(
    (event, value, reason, details) => {
      onChangeProp?.(event, value, reason, details);
    },
    [onChangeProp],
  );

  const onInputChange = useCallback<
    NonNullable<
      MuiUseAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["onInputChange"]
    >
  >(
    (event, value, reason) => {
      onInputChangeProp?.(event, value, reason);
    },
    [onInputChangeProp],
  );

  const renderInput = useCallback(
    ({
      InputLabelProps,
      InputProps,
      ...params
    }: AutocompleteRenderInputParams) => (
      <Field
        ariaDescribedBy={ariaDescribedBy}
        errorMessage={errorMessage}
        errorMessageList={errorMessageList}
        fieldType="single"
        hasVisibleLabel
        //@ts-expect-error htmlFor does not exist ont he InputLabelProps for autocomplete
        id={InputLabelProps.htmlFor}
        isFullWidth={isFullWidth}
        hint={hint}
        HintLinkComponent={HintLinkComponent}
        label={label}
        isOptional={isOptional}
        renderFieldComponent={({
          ariaDescribedBy,
          id,
          errorMessageElementId,
          labelElementId,
        }) => (
          <InputBase
            {...params}
            {...InputProps}
            inputProps={{
              ...params.inputProps,
              "aria-errormessage": errorMessageElementId,
              "aria-labelledby": labelElementId,
              "data-se": testId,
            }}
            aria-describedby={ariaDescribedBy}
            id={id}
            name={nameOverride ?? id}
            required={!isOptional}
          />
        )}
      />
    ),
    [
      ariaDescribedBy,
      errorMessage,
      errorMessageList,
      hint,
      HintLinkComponent,
      isFullWidth,
      isOptional,
      label,
      nameOverride,
      testId,
    ],
  );

  return {
    inputValueProp,
    isVirtualizedRef,
    onChange,
    onInputChange,
    renderInput,
    t,
    valueProps,
  };
};
