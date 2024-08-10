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
  RadioGroup as MuiRadioGroup,
  type RadioGroupProps as MuiRadioGroupProps,
} from "@mui/material";
import {
  memo,
  ReactNode,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";

import { RadioProps } from "./Radio";
import { Field } from "./Field";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";
import { getControlState, useInputValues } from "./inputUtils";

export type RadioGroupProps = {
  /**
   * The Radio components within the group. Must include two or more.
   */
  children: ReactNode;
  /**
   * The text value of the Radio that should be selected by default
   */
  defaultValue?: string;
  /**
   * The ID of an external label element. Required if hasInternalLabel is false.
   */
  externalLabelId?: string;
  /**
   * If true, renders the label within the component. If false, consumer must provide the label
   */
  hasInternalLabel?: boolean;
  /**
   * The text label for the RadioGroup
   */
  label: string;
  /**
   * Listen for changes in the browser that change `value`
   */
  onChange?: MuiRadioGroupProps["onChange"];
  /**
   * The `value` on the selected Radio
   */
  value?: RadioProps["value"];
} & Pick<
  FieldComponentProps,
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "name"
> &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

type FieldRenderProps = Partial<
  Pick<FieldComponentRenderProps, "ariaDescribedBy" | "errorMessageElementId">
> &
  Pick<FieldComponentRenderProps, "id" | "labelElementId">;

const RadioGroup = ({
  ariaDescribedBy,
  children,
  defaultValue,
  errorMessage,
  errorMessageList,
  externalLabelId,
  hasInternalLabel = true,
  hint,
  HintLinkComponent,
  id: idOverride,
  isDisabled,
  label,
  name: nameOverride,
  onChange: onChangeProp,
  testId,
  translate,
  value,
}: RadioGroupProps) => {
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

  useEffect(() => {
    if (!hasInternalLabel && !externalLabelId) {
      console.warn(
        "RadioGroup: When hasInternalLabel is false, externalLabelId must be provided for accessibility.",
      );
    }
    if (hasInternalLabel && !label) {
      console.warn(
        "RadioGroup: When hasInternalLabel is true, label must be provided.",
      );
    }
  }, [hasInternalLabel, externalLabelId, label]);

  // Create a dummy label for when using an external label
  const dummyLabel = useMemo(
    () => (hasInternalLabel ? label : ""),
    [hasInternalLabel, label],
  );

  const onChange = useCallback<NonNullable<MuiRadioGroupProps["onChange"]>>(
    (event, value) => {
      onChangeProp?.(event, value);
    },
    [onChangeProp],
  );

  const renderFieldComponent = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: FieldRenderProps) => (
      <MuiRadioGroup
        {...inputValues}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={errorMessageElementId}
        aria-labelledby={hasInternalLabel ? labelElementId : externalLabelId}
        data-se={testId}
        id={id}
        name={nameOverride ?? id}
        onChange={onChange}
        translate={translate}
      >
        {children}
      </MuiRadioGroup>
    ),
    [
      children,
      inputValues,
      nameOverride,
      onChange,
      testId,
      translate,
      hasInternalLabel,
      externalLabelId,
    ],
  );

  return (
    <Field
      ariaDescribedBy={ariaDescribedBy}
      errorMessage={errorMessage}
      errorMessageList={errorMessageList}
      fieldType="group"
      hasVisibleLabel={hasInternalLabel}
      hint={hint}
      HintLinkComponent={HintLinkComponent}
      id={idOverride}
      isDisabled={isDisabled}
      label={dummyLabel}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedRadioGroup = memo(RadioGroup);
MemoizedRadioGroup.displayName = "RadioGroup";

export { MemoizedRadioGroup as RadioGroup };
