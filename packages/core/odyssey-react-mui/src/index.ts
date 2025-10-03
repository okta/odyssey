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
  /** @deprecated Will be removed in a future Odyssey version in lieu of a wrapped version. */
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
  StackProps,
  ThemeOptions,
} from "@mui/material";

export {
  translate as odysseyTranslate,
  TranslationProvider as OdysseyTranslationProvider,
  type TranslationProviderProps as OdysseyTranslationProviderProps,
  type TranslationOverrides,
} from "./i18n.generated/i18n.js";
export type { FocusHandle } from "./inputUtils.js";
export { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext.js";

export * from "./Accordion.js";
export * from "./Autocomplete.js";
export { badgeContentMaxValues } from "./Badge.js";
export * from "./Banner.js";
export * from "./Box.js";
export * from "./Breadcrumbs.js";
export * from "./Buttons/index.js";
export * from "./Callout.js";
export * from "./Card.js";
export * from "./Checkbox.js";
export * from "./CheckboxGroup.js";
export * from "./CircularProgress.js";
export * from "./createUniqueId.js";
export * from "./CssBaseline.js";
export * from "./DataTable/index.js";
export { DatePicker, type DatePickerProps } from "./DatePickers/index.js";
export * from "./Dialog.js";
export * from "./Drawer.js";
export * from "./EmptyState.js";
export * from "./FieldComponentProps.js";
export * from "./Fieldset.js";
export {
  FileUploader,
  fileUploadTypes,
  fileUploadVariants,
} from "./FileUploader/index.js";
export * from "./Form.js";
export * from "./HintLink.js";
export * from "./IconWithTooltip.js";
export * from "./Link.js";
export * from "./NativeSelect.js";
export * from "./NullElement.js";
export * from "./OdysseyCacheProvider.js";
export * from "./OdysseyProvider.js";
export * from "./OdysseyThemeProvider.js";
export * from "./Pagination/index.js";
export * from "./PasswordField.js";
export * from "./Radio.js";
export * from "./RadioGroup.js";
export * from "./ScreenReaderText.js";
export * from "./SearchField.js";
export * from "./Select.js";
export * from "./shadow-dom/index.js";
export * from "./Stack.js";
export * from "./Status.js";
export * from "./Surface.js";
export * from "./Switch.js";
export * from "./Tabs.js";
export * from "./Tag.js";
export * from "./TagList.js";
export * from "./TextField.js";
export * from "./theme/index.js";
export * from "./Toast.js";
export * from "./ToastStack.js";
export * from "./Tooltip.js";
export * from "./Typography.js";
export * from "./useUniqueId.js";
