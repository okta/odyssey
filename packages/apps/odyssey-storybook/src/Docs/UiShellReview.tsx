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

import {
  createOdysseyStyledComponent,
  Typography,
} from "@okta/odyssey-react-mui";
import { memo } from "react";

type ResolvedScheme = "light" | "dark";

const UI_SHELL_STORY_ID =
  "unified-ui-shell-uishell--with-odyssey-app-content-and-overlays";

const SCHEMES: Array<{ colorScheme: ResolvedScheme; label: string }> = [
  { colorScheme: "light", label: "Light" },
  { colorScheme: "dark", label: "Dark" },
];

// UI Shell sizes itself to the window and positions the app over its own grid,
// and Dialog and Drawer portal to the document body. Each shell gets its own
// frame, so it lays out as it would in an app and its overlays open inside it
// rather than over this page. The `colorScheme` global pins each frame to one
// scheme regardless of the toolbar.
const getStoryFrameUrl = ({ colorScheme }: { colorScheme: ResolvedScheme }) =>
  `iframe.html?id=${UI_SHELL_STORY_ID}&viewMode=story&globals=colorScheme:${colorScheme}`;

const SchemeSection = createOdysseyStyledComponent({ tag: "section" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing2,
    marginBlockStart: odysseyDesignTokens.Spacing6,
  }),
);

const StoryFrame = createOdysseyStyledComponent({ tag: "iframe" })(
  ({ odysseyDesignTokens }) => ({
    border: `1px solid ${odysseyDesignTokens.HueNeutral200}`,
    borderRadius: odysseyDesignTokens.BorderRadiusTight,
    display: "block",
    height: "760px",
    width: "100%",
  }),
);

const UiShellReview = () => (
  <>
    <Typography>
      The UI Shell with app content, once per scheme. Click &ldquo;I
      understand&rdquo; to open the Dialog and &ldquo;Open drawer&rdquo; to open
      the Drawer. Each frame keeps its own scheme whatever the toolbar is set
      to.
    </Typography>

    {SCHEMES.map(({ colorScheme, label }) => (
      <SchemeSection key={colorScheme}>
        <Typography variant="h2">{label}</Typography>
        <StoryFrame
          src={getStoryFrameUrl({ colorScheme })}
          title={`UI Shell, ${label.toLowerCase()} mode`}
        />
      </SchemeSection>
    ))}
  </>
);

const MemoizedUiShellReview = memo(UiShellReview);
MemoizedUiShellReview.displayName = "UiShellReview";

export { MemoizedUiShellReview as UiShellReview };
