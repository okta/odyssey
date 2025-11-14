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

export {
  Accordion,
  type AccordionProps,
  accordionVariantValues,
} from "./Accordion.js";
export { Autocomplete, type AutocompleteProps } from "./Autocomplete.js";
export { badgeContentMaxValues } from "./Badge.js";
export {
  Banner,
  type BannerProps,
  bannerRoleValues,
  bannerSeverityValues,
} from "./Banner.js";
export { Box, type BoxProps } from "./Box.js";
export {
  Breadcrumb,
  BreadcrumbContext,
  type BreadcrumbContextType,
  BreadcrumbList,
  type BreadcrumbProps,
  type BreadcrumbsProps,
  type BreadcrumbType,
} from "./Breadcrumbs.js";
export {
  buttonSizeValues,
  buttonTypeValues,
  buttonVariantValues,
} from "./Buttons/BaseButton.js";
export {
  menuAlignmentValues,
  verticalDividerAlignmentValues,
} from "./Buttons/BaseMenuButton.js";
export { Button, type ButtonProps } from "./Buttons/Button.js";
export {
  ButtonContext,
  type ButtonContextValue,
  useButton,
} from "./Buttons/ButtonContext.js";
export { MenuButton, type MenuButtonProps } from "./Buttons/MenuButton.js";
export { MenuItem, type MenuItemProps } from "./Buttons/MenuItem.js";
export {
  Callout,
  type CalloutProps,
  calloutRoleValues,
  calloutSeverityValues,
} from "./Callout.js";
export {
  Card,
  CARD_IMAGE_SIZE,
  CARD_IMAGE_SIZE_COMPACT,
  type CardProps,
  cardVariantValues,
} from "./Card.js";
export {
  CircularProgress,
  type CircularProgressProps,
} from "./CircularProgress.js";
export { createUniqueId, uniqueIdLength } from "./createUniqueId.js";
export { CssBaseline } from "./CssBaseline.js";
export { densityValues } from "./DataTable/constants.js";
export {
  DataTable,
  type DataTableColumn,
  type DataTableGetDataType,
  type DataTableOnReorderRowsType,
  type DataTableProps,
  type DataTableRenderDetailPanelType,
} from "./DataTable/DataTable.js";
export { DatePicker, type DatePickerProps } from "./DatePickers/DatePicker.js";
export { datePickerTheme, dateStyles } from "./DatePickers/datePickerTheme.js";
export {
  type TimeZoneOption,
  TimeZonePicker,
  type TimeZonePickerProps,
} from "./DatePickers/TimeZonePicker.js";
export {
  Dialog,
  type DialogOnCloseReason,
  type DialogProps,
} from "./Dialog.js";
export {
  Drawer,
  type DrawerOnCloseReason,
  type DrawerProps,
  variantValues,
} from "./Drawer.js";
export {
  DataTableEmptyState,
  EmptyState,
  type EmptyStateProps,
} from "./EmptyState.js";
export {
  type FieldComponentProps,
  type FieldComponentRenderProps,
} from "./FieldComponentProps.js";
export {
  Checkbox,
  type CheckboxProps,
  checkboxValidityValues,
} from "./Fields/Checkbox.js";
export {
  CheckboxGroup,
  type CheckboxGroupProps,
} from "./Fields/CheckboxGroup.js";
export { Radio, type RadioProps } from "./Fields/Radio.js";
export { RadioGroup, type RadioGroupProps } from "./Fields/RadioGroup.js";
export { Fieldset, type FieldsetProps } from "./Fieldset.js";
export {
  FileUploader,
  fileUploadTypes,
  fileUploadVariants,
} from "./FileUploader/FileUploader.js";
export {
  Form,
  formAutoCompleteTypeValues,
  formEncodingTypeValues,
  formMethodValues,
  type FormProps,
} from "./Form.js";
export { HintLink } from "./HintLink.js";
export {
  IconWithTooltip,
  type IconWithTooltipProps,
} from "./IconWithTooltip.js";
export { Link, type LinkProps, linkVariantValues } from "./Link.js";
export {
  NativeSelect,
  type NativeSelectOption,
  type NativeSelectProps,
  type NativeSelectValueType,
} from "./NativeSelect.js";
export { type NullElement } from "./NullElement.js";
export {
  OdysseyCacheProvider,
  type OdysseyCacheProviderProps,
} from "./OdysseyCacheProvider.js";
export {
  OdysseyProvider,
  type OdysseyProviderProps,
} from "./OdysseyProvider.js";
export {
  OdysseyThemeProvider,
  type OdysseyThemeProviderProps,
} from "./OdysseyThemeProvider.js";
export { paginationTypeValues } from "./Pagination/constants.js";
export { Pagination, type PaginationProps } from "./Pagination/Pagination.js";
export { usePagination } from "./Pagination/usePagination.js";
export { PasswordField, type PasswordFieldProps } from "./PasswordField.js";
export {
  ScreenReaderText,
  type ScreenReaderTextProps,
} from "./ScreenReaderText.js";
export {
  SearchField,
  type SearchFieldProps,
  searchVariantValues,
} from "./SearchField.js";
export {
  Select,
  type SelectOption,
  type SelectProps,
  type SelectValueType,
} from "./Select.js";
export {
  type OdysseyStackProps,
  Stack,
  stackDirectionValues,
  stackSpacingValues,
} from "./Stack.js";
export {
  Status,
  type StatusProps,
  statusSeverityValues,
  statusVariantValues,
} from "./Status.js";
export { Surface, type SurfaceProps } from "./Surface.js";
export { Switch, type SwitchProps } from "./Switch.js";
export { type TabItemProps, Tabs, type TabsProps } from "./Tabs.js";
export { Tag, tagColorVariants, type TagProps, tagSizeValues } from "./Tag.js";
export { TagList, type TagListProps } from "./TagList.js";
export {
  TextField,
  type TextFieldProps,
  textFieldTypeValues,
} from "./TextField.js";
export {
  createOdysseyMuiTheme,
  type DesignTokens,
  type DesignTokensOverride,
  pxToRem,
  useMediaQuery,
} from "./theme/theme.js";
export {
  Toast,
  type ToastProps,
  toastRoleValues,
  toastSeverityValues,
} from "./Toast.js";
export { type ToastListProps, ToastStack } from "./ToastStack.js";
export { Tooltip, type TooltipProps } from "./Tooltip.js";
export {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Legend,
  Overline,
  Paragraph,
  Subordinate,
  Support,
  Typography,
  typographyColorValues,
  type TypographyProps,
  typographyVariantMapping,
  type TypographyVariantValue,
} from "./Typography.js";
export { useMountLifecycleEffect } from "./useMountLifecycleEffect.js";
export { useUniqueId } from "./useUniqueId.js";
export {
  createShadowDomElements,
  createShadowRootElement,
} from "./web-component/createShadowDomElements.js";
export {
  encapsulateShadowDomFromGlobalStyles,
  shadowDomHostStyles,
} from "./web-component/encapsulateShadowDomFromGlobalStyles.js";
export type {
  MRT_ColumnFiltersState as DataTableFiltersState,
  MRT_Row as DataTableRow,
  MRT_RowData as DataTableRowData,
  MRT_RowSelectionState as DataTableRowSelectionState,
  MRT_SortingState as DataTableSortingState,
} from "material-react-table";
