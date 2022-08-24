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
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  InputLabel,
  OutlinedInput,
  RadioGroup,
  Radio,
  Select,
  Typography,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { MuiThemeDecorator } from "../../../../.storybook/components";

import FormMdx from "./Form.mdx";

export default {
  title: `MUI Components/Forms/Form`,
  component: OutlinedInput,
  parameters: {
    docs: {
      page: FormMdx,
    },
  },
  argTypes: {
    autoComplete: {
      control: "text",
      defaultValue: "name",
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    endAdornment: {
      control: "text",
      defaultValue: null,
    },
    error: {
      control: "text",
      defaultValue: null,
    },
    hint: {
      control: "text",
      defaultValue: null,
    },
    invalid: {
      control: "boolean",
      defaultValue: false,
    },
    label: {
      control: "text",
      defaultValue: "Destination",
    },
    multiline: {
      control: "boolean",
      defaultValue: false,
    },
    readOnly: {
      control: "boolean",
      defaultValue: false,
    },
    startAdornment: {
      control: "text",
      defaultValue: null,
    },
    type: {
      control: "select",
      options: ["text", "email", "search", "tel", "password"],
      defaultValue: "text",
    },
    value: {
      control: "text",
      defaultValue: null,
    },
    formAlert: {
      control: "boolean",
      defaultValue: null,
    },
    formTitle: {
      control: "text",
      defaultValue: null,
    },
    formTitleSize: {
      control: "select",
      options: ["h1", "h2", "h3", "h4"],
      defaultValue: "h4",
    },
    formHint: {
      control: "text",
      defaultValue: null,
    },
    fieldsetAlert: {
      control: "boolean",
      defaultValue: false,
    },
    fieldsetOne: {
      control: "boolean",
      defaultValue: false,
    },
    fieldsetOneTitle: {
      control: "text",
      defaultValue: false,
    },
    fieldsetOneHint: {
      control: "text",
      defaultValue: false,
    },
    fieldsetTwo: {
      control: "boolean",
      defaultValue: false,
    },
    fieldsetTwoTitle: {
      control: "text",
      defaultValue: false,
    },
    fieldsetTwoHint: {
      control: "text",
      defaultValue: false,
    },
  },
  decorators: [MuiThemeDecorator],
};

const Template: Story = (args) => {
  const {} = args;
  return (
    // <Form>
    <Box
      component="form"
      sx={(theme) => ({
        maxWidth: theme.mixins.maxWidth,
      })}
    >
      {/* <FormHeader> */}
      {args.formTitle && (
        <Box
          component="div"
          sx={(theme) => ({
            marginBottom: theme.spacing(6),
          })}
        >
          <Typography variant={args.formTitleSize} component="h1">
            {args.formTitle}
          </Typography>
          {args.formHint && <Typography paragraph>{args.formHint}</Typography>}
          {args.formAlert && (
            <Alert severity="error" role="alert" variant="infobox">
              <AlertTitle>Something's wrong</AlertTitle>
              Something has gone horribly awry.
            </Alert>
          )}
        </Box>
      )}
      {/* <Fieldset> One */}
      {args.fieldsetOne && (
        <Box
          component="fieldset"
          sx={(theme) => ({
            border: 0,
            padding: 0,
            margin: 0,
            marginBottom: theme.spacing(7),
          })}
        >
          {args.fieldsetOneTitle && (
            <Typography variant="legend">{args.fieldsetOneTitle}</Typography>
          )}
          {args.fieldsetOneTitle && (
            <Typography paragraph>{args.fieldsetOneHint}</Typography>
          )}
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Docking license
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Docking license"
              native
              aria-describedby="select-hint select-error"
            >
              <option value="governmental">Governmental</option>
              <option value="corporate">Corporate</option>
              <option value="business">Private (Business)</option>
              <option value="personal">Private (Personal)</option>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-text-field-label">Nature of visit</InputLabel>
            <OutlinedInput
              aria-describedby="Form-hint Form-error"
              id="demo-text-field"
              label="Nature of visit"
              multiline={true}
              type="text"
            />
          </FormControl>
        </Box>
      )}
      {/* <Fieldset> Two */}
      {args.fieldsetTwo && (
        <Box
          component="fieldset"
          sx={(theme) => ({
            border: 0,
            padding: 0,
            margin: 0,
            marginBottom: theme.spacing(7),
          })}
        >
          <Typography variant="legend">Ship registration</Typography>
          <Typography paragraph>
            Here are some more fields in a separate fieldset.
          </Typography>
          {args.fieldsetAlert && (
            <Alert severity="error" role="alert" variant="infobox">
              <AlertTitle>Something else is wrong</AlertTitle>
              Something else has gone horribly awry!
            </Alert>
          )}
          <FormControl>
            <InputLabel id="demo-text-field-label">Destination</InputLabel>
            <OutlinedInput
              aria-describedby="Form-hint Form-error"
              id="demo-text-field"
              label="Destination"
            />
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Systems check</FormLabel>
            <FormGroup aria-describedby="checkbox-hint checkbox-error">
              <FormControlLabel
                control={<Checkbox name="life-support" />}
                label="Life support"
              />
              <FormControlLabel
                control={<Checkbox name="warp-core" />}
                label="Warp core containment"
              />
              <FormControlLabel
                control={<Checkbox name="cetacean-ops" />}
                label="Cetacean ops"
              />
            </FormGroup>
          </FormControl>
          <FormControl
            component="fieldset"
            disabled={args.disabled}
            error={args.invalid}
          >
            <FormLabel component="legend">Destination</FormLabel>
            <RadioGroup
              defaultValue="Lightspeed"
              name="radio-buttons-group"
              aria-describedby="radio-hint radio-error"
            >
              <FormControlLabel
                value="Lightspeed"
                control={<Radio />}
                label="Lightspeed"
              />
              <FormControlLabel
                value="Warp speed"
                control={<Radio />}
                label="Warp speed"
              />
              <FormControlLabel
                value="Ludicrous speed"
                control={<Radio />}
                label="Ludicrous speed"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Destination</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Destination"
              native
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
          </FormControl>
        </Box>
      )}
      {/* <FormActions> ? <ButtonGroup> (new variant needed) ? */}
      <Box>
        <Button variant="primary">Submit</Button>
        <Button variant="floating">Cancel</Button>
      </Box>
    </Box>
  );
};

// States

export const Simple = Template.bind({});
Simple.args = {
  fieldsetOne: true,
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  formTitle: "Docking registration",
  formHint:
    "Before docking with the station, please register your ship and crew.",
  fieldsetOne: true,
};

export const WithLegend = Template.bind({});
WithLegend.args = {
  fieldsetOne: true,
  fieldsetOneTitle: "Reason for visit",
  fieldsetOneHint: "This helps us understand why you are visiting our station.",
  fieldsetTwo: true,
};

export const WithFormError = Template.bind({});
WithFormError.args = {
  formAlert: true,
  formTitle: "Docking registration",
  formHint:
    "Before docking with the station, please register your ship and crew.",
  fieldsetOne: true,
};

export const WithFieldsetError = Template.bind({});
WithFieldsetError.args = {
  fieldsetAlert: true,
  fieldsetOne: true,
  fieldsetOneTitle: "Reason for visit",
  fieldsetOneHint: "This helps us understand why you are visiting our station.",
  fieldsetTwo: true,
};

export const KitchenSink = Template.bind({});
KitchenSink.args = {
  formAlert: true,
  formTitle: "Docking registration",
  formHint:
    "Before docking with the station, please register your ship and crew.",
  fieldsetAlert: true,
  fieldsetOne: true,
  fieldsetOneTitle: "Reason for visit",
  fieldsetOneHint: "This helps us understand why you are visiting our station.",
  fieldsetTwo: true,
};
