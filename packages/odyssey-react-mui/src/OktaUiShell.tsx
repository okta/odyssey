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

import { memo, useEffect, useState } from "react";

import { SideNav, type SideNavProps } from "./labs/SideNav";
import { TopNav, type TopNavProps } from "./labs/TopNav";
import { OdysseyProvider } from "./OdysseyProvider";
import { ShadowDomElements } from "./shadow-dom";

const containerStyles = {
  display: "flex",
};

export type OktaUiShellComponentProps = {
  sideNavProps: SideNavProps;
  topNavProps: TopNavProps;
};

export type OktaUiShellProps = {
  changeComponentProps: (
    setComponentProps: (componentProps: OktaUiShellComponentProps) => void,
  ) => void;
} & ShadowDomElements;

const OktaUiShell = ({
  appRootElement,
  changeComponentProps,
  emotionRootElement,
}: OktaUiShellProps) => {
  const [componentProps, setComponentProps] =
    useState<OktaUiShellComponentProps>(() => ({
      sideNavProps: {
        navHeaderText: "",
        sideNavItems: [],
      },
      topNavProps: {
        topNavLinkItems: [],
      },
    }));

  useEffect(() => {
    changeComponentProps((componentProps) => {
      setComponentProps(componentProps);
    });
  }, [changeComponentProps]);

  return (
    <OdysseyProvider
      emotionRootElement={emotionRootElement}
      shadowRootElement={appRootElement}
    >
      <div style={containerStyles}>
        <SideNav {...componentProps.sideNavProps} />

        <div>
          <TopNav {...componentProps.topNavProps} />

          <slot />
        </div>
      </div>
    </OdysseyProvider>
  );
};

const MemoizedOktaUiShell = memo(OktaUiShell);
MemoizedOktaUiShell.displayName = "OktaUiShell";

export { MemoizedOktaUiShell as OktaUiShell };
