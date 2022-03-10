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

import React, { useState } from "react";
import {
  Heading,
  Banner,
  Link,
  Infobox,
  List,
  Toast,
  Select,
  Box,
  Button,
  Checkbox,
  CircularLoadIndicator,
  Field,
  ScreenReaderText,
  FieldGroup,
  TextInput,
  Text,
  Form,
  AlertTriangleFilledIcon,
  Status,
  Modal,
  Radio,
  Tabs,
  Table,
  TagList,
  TextArea,
  Tooltip,
} from "@okta/odyssey-react";
import { ErrorBoundary } from "./ErrorBoundary";
import "./App.scss";

export default function App(): JSX.Element {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <main className="app">
      <Heading visualLevel="1">IE Test Sandbox</Heading>

      <Status
        descriptor="Banner"
        label="Status Label"
        labelHidden
        variant="danger"
      />
      <ErrorBoundary>
        <Banner
          content="Additional string related to the heading."
          heading="Banner heading"
          open
        >
          <Link href="https://www.okta.com" variant="secondary">
            Action Link
          </Link>
        </Banner>
      </ErrorBoundary>

      <Status
        descriptor="Box"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Box
          borderColor="display"
          hoverBorderColor="ui"
          borderRadius="base"
          boxShadow="default"
          hoverBoxShadow="default"
          padding="m"
          focusRing="primary"
          focusBorderColor="primary"
        >
          Box
        </Box>
      </ErrorBoundary>

      <Status
        descriptor="Button"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Button variant="primary">Button label</Button>
      </ErrorBoundary>

      <Status
        descriptor="Checkbox"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Checkbox label="Checkbox" />
      </ErrorBoundary>

      <Status
        descriptor="CircularLoadIndicator"
        label="Status Label"
        labelHidden
        variant="caution"
      />
      <ErrorBoundary>
        <CircularLoadIndicator
          aria-label="Loader"
          aria-valuetext="Loading..."
        />
      </ErrorBoundary>

      <Status
        descriptor="Field"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Field
          as="div"
          label="Destination"
          optionalLabel="Optional"
          hint="Your planetary destination."
          required={false}
          inputId="my-field"
          error={
            <>
              <ScreenReaderText>Error:</ScreenReaderText> This field may not be
              left blank.
            </>
          }
        >
          <></>
        </Field>
      </ErrorBoundary>

      <Status
        descriptor="FieldGroup"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <FieldGroup>
          <FieldGroup.Error>
            <Infobox
              heading="Route impossible"
              variant="danger"
              content="this is an error"
            />
          </FieldGroup.Error>
          <TextInput label="Flight identifier" type="search" />
        </FieldGroup>
      </ErrorBoundary>

      <Status
        descriptor="Form"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Form
          heading={"Interplanetary flight registration"}
          desc={
            "Complete this form in order to register for your interplanetary transfer."
          }
        >
          <Form.Error>
            <Infobox
              heading="Signal interrupted"
              variant="danger"
              content="This is an error."
            />
          </Form.Error>
          <Form.Main>
            <FieldGroup
              legend="Origination logistics"
              desc="This information is required for your craft to leave the starport."
            >
              <TextInput label="Name" />
            </FieldGroup>
          </Form.Main>
          <Form.Actions>
            <Button>Register</Button>
          </Form.Actions>
        </Form>
      </ErrorBoundary>

      <Status
        descriptor="Heading"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Heading>Heading</Heading>
      </ErrorBoundary>

      <Status
        descriptor="Icon"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <AlertTriangleFilledIcon fr="" />
      </ErrorBoundary>

      <Status
        descriptor="Infobox"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <Infobox
        actions={
          <Link href="https://ww.okta.com" variant="secondary">
            Link to associated action
          </Link>
        }
        content="An infobox is a type of alert that provides feedback in response to a user action or system activity."
        heading="Infobox heading"
        variant="info"
      />

      <Status
        descriptor="Link"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Link href="#">Link</Link>
      </ErrorBoundary>

      <Status
        descriptor="List"
        label="Status Label"
        labelHidden
        variant="danger"
      />
      <ErrorBoundary>
        <List listType="unordered">
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
        </List>
        <List listType="description">
          <List.Term>Term 1</List.Term>
          <List.Details>Detail 1.1</List.Details>
          <List.Details>Detail 1.2</List.Details>
          <List.Term>Term 2</List.Term>
          <List.Details>Detail 2.1</List.Details>
        </List>
      </ErrorBoundary>

      <Status
        descriptor="Modal"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Button
          onClick={() => {
            setModalIsOpen(true);
          }}
        >
          Open modal
        </Button>
        <Modal
          open={modalIsOpen}
          onClose={() => {
            setModalIsOpen(false);
          }}
          closeMessage="close"
        >
          <Modal.Header>Modal Title</Modal.Header>
          <Modal.Body>
            <Text as="p">
              This is the modal content area. It's width is determined based on
              the amount of content within it.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Button variant="clear">Cancel</Modal.Button>
            <Modal.Button close>Continue</Modal.Button>
          </Modal.Footer>
        </Modal>
      </ErrorBoundary>

      <Status
        descriptor="Radio"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Radio.Group
          required={false}
          hint="Select the speed at which you expect to travel."
          label="Speed"
          name="speed"
        >
          <Radio.Button label="Lightspeed" value="light" />
          <Radio.Button label="Warp speed" value="warp" />
          <Radio.Button label="Ludicrous speed" value="ludicrous" />
        </Radio.Group>
      </ErrorBoundary>

      <Status
        descriptor="ScreenReaderText"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <ScreenReaderText>ScreenReaderText</ScreenReaderText>
      </ErrorBoundary>

      <Status
        descriptor="Select"
        label="Status Label"
        labelHidden
        variant="danger"
      />
      <ErrorBoundary>
        <Select label="Destination Star" name="star">
          <Select.Option value="Proxima Centauri">
            Proxima Centauri
          </Select.Option>
          <Select.Option value="Barnard's Star">Barnard's Star</Select.Option>
          <Select.Option value="WISE 1049-5319">WISE 1049-5319</Select.Option>
          <Select.Option value="Wolf 359">Wolf 359</Select.Option>
          <Select.Option value="Lalande21185LagrangeAlpha1978Lalande21185LagrangeAlpha1978">
            Lalande21185LagrangeAlpha1978Lalande21185LagrangeAlpha1978
          </Select.Option>
          <Select.Option value="Sirius A">Sirius A</Select.Option>
          <Select.Option value="Sirius B">Sirius B</Select.Option>
        </Select>
      </ErrorBoundary>

      <Status
        descriptor="Status"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Status
          descriptor="Neutral Descriptor"
          label="Status Label"
          variant="neutral"
        />
      </ErrorBoundary>

      <Status
        descriptor="Tabs"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Tabs
          ariaLabel="Describes the purpose of this set of tabs."
          id="sb-tabs-example"
        >
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
      </ErrorBoundary>

      <Status
        descriptor="Table"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Table
          caption="Big and small planets"
          screenReaderCaption="Information about the largest and smallest planets."
          withContainer
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell scope="col">
                <Table.SortButton
                  direction="asc"
                  unsortedIconTitle="Unsorted"
                  ascendingIconTitle="Ascending"
                  descendingIconTitle="Descending"
                  screenReaderCallToAction="click to sort"
                >
                  Planet
                </Table.SortButton>
              </Table.HeaderCell>
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
              <Table.DataCell>Earth</Table.DataCell>
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
      </ErrorBoundary>

      <Status
        descriptor="Tag List"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <TagList tags={["Item one", "Item two", "Item three"]} />
      </ErrorBoundary>

      <Status
        descriptor="Text"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Text>Text</Text>
      </ErrorBoundary>

      <Status
        descriptor="TextArea"
        label="Status Label"
        labelHidden
        variant="caution"
      />
      <ErrorBoundary>
        <TextArea hint="Descriptive field hint" label="TextArea" />
      </ErrorBoundary>

      <Status
        descriptor="TextInput"
        label="Status Label"
        labelHidden
        variant="caution"
      />
      <ErrorBoundary>
        <TextInput label="TextInput" />
      </ErrorBoundary>

      <Status
        descriptor="Toast"
        label="Status Label"
        labelHidden
        variant="success"
      />
      <ErrorBoundary>
        <Toast
          heading="Info Toast"
          body="Toast text"
          dismissButtonLabel="Close"
        />
      </ErrorBoundary>

      <Status
        descriptor="Tooltip"
        label="Status Label"
        labelHidden
        variant="neutral"
      />
      <ErrorBoundary>
        <Tooltip label="Top tooltip label" position="top">
          <Button>Top</Button>
        </Tooltip>
      </ErrorBoundary>
    </main>
  );
}
