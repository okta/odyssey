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
import { memo, ReactElement, useCallback } from "react";

import { Radio, RadioProps } from "./Radio";
import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { SeleniumProps } from "./SeleniumProps";

type FieldComponentPropsUseByRadioGroup = Pick<
  FieldComponentProps,
  "errorMessage" | "hint" | "isDisabled" | "name"
>;

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
   * The id of the `input` element.
   */
  id?: string;
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
} & SeleniumProps &
  FieldComponentPropsUseByRadioGroup;

const RadioGroup = ({
  children,
  defaultValue,
  errorMessage,
  hint,
  id: idOverride,
  isDisabled,
  label,
  name: nameOverride,
  onChange,
  testId,
  value,
}: RadioGroupProps) => {
  const renderFieldComponent = useCallback(
    ({ ariaDescribedBy, errorMessageElementId, id, labelElementId }) => (
      <MuiRadioGroup
        aria-describedby={ariaDescribedBy}
        aria-errormessage={errorMessageElementId}
        aria-labelledby={labelElementId}
        data-se={testId}
        defaultValue={defaultValue}
        id={id}
        name={nameOverride ?? id}
        onChange={onChange}
        value={value}
      >
        {children}
      </MuiRadioGroup>
    ),
    [children, defaultValue, nameOverride, onChange, testId, value]
  );

  return (
    <Field
      errorMessage={errorMessage}
      fieldType="group"
      hasVisibleLabel={false}
      hint={hint}
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
