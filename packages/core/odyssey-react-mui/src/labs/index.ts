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

export { LocalizationProvider } from "@mui/x-date-pickers";
export type { LocalizationProviderProps } from "@mui/x-date-pickers";
export { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/AppSwitcher/AppSwitcher.js";
/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/SideNav/NavAccordion.js";
/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/SideNav/SideNav.js";
/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/SideNav/types.js";
/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/TopNav/TopNav.js";
/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/UiShell.js";
/** @deprecated Will be removed in a future Odyssey version. Use the `/ui-shell` export unless your app is running React v17. */
export * from "../ui-shell/UiShellLogo.js";

// export * from "./AdaptablePicker";
export * from "./AppTile.js";
export * from "./DataFilters.js";
/** @deprecated Will be removed in a future Odyssey version in lieu of the one shipping with DataTable */
export * from "./DataTablePagination.js";
export * from "./DataView/componentTypes.js";
export * from "./DataView/constants.js";
export { type DataCardProps } from "./DataView/DataCard.js";
export * from "./DataView/DataTable.js";
export * from "./DataView/dataTypes.js";
export * from "./DataView/DataView.js";

export * from "./DatePickers/DateTimeField.js";
export * from "./DatePickers/DateTimePicker.js";
export * from "./materialReactTableTypes.js";
export { adornmentSizeValues } from "./OdysseyPickers/ComposablePicker.js";
export * from "./OdysseyPickers/Picker.js";
export * from "./OdysseyPickers/PickerWithOptionAdornment.js";
export * from "./OdysseyPickers/SearchDropdown.js";
export * from "./PageTemplate/Layout.js";
export * from "./PageTemplate/PageTemplate.js";
/** @deprecated Will be removed in a future Odyssey version in lieu of DataTable */
export * from "./PaginatedTable.js";
/** @deprecated Will be removed in a future Odyssey version in lieu of DataTable */
export * from "./StaticTable.js";
export * from "./UserProfile.js";
export * from "./UserProfileMenuButton.js";

export {
  /** @deprecated Will be removed in a future Odyssey version. Use `PickerWithOptionAdornment` */
  GroupPicker,
  type GroupPickerOptionType,
  type GroupPickerProps,
} from "./GroupPicker.js";
