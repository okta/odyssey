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

export {
  Alert,
  AlertTitle,
  Box,
  Chip,
  createTheme,
  CssBaseline,
  DialogContentText,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  IconButton,
  /** @deprecated Will be removed in a future Odyssey version. Please switch to `TextField`. */
  InputAdornment,
  /** @deprecated Will be removed in a future Odyssey version. Please switch to `TextField`. */
  InputBase,
  /** @deprecated Will be removed in a future Odyssey version. Please switch to `TextField`. */
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuList,
  Paper,
  ScopedCssBaseline,
  Select,
  Snackbar,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  ThemeProvider as MuiThemeProvider,
  Typography,
} from "@mui/material";

export type {
  AlertProps,
  AlertTitleProps,
  BoxProps,
  ChipProps,
  CssBaselineProps,
  DividerProps,
  FormControlLabelProps,
  FormControlProps,
  FormGroupProps,
  FormHelperTextProps,
  FormLabelProps,
  IconButtonProps,
  /** @deprecated Will be removed in a future Odyssey version. Please switch to `TextFieldProps`. */
  InputAdornmentProps,
  /** @deprecated Will be removed in a future Odyssey version. Please switch to `TextFieldProps`. */
  InputBaseProps,
  /** @deprecated Will be removed in a future Odyssey version. Please switch to `TextFieldProps`. */
  InputLabelProps,
  ListProps,
  ListItemProps,
  ListItemIconProps,
  ListItemTextProps,
  ListSubheaderProps,
  MenuProps,
  MenuListProps,
  PaperProps,
  ScopedCssBaselineProps,
  SelectChangeEvent,
  SelectProps,
  SnackbarProps,
  StackProps,
  SvgIconProps,
  TableBodyProps,
  TableCellProps,
  TableContainerProps,
  TableHeadProps,
  TableProps,
  TableRowProps,
  TableSortLabelProps,
  ThemeOptions,
  TypographyProps,
} from "@mui/material";

export { default as FavoriteIcon } from "@mui/icons-material/Favorite";

export { deepmerge, visuallyHidden } from "@mui/utils";

export * from "./Autocomplete";
export * from "./Banner";
export * from "./Button";
export * from "./Checkbox";
export * from "./CheckboxGroup";
export * from "./CircularProgress";
export * from "./createUniqueId";
export * from "./Dialog";
export * from "./Icon";
export * from "./iconDictionary";
export * from "./Infobox";
export * from "./Link";
export * from "./MenuButton";
export * from "./MenuItem";
export * from "./OdysseyCacheProvider";
export * from "./OdysseyProvider";
export * from "./OdysseyThemeProvider";
export * from "./OdysseyTranslationProvider";
export * from "./PasswordField";
export * from "./Radio";
export * from "./RadioGroup";
export * from "./ScreenReaderText";
export * from "./SearchField";
export * from "./Status";
export * from "./Tabs";
export * from "./Tag";
export * from "./TagList";
export * from "./TextField";
export * from "./theme";
export * from "./Tooltip";
export * from "./Toast";
export * from "./ToastStack";
export * from "./useUniqueId";
