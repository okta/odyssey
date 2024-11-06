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
  marginBlock: "2px",

  ...(isSelected && {
    color: `${odysseyDesignTokens.TypographyColorAction} !important`,
    backgroundColor: odysseyDesignTokens.HueBlue50,
  }),
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
    paddingBlock: odysseyDesignTokens.Spacing2,
    paddingInlineStart:
      contextValue.depth === 1
        ? odysseyDesignTokens.Spacing4
        : !contextValue.isSortable
          ? `calc(${odysseyDesignTokens.Spacing4} * ${contextValue.depth} + ${odysseyDesignTokens.Spacing3})`
          : odysseyDesignTokens.Spacing4,
    paddingInlineEnd: odysseyDesignTokens.Spacing4,
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
      color: isDisabled
        ? `${odysseyDesignTokens.TypographyColorDisabled}`
        : `${odysseyDesignTokens.TypographyColorAction}  !important`,

      ...(isDisabled && {
        color: "inherit",
        cursor: "default",
      }),
    },

    ...(isSelected && {
      color: `${odysseyDesignTokens.TypographyColorAction}`,
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

const StyledNavItemLink = styled(NavItemLink, {
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
  isDisabled,
  isSelected,
  scrollRef,
  onItemSelected,
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
  | "isDisabled"
  | "isSelected"
> & {
  /**
   * The ref used to scroll to this item
   */
  scrollRef?: React.RefObject<ScrollIntoViewHandle>;
  onItemSelected?(selectedItemId: string): void;
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

  const itemClickHandler = useCallback(
    (id: string) => {
      return () => {
        onItemSelected?.(id);
        onClick?.();
      };
    },
    [onClick, onItemSelected],
  );

  const sideNavItemContentKeyHandler = useCallback(
    (id: string, event: KeyboardEvent<HTMLDivElement>) => {
      if (event?.key === "Enter") {
        event.preventDefault();
        onItemSelected?.(id);
        onClick?.();
      }
    },
    [onClick, onItemSelected],
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
          <NavItemContentContainer
            odysseyDesignTokens={odysseyDesignTokens}
            contextValue={contextValue}
            isDisabled={isDisabled}
            tabIndex={0}
            onClick={itemClickHandler(id)}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) =>
              sideNavItemContentKeyHandler(id, event)
            }
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
        ) : (
          <StyledNavItemLink
            odysseyDesignTokens={odysseyDesignTokens}
            contextValue={contextValue}
            isDisabled={isDisabled}
            isSelected={isSelected}
            href={href}
            target={target}
            onClick={itemClickHandler(id)}
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
          </StyledNavItemLink>
        )
      }
    </StyledSideNavListItem>
  );
};

const MemoizedSideNavItemContent = memo(SideNavItemContent);
MemoizedSideNavItemContent.displayName = "SideNavItemContent";

export { MemoizedSideNavItemContent as SideNavItemContent };
