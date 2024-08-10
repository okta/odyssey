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
import { memo, ReactNode, useCallback, useEffect, useMemo } from "react";

import { Field } from "./Field";
import {
  FieldComponentProps,
  FieldComponentRenderProps,
} from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";

export type CheckboxGroupProps = {
  /**
   * A single Checkbox element or an array of Checkbox elements
   */
  children: ReactNode;
  /**
   * The ID of an external label element. Required if hasInternalLabel is false.
   */
  externalLabelId?: string;
  /**
   * If true, renders the label within the component. If false, consumer must provide the label
   */
  hasInternalLabel?: boolean;
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
  externalLabelId,
  hasInternalLabel = true,
  hint,
  HintLinkComponent,
  id: idOverride,
  isDisabled,
  isRequired = false,
  label,
  testId,
  translate,
}: CheckboxGroupProps) => {
  useEffect(() => {
    if (!hasInternalLabel && !externalLabelId) {
      console.warn(
        "CheckboxGroup: When hasInternalLabel is false, externalLabelId must be provided for accessibility.",
      );
    }
    if (hasInternalLabel && !label) {
      console.warn(
        "CheckboxGroup: When hasInternalLabel is true, label must be provided.",
      );
    }
  }, [hasInternalLabel, externalLabelId, label]);

  // Create a dummy label for when using an external label
  const dummyLabel = useMemo(
    () => (hasInternalLabel ? label : ""),
    [hasInternalLabel, label],
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
        aria-labelledby={hasInternalLabel ? labelElementId : externalLabelId}
        data-se={testId}
        id={id}
        translate={translate}
      >
        {children}
      </MuiFormGroup>
    ),
    [children, testId, translate, hasInternalLabel, externalLabelId],
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
      isOptional={!isRequired}
      label={dummyLabel}
      renderFieldComponent={renderFieldComponent}
    />
  );
};

const MemoizedCheckboxGroup = memo(CheckboxGroup);
MemoizedCheckboxGroup.displayName = "CheckboxGroup";

export { MemoizedCheckboxGroup as CheckboxGroup };
