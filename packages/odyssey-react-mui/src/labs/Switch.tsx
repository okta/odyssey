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
  ChangeEventHandler,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SwitchProps as MuiSwitchProps, FormLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "@emotion/styled";

import { Box } from "../Box";
import { FieldComponentProps } from "../FieldComponentProps";
import { FieldHint } from "../FieldHint";
import { CheckedFieldProps } from "../FormCheckedProps";
import type { HtmlProps } from "../HtmlProps";
import { CheckIcon } from "../icons.generated";
import { ComponentControlledState, getControlState } from "../inputUtils";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { stripRem, toRem } from "../remUtils";
import { useUniqueId } from "../useUniqueId";

const { CONTROLLED } = ComponentControlledState;

const nonForwardedProps = [
  "isChecked",
  "isDisabled",
  "isFullWidth",
  "isReadOnly",
  "odysseyDesignTokens",
];

const SwitchAndLabelContainer = styled("div", {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop),
})<
  Pick<SwitchProps, "isFullWidth" | "isDisabled" | "isReadOnly"> & {
    odysseyDesignTokens: DesignTokens;
  }
>(({ isFullWidth, odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  maxWidth: isFullWidth ? "100%" : odysseyDesignTokens.TypographyLineLengthMax,
}));

const SwitchContainer = styled.div({
  position: "relative",
});

const StyledSwitchLabel = styled(FormLabel, {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop),
})<
  Pick<SwitchLabelComponentProps, "isDisabled" | "isReadOnly"> & {
    odysseyDesignTokens: DesignTokens;
  }
>(({ isDisabled, isReadOnly, odysseyDesignTokens }) => ({
  display: "block",
  margin: 0,
  color: isDisabled
    ? odysseyDesignTokens.TypographyColorDisabled
    : isReadOnly
      ? odysseyDesignTokens.HueNeutral700
      : odysseyDesignTokens.PaletteNeutralDark,

  ...(isDisabled && {
    p: {
      color: odysseyDesignTokens.TypographyColorDisabled,
    },
    a: {
      color: `${odysseyDesignTokens.TypographyColorDisabled} !important`,
    },
  }),

  ...(isReadOnly && {
    p: {
      color: odysseyDesignTokens.HueNeutral700,
    },
    a: {
      color: `${odysseyDesignTokens.HueNeutral700} !important`,
    },
  }),
}));

const SwitchTrack = styled("div", {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop),
})<
  Pick<SwitchProps, "isChecked" | "isDisabled" | "isReadOnly"> & {
    odysseyDesignTokens: DesignTokens;
  }
>(({ isChecked, isDisabled, isReadOnly, odysseyDesignTokens }) => {
  const getBackgroundColor = () => {
    if (isDisabled) return odysseyDesignTokens.HueNeutral200;
    if (isReadOnly) return odysseyDesignTokens.HueNeutral600;
    if (isChecked) return odysseyDesignTokens.PaletteSuccessLight;
    return odysseyDesignTokens.HueNeutral300;
  };

  return {
    position: "relative",
    width: odysseyDesignTokens.Spacing7,
    height: `calc(${odysseyDesignTokens.Spacing4} + ${odysseyDesignTokens.Spacing1})`,
    borderRadius: odysseyDesignTokens.BorderRadiusOuter,
    backgroundColor: getBackgroundColor(),
    transition: `background-color ${odysseyDesignTokens.TransitionDurationMain}`,
  };
});

const SwitchThumb = styled("span", {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop),
})<
  Pick<SwitchProps, "isChecked" | "isDisabled" | "isReadOnly"> & {
    odysseyDesignTokens: DesignTokens;
  }
>(({ isChecked, isDisabled, isReadOnly, odysseyDesignTokens }) => {
  const thumbOffset = toRem(3);
  const trackWidth = stripRem(odysseyDesignTokens.Spacing7);
  const thumbWidth = stripRem(odysseyDesignTokens.Spacing4) - toRem(2);
  const transformDistance = trackWidth - thumbWidth - thumbOffset * 2;

  const getBackgroundColor = () => {
    if (isDisabled) return odysseyDesignTokens.HueNeutral50;
    if (isReadOnly) return odysseyDesignTokens.HueNeutral400;
    return odysseyDesignTokens.HueNeutralWhite;
  };

  const getTransform = () => {
    if (isChecked) return `translate3d(${transformDistance}rem, -50%, 0)`;
    return "translate3d(0, -50%, 0)";
  };

  return {
    position: "absolute",
    top: "50%",
    left: `${thumbOffset}rem`,
    width: `calc(${odysseyDesignTokens.Spacing4} - ${toRem(2)}rem)`,
    height: `calc(${odysseyDesignTokens.Spacing4} - ${toRem(2)}rem)`,
    borderRadius: odysseyDesignTokens.BorderRadiusRound,
    backgroundColor: getBackgroundColor(),
    transform: getTransform(),
    transition: `transform ${odysseyDesignTokens.TransitionDurationMain}`,
  };
});

const SwitchCheckMark = styled(CheckIcon, {
  shouldForwardProp: (prop) => !nonForwardedProps.includes(prop),
})<
  Pick<SwitchProps, "isChecked" | "isDisabled" | "isReadOnly"> & {
    odysseyDesignTokens: DesignTokens;
  }
