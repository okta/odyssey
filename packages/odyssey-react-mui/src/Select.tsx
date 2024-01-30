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
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import {
  Box,
  Checkbox as MuiCheckbox,
  Chip,
  ListItemSecondaryAction,
  ListSubheader,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { SelectProps as MuiSelectProps } from "@mui/material";

import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import { CheckIcon } from "./icons.generated";
import type { AllowedProps } from "./AllowedProps";
import {
  ComponentControlledState,
  FocusHandle,
  useInputValues,
  getControlState,
} from "./inputUtils";

export type SelectOption = {
  text: string;
  type?: "heading" | "option";
  value?: string;
};

export type SelectValueType<HasMultipleChoices> =
  HasMultipleChoices extends true ? string[] : string;

export type SelectProps<
  Value extends SelectValueType<HasMultipleChoices>,
  HasMultipleChoices extends boolean
> = {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: MuiSelectProps<Value>["defaultValue"];
  /**
   * If `true`, the Select allows multiple selections
   */
  hasMultipleChoices?: HasMultipleChoices;
  /**
   * The ref forwarded to the Select
   */
  inputRef?: React.RefObject<FocusHandle>;
  /**
   * @deprecated Use `hasMultipleChoices` instead.
   */
  /** **Deprecated:** use `hasMultipleChoices` */
  isMultiSelect?: HasMultipleChoices;
  /**
   * The label text for the Select
   */
  label: string;
  /**
   * Callback fired when the Select loses focus
   */
  onBlur?: MuiSelectProps<Value>["onBlur"];
  /**
   * Callback fired when the value of the Select changes
   */
  onChange?: MuiSelectProps<Value>["onChange"];
  /**
   * Callback fired when the Select gains focus
   */
  onFocus?: MuiSelectProps<Value>["onFocus"];
  /**
   * The options for the Select
   */
  options: (string | SelectOption)[];
  /**
   * The value or values selected in the Select
   */
  value?: Value;
} & Pick<
  FieldComponentProps,
  | "ariaDescribedBy"
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "isFullWidth"
  | "isOptional"
  | "name"
> &
  AllowedProps;

/**
 * Options in Odyssey <Select> are passed as an array, which can contain any combination
 * of the following:
 *   - string —                            A simple string. The string will be both the text and the value of the resulting option.
 *                                         <option value="string">string</option>
 *
 *   - { text: string } —                  Same as above, but the string is contained within an object.
 *                                         <option value="text">text</option>
 *
 *   - { text: string, value: string } —   The option text will be text, and the option value will be value.
 *                                         <option value="value">text</option>
 *
 *   - { text: string, type: "heading" } — Used to display a group heading with the text
 */

const { CONTROLLED } = ComponentControlledState;
const Select = <
  Value extends SelectValueType<HasMultipleChoices>,
  HasMultipleChoices extends boolean
>({
  ariaDescribedBy,
  defaultValue,
  errorMessage,
  errorMessageList,
  hasMultipleChoices: hasMultipleChoicesProp,
  hint,
  HintLinkComponent,
  id: idOverride,
  inputRef,
  isDisabled = false,
  isFullWidth = false,
  isMultiSelect,
  isOptional = false,
  label,
  name: nameOverride,
  onBlur,
  onChange: onChangeProp,
  onFocus,
  options,
  testId,
  translate,
  value,
}: SelectProps<Value, HasMultipleChoices>) => {
  const hasMultipleChoices = useMemo(
    () =>
      hasMultipleChoicesProp === undefined
        ? isMultiSelect
        : hasMultipleChoicesProp,
    [hasMultipleChoicesProp, isMultiSelect]
  );
  const controlledStateRef = useRef(
    getControlState({ controlledValue: value, uncontrolledValue: defaultValue })
  );
  const [internalSelectedValues, setInternalSelectedValues] = useState(
    controlledStateRef.current === CONTROLLED ? value : defaultValue
  );
  const localInputRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(
    inputRef,
    () => {
      return {
        focus: () => {
          localInputRef.current?.focus();
        },
      };
    },
    []
  );

  useEffect(() => {
    if (controlledStateRef.current === CONTROLLED) {
      setInternalSelectedValues(value);
    }
  }, [value]);

  const inputValues = useInputValues({
    defaultValue,
    value,
    controlState: controlledStateRef.current,
  });

  const onChange = useCallback<NonNullable<MuiSelectProps<Value>["onChange"]>>(
    (event, child) => {
      const {
        target: { value },
      } = event;
      if (controlledStateRef.current !== CONTROLLED) {
        setInternalSelectedValues(
          (typeof value === "string" ? value.split(",") : value) as Value
        );
      }
      onChangeProp?.(event, child);
    },
    [onChangeProp]
  );

  // Normalize the options array to accommodate the various
  // data types that might be passed
  const normalizedOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "object"
          ? {
              text: option.text,
              value: option.value || option.text,
              type: option.type === "heading" ? "heading" : "option",
            }
          : { text: option, value: option, type: "option" }
      ),
    [options]
  );

  const renderValue = useCallback(
    (selected: Value) => {
      // If the selected value isn't an array, then we don't need to display
      // chips and should fall back to the default render behavior
      if (typeof selected === "string") {
        return undefined;
      }

      // Convert the selected options array into <Chip>s
      const renderedChips = selected
        .map((item: string) => {
          const selectedOption = normalizedOptions.find(
            (option) => option.value === item
          );

          if (!selectedOption) {
            return null;
          }

          return <Chip key={item} label={selectedOption.text} />;
        })
        .filter(Boolean);

      if (renderedChips.length === 0) {
        return null;
      }

      // We need the <Box> to surround the <Chip>s for
      // proper styling
      return <Box>{renderedChips}</Box>;
    },
    [normalizedOptions]
  );

  // Convert the options into the ReactNode children
  // that will populate the <Select>
  const children = useMemo(
    () =>
      normalizedOptions.map((option) => {
        if (option.type === "heading") {
          return <ListSubheader key={option.text}>{option.text}</ListSubheader>;
        }
        return (
          <MenuItem key={option.value} value={option.value}>
            {hasMultipleChoices && (
              <MuiCheckbox
                checked={internalSelectedValues?.includes(option.value)}
              />
            )}
            {option.text}
            {internalSelectedValues === option.value && (
              <ListItemSecondaryAction>
                <CheckIcon />
              </ListItemSecondaryAction>
            )}
          </MenuItem>
        );
      }),
    [hasMultipleChoices, normalizedOptions, internalSelectedValues]
  );

  const renderFieldComponent = useCallback(
    ({ ariaDescribedBy, errorMessageElementId, id, labelElementId }) => (
      <MuiSelect
        {...inputValues}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={errorMessageElementId}
        children={children}
        id={id}
        inputProps={{ "data-se": testId }}
        inputRef={localInputRef}
        labelId={labelElementId}
        multiple={hasMultipleChoices}
        name={nameOverride ?? id}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        renderValue={hasMultipleChoices ? renderValue : undefined}
        translate={translate}
      />
    ),
    [
      children,
      inputValues,
      hasMultipleChoices,
      nameOverride,
      onBlur,
      onChange,
      onFocus,
      renderValue,
      testId,
      translate,
    ]
  );

  return (
    <Field
      ariaDescribedBy={ariaDescribedBy}
      errorMessage={errorMessage}
      errorMessageList={errorMessageList}
      fieldType="single"
      hasVisibleLabel
      hint={hint}
      HintLinkComponent={HintLinkComponent}
      id={idOverride}
      isDisabled={isDisabled}
      isFullWidth={isFullWidth}
      isOptional={isOptional}
      label={label}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedSelect = memo(Select);
MemoizedSelect.displayName = "Select";

export { MemoizedSelect as Select };
