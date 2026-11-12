/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
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
import { InputBase } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Box } from "../Box.js";
import { Button } from "../Buttons/Button.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons.generated/index.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";
import { Paragraph } from "../Typography.js";
import { paginationTypeValues } from "./constants.js";
import { usePagination } from "./usePagination.js";

const PaginationContainer = styled("nav")({
  display: "flex",
  justifyContent: "space-between",
});

const PaginationSegment = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  display: "flex",
  alignItems: "center",
  gap: odysseyDesignTokens.Spacing4,
  "& > div": {
    display: "flex",
    alignItems: "center",
    gap: odysseyDesignTokens.Spacing2,
  },
}));

const PaginationInput = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{ odysseyDesignTokens: DesignTokens }>(({ odysseyDesignTokens }) => ({
  borderColor: odysseyDesignTokens.HueNeutral200,
  borderRadius: odysseyDesignTokens.BorderRadiusTight,
  height: odysseyDesignTokens.Spacing6,
  width: "4.5714285714rem", // This is a hardcoded value, keep as string
  "&:hover": {
    borderColor: odysseyDesignTokens.HueNeutral400,
  },
  "&.Mui-focused:hover": {
    borderColor: odysseyDesignTokens.PalettePrimaryMain,
  },
}));

const PaginationButtonContainer = styled("div")({
  "& > *": {
    marginInlineStart: `0 !important`,
  },
});

type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

const getClampedPagination = ({
  pageIndex,
  pageSize,
  totalRows,
}: PaginationState & { totalRows?: number }): PaginationState => {
  if (!totalRows) {
    return { pageIndex, pageSize };
  }

  const clampedPageSize = Math.min(pageSize, totalRows);
  const lastPageIndex = Math.ceil(totalRows / clampedPageSize);

  return {
    pageIndex: Math.min(Math.max(pageIndex, 1), lastPageIndex),
    pageSize: clampedPageSize,
  };
};

export type PaginationProps = {
  /**
   * The labeled rendered for the current page index
   */
  currentPageLabel?: string;
  /**
   * The number of items currently visible on the page
   */
  currentRowsCount?: number;
  /**
   * If `true`, shows a page-number input allowing users to navigate directly to a page.
   * @default true
   */
  hasPageInput?: boolean;
  /**
   * If `true`, shows a rows-per-page input allowing users to change how many rows are visible.
   * @default true
   */
  hasRowCountInput?: boolean;
  /**
   * If `true`, shows the "X – X of total X" row count label.
   * @default true
   */
  hasRowCountLabel?: boolean;
  /**
   * If `true`, all pagination controls are disabled.
   */
  isDisabled?: boolean;
  /**
   * If `true`, the next-page or Show More button is disabled.
   */
  isMoreDisabled?: boolean;
  /**
   * The current page last row index
   */
  lastRow?: number;
  /**
   * If the pagination is of "loadMore" variant, then this is the the load more label
   */
  loadMoreLabel?: string;
  /**
   * The max page
   */
  maxPageIndex?: number;
  /**
   * The max rows per page
   */
  maxPageSize?: number;
  /**
   * The label for the next control
   */
  nextLabel?: string;
  /**
   * Called when the page index or page size changes. Receives the new page index and page size.
   */
  onPaginationChange: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  /**
   * The current page index
   */
  pageIndex: number;
  /**
   * The current page size
   */
  pageSize: number;
  /**
   * The label for the previous control
   */
  previousLabel?: string;
  /**
   * The label that shows how many results are rendered per page
   */
  rowsPerPageLabel?: string;
  /**
   * Total rows count
   */
  totalRows?: number;
  /**
   * The type of pagination controls shown. Defaults to next/prev buttons, but can be set to a simple "Load more" button by setting to "loadMore".
   */
  variant?: (typeof paginationTypeValues)[number];
};

/**
 * A pagination control that allows users to navigate between pages of data or load more items. Supports paged navigation with previous/next buttons and a "load more" variant.
 */