>(({ isChecked, isDisabled, isReadOnly, odysseyDesignTokens }) => {
  const getOpacity = () => {
    return isChecked ? 1 : 0;
  };

  const getPathFill = () => {
    if (isDisabled || isReadOnly) {
      return odysseyDesignTokens.HueNeutral50;
    }
    return odysseyDesignTokens.HueNeutralWhite;
  };

  return {
    position: "absolute",
    top: "50%",
    left: 3,
    width: odysseyDesignTokens.Spacing4,
    transform: "translateY(-50%)",
    transition: `opacity ${odysseyDesignTokens.TransitionDurationMain}`,
    opacity: getOpacity(),
    path: {
      fill: getPathFill(),
    },
  };
});
const HiddenCheckbox = styled.input<{
  odysseyDesignTokens: DesignTokens;
  isReadOnly?: boolean;
}>(({ odysseyDesignTokens, isReadOnly }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  margin: 0,
  opacity: 0,
  cursor: isReadOnly ? "default" : "pointer",
  zIndex: 2,

  "&:focus-visible": {
    "~ [data-switch-track='true']": {
      boxShadow: `0 0 0 2px ${odysseyDesignTokens.HueNeutralWhite}, 0 0 0 4px ${odysseyDesignTokens.PalettePrimaryMain}`,
    },
  },
}));

type OnChangeCallbackArguments = {
  checked: boolean;
  value: string;
};

export type SwitchProps = {
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
  /**
   * Determines whether the Switch is read-only
   */
  isReadOnly?: boolean;
} & Pick<
  FieldComponentProps,
  "hint" | "HintLinkComponent" | "id" | "isFullWidth" | "isDisabled" | "name"
> &
  Pick<CheckedFieldProps<MuiSwitchProps>, "isChecked" | "isDefaultChecked"> &
  Pick<HtmlProps, "testId">;

type SwitchLabelComponentProps = {
  hint: SwitchProps["hint"];
  hintId?: string;
  HintLinkComponent: SwitchProps["HintLinkComponent"];
  inputId: string;
  isDisabled: SwitchProps["isDisabled"];
  isFullWidth: SwitchProps["isFullWidth"];
  label: SwitchProps["label"];
  isReadOnly: SwitchProps["isReadOnly"];
};

const SwitchLabel = ({
  hint,
  hintId,
  HintLinkComponent,
  inputId,
  isDisabled,
  label,
  isReadOnly,
}: SwitchLabelComponentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <>
      <StyledSwitchLabel
        htmlFor={inputId}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        {label}
        {hint && (
          <FieldHint
            id={hintId}
            text={hint}
            LinkComponent={HintLinkComponent}
          />
        )}
      </StyledSwitchLabel>
    </>
  );
};

const MemoizedSwitchLabel = memo(SwitchLabel);
SwitchLabel.displayName = "SwitchLabel";

const Switch = ({
  hint,
  HintLinkComponent,
  id: idProp,
  isChecked,
  isDefaultChecked,
  isDisabled,
  isFullWidth = false,
  isReadOnly = false,
  label,
  name,
  onChange,
  testId,
  value,
}: SwitchProps) => {
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const controlledStateRef = useRef(
    getControlState({
      controlledValue: isChecked,
      uncontrolledValue: isDefaultChecked,
    }),
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
      : Boolean(isDefaultChecked),
  );

  useEffect(() => {
    if (controlledStateRef.current === CONTROLLED) {
      setInternalSwitchChecked(Boolean(isChecked));
    }
  }, [isChecked]);

  const inputId = useUniqueId(idProp);

  const hintId = hint ? `${inputId}-hint` : undefined;
  const labelElementId = `${inputId}-label`;

  const handleOnChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      if (isReadOnly) {
        event.preventDefault();
        return;
      }
      const target = event.target;
      const { checked, value } = target;
      setInternalSwitchChecked(checked);
      onChange?.({ checked, value });
    },
    [onChange, setInternalSwitchChecked, isReadOnly],
  );

  return (
    <Box
      sx={{
        marginBlockEnd: odysseyDesignTokens.Spacing2,
        "&:last-child": {
          marginBlockEnd: 0,
        },
      }}
    >
      <SwitchAndLabelContainer
        isFullWidth={isFullWidth}
        odysseyDesignTokens={odysseyDesignTokens}
      >
        <MemoizedSwitchLabel
          hint={hint}
          hintId={hintId}
          HintLinkComponent={HintLinkComponent}
          inputId={inputId}
          isDisabled={isDisabled}
          isFullWidth={isFullWidth}
          label={label}
          isReadOnly={isReadOnly}
        />
        <SwitchContainer>
          <HiddenCheckbox
            {...inputValues}
            aria-checked={internalSwitchChecked}
            aria-describedby={hintId}
            aria-label={
              internalSwitchChecked
                ? `${label}: ${t("switch.active")}`
                : `${label}: ${t("switch.inactive")}`
            }
            aria-labelledby={labelElementId}
            data-se={testId}
            disabled={isDisabled}
            id={inputId}
            name={name ?? inputId}
            onChange={handleOnChange}
            odysseyDesignTokens={odysseyDesignTokens}
            type="checkbox"
            value={value}
            readOnly={isReadOnly}
            isReadOnly={isReadOnly}
          />
          <SwitchTrack
            data-switch-track
            isChecked={internalSwitchChecked}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            odysseyDesignTokens={odysseyDesignTokens}
          >
            <SwitchThumb
              isChecked={internalSwitchChecked}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              odysseyDesignTokens={odysseyDesignTokens}
            />
            <SwitchCheckMark
              isChecked={internalSwitchChecked}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              odysseyDesignTokens={odysseyDesignTokens}
            />
          </SwitchTrack>
        </SwitchContainer>
      </SwitchAndLabelContainer>
    </Box>
  );
};

const MemoizedSwitch = memo(Switch);
MemoizedSwitch.displayName = "Switch";

export { MemoizedSwitch as Switch };
