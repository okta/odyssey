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

import { memo } from "react";

import { Button, type ButtonProps } from "../Buttons/Button.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import {
  FullscreenEnterIcon,
  FullscreenExitIcon,
} from "../icons.generated/index.js";
import { getFullscreenElementId } from "../message-bus/index.js";
import { useFullscreen } from "./useFullscreen.js";

export type FullscreenButtonProps = {
  /**
   * Accessible name for the button. It stays the same whether the region is in fullscreen or not, because the toggle's state is conveyed through `aria-pressed`. Override it when a page has more than one region, so screen reader users can tell the buttons apart (e.g. "Enable fullscreen for the activity chart").
   * @default "Enable fullscreen"
   */
  ariaLabel?: string;
  /**
   * The id of the `FullscreenRegion` this button controls, from `useFullscreenId`. The button can sit anywhere on the page, inside or outside the region.
   */
  fullscreenId: string;
} & Partial<Pick<ButtonProps, "isDisabled" | "size" | "variant">>;

/**
 * An icon button that puts a `FullscreenRegion` in fullscreen, or takes it out. Its arrows point outward to enter and inward to exit.
 *
 * It's a toggle button: its name stays the same and `aria-pressed` says whether the region is in fullscreen, the same pattern `PasswordField` uses for showing a password. `aria-controls` points at the region.
 *
 * @experimental The fullscreen API is in alpha and may change in a future release.
 */
const FullscreenButton = ({
  ariaLabel,
  fullscreenId,
  isDisabled,
  size,
  variant = "secondary",
}: FullscreenButtonProps) => {
  const { t } = useTranslation();
  const { isInFullscreenStack, toggleFullscreen } = useFullscreen({
    fullscreenId,
  });

  return (
    <Button
      ariaControls={getFullscreenElementId({ fullscreenId })}
      ariaLabel={ariaLabel ?? t("fullscreen.button.label")}
      ariaPressed={isInFullscreenStack}
      isDisabled={isDisabled}
      onClick={toggleFullscreen}
      size={size}
      startIcon={
        isInFullscreenStack ? <FullscreenExitIcon /> : <FullscreenEnterIcon />
      }
      variant={variant}
    />
  );
};

const MemoizedFullscreenButton = memo(FullscreenButton);
MemoizedFullscreenButton.displayName = "FullscreenButton";

export { MemoizedFullscreenButton as FullscreenButton };
