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
 * The fullscreen state of the whole page, shared by every app and Unified UI Shell.
 */
export type FullscreenState = {
  /**
   * Every fullscreen id on the page, bottom first. Only the last one is shown; the ones under it are shown again, in order, as the ones above them exit. Empty when nothing on the page is in fullscreen.
   */
  fullscreenStack: string[];
};

export type FullscreenIdArgs = {
  fullscreenId: string;
};

export const emptyFullscreenState: FullscreenState = { fullscreenStack: [] };

/**
 * The id shown in fullscreen right now: the top of the stack. `undefined` when nothing is in fullscreen.
 */
export const getActiveFullscreenId = ({
  fullscreenStack,
}: FullscreenState): string | undefined => fullscreenStack.at(-1);

/**
 * `true` when **this** id is the one shown in fullscreen, on top of the stack.
 *
 * Use it for what only the visible region does: taking focus, making the page around it `inert`, and announcing the change. A region lower in the stack is covered by the one above it, so it reads `false` until that one exits.
 */
export const getIsFullscreen = ({
  fullscreenId,
  fullscreenStack,
}: FullscreenIdArgs & FullscreenState): boolean =>
  getActiveFullscreenId({ fullscreenStack }) === fullscreenId;

/**
 * `true` when this id is anywhere in the stack, even covered by another.
 *
 * Use it for what stays true until the id exits: a region staying fixed over the page, and its button reading as pressed.
 */
export const getIsInFullscreenStack = ({
  fullscreenId,
  fullscreenStack,
}: FullscreenIdArgs & FullscreenState): boolean =>
  fullscreenStack.includes(fullscreenId);

/**
 * `true` when **anything** on the page is in fullscreen, in any app.
 *
 * Use it for what the page around fullscreen does, such as UI Shell hiding its navigation and banners. It doesn't say which id; read `getIsFullscreen` for that.
 */
export const getHasActiveFullscreen = ({
  fullscreenStack,
}: FullscreenState): boolean => fullscreenStack.length > 0;

/**
 * Where this id sits in the stack, from `0` at the bottom, or `-1` when it isn't in it. A region uses it to stack above the regions under it.
 */
export const getFullscreenStackIndex = ({
  fullscreenId,
  fullscreenStack,
}: FullscreenIdArgs & FullscreenState): number =>
  fullscreenStack.indexOf(fullscreenId);

/**
 * The stack with an id on top. An id already in the stack moves to the top rather than appearing twice.
 */
export const getStackWithEnteredId = ({
  fullscreenId,
  fullscreenStack,
}: FullscreenIdArgs & FullscreenState): string[] =>
  fullscreenStack
    .filter((stackedId) => stackedId !== fullscreenId)
    .concat(fullscreenId);

/**
 * The stack without an id, wherever it was. The ids above and below it keep their order.
 */
export const getStackWithExitedId = ({
  fullscreenId,
  fullscreenStack,
}: FullscreenIdArgs & FullscreenState): string[] =>
  fullscreenStack.filter((stackedId) => stackedId !== fullscreenId);

/**
 * `true` when two stacks hold the same ids in the same order, so subscribers aren't told about a message that changed nothing.
 */
export const getIsSameFullscreenStack = ({
  currentFullscreenStack,
  nextFullscreenStack,
}: {
  currentFullscreenStack: string[];
  nextFullscreenStack: string[];
}): boolean =>
  currentFullscreenStack.length === nextFullscreenStack.length &&
  currentFullscreenStack.every(
    (fullscreenId, index) => fullscreenId === nextFullscreenStack[index],
  );
