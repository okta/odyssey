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

import { InputBase } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Paragraph } from "../Typography";
import { Button } from "../Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons.generated";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Box } from "../Box";
import { paginationTypeValues } from "./constants";
import { usePagination } from "./usePagination";

const PaginationContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const PaginationSegment = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
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
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
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

export type PaginationProps = {
  /**
   * The current page index
   */
  pageIndex: number;
  /**
   * The current page size
   */
  pageSize: number;
  /**
   * The max rows per page
   */
  maxPageSize?: number;
  /**
   * The max page
   */
  maxPageIndex?: number;
  /**
   * Page index and page size setter
   */
  onPaginationChange: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  /**
   * The current page last row index
   */
  lastRow: number;
  /**
   * Total rows count
   */
  totalRows?: number;
  /**
   * If true, the pagination controls will be disabled
   */
  isDisabled?: boolean;
  /**
   * The type of pagination controls shown. Defaults to next/prev buttons, but can be
   * set to a simple "Load more" button by setting to "loadMore".
   */
  variant?: (typeof paginationTypeValues)[number];
  /**
   * The label that shows how many results are rendered per page
   */
  rowsPerPageLabel: string;
  /**
   * The labeled rendered for the current page index
   */
  currentPageLabel: string;
  /**
   * The label for the previous control
   */
  previousLabel: string;
  /**
   * The label for the next control
   */
  nextLabel: string;
  /**
   * If the pagination is of "loadMore" variant, then this is the the load more label
   */
  loadMoreLabel: string;
};

const Pagination = ({
  pageIndex,
  pageSize,
  maxPageSize,
  maxPageIndex,
  onPaginationChange,
  lastRow,
  totalRows,
  isDisabled,
  variant,
  rowsPerPageLabel,
  currentPageLabel,
  previousLabel,
  nextLabel,
  loadMoreLabel,
}: PaginationProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const [page, setPage] = useState<number>(pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pageSize);
  const initialRowsPerPage = useRef<number>(pageSize);

  useEffect(() => {
    setPage(pageIndex);
    setRowsPerPage(pageSize);
  }, [pageIndex, pageSize]);

  const { totalRowsLabel } = usePagination({ pageIndex, pageSize, totalRows });

  const handlePaginationChange = useCallback(() => {
    const updatedPage =
      totalRows && page * totalRows > lastRow
        ? Math.ceil(totalRows / rowsPerPage)
        : page;
    const updatedRowsPerPage =
      totalRows && rowsPerPage > totalRows ? totalRows : rowsPerPage;

    onPaginationChange({
      pageIndex: updatedPage,
      pageSize: updatedRowsPerPage,
    });
  }, [page, rowsPerPage, lastRow, onPaginationChange, totalRows]);

  // The following handlers use React.KeyboardEvent (rather than just KeyboardEvent) becuase React.KeyboardEvent
  // is generic, while plain KeyboardEvent is not. We need this generic so we can specify the HTMLInputElement,
  // which allows us to use currentTarget.value
  const handlePageSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        onPaginationChange({
          pageIndex: parseInt(event.currentTarget.value),
          pageSize: rowsPerPage,
        });
      }
    },
    [rowsPerPage, onPaginationChange],
  );

  const handleRowsPerPageSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        onPaginationChange({
          pageIndex: page,
          pageSize: parseInt(event.currentTarget.value),
        });
      }
    },
    [page, onPaginationChange],
  );

  const setPageFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = maxPageIndex
        ? Math.min(parseInt(event.target.value), maxPageIndex)
        : parseInt(event.target.value);
      setPage(value);
    },
    [setPage, maxPageIndex],
  );

  const setRowsPerPageFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = maxPageSize
        ? Math.min(parseInt(event.target.value), maxPageSize)
        : parseInt(event.target.value);
      setRowsPerPage(value);
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
    return totalRows ? rowsPerPage >= totalRows : false;
  }, [rowsPerPage, totalRows]);

  const nextButtonDisabled = useMemo(
    () => (totalRows ? lastRow >= totalRows : false) || isDisabled,
    [totalRows, lastRow, isDisabled],
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
    <PaginationContainer>
      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        <Box>
          <Paragraph component="span" color="textSecondary">
            {rowsPerPageLabel}
          </Paragraph>
          <PaginationInput
            odysseyDesignTokens={odysseyDesignTokens}
            type="number"
            value={rowsPerPage}
            onChange={setRowsPerPageFromEvent}
            onBlur={handlePaginationChange}
            onKeyDown={handleRowsPerPageSubmit}
            disabled={isDisabled}
            inputProps={rowsPerPageInputProps}
          />
        </Box>
        <Paragraph component="span" color="textSecondary">
          {totalRowsLabel}
        </Paragraph>
      </PaginationSegment>

      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        {totalRows && (
          <Box>
            <Paragraph component="span" color="textSecondary">
              {currentPageLabel}
            </Paragraph>
            <PaginationInput
              odysseyDesignTokens={odysseyDesignTokens}
              type="number"
              value={page}
              onChange={setPageFromEvent}
              onBlur={handlePaginationChange}
              onKeyDown={handlePageSubmit}
              disabled={isDisabled}
              inputProps={currentPageInputProps}
            />
          </Box>
        )}
        <PaginationButtonContainer>
          <Button
            startIcon={<ArrowLeftIcon />}
            variant="floating"
            size="small"
            ariaLabel={previousLabel}
            onClick={handlePreviousButton}
            isDisabled={previousButtonDisabled}
          />
          <Button
            endIcon={<ArrowRightIcon />}
            variant="floating"
            size="small"
            ariaLabel={nextLabel}
            onClick={handleNextButton}
            isDisabled={nextButtonDisabled}
          />
        </PaginationButtonContainer>
      </PaginationSegment>
    </PaginationContainer>
  ) : (
    <Button
      variant="secondary"
      label={loadMoreLabel}
      onClick={handleLoadMore}
      isDisabled={loadMoreIsDisabled}
    />
  );
};

const MemoizedPagination = memo(Pagination);
MemoizedPagination.displayName = "Pagination";

export { MemoizedPagination as Pagination };
