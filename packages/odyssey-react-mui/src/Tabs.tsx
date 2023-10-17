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
  TabContext as MuiTabContext,
  TabList as MuiTabList,
  TabListProps as MuiTabListProps,
  TabPanel as MuiTabPanel,
} from "@mui/lab";
import { Tab as MuiTab } from "@mui/material";
import {
  ReactElement,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { SeleniumProps } from "./SeleniumProps";

export type TabItemProps = {
  /**
   * The content of the Tab itself
   */
  children: ReactNode;
  /**
   * If `true`, the TabItem is disabled
   */
  isDisabled?: boolean;
  /**
   * The label text for the TabItem
   */
  label: string;
  /**
   * An optional icon to display at the start of the TabItem
   */
  startIcon?: ReactElement;
  /**
   * The value associated with the TabItem
   */
  value?: string;
} & SeleniumProps;

export type TabsProps = {
  /**
   * The ARIA label for the full Tabs group
   */
  ariaLabel?: string;
  /**
   * @deprecated please use the `value` prop instead
   * When `value` is provided, `initialValue` isn't used.
   */
  initialValue?: string;
  /**
   * The TabItems to be included in the Tabs group
   */
  tabs: TabItemProps[];
  /**
   * Identifier for the selected tab.
   */
  value?: string;
  /**
   * Callback fired when the active tab is changed.
   */
  onChange?: MuiTabListProps["onChange"];
};

const Tabs = ({
  ariaLabel,
  initialValue,
  tabs,
  value,
  onChange: onChangeProp,
}: TabsProps) => {
  const [tabState, setTabState] = useState(initialValue ?? value ?? "0");

  const onChange = useCallback<NonNullable<MuiTabListProps["onChange"]>>(
    (event, value: string) => {
      setTabState(value);
      onChangeProp?.(event, value);
    },
    [onChangeProp]
  );

  useEffect(() => {
    if (value !== undefined) {
      setTabState(value);
    }
  }, [value]);

  return (
    <MuiTabContext value={tabState}>
      <MuiTabList onChange={onChange} aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <MuiTab
            data-se={tab.testId}
            disabled={tab.isDisabled}
            icon={tab.startIcon}
            label={tab.label}
            value={tab.value ? tab.value : index.toString()}
            key={tab.value ? tab.value : index.toString()}
          />
        ))}
      </MuiTabList>
      {tabs.map((tab, index) => (
        <MuiTabPanel
          value={tab.value ? tab.value : index.toString()}
          key={tab.value ? tab.value : index.toString()}
        >
          {tab.children}
        </MuiTabPanel>
      ))}
    </MuiTabContext>
  );
};

const MemoizedTabs = memo(Tabs);
MemoizedTabs.displayName = "Tabs";

export { MemoizedTabs as Tabs };
