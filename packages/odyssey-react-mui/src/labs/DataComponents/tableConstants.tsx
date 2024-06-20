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

import { MRT_RowData, MRT_TableOptions } from "material-react-table";
import { DragIndicatorIcon } from "../../icons.generated";
import { Box } from "../../Box";
import { DesignTokens } from "../../OdysseyDesignTokensContext";
import styled from "@emotion/styled";

export const dataTableImmutableSettings = {
  enableColumnActions: false,
  enableDensityToggle: false,
  enableExpandAll: false,
  enableFilters: false,
  enableFullScreenToggle: false,
  enableGlobalFilter: false,
  enableHiding: false,
  enablePagination: false,
  layoutMode: "grid-no-grow" as MRT_TableOptions<MRT_RowData>["layoutMode"],
  manualFiltering: true,
  manualSorting: true,
  muiTablePaperProps: {
    elevation: 0,
    sx: {
      overflow: "visible",
    },
  },
  positionActionsColumn:
    "last" as MRT_TableOptions<MRT_RowData>["positionActionsColumn"],
  rowVirtualizerOptions: {
    overscan: 4,
  },
  selectAllMode: "all" as MRT_TableOptions<MRT_RowData>["selectAllMode"],
};

export const displayColumnDefOptions = {
  "mrt-row-actions": {
    header: "",
    grow: true,
    muiTableBodyCellProps: {
      align: "right",
      sx: {
        overflow: "visible",
        width: "unset",
      },
      className: "ods-actions-cell",
    },
    muiTableHeadCellProps: {
      align: "right",
      sx: {
        width: "unset",
      },
      className: "ods-actions-cell",
    },
  },
  "mrt-row-drag": {
    header: "",
    muiTableBodyCellProps: {
      sx: {
        minWidth: 0,
        width: "auto",
      },
      className: "ods-drag-handle",
    },
    muiTableHeadCellProps: {
      sx: {
        minWidth: 0,
        width: "auto",
      },
      children: (
        // Add a spacer to simulate the width of the drag handle in the column.
        // Without this, the head cells are offset from their body cell counterparts
        <Box sx={{ marginInline: "-0.1rem" }}>
          <DragIndicatorIcon sx={{ marginInline: 1, opacity: 0 }} />
        </Box>
      ),
    },
  },
  "mrt-row-select": {
    muiTableHeadCellProps: {
      padding: "checkbox",
    },
    muiTableBodyCellProps: {
      padding: "checkbox",
    },
  },
  "mrt-row-expand": {
    header: "",
  },
};

export const ScrollableTableContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" &&
    prop !== "isScrollableStart" &&
    prop !== "isScrollableEnd",
})(
  ({
    odysseyDesignTokens,
    isScrollableStart,
    isScrollableEnd,
  }: {
    odysseyDesignTokens: DesignTokens;
    isScrollableStart: boolean;
    isScrollableEnd: boolean;
  }) => ({
    marginBlockEnd: odysseyDesignTokens.Spacing4,
    position: "relative",
    borderInlineStartColor: isScrollableStart
      ? odysseyDesignTokens.HueNeutral200
      : "transparent",
    borderInlineStartStyle: "solid",
    borderInlineStartWidth: odysseyDesignTokens.BorderWidthMain,
    "::before": {
      background:
        "linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 1) 100%)",
      content: '""',
      opacity: isScrollableStart ? "0.075" : "0",
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      width: odysseyDesignTokens.Spacing6,
      zIndex: 100,
      transition: `opacity ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
    },
    borderInlineEndColor: isScrollableEnd
      ? odysseyDesignTokens.HueNeutral200
      : "transparent",
    borderInlineEndStyle: "solid",
    borderInlineEndWidth: odysseyDesignTokens.BorderWidthMain,
    "::after": {
      background:
        "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.33) 50%, rgba(0, 0, 0, 1) 100%)",
      content: '""',
      opacity: isScrollableEnd ? "0.075" : "0",
      pointerEvents: "none",
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      width: odysseyDesignTokens.Spacing6,
      transition: `opacity ${odysseyDesignTokens.TransitionDurationMain} ${odysseyDesignTokens.TransitionTimingMain}`,
    },
  }),
);
