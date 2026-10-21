/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * Motion values for fullscreen, kept here until they exist as design tokens.
 *
 * `src/pendingDesignTokens/` is where a value goes when it is a design token in all but name: shared across components, chosen by design, and waiting on Figma. Each file moves into `@okta/odyssey-design-tokens` once design adds the token, and its readers switch to `odysseyDesignTokens` at that point.
 */
export const fullscreenTransitionTokens = {
  // The design tokens only offer `TransitionDurationMain` (100ms), which is too fast to follow a whole layout growing or shrinking. SideNav hard-codes 300ms for the same reason.
  durationMilliseconds: 300,
  // `TransitionTimingMain` is linear, so a move this large would start and stop abruptly. This curve is the CSS twin of `easeFullscreenTransition`, so the shell's chrome and a region move in step.
  easing: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;
