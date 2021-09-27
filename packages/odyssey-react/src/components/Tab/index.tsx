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

import React, { useState, useRef, forwardRef } from "react";
import type {
  FunctionComponent,
  ReactElement,
  ReactText,
  ComponentPropsWithRef,
} from "react";
import styles from "./Tab.module.scss";
import { useCx, useOid } from "../../utils";

export type Props = {
  /**
   * A collection of Tab.Panels to be rendered
   */
  children: ReactElement[];

  /**
   * The tab id attribute. Automatically generated if not provided.
   */
  id: string;

  /**
   * An aria label to be placed on the tab component. It
   * should describe the purpose of the tabs.
   */
  ariaLabel: string;

  /**
   * Specifes which Tabs.Panel should be selected on mount
   */
  selectedId?: string;

  /**
   * Callback when the selected tab is changed.
   */
  onTabChange?: (newId: string) => void;
};

export type PropsTabsContainer = {
  children: ReactElement | ReactElement[];
  id: string;
  ariaLabel: string;
};

export type PropsTabsPanelContainer = {
  children: ReactElement | ReactElement[];
};

export type PropsTabsPanel = {
  children: ReactText | ReactElement | ReactElement[];
  label: string;
  id?: string;
  selected?: boolean;
};
export interface PropsTabsList
  extends Omit<ComponentPropsWithRef<"div">, "style" | "className"> {
  children: ReactElement | ReactElement[];
}

export type PropsTab = {
  children: ReactText;
  id: string;
  ariaControls: string;
  selected?: boolean;
  onClick: () => void;
};

export type StaticComponents = {
  Container: FunctionComponent<PropsTabsContainer>;
  PanelContainer: FunctionComponent<PropsTabsPanelContainer>;
  Panel: FunctionComponent<PropsTabsPanel>;
  List: FunctionComponent<PropsTabsList>;
  Tab: FunctionComponent<PropsTab>;
};
type TabListRef = HTMLDivElement | null;

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
const Tabs: FunctionComponent<Props> & StaticComponents = ({
  children,
  id,
  selectedId,
  ariaLabel,
  onTabChange,
}) => {
  const defaultSelectedTabId = selectedId || children[0].props.id;
  const [selectedTabId, setSelectedTabId] = useState(defaultSelectedTabId);

  const tabListRef = useRef<TabListRef>(null);

  const handleTabListKeyUp = (event: React.KeyboardEvent) => {
    if (!tabListRef.current) return;
    const tabs =
      tabListRef.current.querySelectorAll<HTMLButtonElement>("button");
    const tabsArr = Array.prototype.slice.call(tabs);
    const focusableElLast = tabs[tabs.length - 1];
    const focusableIndexActive = tabsArr.indexOf(document.activeElement);
    const isFirstFocused = focusableIndexActive === 0;
    const isLastFocused =
      focusableIndexActive === tabsArr.indexOf(focusableElLast);
    const focusFirst = () => tabs[0].focus();
    const focusLast = () => focusableElLast.focus();

    if (event.key === "ArrowLeft") {
      if (!isFirstFocused) tabs[focusableIndexActive - 1].focus();
      else if (isFirstFocused) focusLast();
    } else if (event.key === "ArrowRight") {
      if (!isLastFocused) tabs[focusableIndexActive + 1].focus();
      else if (isLastFocused) focusFirst();
    } else if (event.key === "Home") {
      focusFirst();
    } else if (event.key === "End") {
      focusLast();
    }
  };

  const handleTabChange = (newSelectedId: string) => {
    setSelectedTabId(newSelectedId);

    if (onTabChange) {
      onTabChange(newSelectedId);
    }
  };

  const oid = useOid(id);

  return (
    <Tabs.Container id={oid} ariaLabel={ariaLabel}>
      <Tabs.List ref={tabListRef} onKeyUp={handleTabListKeyUp}>
        {children.map(({ props: { label, id } }) => (
          <Tabs.Tab
            id={id + "-tab"}
            key={id + "-tab"}
            ariaControls={id}
            selected={id === selectedTabId}
            onClick={() => handleTabChange(id)}
          >
            {label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.PanelContainer>
        {children.map(
          ({ props: { label, id, children: tabLabelChildren } }) => (
            <Tabs.Panel
              label={label}
              id={id}
              key={id}
              selected={id === selectedTabId}
            >
              {tabLabelChildren}
            </Tabs.Panel>
          )
        )}
      </Tabs.PanelContainer>
    </Tabs.Container>
  );
};

Tabs.Container = ({ children, id, ariaLabel }) => (
  <div id={id} aria-label={ariaLabel} data-testid="ods-tabs">
    {children}
  </div>
);

Tabs.List = forwardRef<HTMLDivElement, PropsTabsList>(
  ({ children, onKeyUp }, ref) => (
    <div
      tabIndex={-1}
      role="tablist"
      aria-label="label"
      className={styles.tablist}
      onKeyUp={onKeyUp}
      ref={ref}
    >
      {children}
    </div>
  )
);

Tabs.Tab = function TabsTab({ children, id, ariaControls, selected, onClick }) {
  const componentClass = useCx(styles.tab, {
    [styles.selectedState]: selected,
  });

  return (
    <button
      id={id}
      role="tab"
      tabIndex={selected ? 0 : -1}
      aria-controls={ariaControls}
      aria-selected={selected}
      className={componentClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Tabs.PanelContainer = ({ children }) => (
  <div className="ods-tabs--tabpanel">{children}</div>
);

Tabs.Panel = ({ children, id, selected }) => (
  <div
    id={id}
    role="tabpanel"
    className={styles.tabpanel}
    aria-labelledby={id + "-tab"}
    tabIndex={selected ? 0 : -1}
    hidden={!selected}
  >
    {children}
  </div>
);

export default Tabs;
