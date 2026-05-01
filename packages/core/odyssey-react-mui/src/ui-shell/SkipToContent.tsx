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

import styled from "@emotion/styled";
import { memo, useCallback, useEffect, useRef } from "react";

import { BaseButton } from "../Buttons/BaseButton.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import { FocusHandle } from "../inputUtils.js";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { SKIP_LINKS_Z_INDEX } from "./uiShellSharedConstants.js";

const StyledContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  left: odysseyDesignTokens.Spacing4,
  position: "fixed",
  top: odysseyDesignTokens.Spacing3,
  zIndex: SKIP_LINKS_Z_INDEX,
  // Visually hidden when not focused — the "sr-only" pattern.
  // https://www.a11yproject.com/posts/how-to-hide-content/
  //
  // We found this method via the A11y Project. It fixes axe color-contrast
  // violations that `opacity: 0` triggers (axe still evaluates contrast on
  // opacity-0 elements because they occupy space in the layout). The sr-only
  // pattern collapses the element to 1×1 px and clips it, which axe — and
  // every modern screen reader — treats as fully hidden. Unlike a large
  // negative `left` offset, it also avoids any risk of a phantom scrollbar.
  "&:not(:focus-within)": {
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    pointerEvents: "none",
    whiteSpace: "nowrap",
    width: "1px",
  },
}));

type SkipToContentProps = {
  appElement: HTMLDivElement | null;
};

const SkipToContent = ({ appElement }: SkipToContentProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<FocusHandle>(null);
  const interceptedFromRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (appElement) {
      const hasTabIndex = appElement.hasAttribute("tabindex");
      const hasOutlineStyle =
        appElement.style.getPropertyValue("outline") !== "";

      if (!hasTabIndex) {
        appElement.setAttribute("tabindex", "-1");
      }
      if (!hasOutlineStyle) {
        appElement.style.setProperty("outline", "none");
      }

      return () => {
        if (!hasTabIndex) {
          appElement.removeAttribute("tabindex");
        }
        if (!hasOutlineStyle) {
          appElement.style.removeProperty("outline");
        }
      };
    }

    return;
  }, [appElement]);

  useEffect(() => {
    const stopInterceptor = () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", stopInterceptor);
    };

    const handleKeyDown = (keyboardEvent: globalThis.KeyboardEvent) => {
      if (
        keyboardEvent.key === "Tab" &&
        !keyboardEvent.shiftKey &&
        !containerRef.current?.contains(document.activeElement)
      ) {
        interceptedFromRef.current = document.activeElement as HTMLElement;
        keyboardEvent.preventDefault();
        stopInterceptor();

        requestAnimationFrame(() => {
          buttonRef.current?.focus();
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", stopInterceptor);

    return stopInterceptor;
  }, []);

  useEffect(() => {
    const resumeFromInterceptedPosition = (
      keyboardEvent: globalThis.KeyboardEvent,
    ) => {
      if (
        interceptedFromRef.current &&
        keyboardEvent.key === "Tab" &&
        !keyboardEvent.shiftKey &&
        containerRef.current?.contains(document.activeElement)
      ) {
        interceptedFromRef.current.focus();
        interceptedFromRef.current = null;
      }
    };

    document.addEventListener("keydown", resumeFromInterceptedPosition);

    return () => {
      document.removeEventListener("keydown", resumeFromInterceptedPosition);
    };
  }, []);

  const focusMainContent = useCallback(() => {
    appElement?.focus();
  }, [appElement]);

  return (
    <StyledContainer
      odysseyDesignTokens={odysseyDesignTokens}
      ref={containerRef}
    >
      <BaseButton
        buttonRef={buttonRef}
        label={t("skiplinks.main")}
        onClick={focusMainContent}
        variant="primary"
      />
    </StyledContainer>
  );
};

const MemoizedSkipToContent = memo(SkipToContent);
MemoizedSkipToContent.displayName = "SkipToContent";

export { MemoizedSkipToContent as SkipToContent };
