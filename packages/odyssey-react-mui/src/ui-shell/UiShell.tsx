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

import {
  memo,
  useEffect,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import { ErrorBoundary } from "react-error-boundary";

import { SideNav, type SideNavProps } from "../labs/SideNav";
import { TopNav, type TopNavProps } from "../labs/TopNav";
import { OdysseyProvider } from "../OdysseyProvider";
import { ShadowDomElements } from "../web-component/shadow-dom";

const containerStyles = {
  display: "flex",
};

export type UiShellComponentProps = {
  sideNavProps: Omit<SideNavProps, "logo" | "footerComponent">;
  topNavProps: Omit<
    TopNavProps,
    "AdditionalNavItemComponent" | "SearchFieldComponent"
  >;
};

export const defaultComponentProps: UiShellComponentProps = {
  sideNavProps: {
    navHeaderText: "",
    sideNavItems: [],
  },
  topNavProps: {
    topNavLinkItems: [],
  },
};

export type UiShellProps = {
  appComponent: ReactNode;
  onError?: () => void;
  onSubscriptionCreated: () => void;
  optionalComponents?: {
    additionalTopNavItems?: TopNavProps["AdditionalNavItemComponent"];
    footer?: SideNavProps["footerComponent"];
    logo?: SideNavProps["logo"];
    searchField?: TopNavProps["SearchFieldComponent"];
  };
  subscribeToPropChanges: (
    subscription: (
      componentProps: SetStateAction<UiShellComponentProps>,
    ) => void,
  ) => () => void;
} & ShadowDomElements;

const UiShell = ({
  appComponent,
  appRootElement,
  emotionRootElement,
  onError = console.error,
  onSubscriptionCreated,
  optionalComponents,
  subscribeToPropChanges,
}: UiShellProps) => {
  const [componentProps, setComponentProps] = useState(defaultComponentProps);

  useEffect(() => {
    const unsubscribe = subscribeToPropChanges((componentProps) => {
      // If for some reason nothing is passed as `componentProps`, we fallback on `defaultComponentProps` as a safety mechanism to ensure nothing breaks.
      setComponentProps(componentProps || defaultComponentProps);
    });

    onSubscriptionCreated();

    return () => {
      unsubscribe();
    };
  }, [onSubscriptionCreated, subscribeToPropChanges]);

  return (
    <ErrorBoundary fallback={appComponent} onError={onError}>
      <OdysseyProvider
        emotionRootElement={emotionRootElement}
        shadowRootElement={appRootElement}
      >
        <div style={containerStyles}>
          <ErrorBoundary fallback={null} onError={onError}>
            <SideNav
              {...("footerItems" in componentProps.sideNavProps
                ? componentProps.sideNavProps
                : {
                    ...componentProps.sideNavProps,
                    footerComponent: optionalComponents?.footer,
                    footerItems: undefined,
                  })}
              logo={optionalComponents?.logo}
            />
          </ErrorBoundary>

          <div>
            <ErrorBoundary fallback={null} onError={onError}>
              <TopNav
                {...componentProps.topNavProps}
                AdditionalNavItemComponent={
                  optionalComponents?.additionalTopNavItems
                }
                SearchFieldComponent={optionalComponents?.searchField}
              />
            </ErrorBoundary>

            {appComponent}
          </div>
        </div>
      </OdysseyProvider>
    </ErrorBoundary>
  );
};

const MemoizedUiShell = memo(UiShell);
MemoizedUiShell.displayName = "UiShell";

export { MemoizedUiShell as UiShell };
