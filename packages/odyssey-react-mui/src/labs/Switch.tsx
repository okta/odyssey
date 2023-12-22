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
  memo,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
  FormControlLabel,
} from "@mui/material";

const { CONTROLLED } = ComponentControlledState;
import { useOdysseyDesignTokens } from "../OdysseyDesignTokensContext";
import { Box } from "../Box";
import { FieldComponentProps } from "../FieldComponentProps";
import { FieldHint } from "../FieldHint";
import type { SeleniumProps } from "../SeleniumProps";
import { useUniqueId } from "../useUniqueId";
import { ComponentControlledState, getControlState } from "../inputUtils";
import { CheckedFieldProps } from "../FormCheckedProps";

type OnChangeCallbackArguments = {
  checked: boolean;
  value: string;
};

export type SwitchProps = {
  /**
   * if `true`, the label and switch span entire containing element's width
   */
  isFullWidth?: boolean;
  /**
   * The label text for the Switch
   */
  label: string;
  /**
   * The change event handler for the Switch
   */
  onChange?: ({ checked, value }: OnChangeCallbackArguments) => void;
  /**
   * The value attribute of the Switch
   */
  value: string;
} & Pick<
  FieldComponentProps,
  "hint" | "id" | "isFullWidth" | "isDisabled" | "name"
> &
  CheckedFieldProps<MuiSwitchProps> &
  SeleniumProps;

type SwitchLabelProps = {
  checked: boolean;
  hint: SwitchProps["hint"];
  hintId?: string;
  isFullWidth: SwitchProps["isFullWidth"];
  label: SwitchProps["label"];
};

const SwitchLabel = ({
  checked,
  hint,
  hintId,
  isFullWidth,
  label,
}: SwitchLabelProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: odysseyDesignTokens.Spacing1,
          margin: 0,
          maxWidth: isFullWidth
            ? "100%"
            : odysseyDesignTokens.TypographyLineLengthMax,
          fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
        }}
      >
        {label}
        <Box
          sx={{
            padding: "2px 4px",
            backgroundColor: checked
              ? odysseyDesignTokens.PaletteSuccessLighter
              : odysseyDesignTokens.HueNeutral100,
            borderRadius: odysseyDesignTokens.BorderRadiusMain,
            color: checked
              ? odysseyDesignTokens.PaletteSuccessText
              : odysseyDesignTokens.HueNeutral700,
            fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
            fontSize: odysseyDesignTokens.TypographyScale0,
            lineHeight: odysseyDesignTokens.TypographyLineHeightOverline,
            transitionProperty: "background-color, color",
            transitionDuration: odysseyDesignTokens.TransitionDurationMain,
          }}
        >
          {checked ? "Active" : "Inactive"}
        </Box>
      </Box>
      {hint && <FieldHint id={hintId} text={hint} />}
    </>
  );
};

const Switch = ({
  hint,
  id: _id,
  isChecked,
  isDefaultChecked,
  isDisabled,
  isFullWidth = false,
  label,
  name: _name,
  onChange,
  testId,
  value = "Something",
}: SwitchProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const controlledStateRef = useRef(
    getControlState({
      controlledValue: isChecked,
      uncontrolledValue: isDefaultChecked,
    })
  );
  const inputValues = useMemo(() => {
    if (controlledStateRef.current === CONTROLLED) {
      return { checked: isChecked };
    }
    return { defaultChecked: isDefaultChecked };
  }, [isDefaultChecked, isChecked]);

  const [internalSwitchChecked, setInternalSwitchChecked] = useState(
    controlledStateRef.current === CONTROLLED
      ? Boolean(isChecked)
      : Boolean(isDefaultChecked)
  );

  useEffect(() => {
    if (controlledStateRef.current === CONTROLLED) {
      setInternalSwitchChecked(Boolean(isChecked));
    }
  }, [isChecked]);

  const id = useUniqueId(_id);

  const hintId = hint ? `${id}-hint` : undefined;
  const labelElementId = `${id}-label`;

  const handleOnChange = useCallback(
    (_: SyntheticEvent<Element, Event>, checked: boolean) => {
      setInternalSwitchChecked(checked);
      onChange?.({ checked, value });
    },
    [onChange, setInternalSwitchChecked, value]
  );

  const renderSwitchComponent = useMemo(
    () => (
      <MuiSwitch
        {...inputValues}
        disabled={isDisabled}
        disableRipple
        inputProps={{
          "aria-checked": internalSwitchChecked,
          "aria-describedby": hintId,
          "aria-label": label,
          "aria-labelledby": labelElementId,
        }}
        name={_name ?? id}
        onChange={handleOnChange}
      />
    ),
    [
      handleOnChange,
      hintId,
      inputValues,
      internalSwitchChecked,
      id,
      isDisabled,
      label,
      labelElementId,
      _name,
    ]
  );

  return (
    <Box
      sx={{
        marginBlockEnd: odysseyDesignTokens.Spacing2,
      }}
    >
      <FormControlLabel
        checked={internalSwitchChecked}
        control={renderSwitchComponent}
        data-se={testId}
        disabled={isDisabled}
        id={labelElementId}
        label={
          <SwitchLabel
            checked={internalSwitchChecked}
            hint={hint}
            hintId={hintId}
            isFullWidth={isFullWidth}
            label={label}
          />
        }
        labelPlacement="start"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: odysseyDesignTokens.Spacing4,
          width: "100%",
          maxWidth: isFullWidth
            ? "100%"
            : odysseyDesignTokens.TypographyLineLengthMax,
        }}
        value={value}
      />
    </Box>
  );
};

const MemoizedSwitch = memo(Switch);
MemoizedSwitch.displayName = "Switch";

export { MemoizedSwitch as Switch };
