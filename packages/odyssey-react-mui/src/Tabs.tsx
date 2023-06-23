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
  useState,
} from "react";
import { Tab as MuiTab } from "@mui/material";
import {
  TabList as MuiTabList,
  TabPanel as MuiTabPanel,
  TabContext as MuiTabContext,
} from "@mui/lab";

export type TabItemProps = {
  children: ReactNode;
  startIcon?: ReactElement;
  label: string;
  isDisabled?: boolean;
  value?: string;
};

export type TabsProps = {
  tabs: TabItemProps[];
  initialValue?: string;
  ariaLabel?: string;
};

const Tabs = ({ ariaLabel, tabs, initialValue = "0" }: TabsProps) => {
  const [tabState, setTabState] = useState(initialValue);

  const onChange = useCallback(
    (_event: React.SyntheticEvent, newState: string) => {
      setTabState(newState);
    },
    []
  );

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
