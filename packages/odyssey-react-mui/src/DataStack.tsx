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

import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "./Box";
import { DataFilter, DataFilters } from "./labs/DataFilters";
import { DataTablePagination } from "./DataTable/DataTablePagination";
import { Callout } from "./Callout";
import { paginationTypeValues } from "./DataTable/constants";
import { t } from "i18next";
import { MenuButton } from "./MenuButton";
import { GridIcon, ListIcon } from "./icons.generated";
import { MenuItem } from "./MenuItem";
import { CircularProgress } from "./CircularProgress";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "./OdysseyDesignTokensContext";
import styled from "@emotion/styled";
import { DataTableEmptyState } from "./DataTable";

export type DataStackGetDataType = {
  page?: number;
  resultsPerPage?: number;
  search?: string;
  filters?: DataFilter[];
};

const LoadingContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingBlock: odysseyDesignTokens.Spacing9,
}));

const ContentContainer = styled("div", {
  shouldForwardProp: (prop) =>
    prop !== "odysseyDesignTokens" && prop !== "isGrid",
})(
  ({
    odysseyDesignTokens,
    isGrid,
  }: {
    odysseyDesignTokens: DesignTokens;
    isGrid: boolean;
  }) => ({
    display: "grid",
    gap: odysseyDesignTokens.Spacing4,
    gridAutoFlow: isGrid ? "initial" : "row",
    gridTemplateColumns: isGrid ? "repeat(3, 1fr)" : "none",
    marginBlock: odysseyDesignTokens.Spacing5,

    "@media (max-width: 800px)": {
      gridTemplateColumns: "1fr",
    },
  }),
);

export type DataStackProps<T> = {
  /**
   * A render prop function that will render the data. It receives the current page data as a prop.
   */
  renderItem: (item: T) => ReactNode;
  /**
   * Callback that fires whenever the component needs to fetch new data, due to changes in
   * page, results per page, search input, or filters
   */
  getData: ({
    page,
    resultsPerPage,
    search,
    filters,
  }: DataStackGetDataType) => T[] | Promise<T[]>;
  /**
   * The total number of items in the dataset, used for pagination.
   * Optional, because it might be unknown or dynamically calculated.
   */
  totalItems?: number;
  /**
   * If true, the component will include pagination controls.
   */
  hasPagination?: boolean;
  /**
   * If true, the global search controls will be shown.
   */
  hasSearch?: boolean;
  /**
   * The debounce time, in milliseconds, for the search input firing
   * `onChangeSearch` when changed.
   */
  searchDelayTime?: number;
  /**
   * The component to display when there are no results.
   */
  noResultsPlaceholder?: ReactNode;
  /**
   * Custom error message to display when data fetching fails.
   */
  errorMessage?: string;
  /**
   * The current page number.
   */
  currentPage?: number;
  /**
   * The number of results per page.
   */
  resultsPerPage?: number;
  /**
   * The type of pagination controls shown. Defaults to next/prev buttons, but can be
   * set to a simple "Load more" button by setting to "loadMore".
   */
  paginationType?: (typeof paginationTypeValues)[number];
  layout?: "stack" | "grid";
  hasChangeableLayout?: boolean;
  filters?: DataFilter[];
  emptyPlaceholder?: ReactNode;
};

