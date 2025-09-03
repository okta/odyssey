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
import React, { memo, ReactNode, useCallback, useMemo } from "react";

import type { HtmlProps } from "./HtmlProps.js";

import { CheckboxProps } from "./Checkbox.js";
import { Field } from "./Field.js";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps.js";

export type CheckboxGroupProps = {
  /**
   * A single Checkbox element or an array of Checkbox elements
   */
  children: ReactNode;
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
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isDisabled"
  | "isReadOnly"
> &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

type CheckboxGroupRenderProps = Pick<
  FieldComponentRenderProps,
  "id" | "labelElementId"
> &
  Partial<
    Pick<FieldComponentRenderProps, "ariaDescribedBy" | "errorMessageElementId">
  >;

const CheckboxGroup = ({
  ariaDescribedBy,
  children,
  errorMessage,
  errorMessageList,
  hint,
  HintLinkComponent,
  id: idOverride,
  isDisabled,
  isReadOnly = false,
  isRequired = false,
  label,
  testId,
  translate,
}: CheckboxGroupProps) => {
  const memoizedChildren = useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (React.isValidElement<CheckboxProps>(child)) {
          return React.cloneElement(child, {
            isReadOnly,
            isDisabled: isDisabled || child.props.isDisabled,
          });
        }
        return child;
      }),
    [children, isReadOnly, isDisabled],
  );

  const renderFieldComponent = useCallback(
    ({
      ariaDescribedBy,
      errorMessageElementId,
      id,
      labelElementId,
    }: CheckboxGroupRenderProps) => (
      <MuiFormGroup
        aria-describedby={ariaDescribedBy}
        aria-errormessage={errorMessageElementId}
        aria-labelledby={labelElementId}
        data-se={testId}
        id={id}
        translate={translate}
      >
        {memoizedChildren}
      </MuiFormGroup>
    ),
    [memoizedChildren, testId, translate],
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
