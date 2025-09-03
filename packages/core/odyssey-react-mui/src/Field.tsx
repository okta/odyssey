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
  FormControl as MuiFormControl,
  FormLabel as MuiFormLabel,
} from "@mui/material";
import { memo, ReactElement, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { FieldComponentProps } from "./FieldComponentProps.js";
import { FieldError } from "./FieldError.js";
import { FieldHint } from "./FieldHint.js";
import { FieldLabel } from "./FieldLabel.js";
import { useFieldset } from "./FieldsetContext.js";
import { HtmlProps } from "./HtmlProps.js";
import { Typography } from "./Typography.js";
import { useUniqueId } from "./useUniqueId.js";

export const fieldTypeValues = ["single", "group"] as const;

export type RenderFieldComponentProps = {
  ariaDescribedBy?: string;
  dataSe?: string;
  errorMessageElementId?: string;
  id: string;
  isReadOnly?: boolean;
  labelElementId: string;
};

export type FieldProps = {
  /**
   * If `error` is not undefined, the `input` will indicate an error.
   */
  errorMessageList?: string[];
  /**
   * The field type determines how ARIA components are setup. It's important to use this to denote if you expect only one component (like a text field) or multiple (like a radio group).
   */
  fieldType: (typeof fieldTypeValues)[number];
  /**
   * If `true`, the Field label will be shown
   */
  hasVisibleLabel: boolean;
  /**
   * Important for determining if children inherit error state
   */
  isCheckboxGroup?: boolean;
  /**
   * Important for narrowing down the `fieldset` role to "radiogroup".
   */
  isRadioGroup?: boolean;
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
    isReadOnly,
  }: RenderFieldComponentProps) => ReactElement;
};

const Field = ({
  ariaDescribedBy,
  errorMessage,
  errorMessageList,
  fieldType,
  hasVisibleLabel,
  hint,
  HintLinkComponent,
  id: idOverride,
  isDisabled: isDisabledProp = false,
  isFullWidth = false,
  isRadioGroup = false,
  isOptional = false,
  isReadOnly = false,
  label,
  renderFieldComponent,
}: FieldProps &
  Pick<
    FieldComponentProps,
    | "errorMessage"
    | "errorMessageList"
    | "hint"
    | "HintLinkComponent"
    | "id"
    | "isDisabled"
    | "isFullWidth"
    | "isOptional"
    | "isReadOnly"
  > &
  Pick<HtmlProps, "ariaDescribedBy">) => {
  const { t } = useTranslation();

  const id = useUniqueId(idOverride);
  const hintId = hint ? `${id}-hint` : undefined;
  const errorMessageElementId =
    errorMessage || errorMessageList ? `${id}-error` : undefined;
  const labelElementId = `${id}-label`;

  const localAriaDescribedBy = useMemo(
    () =>
      [hintId, errorMessageElementId, ariaDescribedBy].join(" ").trim() ||
      undefined,
    [ariaDescribedBy, errorMessageElementId, hintId],
  );

  const { isDisabled: isFieldsetDisabled } = useFieldset();

  const isDisabled = useMemo(
    () => isDisabledProp || isFieldsetDisabled,
    [isDisabledProp, isFieldsetDisabled],
  );

  return (
    <MuiFormControl
      component={fieldType === "group" ? "fieldset" : "div"}
      disabled={isDisabled}
      error={
        Boolean(errorMessage) ||
        (Array.isArray(errorMessageList) && errorMessageList.length > 0)
      }
      fullWidth={isFullWidth}
      role={isRadioGroup ? "radiogroup" : undefined}
    >
      {fieldType === "group" ? (
        <MuiFormLabel component="legend" id={labelElementId}>
          {label}{" "}
          {isOptional && label && (
            <Typography color="textSecondary" component="span">
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

      {hint && (
        <FieldHint id={hintId} LinkComponent={HintLinkComponent} text={hint} />
      )}

      {renderFieldComponent({
        ariaDescribedBy: localAriaDescribedBy,
        errorMessageElementId,
        id,
        labelElementId,
        isReadOnly,
      })}

      {(errorMessage || errorMessageList) && (
        <FieldError
          id={errorMessageElementId}
          message={errorMessage}
          messageList={errorMessageList}
        />
      )}
    </MuiFormControl>
  );
};

const MemoizedField = memo(Field);
MemoizedField.displayName = "Field";

export { MemoizedField as Field };
