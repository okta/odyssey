/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, useCallback } from "react";

import { Autocomplete, AutocompleteProps } from "../Autocomplete";
import { TimeZoneOption } from "./useOdysseyDateFields";

export type TimeZonePickerProps = {
  label: string;
  onTimeZoneChange?: (timeZone: string) => void;
  timeZoneOptions: TimeZoneOption[];
  value?: string;
} & Pick<AutocompleteProps<TimeZoneOption, false, false>, "isReadOnly">;

const TimeZonePicker = ({
  label,
  isReadOnly,
  onTimeZoneChange,
  timeZoneOptions,
  value,
}: TimeZonePickerProps) => {
  const onChange = useCallback<
    NonNullable<AutocompleteProps<TimeZoneOption, false, false>["onChange"]>
  >(
    (_, option) => {
      if (option) {
        const { value } = option;
        onTimeZoneChange?.(value);
      }
    },
    [onTimeZoneChange],
  );

  return (
    <Autocomplete<TimeZoneOption, false, false>
      isReadOnly={isReadOnly}
      label={label}
      onChange={onChange}
      options={timeZoneOptions}
      value={timeZoneOptions.find((option) => option.value === value)}
    />
  );
};

const MemoizedTimeZonePicker = memo(TimeZonePicker);
MemoizedTimeZonePicker.displayName = "TimeZonePicker";

export { MemoizedTimeZonePicker as TimeZonePicker };
