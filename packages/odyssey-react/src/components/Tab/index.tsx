/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { createContext, useState } from "react";
import type { FunctionComponent, ReactElement, ReactText } from "react";

export type PropsTabs = {
  children: ReactElement[],
  id: string,
  ariaLabel: string,
  selectedId?: string,
  onTabChange?: (newId: string) => void
}

export type PropsTabsContainer = { 
  children: ReactElement | ReactElement[],
  id: string,
  ariaLabel: string
}

export type PropsTabsPanelContainer = { 
  children: ReactElement | ReactElement[]
}

export type PropsTabsPanel = { 
  children: ReactText | ReactElement | ReactElement[],
  label: string,
  id?: string,
  selected?: boolean
}

export type PropsTabsList = { 
  children: ReactElement | ReactElement[],
}

export type PropsTab = { 
  children: ReactText,
  id: string,
  ariaControls: string,
  selected?: boolean,
  onClick: () => void
}

export type StaticComponents = {
  Container: FunctionComponent<PropsTabsContainer>,
  PanelContainer: FunctionComponent<PropsTabsPanelContainer>,
  Panel: FunctionComponent<PropsTabsPanel>,
  List: FunctionComponent<PropsTabsList>,
  Tab: FunctionComponent<PropsTab>
}

/**
 * Navigation component used to organize content by grouping similar information on the 
 * same page. They allow content to be viewed without having to navigate away from that page 
 * or route.
 * 
 * @component
 * @example
 * <Tabs id="example-tabs" selectedId="tab-2" ariaLabel="Describes the purpose of the tabs.">
 *   <Tabs.Panel id="tab-1" label="Tab One">TabPanel One Content</Tabs.Panel>
 *   <Tabs.Panel id="tab-2" label="Tab Two">TabPanel Two Content</Tabs.Panel>
 *   <Tabs.Panel id="tab-3" label="Tab Three">TabPanel Three Content</Tabs.Panel>
 *   <Tabs.Panel id="tab-4" label="Tab Four">TabPanel Four Content</Tabs.Panel>
 * </Tabs>
 */
const Tabs: FunctionComponent<PropsTabs> & StaticComponents = ({ children, id, selectedId, ariaLabel, onTabChange }) => {
  const defaultSelectedTabId = selectedId || children[0].props.id
  const [selectedTabId, setSelectedTabId] = useState(defaultSelectedTabId);

  const handleTabChange = (newSelectedId: string) => {
    setSelectedTabId(newSelectedId)

    if (onTabChange) {
      onTabChange(newSelectedId);
    }
  }

  return (
    <Tabs.Container id={id} ariaLabel={ariaLabel}>
      <Tabs.List> 
        {children.map(({props: { label, id }}) => (
          <Tabs.Tab 
            id={id + '-tab'}
            key={id + '-tab'}
            ariaControls={id}
            selected={id === selectedTabId}
            onClick={() => handleTabChange(id)}
          >
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.PanelContainer>
        {children.map(({ props: { label, id, children: tabPabelChildren } }) => (
          <Tabs.Panel
            label={label}
            id={id}
            key={id}
            selected={id === selectedTabId}
          >
            {tabPabelChildren}
          </Tabs.Panel>
        ))}
      </Tabs.PanelContainer>
    </Tabs.Container>
  )
};

Tabs.Container = ({ children, id, ariaLabel }) => (
  <div id={id} className="ods-tabs" aria-label={ariaLabel} data-testid="ods-tabs">
    {children}
  </div>
)

Tabs.List = ({ children }) => (
  <div role="tablist" aria-label="label" className="ods-tabs--tablist">{children}</div>
)

Tabs.Tab = ({ children, id, ariaControls, selected, onClick }) => (
  <button 
    id={id}
    role="tab"
    tabIndex={selected ? 0 : -1}
    aria-controls={ariaControls}
    aria-selected={selected}
    className="ods-tabs--tab"
    onClick={onClick}
  >
      {children}
    </button>
)

Tabs.PanelContainer = ({ children }) => (<div className="ods-tabs--tabpanel">{children}</div>)

Tabs.Panel = ({ children, id, selected }) => (
  <div
    id={id}
    role="tabpanel"
    aria-labelledby={id + '-tab'}
    tabIndex={selected ? 0 : -1} 
    hidden={!selected}
  >
    {children}
  </div>
)

export default Tabs
