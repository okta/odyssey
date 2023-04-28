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

import * as React from "react";
import { Meta, Story } from "@storybook/react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  visuallyHidden,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import SelectMdx from "./Select.mdx";

const storybookMeta: Meta = {
  title: `MUI Components/Forms/Select`,
  component: Select,
  parameters: {
    docs: {
      page: SelectMdx,
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    error: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue: "Select your destination in the Sol system.",
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Destination",
    },
    multiple: {
      control: "boolean",
      defaultValue: false,
    },
    native: {
      control: "boolean",
      defaultValue: false,
    },
  },
  decorators: [MuiThemeDecorator],
};

export default storybookMeta;

const destinations = [
  "Earth",
  "Mars",
  "Ceres",
  "Eros",
  "Tycho Station",
  "Phoebe",
  "Ganymede",
];

const exodestinations = [
  "Auberon",
  "Al-Halub",
  "Freehold",
  "Laconia",
  "New Terra",
];

const Template: Story = (args) => {
  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <InputLabel id="demo-simple-select-label">{args.label}</InputLabel>
      {args.hint && (
        <FormHelperText id="select-hint">{args.hint}</FormHelperText>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={args.label}
        native={args.native}
        aria-describedby="select-hint select-error"
      >
        {destinations.map((destination) => (
          <MenuItem key={destination} value={destination}>
            {destination}
          </MenuItem>
        ))}
      </Select>
      {args.error && (
        <FormHelperText id="select-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const GroupedTemplate: Story = (args) => {
  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <InputLabel id="demo-simple-select-label">{args.label}</InputLabel>
      {args.hint && (
        <FormHelperText id="select-hint">{args.hint}</FormHelperText>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={args.label}
        native={args.native}
        aria-describedby="select-hint select-error"
      >
        <ListSubheader>Sol System</ListSubheader>
        {destinations.map((destination) => (
          <MenuItem key={destination} value={destination}>
            {destination}
          </MenuItem>
        ))}
        <ListSubheader>Extrasolar</ListSubheader>
        {exodestinations.map((destination) => (
          <MenuItem key={destination} value={destination}>
            {destination}
          </MenuItem>
        ))}
      </Select>
      {args.error && (
        <FormHelperText id="select-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const MultiTemplate: Story = (args) => {
  const [destinationName, setDestinationName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof destinationName>) => {
    const {
      target: { value },
    } = event;
    setDestinationName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <InputLabel id="demo-simple-select-label">{args.label}</InputLabel>
      {args.hint && (
        <FormHelperText id="select-hint">{args.hint}</FormHelperText>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={args.label}
        native={args.native}
        onChange={handleChange}
        multiple={args.multiple}
        aria-describedby="select-hint select-error"
        renderValue={(selected) => (
          <Box>
            {selected.map((destination) => (
              <Chip key={destination} label={destination} />
            ))}
          </Box>
        )}
        value={destinationName}
      >
        {destinations.map((destination) => (
          <MenuItem key={destination} value={destination}>
            <Checkbox isChecked={destinationName.indexOf(destination) > -1} />
            <ListItemText primary={destination} />
          </MenuItem>
        ))}
      </Select>
      {args.error && (
        <FormHelperText id="select-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

const NativeTemplate: Story = (args) => {
  return (
    <FormControl disabled={args.disabled} error={args.invalid}>
      <InputLabel id="demo-simple-select-label">{args.label}</InputLabel>
      {args.hint && (
        <FormHelperText id="select-hint">{args.hint}</FormHelperText>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={args.label}
        native={args.native}
        aria-describedby="select-hint select-error"
      >
        <option value="earth">Earth</option>
        <option value="mars">Mars</option>
        <option value="ceres">Ceres</option>
        <option value="eros">Eros</option>
        <option value="tycho">Tycho Station</option>
        <option value="phoebe">Phoebe</option>
        <option value="ganymede">Ganymede</option>
      </Select>
      {args.error && (
        <FormHelperText id="select-error" error>
          <span style={visuallyHidden}>Error:</span> {args.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const DefaultDisabled = Template.bind({});
DefaultDisabled.args = {
  disabled: true,
};

export const DefaultInvalid = Template.bind({});
DefaultInvalid.args = {
  invalid: true,
  error: "Select your destination.",
};

export const Grouped = GroupedTemplate.bind({});
Grouped.args = {};

export const Multi = MultiTemplate.bind({});
Multi.args = {
  multiple: true,
};

export const NativeDefault = NativeTemplate.bind({});
NativeDefault.args = {
  native: true,
};
