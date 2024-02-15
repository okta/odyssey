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
  Box as MuiBox,
  Checkbox as MuiCheckbox,
  Chip as MuiChip,
  ListItemSecondaryAction,
  ListSubheader,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
} from "@mui/material";
import { SelectProps as MuiSelectProps } from "@mui/material";

import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import { CheckIcon, CloseCircleFilledIcon } from "./icons.generated";
import type { HtmlProps } from "./HtmlProps";
import {
  ComponentControlledState,
  FocusHandle,
  useInputValues,
  getControlState,
} from "./inputUtils";
import { normalizedKey } from "./useNormalizedKey";
import styled from "@emotion/styled";
import {
  useOdysseyDesignTokens,
  DesignTokens,
} from "./OdysseyDesignTokensContext";

export type SelectOption = {
  text: string;
  type?: "heading" | "option";
  value?: string;
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
`;

const PlaceholderValuesContainer = styled.div<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${(props) => props.odysseyDesignTokens.Spacing0};
  right: ${(props) => props.odysseyDesignTokens.Spacing5};
  bottom: ${(props) => props.odysseyDesignTokens.Spacing0};
  left: ${(props) => props.odysseyDesignTokens.Spacing1};
  margin-inline-start: ${(props) => props.odysseyDesignTokens.BorderWidthMain};
  opacity: 1;
  pointer-events: none;
`;

const PlaceholderIcon = styled(CloseCircleFilledIcon)<{
  odysseyDesignTokens: DesignTokens;
}>`
  font-size: 1em;
  margin-inline-start: ${(props) => props.odysseyDesignTokens.Spacing2};
  margin-inline-end: -${(props) => props.odysseyDesignTokens.Spacing1};
`;

const ChipContainer = styled(MuiBox)<{
  isPlaceholder?: boolean;
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.odysseyDesignTokens.Spacing1};
  pointer-events: none;
  opacity: ${(props) => (props.isPlaceholder ? 1 : 0)};
`;

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
  HtmlProps;

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
  const odysseyDesignTokens = useOdysseyDesignTokens();

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

  const removeSelection = useCallback(
    (itemToRemove: string) => {
      if (!Array.isArray(internalSelectedValues)) {
        return;
      }

      const newValue = internalSelectedValues!.filter(
        (item: string) => item !== itemToRemove
      );

      const syntheticEvent = {
        target: { value: newValue },
      } as SelectChangeEvent<Value>;

      onChange(syntheticEvent, null);
    },
    [internalSelectedValues, onChange]
  );

  // Normalize the options array to accommodate the various
  // data types that might be passed
  const normalizedOptions = useMemo(
    () =>
      options.map((option) => {
        if (typeof option === "object") {
          /**
           * If the value of `option?.value is an empty string, we need to make sure that we
           * set an empty string to `value` in the normalized option so that the select component
           * can potentially set it as the selected one in the text input
           */
          const value =
            option?.value === "" ? option.value : option.value || option.text;
          return {
            text: option.text,
            value,
            type: option.type === "heading" ? "heading" : "option",
          };
        }
        return { text: option, value: option, type: "option" };
      }),
    [options]
  );

  const renderValue = useCallback(
    ({
      selected,
      isPlaceholder = false,
    }: {
      selected: Value;
      isPlaceholder?: boolean;
    }) => {
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

          return (
            <MuiChip
              key={item}
              label={
                <>
                  {selectedOption.text}
                  {!isPlaceholder &&
                    controlledStateRef.current === CONTROLLED &&
                    hasMultipleChoices && (
                      <PlaceholderIcon
                        odysseyDesignTokens={odysseyDesignTokens}
                      />
                    )}
                </>
              }
              tabIndex={-1}
              onDelete={
                isPlaceholder && controlledStateRef.current === CONTROLLED
                  ? () => removeSelection(item)
                  : undefined
              }
              deleteIcon={
                // We need to stop event propagation on mouse down to prevent the deletion
                // from being blocked by the Select list opening, and also ensure that
                // the pointerEvent is registered even when the parent's are not
                <CloseCircleFilledIcon
                  sx={{ pointerEvents: "auto" }}
                  onMouseDown={(event) => event.stopPropagation()}
                />
              }
            />
          );
        })
        .filter(Boolean);

      if (renderedChips.length === 0) {
        return null;
      }

      // We need the <Box> to surround the <Chip>s for proper styling
      // and disable
      if (hasMultipleChoices && controlledStateRef.current === CONTROLLED) {
        return (
          <ChipContainer
            isPlaceholder={isPlaceholder}
            odysseyDesignTokens={odysseyDesignTokens}
          >
            {renderedChips}
          </ChipContainer>
        );
      }

      return <MuiBox>{renderedChips}</MuiBox>;
    },
    [normalizedOptions, removeSelection]
  );

  // Convert the options into the ReactNode children
  // that will populate the <Select>
  const children = useMemo(
    () =>
      normalizedOptions.map((option, index) => {
        if (option.type === "heading") {
          return <ListSubheader key={option.text}>{option.text}</ListSubheader>;
        }

        const isSelected = hasMultipleChoices
          ? internalSelectedValues?.includes(option.value)
          : internalSelectedValues === option.value;

        return (
          <MuiMenuItem
            key={normalizedKey(option.text, index.toString())}
            value={option.value}
            selected={isSelected}
          >
            {hasMultipleChoices && <MuiCheckbox checked={isSelected} />}
            {option.text}
            {!hasMultipleChoices &&
              (internalSelectedValues?.includes(option.value) ||
                internalSelectedValues === option.value) && (
                <ListItemSecondaryAction>
                  <CheckIcon />
                </ListItemSecondaryAction>
              )}
          </MuiMenuItem>
        );
      }),
    [hasMultipleChoices, normalizedOptions, internalSelectedValues]
  );

  const renderFieldComponent = useCallback(
    ({ ariaDescribedBy, errorMessageElementId, id, labelElementId }) => (
      <SelectContainer>
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
          renderValue={
            hasMultipleChoices
              ? (value) => renderValue({ selected: value })
              : undefined
          }
          translate={translate}
        />
        {hasMultipleChoices && value && (
          <PlaceholderValuesContainer odysseyDesignTokens={odysseyDesignTokens}>
            {renderValue({ selected: value, isPlaceholder: true })}
          </PlaceholderValuesContainer>
        )}
      </SelectContainer>
    ),
    [
      children,
      inputValues,
      hasMultipleChoices,
      normalizedOptions,
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
