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

import { createRoot, type Root } from "react-dom/client";

import { SideNav, SideNavProps } from "./labs/SideNav";
import { TopNav, TopNavProps } from "./labs/TopNav";
import { OdysseyProvider } from "./OdysseyProvider";
import { createUnattachedShadowDomElements } from "./shadow-dom";

const containerStyles = {
  display: "flex",
};

export const odysseyUiShellId = "odyssey-ui-shell";

export const renderOdysseyUiShell = ({
  contentElementId,
  rootElement,
  sideNavProps,
  topNavProps,
}: {
  contentElementId: string;
  rootElement: HTMLElement;
  sideNavProps: SideNavProps;
  topNavProps: TopNavProps;
}) => {
  class OdysseyUiShell extends HTMLElement {
    shadowDomElements: ReturnType<typeof createUnattachedShadowDomElements>;
    reactRoot: Root;

    constructor() {
      super();

      this.shadowDomElements = createUnattachedShadowDomElements();

      const shadowRoot = this.attachShadow({ mode: "open" });

      shadowRoot.appendChild(this.shadowDomElements.emotionRootElement);
      shadowRoot.appendChild(this.shadowDomElements.appRootElement);
      shadowRoot.appendChild(this.shadowDomElements.slotElement);

      this.reactRoot = createRoot(this.shadowDomElements.appRootElement);
    }

    connectedCallback() {
      this.reactRoot.render(
        <OdysseyProvider
          emotionRootElement={this.shadowDomElements.emotionRootElement}
          shadowRootElement={this.shadowDomElements.appRootElement}
        >
          <div style={containerStyles}>
            <SideNav {...sideNavProps} />

            <div>
              <TopNav {...topNavProps} />

              <slot id={contentElementId} />
            </div>
          </div>
        </OdysseyProvider>,
      );
    }

    disconnectedCallback() {
      this.reactRoot.unmount();
    }
  }

  if (!customElements.get(odysseyUiShellId)) {
    customElements.define(odysseyUiShellId, OdysseyUiShell);
  }

  rootElement.appendChild(new OdysseyUiShell());
};
