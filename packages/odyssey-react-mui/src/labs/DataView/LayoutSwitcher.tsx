/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Dispatch, memo, useCallback, SetStateAction, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { AvailableLayouts, DataLayout } from "./componentTypes";
import { MenuButton } from "../../MenuButton";
import { MenuItem } from "../../MenuItem";

export type LayoutSwitcherProps = {
  availableLayouts: AvailableLayouts;
  currentLayout: DataLayout;
  setCurrentLayout: Dispatch<SetStateAction<DataLayout>>;
};

const LayoutSwitcher = ({
  availableLayouts,
  currentLayout,
  setCurrentLayout,
}: LayoutSwitcherProps) => {
  const { t } = useTranslation();

  const changeLayout = useCallback(
    (value: DataLayout) => {
      setCurrentLayout(value);
    },
    [setCurrentLayout],
  );

  const memoizedMenuItems = useMemo(
    () =>
      availableLayouts.map((value: DataLayout) => ({
        value,
        onClick: () => changeLayout(value),
        label: t(`dataview.layout.${value}`),
      })),
    [availableLayouts, changeLayout, t],
  );

  return (
    <MenuButton
      ariaLabel="Layout"
      buttonLabel={`${currentLayout.charAt(0).toUpperCase()}${currentLayout.slice(1)}`}
      menuAlignment="right"
      shouldCloseOnSelect={false}
    >
      {memoizedMenuItems.map(({ value, onClick, label }) => (
        <MenuItem
          key={value}
          isSelected={currentLayout === value}
          onClick={onClick}
        >
          {label}
        </MenuItem>
      ))}
    </MenuButton>
  );
};

const MemoizedLayoutSwitcher = memo(LayoutSwitcher);
MemoizedLayoutSwitcher.displayName = "LayoutSwitcher";

export { MemoizedLayoutSwitcher as LayoutSwitcher };
