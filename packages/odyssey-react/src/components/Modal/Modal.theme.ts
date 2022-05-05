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
  AnimationDuration: theme.TransitionDurationBase,
  AnimationTimingFunction: theme.TransitionTimingBase,

  ContentFontSize: theme.FontSizeBody,
  ContentPaddingBlockEnd: theme.SpaceScale3,
  ContentPaddingBlockStart: theme.SpaceScale1,
  ContentPaddingInline: 0,

  DialogBackgroundColor: theme.ColorBackgroundBase,
  DialogPaddingBlockEnd: theme.SpaceScale5,
  DialogPaddingBlockStart: theme.SpaceScale5,
  DialogPaddingInline: theme.SpaceScale5,

  DismissMarginBlockEnd: theme.SpaceScale0,

  FooterPaddingBlockStart: theme.SpaceScale3,
  FooterPaddingBlockEnd: 0,

  HeaderPaddingBlockEnd: theme.SpaceScale3,

  OverlayBackgroundColor: "rgba(29, 29, 33, 0.75)",
});
