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

import { Dispatch, memo, useCallback, SetStateAction } from "react";
import { AvailableLayouts, Layout } from "./componentTypes";
import { MenuButton } from "../../MenuButton";
import { MenuItem } from "../../MenuItem";

export type LayoutSwitcherProps = {
  currentLayout: Layout;
  availableLayouts: AvailableLayouts;
  setCurrentLayout: Dispatch<SetStateAction<Layout>>;
};

const LayoutSwitcher = ({
  currentLayout,
  availableLayouts,
  setCurrentLayout,
}: LayoutSwitcherProps) => {
  const changeLayout = useCallback(
    (value: Layout) => (_event: React.MouseEvent<HTMLLIElement>) => {
      // This is necessary to avoid linter errors, while the _event is necessary to satisfy the onClick type
      if (process.env.NODE_ENV === "development") console.debug(_event);

      setCurrentLayout(value);
    },
    [],
  );

  return (
    <MenuButton
      buttonLabel={`${currentLayout.charAt(0).toUpperCase()}${currentLayout.slice(1)}`}
      ariaLabel="Layout"
      menuAlignment="right"
      shouldCloseOnSelect={false}
    >
      <>
        {typeof availableLayouts !== "string" &&
          availableLayouts.map((value: Layout) => (
            <MenuItem
              key={value}
              isSelected={currentLayout === value}
              onClick={changeLayout(value)}
            >
              {`${value.charAt(0).toUpperCase()}${value.slice(1)}`}
            </MenuItem>
          ))}
      </>
    </MenuButton>
  );
};

const MemoizedLayoutSwitcher = memo(LayoutSwitcher);
MemoizedLayoutSwitcher.displayName = "LayoutSwitcher";

export { MemoizedLayoutSwitcher as LayoutSwitcher };
