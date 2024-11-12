/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import {
  useRef,
  useImperativeHandle,
  useCallback,
  memo,
  KeyboardEvent,
  useMemo,
} from "react";
import { Link as NavItemLink } from "@mui/material";
import {
  type DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { SideNavItemLinkContent } from "./SideNavItemLinkContent";
import type { SideNavItem } from "./types";
import {
  SideNavItemContentContextValue,
  useSideNavItemContent,
} from "./SideNavItemContentContext";
import { ExternalLinkIcon } from "../../icons.generated";

export const StyledSideNavListItem = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSelected",
})<{
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
  disabled?: boolean;
}>(({ odysseyDesignTokens, isSelected }) => ({
  display: "flex",
  alignItems: "center",
  marginBlockEnd: "1px",
  backgroundColor: "unset",
  borderRadius: odysseyDesignTokens.BorderRadiusMain,
  transition: `backgroundColor ${odysseyDesignTokens.TransitionDurationMain}, color ${odysseyDesignTokens.TransitionDurationMain}`,

  ...(isSelected && {
    color: `${odysseyDesignTokens.TypographyColorAction} !important`,
    backgroundColor: odysseyDesignTokens.HueBlue50,
  }),

  "&:last-child": {
    marginBlockEnd: odysseyDesignTokens.Spacing2,
  },
}));

const scrollToNode = (node: HTMLElement | null) => {
  if (node) {
    node?.scrollIntoView({
      behavior: "instant",
      block: "center",
      inline: "nearest",
    });
  }
};

type ScrollIntoViewHandle = {
  scrollIntoView: () => void;
};

const GetNavItemContentStyles = ({
  odysseyDesignTokens,
  contextValue,
  isDisabled,
  isSelected,
}: {
  odysseyDesignTokens: DesignTokens;
  contextValue: SideNavItemContentContextValue;
  isDisabled?: boolean;
  isSelected?: boolean;
}) => {
  return {
    display: "flex",
    alignItems: "center",
    width: "100%",
    textDecoration: "none",
    color: `${odysseyDesignTokens.TypographyColorHeading} !important`,
    minHeight: odysseyDesignTokens.Spacing7,
    paddingBlock: odysseyDesignTokens.Spacing3,
    paddingInline: `calc(${odysseyDesignTokens.Spacing4} * ${contextValue.depth})`,
    borderRadius: odysseyDesignTokens.BorderRadiusMain,
    transition: `backgroundColor ${odysseyDesignTokens.TransitionDurationMain}, color ${odysseyDesignTokens.TransitionDurationMain}`,

    "& + &": {
      marginTop: 4,
    },
    "&:hover": {
      textDecoration: "none",
      cursor: "pointer",
      backgroundColor: !isDisabled
        ? odysseyDesignTokens.HueNeutral50
        : "inherit",

      ...(isDisabled && {
        color: "inherit",
        cursor: "default",
      }),

      ...(isSelected && {
        "&:hover": {
          backgroundColor: odysseyDesignTokens.HueBlue50,
        },
      }),
    },

    ...(isSelected && {
      color: `${odysseyDesignTokens.TypographyColorAction} !important`,
      fontWeight: odysseyDesignTokens.TypographyWeightBodyBold,
    }),

    ...(isDisabled && {
      color: `${odysseyDesignTokens.TypographyColorDisabled} !important`,
    }),

    ...(contextValue.isCompact && {
      paddingBlock: odysseyDesignTokens.Spacing1,
      minHeight: odysseyDesignTokens.Spacing6,
    }),

    "&:focus-visible": {
      outline: "none",
      boxShadow: `inset 0 0 0 2px ${odysseyDesignTokens.PalettePrimaryMain}`,
    },
  };
};

const NavItemContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "isSelected",
})(GetNavItemContentStyles);

const NavItemContentButton = styled("button", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "isSelected",
})(GetNavItemContentStyles);

const NavItemLinkContainer = styled(NavItemLink, {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop != "contextValue" &&
    prop !== "isDisabled" &&
    prop !== "isSelected",
})(GetNavItemContentStyles);

const SideNavItemContent = ({
  count,
  id,
  label,
  href,
  target,
  startIcon,
  severity,
  statusLabel,
  endIcon,
  onClick,
  isSelected,
  isDisabled,
  scrollRef,
}: Pick<
  SideNavItem,
  | "count"
  | "id"
  | "label"
  | "href"
  | "target"
  | "startIcon"
  | "severity"
  | "statusLabel"
  | "endIcon"
  | "onClick"
  | "isSelected"
  | "isDisabled"
> & {
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
}) => {
  const sidenavItemContentContext = useSideNavItemContent();
  const contextValue = useMemo(
    () => sidenavItemContentContext,
    [sidenavItemContentContext],
  );
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const localScrollRef = useRef<HTMLLIElement>(null);
  useImperativeHandle(
    scrollRef,
    () => {
      return {
        scrollIntoView: () => {
          scrollToNode(localScrollRef.current);
        },
      };
    },
    [],
  );

  const sideNavItemContentKeyHandler = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        onClick?.();
      }
    },
    [onClick],
  );

  return (
    <StyledSideNavListItem
      ref={localScrollRef}
      id={id}
      key={id}
      isSelected={isSelected}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-current={isSelected ? "page" : undefined}
      odysseyDesignTokens={odysseyDesignTokens}
    >
      {
        // Use Link for nav items with links and div for disabled or non-link items
        isDisabled ? (
          <NavItemContentContainer
            odysseyDesignTokens={odysseyDesignTokens}
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
          </NavItemContentContainer>
        ) : !href ? (
          <NavItemContentButton
            odysseyDesignTokens={odysseyDesignTokens}
            contextValue={contextValue}
            isDisabled={isDisabled}
            tabIndex={0}
            onClick={onClick}
            onKeyDown={sideNavItemContentKeyHandler}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
          </NavItemContentButton>
        ) : (
          <NavItemLinkContainer
            odysseyDesignTokens={odysseyDesignTokens}
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
            href={href}
            target={target}
            onClick={onClick}
          >
            <SideNavItemLinkContent
              count={count}
              label={label}
              startIcon={startIcon}
              endIcon={endIcon}
              statusLabel={statusLabel}
              severity={severity}
            />
            {target === "_blank" && (
              <span className="Link-indicator" role="presentation">
                <ExternalLinkIcon />
              </span>
            )}
          </NavItemLinkContainer>
        )
      }
    </StyledSideNavListItem>
  );
};
const MemoizedSideNavItemContent = memo(SideNavItemContent);
MemoizedSideNavItemContent.displayName = "SideNavItemContent";

export { MemoizedSideNavItemContent as SideNavItemContent };
