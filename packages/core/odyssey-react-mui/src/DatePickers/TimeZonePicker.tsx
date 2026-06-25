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

import { Autocomplete, AutocompleteProps } from "../Autocomplete.js";

export type TimeZoneOption = {
  label: string;
  value: string;
};

export type TimeZonePickerProps = {
  /** Accessible label for the time zone autocomplete input. */
  label: string;
  /**
   * Called when the selected time zone changes. Receives the `value` string of
   * the selected option, or `undefined` when the selection is cleared.
   */
  onTimeZoneChange?: (timeZone: string | undefined) => void;
  /** Array of time zone options available for selection.
   * Each entry requires a human-readable `label` and a machine-readable `value`.
   */
  timeZoneOptions: TimeZoneOption[];
  /** The currently selected time zone, matched against `TimeZoneOption.value`. */
  value?: string;
} & Pick<AutocompleteProps<TimeZoneOption, false, false>, "isReadOnly">;

/**
 * An autocomplete input for selecting a time zone from a provided list of options.
 */
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
      onTimeZoneChange?.(option?.value);
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
