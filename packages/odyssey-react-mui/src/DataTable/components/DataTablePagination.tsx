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
  useState,
} from "react";
import { Paragraph } from "../../Typography";
import { Button } from "../../Button";
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons.generated";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";
import { Box } from "../../Box";

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationSegment = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  display: flex;
  align-items: center;
  gap: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing4};

  & > div {
    display: flex;
    align-items: center;
    gap: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing2};
  }
`;

const PaginationInput = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>`
  border-color: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.HueNeutral200};
  border-radius: ${({ odysseyDesignTokens }) =>
    odysseyDesignTokens.BorderRadiusTight};
  height: ${({ odysseyDesignTokens }) => odysseyDesignTokens.Spacing6};
  width: 4.5714285714rem;

  &:hover {
    border-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.HueNeutral400};
  }

  &.Mui-focused:hover {
    border-color: ${({ odysseyDesignTokens }) =>
      odysseyDesignTokens.PalettePrimaryMain};
  }
`;

export type DataTablePaginationProps = {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: Dispatch<
    SetStateAction<{ pageIndex: number; pageSize: number }>
  >;
  totalRows?: number;
};

const DataTablePagination = ({
  pagination,
  setPagination,
  totalRows,
}: DataTablePaginationProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const [page, setPage] = useState<number>(pagination.pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState<number>(pagination.pageSize);

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

  useEffect(() => {
    // If page is greater than the max, set it to the max
    // If rows are greater than the max, set it to the max
    if (!totalRows) return;

    // if (rowsPerPage > totalRows) {
    //   setRowsPerPage(totalRows);
    // }

    // if ((page * totalRows) > lastRow) {
    //   setPage(Math.ceil(totalRows / rowsPerPage));
    // }
  }, [page, rowsPerPage]);

  const handlePaginationChange = useCallback(() => {
    setPagination({
      pageIndex: page,
      pageSize: rowsPerPage,
    });
  }, [page, rowsPerPage]);

  const handlePageSubmit = useCallback((event) => {
    if (event.key === "Enter") {
      setPagination({
        pageIndex: event.target.value,
        pageSize: rowsPerPage,
      });
    }
  }, []);

  const handleRowsPerPageSubmit = useCallback((event) => {
    if (event.key === "Enter") {
      setPagination({
        pageIndex: page,
        pageSize: event.target.value,
      });
    }
  }, []);

  return (
    <PaginationContainer>
      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        <Box>
          <Paragraph component="span" color="textSecondary">
            Rows per page
          </Paragraph>
          <PaginationInput
            odysseyDesignTokens={odysseyDesignTokens}
            type="number"
            value={rowsPerPage}
            onChange={(event) => setRowsPerPage(parseInt(event.target.value))}
            onBlur={() => handlePaginationChange()}
            onKeyDown={(event) => handleRowsPerPageSubmit(event)}
          />
        </Box>
        <Paragraph component="span" color="textSecondary">
          {totalRows
            ? `${firstRow}-${lastRow} of ${totalRows} rows`
            : `${firstRow}-${lastRow}`}
        </Paragraph>
      </PaginationSegment>

      <PaginationSegment odysseyDesignTokens={odysseyDesignTokens}>
        {totalRows && (
          <Box>
            <Paragraph component="span" color="textSecondary">
              Page
            </Paragraph>
            <PaginationInput
              odysseyDesignTokens={odysseyDesignTokens}
              type="number"
              value={page}
              onChange={(event) => setPage(parseInt(event.target.value))}
              onBlur={() => handlePaginationChange()}
              onKeyDown={(event) => handlePageSubmit(event)}
            />
          </Box>
        )}
        <Box>
          <Button
            startIcon={<ArrowLeftIcon />}
            variant="floating"
            size="small"
            ariaLabel="Previous page"
            onClick={() =>
              setPagination({ pageIndex: page - 1, pageSize: rowsPerPage })
            }
            isDisabled={pagination.pageIndex <= 1}
          />
          <Button
            endIcon={<ArrowRightIcon />}
            variant="floating"
            size="small"
            ariaLabel="Next page"
            onClick={() =>
              setPagination({ pageIndex: page + 1, pageSize: rowsPerPage })
            }
            isDisabled={totalRows ? lastRow >= totalRows : false}
          />
        </Box>
      </PaginationSegment>
    </PaginationContainer>
  );
};

const MemoizedDataTablePagination = memo(DataTablePagination);
export { MemoizedDataTablePagination as DataTablePagination };
