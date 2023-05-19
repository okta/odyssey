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

import React, { ReactElement, useState } from "react";
import { Tab as MuiTab } from "@mui/material";
import {
  TabList as MuiTabList,
  TabPanel as MuiTabPanel,
  TabContext as MuiTabContext,
} from "@mui/lab";

export type TabItemProps = {
  children: string | string[] | ReactElement | ReactElement[];
  startIcon?: ReactElement;
  label: string;
  isDisabled?: boolean;
  value?: string;
};

export type TabsProps = {
  children: ReactElement<TabItemProps>[];
  initialValue?: string;
  ariaLabel?: string;
};

const TabItem = ({
  children,
  startIcon,
  label,
  isDisabled,
  value,
}: TabItemProps) => {
  // We could return null instead, but then we throw errors because all the props are unused.
  return { children, startIcon, label, isDisabled, value };
};

const Tabs = ({ ariaLabel, children, initialValue = "0" }: TabsProps) => {
  const [tabState, setTabState] = useState(initialValue);

  const onChange = (_event: React.SyntheticEvent, newState: string) => {
    setTabState(newState);
  };

  console.log(children);

  return (
    <MuiTabContext value={tabState}>
      <MuiTabList onChange={onChange} aria-label={ariaLabel}>
        {children.map((tab, index) => (
          <MuiTab
            disabled={tab.props.isDisabled}
            icon={tab.props.startIcon}
            label={tab.props.label}
            value={tab.props.value ? tab.props.value : index.toString()}
            key={tab.props.value ? tab.props.value : index.toString()}
          />
        ))}
      </MuiTabList>
      {children.map((tab, index) => (
        <MuiTabPanel
          value={tab.props.value ? tab.props.value : index.toString()}
          key={tab.props.value ? tab.props.value : index.toString()}
        >
          {tab.props.children}
        </MuiTabPanel>
      ))}
    </MuiTabContext>
  );
};

export { TabItem, Tabs };
