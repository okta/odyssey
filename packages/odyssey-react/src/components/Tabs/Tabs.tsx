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
import type { ReactElement, ReactText, ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { forwardRefWithStatics, useCx, useOid } from "../../utils";
import { Box } from "../Box";
import styles from "./Tabs.module.scss";

export type TabsProps = {
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
   * Specifies which Tabs.Panel should be selected on mount
   */
  selectedId?: string;

  /**
   * Callback when the selected tab is changed.
   */
  onTabChange?: (newId: string) => void;
};

type PropsTabsContainer = {
  children: ReactElement | ReactElement[];
  id: string;
  ariaLabel: string;
};

type PropsTabsPanelContainer = {
  children: ReactElement | ReactElement[];
};

type PropsTabsPanel = {
  children: ReactText | ReactElement | ReactElement[];
  label: string;
  id?: string;
  selected?: boolean;
};

interface PropsTabsList
  // eslint-disable-next-line @typescript-eslint/ban-types
  extends Omit<ComponentPropsWithRef<"div">, "style" | "className"> {
  children: ReactElement | ReactElement[];
}

type PropsTab = {
  children: ReactText;
  id: string;
  ariaControls: string;
  selected?: boolean;
  onClick: () => void;
};

/**
 * Navigation component used to organize content by grouping similar information on the
 * same page. They allow content to be viewed without having to navigate away from that page
 * or route.
 */
export const Tabs = withTheme(
  () => ({}),
  styles
)(
  forwardRefWithStatics<HTMLDivElement, TabsProps, Statics>((props, ref) => {
    const { children, id, selectedId, ariaLabel, onTabChange } = props;
    const defaultSelectedTabId = selectedId || children[0].props.id;
    const [selectedTabId, setSelectedTabId] = useState(defaultSelectedTabId);

    const tabListRef = useRef<HTMLDivElement>(null);

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
      <Tabs.Container id={oid} ariaLabel={ariaLabel} ref={ref}>
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
  })
);

const Container = forwardRef<HTMLDivElement, PropsTabsContainer>(
  ({ children, id, ariaLabel }, ref) => (
    <Box id={id} aria-label={ariaLabel} ref={ref}>
      {children}
    </Box>
  )
);

const List = forwardRef<HTMLDivElement, PropsTabsList>(
  ({ children, onKeyUp }, ref) => (
    <Box
      tabIndex={-1}
      role="tablist"
      aria-label="label"
      className={styles.tablist}
      onKeyUp={onKeyUp}
      ref={ref}
    >
      {children}
    </Box>
  )
);

const Tab = function TabsTab({
  children,
  id,
  ariaControls,
  selected,
  onClick,
}: PropsTab) {
  const componentClass = useCx(styles.tab, {
    [styles.selectedState]: selected,
  });

  return (
    <Box
      as="button"
      id={id}
      role="tab"
      tabIndex={selected ? 0 : -1}
      aria-controls={ariaControls}
      aria-selected={selected}
      className={componentClass}
      onClick={onClick}
      color={false}
      fontSize={false}
      fontWeight={false}
    >
      {children}
    </Box>
  );
};

const PanelContainer = ({ children }: PropsTabsPanelContainer) => (
  <Box className="ods-tabs--tabpanel">{children}</Box>
);

const Panel = ({ children, id, selected }: PropsTabsPanel) => (
  <Box
    id={id}
    role="tabpanel"
    className={styles.tabpanel}
    aria-labelledby={id + "-tab"}
    tabIndex={selected ? 0 : -1}
    hidden={!selected}
  >
    {children}
  </Box>
);

type Statics = {
  Container: typeof Container;
  PanelContainer: typeof PanelContainer;
  Panel: typeof Panel;
  List: typeof List;
  Tab: typeof Tab;
};

Object.assign(Tabs, { Container, PanelContainer, Panel, List, Tab });

Tabs.displayName = "Tabs";
Container.displayName = "TabsContainer";
PanelContainer.displayName = "TabsPanelContainer";
Panel.displayName = "TabsPanel";
List.displayName = "TabsList";
Tab.displayName = "TabsTab";
