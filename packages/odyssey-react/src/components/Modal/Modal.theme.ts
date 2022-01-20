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

import type { ThemeReducer } from "@okta/odyssey-react-theme";

export const theme: ThemeReducer = (theme) => ({
  ColorBackgroundOverlay: "rgba(29, 29, 33, 0.75)",

  // dialog
  SpacePaddingBlockStartDialog: theme.SpaceRemM,
  SpacePaddingBlockEndDialog: 0,
  SpacePaddingInlineDialog: theme.SpaceRemM,
  ColorBackgroundDialog: theme.ColorBackgroundBase,

  // dismiss
  SpaceMarginBlockEndDismiss: theme.SpaceRemXs,

  // content
  SpacePaddingBlockStartContent: theme.SpaceRemXs,
  SpacePaddingBlockEndContent: theme.SpaceRemL,
  SpacePaddingInlineContent: 0,
  FontSizeContent: theme.FontSizeBody,

  // footer
  SpacePaddingBlockEndFooter: theme.SpaceRemM,

  AnimationDuration: "100ms",
  AnimationTimingFunction: "linear",
});
