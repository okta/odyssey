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
  MouseEvent,
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
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps";
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

const ChipsPositioningContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing0};
  right: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing5};
  bottom: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing0};
  left: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing1};
  margin-inline-start: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderWidthMain};
  opacity: 1;
  pointer-events: none;
`;

const NonInteractiveIcon = styled(CloseCircleFilledIcon, {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  font-size: 1em;
  margin-inline-start: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.Spacing2};
  margin-inline-end: -${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing1};
`;

const ChipsInnerContainer = styled(MuiBox, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isInteractive",
})<{
  isInteractive?: boolean;
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing1};
  pointer-events: ${({ isInteractive }) => (isInteractive ? "auto" : "none")};
  opacity: ${({ isInteractive }) => (isInteractive ? 1 : 0)};
`;

export type SelectValueType<HasMultipleChoices> =
  HasMultipleChoices extends true ? string[] : string;

export type SelectProps<
  Value extends SelectValueType<HasMultipleChoices>,
  HasMultipleChoices extends boolean,
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

type SelectRenderProps = Partial<
  Pick<FieldComponentRenderProps, "ariaDescribedBy" | "errorMessageElementId">
> &
  Pick<FieldComponentRenderProps, "id" | "labelElementId">;

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
  HasMultipleChoices extends boolean,
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
    [hasMultipleChoicesProp, isMultiSelect],
  );
  const controlledStateRef = useRef(
    getControlState({
      controlledValue: value,
      uncontrolledValue: defaultValue,
    }),
  );
  const [internalSelectedValues, setInternalSelectedValues] = useState(
    controlledStateRef.current === CONTROLLED ? value : defaultValue,
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
    [],
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
          (typeof value === "string" ? value.split(",") : value) as Value,
        );
      }
      onChangeProp?.(event, child);
    },
    [onChangeProp],
  );

  const removeSelection = useCallback(
    (itemToRemove: string) => {
      if (Array.isArray(internalSelectedValues)) {
        const newValue = internalSelectedValues.filter(
          (item: string) => item !== itemToRemove,
        );

        const syntheticEvent = {
          target: { value: newValue },
        } as SelectChangeEvent<Value>;

        onChange(syntheticEvent, null);
      }
    },
    [internalSelectedValues, onChange],
  );

  const stopPropagation = useCallback(
    (event: MouseEvent<SVGSVGElement>) => event.stopPropagation(),
    [],
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
    [options],
  );

  const Chips = ({
    selection,
    isInteractive,
  }: {
    selection: string[];
    isInteractive: boolean;
  }) => (
    <ChipsInnerContainer
      isInteractive={isInteractive}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {selection.map((item: string) => (
        <MuiChip
          key={item}
          label={
            <>
              {item}
              {!isInteractive &&
                controlledStateRef.current === CONTROLLED &&
                hasMultipleChoices && (
                  <NonInteractiveIcon
                    odysseyDesignTokens={odysseyDesignTokens}
                  />
                )}
            </>
          }
          tabIndex={-1}
          onDelete={
            isInteractive && controlledStateRef.current === CONTROLLED
              ? removeSelection
              : undefined
          }
          deleteIcon={
            <CloseCircleFilledIcon
              sx={{ pointerEvents: "auto" }}
              // We need to stop event propagation on mouse down to prevent the deletion
              // from being blocked by the Select list opening, and also ensure that
              // the pointerEvent is registered even when the parent's are not
              onMouseDown={stopPropagation}
            />
          }
        />
      ))}
    </ChipsInnerContainer>
  );

  // Convert the options into the ReactNode children
  // that will populate the <Select>
  const children = useMemo(
    () =>
      normalizedOptions.map((option, index) => {
        if (option.type === "heading") {
          return (
            <ListSubheader key={option.text}> {option.text} </ListSubheader>
          );
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
    [hasMultipleChoices, normalizedOptions, internalSelectedValues],
  );

  const renderValue = useCallback(
    (value: Value) =>
      Array.isArray(value) && <Chips selection={value} isInteractive={false} />,
    [Chips],
  );

  const renderFieldComponent = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: SelectRenderProps) => (
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
          renderValue={hasMultipleChoices ? renderValue : undefined}
          translate={translate}
        />
        {hasMultipleChoices && Array.isArray(value) && (
          <ChipsPositioningContainer odysseyDesignTokens={odysseyDesignTokens}>
            <Chips selection={value} isInteractive={true} />
          </ChipsPositioningContainer>
        )}
      </SelectContainer>
    ),
    [
      children,
      Chips,
      inputValues,
      hasMultipleChoices,
      normalizedOptions,
      nameOverride,
      odysseyDesignTokens,
      onBlur,
      onChange,
      onFocus,
      renderValue,
      testId,
      translate,
      value,
    ],
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
