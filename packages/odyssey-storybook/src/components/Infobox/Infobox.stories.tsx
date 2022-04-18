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

import React from "react";
import { Story } from "@storybook/react";
import {
  Infobox,
  InfoboxProps,
  Button,
  Form,
  Link,
  Table,
  TextInput,
} from "../../../../odyssey-react/src";
import InfoboxMdx from "./Infobox.mdx";

export default {
  title: `Components/Infobox`,
  component: Infobox,
  parameters: {
    docs: {
      page: InfoboxMdx,
    },
  },
  argTypes: {
    children: {
      control: { type: null },
    },
    variant: {
      control: { type: "radio" },
    },
    heading: {
      control: { type: "text" },
    },
    content: {
      control: { type: "text" },
    },
    actions: {
      control: { type: "text" },
    },
  },
};

const Template: Story<InfoboxProps> = ({
  heading,
  variant,
  content,
  actions,
}) => (
  <Infobox
    heading={heading}
    variant={variant}
    content={content}
    actions={actions}
  />
);

const FormTemplate: Story<InfoboxProps> = ({
  heading,
  variant,
  content,
  actions,
}) => (
  <Form heading="Sign in">
    <Infobox
      heading={heading}
      variant={variant}
      content={content}
      actions={actions}
    />
    <TextInput type="text" label="Username" disabled />
    <TextInput type="password" label="Authorization code" disabled />
    <Form.Actions>
      <Button variant="primary" disabled>
        Login
      </Button>
    </Form.Actions>
  </Form>
);

const TableTemplate: Story<InfoboxProps> = ({
  heading,
  variant,
  content,
  actions,
}) => (
  <Table
    screenReaderCaption="Information about the largest and smallest planets."
    caption="Big and small planets"
    withContainer={true}
  >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell scope="col">Planet</Table.HeaderCell>
        <Table.HeaderCell scope="col" format={"num"}>
          Radius (km)
        </Table.HeaderCell>
        <Table.HeaderCell scope="col">Type</Table.HeaderCell>
        <Table.HeaderCell scope="col" format={"date"}>
          Perihelion date
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.DataCell>Jupiter</Table.DataCell>
        <Table.DataCell format={"num"}>69,911</Table.DataCell>
        <Table.DataCell>Gas giant</Table.DataCell>
        <Table.DataCell format={"date"}>January 21, 2023</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>
          Pluto
          <Infobox
            heading={heading}
            variant={variant}
            content={content}
            actions={actions}
          />
        </Table.DataCell>
        <Table.DataCell format={"num"}>6,371</Table.DataCell>
        <Table.DataCell>Terrestrial</Table.DataCell>
        <Table.DataCell format={"date"}>January 2, 2021</Table.DataCell>
      </Table.Row>
      <Table.Row>
        <Table.DataCell>Mercury</Table.DataCell>
        <Table.DataCell format={"num"}>1,737</Table.DataCell>
        <Table.DataCell>Terrestrial</Table.DataCell>
        <Table.DataCell format={"date"}>&ndash;</Table.DataCell>
      </Table.Row>
    </Table.Body>
  </Table>
);

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  heading: "Moonbase Alpha-6",
  content:
    "You are currently logged in from Moonbase Alpha-6, located on Luna.",
};

export const Danger = Template.bind({});
Danger.args = {
  variant: "danger",
  heading: "Safety checks have failed",
  content:
    "An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.",
};

export const Caution = Template.bind({});
Caution.args = {
  variant: "caution",
  heading: "Safety checks incomplete",
  content:
    "Safety checks must be completed before this mission can be approved for launch.",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  heading: "Ready for lift-off",
  content:
    "Safety checks are complete, and this mission has been approved for launch.",
};

export const WithLink = Template.bind({});
WithLink.args = {
  variant: "danger",
  heading: "Safety checks have failed",
  content:
    "An issue has been discovered with your fuel mixture ratios. Please reconfigure your fuel mixture and perform safety checks again.",
  actions: (
    <>
      <Link href="#" variant="monochrome">
        Visit fueling console
      </Link>
    </>
  ),
};

export const WithLinkInline = Template.bind({});
WithLinkInline.args = {
  variant: "danger",
  heading: "Safety checks have failed",
  content: (
    <>
      An issue has been discovered with your fuel mixture ratios. Please{" "}
      <Link href="#" variant="monochrome">
        reconfigure your fuel mixture
      </Link>{" "}
      and perform safety checks again.
    </>
  ),
};

export const FormDo = FormTemplate.bind({});
FormDo.storyName = "Infobox.Form";
FormDo.args = {
  variant: "danger",
  heading: "Espionage detected!",
  content: "Your access has been disabled. Please contact a Site Director.",
};

export const TableDont = TableTemplate.bind({});
TableDont.storyName = "Infobox.Table";
TableDont.args = {
  variant: "danger",
  heading: "Too small!",
  content: "This little guy has been reclassified.",
};
