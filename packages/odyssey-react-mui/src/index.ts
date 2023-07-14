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

export { deepmerge, visuallyHidden } from "@mui/utils";

export type { MRT_ColumnDef as TableColumn } from "material-react-table";

export {
  createTheme,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  Box,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  CssBaseline,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  DialogContentText,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  Divider,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  InputAdornment,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  InputBase,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  ListItemIcon,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  ListItemText,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  ListSubheader,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  MenuList,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  Paper,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  ScopedCssBaseline,
  ThemeProvider,
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
  Typography,
} from "@mui/material";

export type {
  BoxProps,
  CssBaselineProps,
  DialogContentTextProps,
  DividerProps,
  InputAdornmentProps,
  InputBaseProps,
  ListItemIconProps,
  ListItemTextProps,
  ListSubheaderProps,
  MenuListProps,
  PaperProps,
  ScopedCssBaselineProps,
  ThemeOptions,
  TypographyProps,
} from "@mui/material";

export * from "./Autocomplete";
export * from "./Banner";
export * from "./Button";
export * from "./Checkbox";
export * from "./CheckboxGroup";
export * from "./CircularProgress";
export * from "./createUniqueId";
export * from "./Dialog";
export * from "./Fieldset";
export * from "./Form";
export * from "./Icon";
export * from "./iconDictionary";
export * from "./Infobox";
export * from "./Link";
export * from "./materialReactTableTypes";
export * from "./MenuButton";
export * from "./MenuItem";
export * from "./NativeSelect";
export * from "./NullElement";
export * from "./OdysseyCacheProvider";
export * from "./OdysseyProvider";
export * from "./OdysseyThemeProvider";
export * from "./OdysseyTranslationProvider";
export * from "./PaginatedTable";
export * from "./PasswordField";
export * from "./Radio";
export * from "./RadioGroup";
export * from "./ScreenReaderText";
export * from "./SearchField";
export * from "./Select";
export * from "./StaticTable";
export * from "./Status";
export * from "./Tabs";
export * from "./Tag";
export * from "./TagList";
export * from "./TextField";
export * from "./theme";
export * from "./Toast";
export * from "./ToastStack";
export * from "./Tooltip";
export * from "./useUniqueId";
