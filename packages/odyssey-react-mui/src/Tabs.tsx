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

import React, {
  ReactElement,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Tab as MuiTab } from "@mui/material";
import {
  TabList as MuiTabList,
  TabPanel as MuiTabPanel,
  TabContext as MuiTabContext,
} from "@mui/lab";

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
};

export type TabsProps = {
  /**
   * The ARIA label for the full Tabs group
   */
  ariaLabel?: string;
  /**
   * The value of the Tab that should be selected by default.
   * If value is provided as well, value takes precedence.
   */
  initialValue?: string;
  /**
   * The TabItems to be included in the Tabs group
   */
  tabs: TabItemProps[];
  /**
   * The value of the Tab that is selected
   */
  value?: string;
};

const Tabs = ({ ariaLabel, initialValue = "0", tabs }: TabsProps) => {
  const [tabState, setTabState] = useState(initialValue);

  const onChange = useCallback(
    (_event: React.SyntheticEvent, newState: string) => {
      setTabState(newState);
    },
    []
  );

  useEffect(() => {
    if (value) {
      setTabState(value);
    }
  }, [value]);

  return (
    <MuiTabContext value={tabState}>
      <MuiTabList onChange={onChange} aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <MuiTab
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
