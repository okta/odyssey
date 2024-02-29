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
import {
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Paragraph } from "../Typography";
import { Button } from "../Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons.generated";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { Box } from "../Box";
import { Trans, useTranslation } from "react-i18next";
import { paginationTypeValues } from "./constants";

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

export type DataTablePaginationProps = {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  totalRows?: number;
  isDisabled?: boolean;
  /**
   * The type of pagination controls shown. Defaults to next/prev buttons, but can be
   * set to a simple "Load more" button by setting to "loadMore".
   */
  variant?: (typeof paginationTypeValues)[number];
};

const DataTablePagination = ({
  pagination,
  setPagination,
  totalRows,
  isDisabled,
  variant,
}: DataTablePaginationProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [page, setPage] = useState<number>(pagination.pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pagination.pageSize);
  const initialRowsPerPage = useRef<number>(pagination.pageSize);

  const firstRow = pagination.pageSize * (pagination.pageIndex - 1) + 1;
  let lastRow = firstRow + (pagination.pageSize - 1);
  // If the last eligible row is greater than the number of total rows,
  // show the number of total rows instead (ie, if we're showing rows
  // 180-200 but there are only 190 rows, show 180-190 instead)
  lastRow = totalRows && lastRow > totalRows ? totalRows : lastRow;

  useEffect(() => {
    setPage(pagination.pageIndex);
    setRowsPerPage(pagination.pageSize);
  }, [pagination]);

  const handlePaginationChange = useCallback(() => {
    const updatedPage =
      totalRows && page * totalRows > lastRow
        ? Math.ceil(totalRows / rowsPerPage)
        : page;
    const updatedRowsPerPage =
      totalRows && rowsPerPage > totalRows ? totalRows : rowsPerPage;

    setPagination({
      pageIndex: updatedPage,
      pageSize: updatedRowsPerPage,
    });
  }, [page, rowsPerPage, lastRow, setPagination, totalRows]);

  // The following handlers use React.KeyboardEvent (rather than just KeyboardEvent) becuase React.KeyboardEvent
  // is generic, while plain KeyboardEvent is not. We need this generic so we can specify the HTMLInputElement,
  // which allows us to use currentTarget.value
  const handlePageSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        setPagination({
          pageIndex: parseInt(event.currentTarget.value),
          pageSize: rowsPerPage,
        });
      }
    },
    [rowsPerPage, setPagination],
  );

  const handleRowsPerPageSubmit = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.key === "Enter") {
        setPagination({
          pageIndex: page,
          pageSize: parseInt(event.currentTarget.value),
        });
      }
    },
    [page, setPagination],
  );

  const setPageFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(parseInt(event.target.value));
    },
    [setPage],
  );

  const setRowsPerPageFromEvent = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value));
    },
    [setRowsPerPage],
  );

  const handleLoadMore = useCallback(() => {
    setPagination({
      pageIndex: 1,
      pageSize: rowsPerPage + initialRowsPerPage.current,
    });
  }, [rowsPerPage, setPagination]);

  const handleNextButton = useCallback(() => {
    setPagination({ pageIndex: page + 1, pageSize: rowsPerPage });
  }, [setPagination, page, rowsPerPage]);

  const handlePreviousButton = useCallback(() => {
    setPagination({ pageIndex: page - 1, pageSize: rowsPerPage });
  }, [setPagination, page, rowsPerPage]);

  const loadMoreIsDisabled = useMemo(() => {
    return totalRows ? rowsPerPage >= totalRows : false;
  }, [rowsPerPage, totalRows]);

  const nextButtonDisabled = useMemo(
    () => (totalRows ? lastRow >= totalRows : false) || isDisabled,
    [totalRows, lastRow, isDisabled],
  );

  const previousButtonDisabled = useMemo(
    () => pagination.pageIndex <= 1 || isDisabled,
    [pagination, isDisabled],
  );

  return variant === "paged" ? (
    <PaginationContainer>
      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        <Box>
          <Paragraph component="span" color="textSecondary">
            {t("table.pagination.rowsperpage")}
          </Paragraph>
          <PaginationInput
            odysseyDesignTokens={odysseyDesignTokens}
            type="number"
            value={rowsPerPage}
            onChange={setRowsPerPageFromEvent}
            onBlur={handlePaginationChange}
            onKeyDown={handleRowsPerPageSubmit}
            disabled={isDisabled}
            inputProps={{
              "aria-label": t("table.pagination.rowsperpage"),
            }}
          />
        </Box>
        <Paragraph component="span" color="textSecondary">
          {totalRows ? (
            <Trans
              i18nKey="table.pagination.rowswithtotal"
              values={{ firstRow, lastRow, totalRows }}
            />
          ) : (
            <Trans
              i18nKey="table.pagination.rowswithouttotal"
              values={{ firstRow, lastRow }}
            />
          )}
        </Paragraph>
      </PaginationSegment>

      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        {totalRows && (
          <Box>
            <Paragraph component="span" color="textSecondary">
              {t("table.pagination.page")}
            </Paragraph>
            <PaginationInput
              odysseyDesignTokens={odysseyDesignTokens}
              type="number"
              value={page}
              onChange={setPageFromEvent}
              onBlur={handlePaginationChange}
              onKeyDown={handlePageSubmit}
              disabled={isDisabled}
              inputProps={{
                "aria-label": t("table.pagination.page"),
              }}
            />
          </Box>
        )}
        <PaginationButtonContainer>
          <Button
            startIcon={<ArrowLeftIcon />}
            variant="floating"
            size="small"
            ariaLabel={t("table.pagination.previous")}
            onClick={handlePreviousButton}
            isDisabled={previousButtonDisabled}
          />
          <Button
            endIcon={<ArrowRightIcon />}
            variant="floating"
            size="small"
            ariaLabel={t("table.pagination.next")}
            onClick={handleNextButton}
            isDisabled={nextButtonDisabled}
          />
        </PaginationButtonContainer>
      </PaginationSegment>
    </PaginationContainer>
  ) : (
    <Button
      variant="secondary"
      label={t("table.pagination.loadmore")}
      onClick={handleLoadMore}
      isDisabled={loadMoreIsDisabled}
    />
  );
};

const MemoizedDataTablePagination = memo(DataTablePagination);
export { MemoizedDataTablePagination as DataTablePagination };
