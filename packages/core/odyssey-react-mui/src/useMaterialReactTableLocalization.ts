/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import type { MRT_Localization } from "material-react-table";

import { useMemo } from "react";

import { useTranslation } from "./i18n.generated/i18n.js";

/**
 * Material React Table falls back to built-in English for every string it renders unless `localization` is passed, so each Odyssey table passes this.
 *
 * It covers only the strings an Odyssey table can show. `DataTable` and `DataView` turn off MRT's toolbars, filters, column menus, and pagination, and set their own drag handle and actions column labels. The deprecated `PaginatedTable` and `StaticTable` keep MRT's toolbars, which is where most of these come from. Translating the other MRT strings would give translators work nobody sees. Nothing fails when a table starts showing a string this leaves out, so a change that turns on an MRT feature adds that feature's strings here. See `docs/decisions/2026-11-16-translate-only-mrt-strings-a-table-shows.md`.
 *
 * MRT substitutes its own `{column}`-style placeholders after it receives these strings, so each placeholder is passed back to i18next as its literal token.
 */
export const useMaterialReactTableLocalization =
  (): Partial<MRT_Localization> => {
    const { t } = useTranslation();

    return useMemo(
      () => ({
        clearFilter: t("table.mrt.clearfilter"),
        clearSearch: t("table.mrt.clearsearch"),
        clearSelection: t("table.mrt.clearselection"),
        collapse: t("table.rowexpansion.collapse"),
        columnActions: t("table.mrt.columnactions"),
        expand: t("table.rowexpansion.expand"),
        filterByColumn: t("table.mrt.filterbycolumn", { column: "{column}" }),
        goToNextPage: t("table.mrt.gotonextpage"),
        goToPreviousPage: t("table.mrt.gotopreviouspage"),
        hideAll: t("table.mrt.hideall"),
        hideColumn: t("table.mrt.hidecolumn", { column: "{column}" }),
        noRecordsToDisplay: t("table.mrt.norecordstodisplay"),
        noResultsFound: t("table.mrt.noresultsfound"),
        of: t("table.mrt.of"),
        rowsPerPage: t("table.mrt.rowsperpage"),
        search: t("table.mrt.search"),
        select: t("table.mrt.select"),
        selectedCountOfRowCountRowsSelected: t(
          "table.mrt.selectedcountofrowcountrowsselected",
          { selectedCount: "{selectedCount}", rowCount: "{rowCount}" },
        ),
        showAll: t("table.mrt.showall"),
        showAllColumns: t("table.mrt.showallcolumns"),
        showHideColumns: t("table.mrt.showhidecolumns"),
        showHideFilters: t("table.mrt.showhidefilters"),
        showHideSearch: t("table.mrt.showhidesearch"),
        sortByColumnAsc: t("table.mrt.sortbycolumnasc", { column: "{column}" }),
        sortByColumnDesc: t("table.mrt.sortbycolumndesc", {
          column: "{column}",
        }),
        sortedByColumnAsc: t("table.mrt.sortedbycolumnasc", {
          column: "{column}",
        }),
        sortedByColumnDesc: t("table.mrt.sortedbycolumndesc", {
          column: "{column}",
        }),
        toggleDensity: t("table.mrt.toggledensity"),
        toggleFullScreen: t("table.mrt.togglefullscreen"),
        toggleSelectAll: t("table.mrt.toggleselectall"),
        toggleSelectRow: t("table.mrt.toggleselectrow"),
        toggleVisibility: t("table.mrt.togglevisibility"),
      }),
      [t],
    );
  };
