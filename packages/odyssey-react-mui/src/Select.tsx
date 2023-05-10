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

import { ReactNode, forwardRef, memo, useCallback, useState } from "react";
import {
  Box,
  Chip,
  ListSubheader,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { SelectProps as MuiSelectProps } from "@mui/material";
import { Checkbox } from "./Checkbox";
import { Field } from "./Field";

export interface Option {
  text: string;
  value?: string;
  type?: "heading" | "option" | string;
}

export type SelectProps = {
  defaultValue?: string;
  errorMessage?: string;
  hint?: string;
  id?: string;
  isDisabled?: boolean;
  isMultiSelect?: boolean;
  isNative?: boolean;
  isOptional?: boolean;
  label: string;
  onBlur?: MuiSelectProps["onBlur"];
  onChange?: MuiSelectProps["onChange"];
  onFocus?: MuiSelectProps["onFocus"];
  optionalLabel?: string;
  options: (string | Option)[];
  value?: string | string[];
};

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

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      defaultValue,
      errorMessage,
      hint,
      id: idOverride,
      isDisabled = false,
      isMultiSelect = false,
      isOptional = false,
      isNative = false,
      label,
      onBlur,
      onChange: onChangeProp,
      onFocus,
      optionalLabel = "Optional",
      value,
      options,
    },
    ref
  ) => {
    // If there's no value set, we set it to a blank string (if it's a single-select)
    // or an empty array (if it's a multi-select)
    if (typeof value === "undefined") {
      value = isMultiSelect ? [] : "";
    }

    const [selectedValue, setSelectedValue] = useState<string | string[]>(
      value
    );

    const onChange = (
      event: SelectChangeEvent<string | string[]>,
      child: ReactNode
    ) => {
      const {
        target: { value },
      } = event;

      // Set the field value, with some additional logic to handle array values
      // for multi-selects
      if (isMultiSelect) {
        setSelectedValue(typeof value === "string" ? value.split(",") : value);
      } else {
        setSelectedValue(value);
      }

      // Trigger the onChange event, if one has been passed
      if (onChangeProp) {
        onChangeProp(event, child);
      }
    };

    // Normalize the options array to accommodate the various
    // data types that might be passed
    const normalizedOptions = options.map((option) => {
      if (typeof option === "object") {
        return {
          text: option.text,
          value: option.value || option.text,
          type: option.type === "heading" ? "heading" : "option",
        };
      }

      return { text: option, value: option, type: "option" };
    });

    const renderValue = (selected: string | string[]) => {
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
    };

    // Convert the options into the ReactNode children
    // that will populate the <Select>
    const children = normalizedOptions.map((option) => {
      // If it's a heading, render a heading
      if (option.type === "heading") {
        return <ListSubheader key={option.text}>{option.text}</ListSubheader>;
      }

      // If it's a native <Select>, render a standard HTML <option>
      if (isNative) {
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      }

      // If it's a non-native <Select>, render a <MenuItem>
      // If it's a multi-select, include a <Checkbox>
      return (
        <MenuItem key={option.value} value={option.value}>
          {isMultiSelect && (
            <Checkbox isChecked={selectedValue.includes(option.value)} />
          )}
          {option.text}
        </MenuItem>
      );
    });

    const renderFieldComponent = useCallback(
      () => (
        <MuiSelect
          defaultValue={defaultValue}
          id={idOverride}
          name={idOverride}
          native={isNative}
          multiple={isMultiSelect}
          onBlur={onBlur}
          onChange={!isNative ? onChange : undefined}
          onFocus={onFocus}
          ref={ref}
          children={children}
          renderValue={renderValue}
          value={!isNative ? selectedValue : undefined}
        />
      ),
      [
        defaultValue,
        idOverride,
        isNative,
        isMultiSelect,
        onBlur,
        onChange,
        onFocus,
        ref,
        children,
        renderValue,
        selectedValue,
      ]
    );

    return (
      <Field
        errorMessage={errorMessage}
        fieldType="single"
        hasVisibleLabel
        hint={hint}
        id={idOverride}
        isDisabled={isDisabled}
        isOptional={isOptional}
        label={label}
        optionalLabel={optionalLabel}
        renderFieldComponent={renderFieldComponent}
      />
    );
  }
);

const MemoizedSelect = memo(Select);
MemoizedSelect.displayName = "Select";

export { MemoizedSelect as Select };
