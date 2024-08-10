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

export {
  createTheme,
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
} from "@mui/material";

export type {
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
} from "@mui/material";

export { odysseyTranslate } from "./i18n";
export type { FocusHandle } from "./inputUtils";
export { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext";

export * from "./Accordion";
export * from "./Autocomplete";
export { badgeContentMaxValues } from "./Badge";
export * from "./Banner";
export * from "./Box";
export * from "./Breadcrumbs";
export * from "./Button";
export * from "./Card";
export * from "./Callout";
export * from "./Checkbox";
export * from "./CheckboxGroup";
export * from "./CircularProgress";
export * from "./CssBaseline";
export * from "./createShadowRootElement";
export * from "./createUniqueId";
export * from "./DataTable";
export * from "./Dialog";
export * from "./Drawer";
export * from "./EmptyState";
export * from "./Fieldset";
export * from "./FieldComponentProps";
export * from "./FieldHint";
export * from "./FieldLabel";
export * from "./Form";
export * from "./HintLink";
export * from "./IconWithTooltip";
export * from "./Link";
export * from "./MenuButton";
export * from "./MenuItem";
export * from "./NativeSelect";
export * from "./NullElement";
export * from "./OdysseyCacheProvider";
export * from "./OdysseyProvider";
export * from "./OdysseyThemeProvider";
export * from "./OdysseyTranslationProvider";
export * from "./PasswordField";
export * from "./Radio";
export * from "./RadioGroup";
export * from "./ScreenReaderText";
export * from "./SearchField";
export * from "./Select";
export * from "./Status";
export * from "./Surface";
export * from "./Tabs";
export * from "./Tag";
export * from "./TagList";
export * from "./TextField";
export * from "./theme";
export * from "./Toast";
export * from "./ToastStack";
export * from "./labs/Switch";
export * from "./Tooltip";
export * from "./Typography";
export * from "./useUniqueId";
export * from "./Pagination";
