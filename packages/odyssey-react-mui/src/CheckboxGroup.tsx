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
  Checkbox,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  ScreenReaderText,
} from ".";

export type CheckboxGroupProps = {
  children:
    | ReactElement<typeof Checkbox>
    | Array<ReactElement<typeof Checkbox>>;
  errorMessage?: string;
  hint?: string;
  isDisabled?: boolean;
  label?: string;
  name?: string;
};

const CheckboxGroup = ({
  children,
  isDisabled,
  errorMessage,
  hint,
  label,
  name,
}: CheckboxGroupProps) => {
  const ariaDescribedBy = useMemo(
    () =>
      errorMessage || hint
        ? [hint && `${name}-hint`, errorMessage && `${name}-error`]
            .filter(Boolean)
            .join(" ")
        : undefined,
    [errorMessage, hint, name]
  );

  return (
    <FormControl
      component="fieldset"
      disabled={isDisabled}
      error={Boolean(errorMessage)}
      name={name}
    >
      {label && <FormLabel component="legend">{label}</FormLabel>}
      {hint && <FormHelperText id={`${name}-hint`}>{hint}</FormHelperText>}
      <FormGroup aria-describedby={ariaDescribedBy}>{children}</FormGroup>
      {errorMessage && (
        <FormHelperText id={`${name}-error`} error>
          <ScreenReaderText>Error:</ScreenReaderText> {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const MemoizedCheckboxGroup = memo(CheckboxGroup);

export { MemoizedCheckboxGroup as CheckboxGroup };
