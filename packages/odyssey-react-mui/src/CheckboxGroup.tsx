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

import { FormGroup as MuiFormGroup } from "@mui/material";
import { memo, ReactElement, useCallback } from "react";

import { Checkbox } from "./Checkbox";
import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";

export type CheckboxGroupProps = {
  /**
   * A single Checkbox element or an array of Checkbox elements
   */
  children:
    | ReactElement<typeof Checkbox>
    | Array<ReactElement<typeof Checkbox>>;
  /**
   * If `true`, the CheckboxGroup is required
   */
  isRequired?: boolean;
  /**
   * The label text for the CheckboxGroup
   */
  label: string;
} & Pick<
  FieldComponentProps,
  | "ariaDescribedBy"
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
> &
  HtmlProps;

const CheckboxGroup = ({
  ariaDescribedBy,
  children,
  errorMessage,
  errorMessageList,
  hint,
  HintLinkComponent,
  id: idOverride,
  isDisabled,
  isRequired = false,
  label,
  testId,
  translate,
}: CheckboxGroupProps) => {
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
      <MuiFormGroup
        aria-describedby={ariaDescribedBy}
        aria-errormessage={errorMessageElementId}
        aria-labelledby={labelElementId}
        data-se={testId}
        id={id}
        translate={translate}
      >
        {children}
      </MuiFormGroup>
    ),
    [children, testId, translate]
  );

  return (
    <Field
      ariaDescribedBy={ariaDescribedBy}
      errorMessage={errorMessage}
      errorMessageList={errorMessageList}
      fieldType="group"
      hasVisibleLabel={true}
      hint={hint}
      HintLinkComponent={HintLinkComponent}
      id={idOverride}
      isDisabled={isDisabled}
      isOptional={!isRequired}
      label={label}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedCheckboxGroup = memo(CheckboxGroup);
MemoizedCheckboxGroup.displayName = "CheckboxGroup";

export { MemoizedCheckboxGroup as CheckboxGroup };
