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

import type { ThemeOptions } from "@mui/material";

import type { GetComponentsProps } from "./components/types.js";

import { accordionComponents } from "./components/Accordion.js";
import { alertComponents } from "./components/Alert.js";
import { autocompleteComponents } from "./components/Autocomplete.js";
import { backdropComponents } from "./components/Backdrop.js";
import { breadcrumbsComponents } from "./components/Breadcrumbs.js";
import { buttonComponents } from "./components/Button.js";
import { cardComponents } from "./components/Card.js";
import { checkboxComponents } from "./components/Checkbox.js";
import { chipComponents } from "./components/Chip.js";
import { circularProgressComponents } from "./components/CircularProgress.js";
import { cssBaselineComponents } from "./components/CssBaseline.js";
import { dialogComponents } from "./components/Dialog.js";
import { drawerComponents } from "./components/Drawer.js";
import { formComponents } from "./components/Form.js";
import { iconButtonComponents } from "./components/IconButton.js";
import { inputComponents } from "./components/Input.js";
import { linkComponents } from "./components/Link.js";
import { listComponents } from "./components/List.js";
import { menuComponents } from "./components/Menu.js";
import { modalComponents } from "./components/Modal.js";
import { nativeSelectComponents } from "./components/NativeSelect.js";
import { paperComponents } from "./components/Paper.js";
import { popoverComponents } from "./components/Popover.js";
import { popperComponents } from "./components/Popper.js";
import { radioComponents } from "./components/Radio.js";
import { selectComponents } from "./components/Select.js";
import { snackbarComponents } from "./components/Snackbar.js";
import { svgIconComponents } from "./components/SvgIcon.js";
import { tableComponents } from "./components/Table.js";
import { tabsComponents } from "./components/Tabs.js";
import { tooltipComponents } from "./components/Tooltip.js";
import { typographyComponents } from "./components/Typography.js";

export type { GetComponentsProps };

export const getComponents = (
  props: GetComponentsProps,
): ThemeOptions["components"] => ({
  ...accordionComponents(props),
  ...alertComponents(props),
  ...autocompleteComponents(props),
  ...backdropComponents(),
  ...breadcrumbsComponents(props),
  ...buttonComponents(props),
  ...cardComponents(props),
  ...checkboxComponents(props),
  ...chipComponents(props),
  ...circularProgressComponents(props),
  ...cssBaselineComponents(props),
  ...dialogComponents(props),
  ...drawerComponents(props),
  ...formComponents(props),
  ...iconButtonComponents(props),
  ...inputComponents(props),
  ...linkComponents(props),
  ...listComponents(props),
  ...menuComponents(props),
  ...modalComponents(props),
  ...nativeSelectComponents(props),
  ...paperComponents(props),
  ...popoverComponents(props),
  ...popperComponents(props),
  ...radioComponents(props),
  ...selectComponents(props),
  ...snackbarComponents(),
  ...svgIconComponents(props),
  ...tableComponents(props),
  ...tabsComponents(props),
  ...tooltipComponents(props),
  ...typographyComponents(props),
});
