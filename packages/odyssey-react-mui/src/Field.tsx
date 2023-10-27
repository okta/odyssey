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

import { memo, ReactElement, useMemo } from "react";

import {
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
} from "@mui/material";
import { FieldError } from "./FieldError";
import { FieldHint } from "./FieldHint";
import { FieldLabel } from "./FieldLabel";
import { Typography } from "./Typography";
import { useFieldset } from "./FieldsetContext";
import { useTranslation } from "react-i18next";
import { useUniqueId } from "./useUniqueId";

export const fieldTypeValues = ["single", "group"] as const;

export type FieldProps = {
  /**
   * If `error` is not undefined, the `input` will indicate an error.
   */
  errorMessage?: string;
  /**
   * The field type determines how ARIA components are setup. It's important to use this to denote if you expect only one component (like a text field) or multiple (like a radio group).
   */
  fieldType: (typeof fieldTypeValues)[number];
  /**
   * If `true`, the Field label will be shown
   */
  hasVisibleLabel: boolean;
  /**
   * The helper text content.
   */
  hint?: string;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Important for narrowing down the `fieldset` role to "radiogroup".
   */
  isRadioGroup?: boolean;
  /**
   * Important for determining if children inherit error state
   */
  isCheckboxGroup?: boolean;
  /**
   * If `true`, the component is disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the `input` element is not required.
   */
  isOptional?: boolean;
  /**
   * The label for the `input` element.
   */
  label: string;
  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder?: string;
  /**
   * Render-props function that sends back ARIA props to your field component.
   */
  renderFieldComponent: ({
    ariaDescribedBy,
    dataSe,
    errorMessageElementId,
    id,
    labelElementId,
  }: {
    ariaDescribedBy?: string;
    dataSe?: string;
    errorMessageElementId?: string;
    id: string;
    labelElementId: string;
  }) => ReactElement;
};

const Field = ({
  errorMessage,
  fieldType,
  hasVisibleLabel,
  hint,
  id: idOverride,
  isDisabled: isDisabledProp = false,
  isRadioGroup = false,
  isOptional = false,
  label,
  renderFieldComponent,
}: FieldProps) => {
  const { t } = useTranslation();

  const id = useUniqueId(idOverride);
  const hintId = hint ? `${id}-hint` : undefined;
  const errorMessageElementId = errorMessage ? `${id}-error` : undefined;
  const labelElementId = `${id}-label`;

  const ariaDescribedBy = useMemo(
    () => [hintId, errorMessageElementId].join(" ").trim() || undefined,
    [errorMessageElementId, hintId]
  );

  const { isDisabled: isFieldsetDisabled } = useFieldset();

  const isDisabled = useMemo(
    () => isDisabledProp || isFieldsetDisabled,
    [isDisabledProp, isFieldsetDisabled]
  );

  return (
    <MuiFormControl
      component={fieldType === "group" ? "fieldset" : "div"}
      disabled={isDisabled}
      error={Boolean(errorMessage)}
      role={isRadioGroup ? "radiogroup" : undefined}
    >
      {fieldType === "group" ? (
        <MuiFormLabel component="legend">
          {label}{" "}
          {isOptional && label && (
            <Typography component="span" color="textSecondary">
              ({t("fieldlabel.optional.text")})
            </Typography>
          )}
        </MuiFormLabel>
      ) : (
        <FieldLabel
          hasVisibleLabel={hasVisibleLabel}
          id={labelElementId}
          inputId={id}
          isOptional={isOptional}
          text={label}
        />
      )}

      {hint && <FieldHint id={hintId} text={hint} />}

      {renderFieldComponent({
        ariaDescribedBy,
        errorMessageElementId,
        id,
        labelElementId,
      })}

      {errorMessage && (
        <FieldError id={errorMessageElementId} text={errorMessage} />
      )}
    </MuiFormControl>
  );
};

const MemoizedField = memo(Field);
MemoizedField.displayName = "Field";

export { MemoizedField as Field };
