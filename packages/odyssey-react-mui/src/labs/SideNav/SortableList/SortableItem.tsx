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

import { createContext, useContext, useMemo } from "react";
import type { CSSProperties, PropsWithChildren } from "react";
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from "@dnd-kit/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSortable } from "@dnd-kit/sortable";
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSS } from "@dnd-kit/utilities";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../../OdysseyDesignTokensContext";
import { useTranslation } from "react-i18next";

type ItemProps = {
  id: UniqueIdentifier;
  isDisabled?: boolean;
  isSelected?: boolean;
  isSortable?: boolean;
};

interface Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
});

const StyledSortableListItem = styled("li", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isSelected",
})<{
  odysseyDesignTokens: DesignTokens;
  isSelected?: boolean;
}>(({ odysseyDesignTokens, isSelected }) => ({
  position: "relative",

  button: {
    top: "50%",
    left: odysseyDesignTokens.Spacing2,
    transform: "translateY(-50%)",
  },

  svg: {
    path: {
      fill: "currentColor",
    },
  },

  "&:has(a:hover, button:hover, a:focus, button:focus, a:focus-visible, button:focus-visible, [role='button']:hover, [role='button']:focus, [role='button']:focus-visible)":
    {
      button: {
        opacity: 1,
        outlineWidth: 0,
      },
    },

  ...(isSelected && {
    svg: {
      path: {
        fill: odysseyDesignTokens.TypographyColorAction,
      },
    },
  }),
}));

const StyledUl = styled("ul")({
  padding: 0,
  listStyle: "none",
  listStyleType: "none",
});

const StyledDragHandleButton = styled("button", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isDragging",
})<{
  odysseyDesignTokens: DesignTokens;
  isDragging?: boolean;
}>(({ odysseyDesignTokens, isDragging }) => ({
  position: "absolute",
  opacity: 0,
  // paddingInlineStart: odysseyDesignTokens.Spacing4,
  padding: odysseyDesignTokens.Spacing2,
  // paddingBlock: 0,
  border: "none",
  backgroundColor: "transparent",
  cursor: `${isDragging ? "grabbing" : "grab"}`,
  transition: `opacity ${odysseyDesignTokens.TransitionDurationMain}`,
  borderRadius: odysseyDesignTokens.BorderRadiusMain,

  svg: {
    display: "flex",
  },

  "&:focus, &:focus-visible": {
    outline: "none",
    boxShadow: `inset 0 0 0 2px ${odysseyDesignTokens.PalettePrimaryMain}`,
  },
}));

type DragHandleProps = {
  isDisabled?: boolean;
  isDragging?: boolean;
};

export const DragHandle = ({ isDragging }: DragHandleProps) => {
  const { attributes, listeners, ref } = useContext(SortableItemContext);
  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  return (
    <StyledDragHandleButton
      {...attributes}
      {...listeners}
      odysseyDesignTokens={odysseyDesignTokens}
      isDragging={isDragging}
      ref={ref}
      aria-label={t("navigation.drag.handle")}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 2.33331C6 2.8856 5.55228 3.33331 5 3.33331C4.44772 3.33331 4 2.8856 4 2.33331C4 1.78103 4.44772 1.33331 5 1.33331C5.55228 1.33331 6 1.78103 6 2.33331ZM11 3.33331C11.5523 3.33331 12 2.8856 12 2.33331C12 1.78103 11.5523 1.33331 11 1.33331C10.4477 1.33331 10 1.78103 10 2.33331C10 2.8856 10.4477 3.33331 11 3.33331ZM11 7.11109C11.5523 7.11109 12 6.66338 12 6.11109C12 5.55881 11.5523 5.11109 11 5.11109C10.4477 5.11109 10 5.55881 10 6.11109C10 6.66338 10.4477 7.11109 11 7.11109ZM12 9.88887C12 10.4412 11.5523 10.8889 11 10.8889C10.4477 10.8889 10 10.4412 10 9.88887C10 9.33659 10.4477 8.88887 11 8.88887C11.5523 8.88887 12 9.33659 12 9.88887ZM11 14.6666C11.5523 14.6666 12 14.2189 12 13.6666C12 13.1144 11.5523 12.6666 11 12.6666C10.4477 12.6666 10 13.1144 10 13.6666C10 14.2189 10.4477 14.6666 11 14.6666ZM5 7.11109C5.55228 7.11109 6 6.66338 6 6.11109C6 5.55881 5.55228 5.11109 5 5.11109C4.44772 5.11109 4 5.55881 4 6.11109C4 6.66338 4.44772 7.11109 5 7.11109ZM6 9.88888C6 10.4412 5.55228 10.8889 5 10.8889C4.44772 10.8889 4 10.4412 4 9.88888C4 9.33659 4.44772 8.88888 5 8.88888C5.55228 8.88888 6 9.33659 6 9.88888ZM5 14.6666C5.55228 14.6666 6 14.2189 6 13.6666C6 13.1144 5.55228 12.6666 5 12.6666C4.44772 12.6666 4 13.1144 4 13.6666C4 14.2189 4.44772 14.6666 5 14.6666Z"
          fill="#3F59E4"
        />
      </svg>
    </StyledDragHandleButton>
  );
};

export const SortableItem = ({
  id,
  isDisabled,
  isSelected,
  isSortable = true,
  children,
}: PropsWithChildren<ItemProps>) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  const context: Context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const odysseyDesignTokens: DesignTokens = useOdysseyDesignTokens();
  return (
    <SortableItemContext.Provider value={context}>
      <StyledSortableListItem
        data-sortable-container="true"
        ref={setNodeRef}
        style={style}
        odysseyDesignTokens={odysseyDesignTokens}
        isSelected={isSelected}
      >
        {!isDisabled && isSortable && <DragHandle isDragging={isDragging} />}
        <StyledUl>{children}</StyledUl>
      </StyledSortableListItem>
    </SortableItemContext.Provider>
  );
};
