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

import { memo } from "react";
import { Box } from "../Box.js";
import { Button } from "../Buttons/index.js";
import { Support } from "../Typography.js";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons.generated/index.js";

export const paginationTypeValues = ["paged", "loadMore"] as const;

export type DataTablePaginationProps = {
  currentPage?: number;
  currentNumberOfResults?: number;
  isNextButtonDisabled?: boolean;
  isPreviousButtonDisabled?: boolean;
  onClickNext: () => void;
  onClickPrevious?: () => void;
  paginationType?: (typeof paginationTypeValues)[number];
};

const DataTablePagination = ({
  currentPage,
  currentNumberOfResults,
  isNextButtonDisabled,
  isPreviousButtonDisabled,
  onClickNext,
  onClickPrevious,
  paginationType,
}: DataTablePaginationProps) => {
  return (
    <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
      {paginationType === "loadMore" ? (
        <>
          <Button
            label="Show more"
            variant="secondary"
            onClick={onClickNext}
            isDisabled={isNextButtonDisabled}
          />
          {currentNumberOfResults && (
            <Support color="textSecondary">
              {currentNumberOfResults} results
            </Support>
          )}
        </>
      ) : (
        <>
          <Button
            label="Previous"
            startIcon={<ArrowLeftIcon />}
            variant="secondary"
            onClick={onClickPrevious}
            isDisabled={isPreviousButtonDisabled}
          />
          {currentPage && (
            <Box>
              <Support color="textSecondary" component="span">
                Page {currentPage}
              </Support>
            </Box>
          )}
          <Button
            label="Next"
            endIcon={<ArrowRightIcon />}
            variant="secondary"
            onClick={onClickNext}
            isDisabled={isNextButtonDisabled}
          />
        </>
      )}
    </Box>
  );
};

const MemoizedDataTablePagination = memo(DataTablePagination);
MemoizedDataTablePagination.displayName = "DataTablePagination";

export { MemoizedDataTablePagination as DataTablePagination };
