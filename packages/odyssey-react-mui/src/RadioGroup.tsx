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
import { memo, ReactElement, useCallback, useRef } from "react";

import { Radio, RadioProps } from "./Radio";
import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";
import { getControlState, useInputValues } from "./inputUtils";

export type RadioGroupProps = {
  /**
   * The Radio components within the group. Must include two or more.
   */
  children: Array<ReactElement<typeof Radio>>;
  /**
   * The text value of the Radio that should be selected by default
   */
  defaultValue?: string;
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
  | "ariaDescribedBy"
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "name"
> &
  HtmlProps;

const RadioGroup = ({
  ariaDescribedBy,
  children,
  defaultValue,
  errorMessage,
  errorMessageList,
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
    getControlState({ controlledValue: value, uncontrolledValue: defaultValue })
  );
  const inputValues = useInputValues({
    defaultValue,
    value,
    controlState: controlledStateRef.current,
  });

  const onChange = useCallback<NonNullable<MuiRadioGroupProps["onChange"]>>(
    (event, value) => {
      onChangeProp?.(event, value);
    },
    [onChangeProp]
  );
  const renderFieldComponent = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: {
      ariaDescribedBy?: string;
      errorMessageElementId?: string;
      id: string;
      labelElementId: string;
    }) => (
      <MuiRadioGroup
        {...inputValues}
        aria-describedby={ariaDescribedBy}
        aria-errormessage={errorMessageElementId}
        aria-labelledby={labelElementId}
        data-se={testId}
        id={id}
        name={nameOverride ?? id}
        onChange={onChange}
        translate={translate}
      >
        {children}
      </MuiRadioGroup>
    ),
    [children, inputValues, nameOverride, onChange, testId, translate]
  );

  return (
    <Field
      ariaDescribedBy={ariaDescribedBy}
      errorMessage={errorMessage}
      errorMessageList={errorMessageList}
      fieldType="group"
      hasVisibleLabel={false}
      hint={hint}
      HintLinkComponent={HintLinkComponent}
      id={idOverride}
      isDisabled={isDisabled}
      label={label}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedRadioGroup = memo(RadioGroup);
MemoizedRadioGroup.displayName = "RadioGroup";

export { MemoizedRadioGroup as RadioGroup };
