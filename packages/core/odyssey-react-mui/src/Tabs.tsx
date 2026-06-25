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
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Badge, BadgeProps } from "./Badge.js";
import { Box } from "./Box.js";
import { HtmlProps } from "./HtmlProps.js";
import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext.js";

export type TabItemProps = {
  /**
   * Content rendered inside the tab panel when this tab is active.
   */
  children: ReactNode;
  /**
   * If `true`, the tab is disabled and cannot be selected.
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
} & {
  /**
   * The count to display in the notification badge on the tab. Badge is hidden when the
   * value is 0 or undefined.
   */
  notificationCount?: BadgeProps["badgeContent"];
  /**
   * The maximum value to display in the notification badge before truncating with "+".
   */
  notificationCountMax?: BadgeProps["badgeContentMax"];
} & Pick<HtmlProps, "testId" | "translate">;

export type TabsProps = {
  /**
   * @deprecated please use the `value` prop instead
   * When `value` is provided, `initialValue` isn't used.
   */
  initialValue?: string;
  /**
   * Called when the active tab changes. Receives the new tab value.
   */
  onChange?: MuiTabListProps["onChange"];
  /**
   * The TabItems to be included in the Tabs group
   */
  tabs: TabItemProps[];
  /**
   * Identifier for the selected tab.
   */
  value?: string;
};

const TabLabel = ({
  label,
  notificationCount,
  notificationCountMax,
  tabState,
  value,
}: Pick<
  TabItemProps,
  "label" | "notificationCount" | "notificationCountMax" | "value"
> & {
  tabState: string;
}) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  return (
    <>
      {label}
      {notificationCount !== undefined && notificationCount > 0 && (
        <Box
          sx={{
            marginInlineStart: notificationCount
              ? odysseyDesignTokens.Spacing2
              : 0,
          }}
        >
          <Badge
            badgeContent={notificationCount}
            badgeContentMax={notificationCountMax}
            type={value === tabState ? "attention" : "default"}
          />
        </Box>
      )}
    </>
  );
};

/**
 * A tabbed navigation component that renders a list of tabs and their associated content
 * panels. Supports controlled and uncontrolled selection, notification badges, icons,
 * and scrollable overflow.
 */
const Tabs = ({
  ariaLabel,
  initialValue,
  tabs,
  value,
  onChange: onChangeProp,
}: TabsProps & Pick<HtmlProps, "ariaLabel">) => {
  const [tabState, setTabState] = useState(
    initialValue ?? value ?? tabs[0]?.value ?? "0",
  );
  /*
    The scrollButtons prop is initially set to `false`.
    It's then reset to `auto` when the document is visible.
    This prevents a rare bug where scroll buttons appear
    when the component is rendered while hidden and the
    screen is wide enough to not need scroll buttons.
  */
  const [scrollButtons, setScrollButtons] =
    useState<MuiTabListProps["scrollButtons"]>(false);
  const onChange = useCallback<NonNullable<MuiTabListProps["onChange"]>>(
    (event, value: string) => {
      setTabState(value);
      onChangeProp?.(event, value);
    },
    [onChangeProp],
  );

  useEffect(() => {
    if (value !== undefined) {
      setTabState(value);
    }
  }, [value]);

  // listen for visibility change to reset scroll buttons override
  useEffect(() => {
    // keep track of animation frame to cancel when needed
    let animationFrame: number;

    // called when unmounted or scroll buttons is reset
    const cleanup = () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", refreshScrollButtons);
    };

    // Reset the scroll buttons override when the document becomes visible.
    // If called, then the document is hidden because the event listener
    // is only registered if the document is hidden
    function refreshScrollButtons() {
      animationFrame = requestAnimationFrame(() => {
        cleanup();
        setScrollButtons("auto");
      });
    }

    // don't override scroll buttons if it's already set to "auto"
    if (scrollButtons !== "auto") {
      document.addEventListener("visibilitychange", refreshScrollButtons);
    }
    return () => {
      cleanup();
    };
  }, [scrollButtons]);

  const renderTab = useCallback(
    (tab: TabItemProps, index: number) => {
      const {
        testId,
        isDisabled,
        label,
        startIcon,
        value,
        notificationCount,
        notificationCountMax,
      } = tab;

      return (
        <MuiTab
          data-se={testId}
          disabled={isDisabled}
          icon={startIcon}
          key={value ? value : index.toString()}
          label={
            <TabLabel
              label={label}
              notificationCount={notificationCount}
              notificationCountMax={notificationCountMax}
              tabState={tabState}
              value={value}
            />
          }
          tabIndex={0}
          value={value ? value : index.toString()}
        />
      );
    },
    [tabState],
  );

  return (
    <MuiTabContext value={tabState}>
      <MuiTabList
        aria-label={ariaLabel}
        onChange={onChange}
        scrollButtons={scrollButtons}
        variant="scrollable"
      >
        {tabs.map((tab, index) => renderTab(tab, index))}
      </MuiTabList>
      {tabs.map((tab, index) => (
        <MuiTabPanel
          key={tab.value ? tab.value : index.toString()}
          value={tab.value ? tab.value : index.toString()}
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
