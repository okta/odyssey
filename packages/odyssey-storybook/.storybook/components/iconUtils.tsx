/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import {
  AddCircleIcon,
  AddIcon,
  AlertCircleFilledIcon,
  AlertCircleIcon,
  AlertTriangleFilledIcon,
  AnchorIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircleFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseCircleFilledIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  DragHandleIcon,
  EditIcon,
  ExternalLinkIcon,
  EyeOffIcon,
  EyeIcon,
  FilterIcon,
  GlobeIcon,
  HomeIcon,
  InformationCircleFilledIcon,
  InformationCircleIcon,
  NotificationIcon,
  OverflowVerticalIcon,
  QuestionCircleFilledIcon,
  QuestionCircleIcon,
  SearchIcon,
  SettingsIcon,
  SubtractIcon,
  UserGroupIcon,
  UserIcon,
} from "@okta/odyssey-react-mui";
import { createElement } from "react";

export const icons: { [key: string]: JSX.Element } = [
  AddCircleIcon,
  AddIcon,
  AlertCircleFilledIcon,
  AlertCircleIcon,
  AlertTriangleFilledIcon,
  AnchorIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircleFilledIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CloseCircleFilledIcon,
  CloseIcon,
  CopyIcon,
  DeleteIcon,
  DownloadIcon,
  DragHandleIcon,
  EditIcon,
  ExternalLinkIcon,
  EyeOffIcon,
  EyeIcon,
  FilterIcon,
  GlobeIcon,
  HomeIcon,
  InformationCircleFilledIcon,
  InformationCircleIcon,
  NotificationIcon,
  OverflowVerticalIcon,
  QuestionCircleFilledIcon,
  QuestionCircleIcon,
  SearchIcon,
  SettingsIcon,
  SubtractIcon,
  UserGroupIcon,
  UserIcon,
].reduce((acc: { [key: string]: JSX.Element }, iconComponent) => {
  const iconName = iconComponent.displayName || iconComponent.name;
  acc[iconName] = createElement(iconComponent) as JSX.Element;
  return acc;
}, {});