const DataStack = <T,>({
  renderItem,
  getData,
  totalItems,
  hasPagination = false,
  hasSearch = false,
  searchDelayTime = 300,
  noResultsPlaceholder,
  currentPage = 1,
  resultsPerPage = 20,
  layout: layoutProp = "stack",
  paginationType = "paged",
  hasChangeableLayout = true,
  errorMessage: errorMessageProp,
  filters: filtersProp,
  emptyPlaceholder,
}: DataStackProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: resultsPerPage,
  });
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<DataFilter[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<DataStackProps<T>["layout"]>(layoutProp);
  const [isEmpty, setIsEmpty] = useState<boolean | undefined>();
  const [initialFilters, setInitialFilters] = useState<DataFilter[]>();
  const [errorMessage, setErrorMessage] = useState(errorMessageProp);

  const odysseyDesignTokens = useOdysseyDesignTokens();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setErrorMessage(errorMessageProp);
      try {
        const incomingData = await getData?.({
          page: pagination.pageIndex,
          resultsPerPage: pagination.pageSize,
          search,
          filters,
        });
        setData(incomingData);
      } catch (error) {
        setErrorMessage(typeof error === "string" ? error : t("table.error"));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [pagination, search, filters, getData, errorMessageProp]);

  const changeLayout = useCallback(
    (newLayout: DataStackProps<T>["layout"]) =>
      (_event: React.MouseEvent<HTMLLIElement>) => {
        // This is necessary to avoid linter errors, while the _event is necessary to satisfy the onClick type
        if (process.env.NODE_ENV === "development") console.debug(_event);
        setLayout(newLayout);
      },
    [setLayout],
  );

  // const additionalActions = !hasChangeableLayout ? undefined : useMemo(() => (
  const additionalActions = useMemo(() => {
    return !hasChangeableLayout ? undefined : (
      <MenuButton
        endIcon={layout === "grid" ? <GridIcon /> : <ListIcon />}
        buttonLabel={`${layout!.charAt(0).toUpperCase() + layout!.slice(1)}`}
        menuAlignment="right"
        shouldCloseOnSelect={false}
      >
        <MenuItem
          key="stack"
          isSelected={layout === "stack"}
          onClick={changeLayout("stack")}
        >
          Stack
        </MenuItem>
        <MenuItem
          key="grid"
          isSelected={layout === "grid"}
          onClick={changeLayout("grid")}
        >
          Grid
        </MenuItem>
      </MenuButton>
    );
  }, [hasChangeableLayout, layout, changeLayout]);

  const emptyState = useCallback(() => {
    const noResultsContent = noResultsPlaceholder || (
      <DataTableEmptyState
        heading={t("table.noresults.heading")}
        text={t("table.noresults.text")}
      />
    );

    return emptyPlaceholder && isEmpty ? emptyPlaceholder : noResultsContent;
  }, [emptyPlaceholder, noResultsPlaceholder, isEmpty]);

  useEffect(() => {
    if (!initialFilters && filters) {
      setInitialFilters(filters);
    }

    setIsEmpty(
      pagination.pageIndex === currentPage &&
        pagination.pageSize === resultsPerPage &&
        search === "" &&
        filters === initialFilters &&
        data.length === 0,
    );
  }, [
    filters,
    pagination,
    search,
    data,
    currentPage,
    initialFilters,
    resultsPerPage,
  ]);

  return (
    <>
      {(hasSearch || hasPagination) && (
        <DataFilters
          onChangeSearch={hasSearch ? setSearch : undefined}
          onChangeFilters={setFilters}
          searchDelayTime={searchDelayTime}
          filters={filtersProp}
          additionalActions={additionalActions}
          isDisabled={isEmpty}
        />
      )}

      {errorMessage && (
        <Box sx={{ marginBlockEnd: 2 }}>
          <Callout severity="error" text={errorMessage} />
        </Box>
      )}

      {isLoading ? (
        <LoadingContainer odysseyDesignTokens={odysseyDesignTokens}>
          <CircularProgress />
        </LoadingContainer>
      ) : data.length > 0 ? (
        <ContentContainer
          odysseyDesignTokens={odysseyDesignTokens}
          isGrid={layout === "grid"}
        >
          {data.map((item) => renderItem(item))}
        </ContentContainer>
      ) : (
        emptyState
      )}

      {hasPagination && (
        <DataTablePagination
          pagination={pagination}
          setPagination={setPagination}
          totalRows={totalItems}
          variant={paginationType}
          isDisabled={isEmpty}
        />
      )}
    </>
  );
};

// This is necessary to preserve the generic
// const MemoizedDataStack = memo(DataStack);
// MemoizedDataStack.displayName = "DataStack";

// export { MemoizedDataStack as DataStack };

// Removed the memoization temporarily because memoized components
// can't accept generics
export { DataStack };