const Pagination = ({
  currentPageLabel: currentPageLabelProp,
  currentRowsCount,
  hasPageInput = true,
  hasRowCountInput = true,
  hasRowCountLabel = true,
  isDisabled,
  isMoreDisabled,
  lastRow,
  loadMoreLabel: loadMoreLabelProp,
  maxPageIndex,
  maxPageSize,
  nextLabel: nextLabelProp,
  onPaginationChange: onPaginationChangeProp,
  pageIndex,
  pageSize,
  previousLabel: previousLabelProp,
  rowsPerPageLabel: rowsPerPageLabelProp,
  totalRows,
  variant,
}: PaginationProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pageSize);
  const initialRowsPerPage = useRef<number>(pageSize);

  const currentPageLabel = currentPageLabelProp ?? t("pagination.page");
  const loadMoreLabel = loadMoreLabelProp ?? t("pagination.loadmore");
  const nextLabel = nextLabelProp ?? t("pagination.next");
  const previousLabel = previousLabelProp ?? t("pagination.previous");
  const rowsPerPageLabel = rowsPerPageLabelProp ?? t("pagination.rowsperpage");

  useEffect(() => {
    setPage(pageIndex);
    setRowsPerPage(pageSize);
  }, [pageIndex, pageSize]);

  const onPaginationChange = useCallback(
    ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
      onPaginationChangeProp({ pageIndex, pageSize });
    },
    [onPaginationChangeProp],
  );

  const { totalRowsLabel } = usePagination({
    pageIndex,
    pageSize,
    currentRowsCount: currentRowsCount || 0,
    totalRows,
  });

  // Blur and Enter both commit through here so the two paths can't apply different limits.
  const handlePaginationChange = useCallback(() => {
    const clampedPagination = getClampedPagination({
      pageIndex: page,
      pageSize: rowsPerPage,
      totalRows,
    });

    // The sync effect only fires when the props change, so a clamped value that
    // equals the current props would otherwise leave the input showing the unclamped one.
    setPage(clampedPagination.pageIndex);
    setRowsPerPage(clampedPagination.pageSize);

    // Enter followed by blur commits twice, and DataView re-fires its own onPaginationChange for every new object, so an unchanged commit is dropped here.
    if (
      clampedPagination.pageIndex !== pageIndex ||
      clampedPagination.pageSize !== pageSize
    ) {
      onPaginationChange(clampedPagination);
    }
  }, [page, rowsPerPage, onPaginationChange, pageIndex, pageSize, totalRows]);

  const handleInputSubmit = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        handlePaginationChange();
      }
    },
    [handlePaginationChange],
  );

  const setPageFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // A number input still accepts a typed or pasted decimal, so it is truncated before it can become a fractional page.
      const wholeValue = Math.trunc(Number(event.target.value));
      const value = maxPageIndex
        ? Math.min(wholeValue, maxPageIndex)
        : wholeValue;

      // Ensure the value can't be less than 1
      setPage(Math.max(1, value));
    },
    [setPage, maxPageIndex],
  );

  const setRowsPerPageFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // A number input still accepts a typed or pasted decimal, so it is truncated before it can become a fractional page size.
      const wholeValue = Math.trunc(Number(event.target.value));
      const value = maxPageSize
        ? Math.min(wholeValue, maxPageSize)
        : wholeValue;

      // Ensure the value can't be less than 1
      setRowsPerPage(Math.max(1, value));
    },
    [setRowsPerPage, maxPageSize],
  );

  const handleLoadMore = useCallback(() => {
    onPaginationChange({
      pageIndex: 1,
      pageSize: rowsPerPage + initialRowsPerPage.current,
    });
  }, [rowsPerPage, onPaginationChange]);

  const handleNextButton = useCallback(() => {
    onPaginationChange({ pageIndex: page + 1, pageSize: rowsPerPage });
  }, [onPaginationChange, page, rowsPerPage]);

  const handlePreviousButton = useCallback(() => {
    onPaginationChange({ pageIndex: page - 1, pageSize: rowsPerPage });
  }, [onPaginationChange, page, rowsPerPage]);

  const loadMoreIsDisabled = useMemo(() => {
    return isMoreDisabled || (totalRows ? rowsPerPage >= totalRows : false);
  }, [isMoreDisabled, rowsPerPage, totalRows]);

  const nextButtonDisabled = useMemo(
    () =>
      isMoreDisabled ||
      (lastRow && (totalRows ? lastRow >= totalRows : false)) ||
      isDisabled,
    [isMoreDisabled, totalRows, lastRow, isDisabled],
  );

  const previousButtonDisabled = useMemo(
    () => pageIndex <= 1 || isDisabled,
    [pageIndex, isDisabled],
  );

  const rowsPerPageInputProps = useMemo(
    () => ({
      "aria-label": rowsPerPageLabel,
      max: maxPageSize || totalRows,
    }),
    [maxPageSize, rowsPerPageLabel, totalRows],
  );

  const currentPageInputProps = useMemo(
    () => ({
      "aria-label": currentPageLabel,
      max: maxPageIndex,
    }),
    [currentPageLabel, maxPageIndex],
  );

  return variant === "paged" ? (
    <PaginationContainer aria-label={t("pagination.label")}>
      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        {hasRowCountInput && (
          <Box>
            <Paragraph color="textSecondary" component="span">
              {rowsPerPageLabel}
            </Paragraph>
            <PaginationInput
              disabled={isDisabled}
              inputProps={rowsPerPageInputProps}
              odysseyDesignTokens={odysseyDesignTokens}
              onBlur={handlePaginationChange}
              onChange={setRowsPerPageFromEvent}
              onKeyDown={handleInputSubmit}
              type="number"
              value={rowsPerPage}
            />
          </Box>
        )}
        {hasRowCountLabel && (
          <Paragraph color="textSecondary" component="span">
            {totalRowsLabel}
          </Paragraph>
        )}
      </PaginationSegment>

      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        {totalRows && hasPageInput && (
          <Box>
            <Paragraph color="textSecondary" component="span">
              {currentPageLabel}
            </Paragraph>
            <PaginationInput
              disabled={isDisabled}
              inputProps={currentPageInputProps}
              odysseyDesignTokens={odysseyDesignTokens}
              onBlur={handlePaginationChange}
              onChange={setPageFromEvent}
              onKeyDown={handleInputSubmit}
              type="number"
              value={page}
            />
          </Box>
        )}
        <PaginationButtonContainer>
          <Button
            ariaLabel={previousLabel}
            isDisabled={previousButtonDisabled}
            onClick={handlePreviousButton}
            size="small"
            startIcon={<ArrowLeftIcon />}
            variant="floating"
          />
          <Button
            ariaLabel={nextLabel}
            endIcon={<ArrowRightIcon />}
            isDisabled={nextButtonDisabled}
            onClick={handleNextButton}
            size="small"
            variant="floating"
          />
        </PaginationButtonContainer>
      </PaginationSegment>
    </PaginationContainer>
  ) : (
    <Button
      isDisabled={loadMoreIsDisabled}
      label={loadMoreLabel}
      onClick={handleLoadMore}
      variant="secondary"
    />
  );
};

const MemoizedPagination = memo(Pagination);
MemoizedPagination.displayName = "Pagination";

export { MemoizedPagination as Pagination };
