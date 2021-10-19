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

import { Story } from "@storybook/react";
import { Tabs } from ".";
import type { TabsProps } from ".";

export default {
  title: `Components/Tabs`,
  component: Tabs,
};

const Template: Story<TabsProps> = ({ ariaLabel, selectedId }) => {
  return (
    <Tabs id="sb-tabs-example" selectedId={selectedId} ariaLabel={ariaLabel}>
      <Tabs.Panel id="sb-tabs-example-1" label="Tab One">
        TabPanel One Content
      </Tabs.Panel>
      <Tabs.Panel id="sb-tabs-example-2" label="Tab Two">
        TabPanel Two Content
      </Tabs.Panel>
      <Tabs.Panel id="sb-tabs-example-3" label="Tab Three">
        TabPanel Three Content
      </Tabs.Panel>
      <Tabs.Panel id="sb-tabs-example-4" label="Tab Four">
        TabPanel Four Content
      </Tabs.Panel>
    </Tabs>
  );
};

export const Default = Template.bind({});
Default.args = {
  ariaLabel: "Describes the purpose of this set of tabs.",
};

export const PreSelected = Template.bind({});
PreSelected.storyName = "with pre-selected tab id";
PreSelected.args = {
  selectedId: "sb-tabs-example-2",
  ariaLabel: "Describes the purpose of this set of tabs.",
};
