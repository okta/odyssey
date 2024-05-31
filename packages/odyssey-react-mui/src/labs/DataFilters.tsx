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

import {
  MutableRefObject,
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  IconButton as MuiIconButton,
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Popover as MuiPopover,
  Typography as MuiTypography,
} from "@mui/material";
import { MRT_ColumnDef, MRT_RowData } from "material-react-table";
import styled from "@emotion/styled";

import { Autocomplete } from "../Autocomplete";
import { Box } from "../Box";
import { Button } from "../Button";
import { CheckboxGroup } from "../CheckboxGroup";
import { Checkbox } from "../Checkbox";
import {
  CheckIcon,
  ChevronRightIcon,
  CloseCircleFilledIcon,
  FilterIcon,
} from "../icons.generated";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext";
import { RadioGroup } from "../RadioGroup";
import { Radio } from "../Radio";
import { SearchField } from "../SearchField";
import { Tag } from "../Tag";
import { TagList } from "../TagList";
import { TextField } from "../TextField";
import { Subordinate } from "../Typography";

const AutocompleteOuterContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})(({ odysseyDesignTokens }: { odysseyDesignTokens: DesignTokens }) => ({
  display: "flex",
  alignItems: "flex-end",
  gap: odysseyDesignTokens.Spacing2,
}));

const AutocompleteInnerContainer = styled("div")({
  width: "100%",
});

type Option = {
  label: string;
  value: string;
};

export type DataFilterValue = string | string[] | Option[] | undefined;

export type UpdateFiltersOrValues = ({
  filterId,
  value,
}: {
  filterId: string;
  value: DataFilterValue;
}) => void;

// This is the shape of each individual filter
export type DataFilter = {
  /**
   * A unique ID for the filter, typically the same id
   * as the column it'll be applied to.
   */
  id: Exclude<MRT_ColumnDef<MRT_RowData>["accessorKey"], undefined>;
  /**
   * The human-friendly name of the filter.
   */
  label: string;
  /**
   * The type of filter, which determines which filtering control
   * is shown.
   */
  variant?: MRT_ColumnDef<MRT_RowData>["filterVariant"];
  /**
   * The current value of the filter. Typically a string, but
   * filters that allow for multiple selections (such as multi-select)
   * can accept an array.
   */
  value?: DataFilterValue;
  /**
   * If the filter control has preset options (such as a select or multi-select),
   * these are the options provided.
   */
  options?: Option[];
  /**
   * A callback which renders a custom filter control
   */
  render?: (updateFilters: UpdateFiltersOrValues) => ReactNode;
};

// This is the type of the DataFilters component itself
export type DataFiltersProps = {
  /**
   * The callback that's fired when the search input changes
   * (either on change or on submit, based on the value of `hasSearchSubmitButton`).
   * If this is undefined, the search input will not be shown.
   */
  onChangeSearch?: (value: string) => void;
  /**
   * The callback that's fired when filter values change.
   */
  onChangeFilters?: (filters: Array<DataFilter>) => void;
  /**
   * If true, a Search button will be provided alongside the search input
   * and `onChangeSearch` will fire when the button is clicked, rather than
   * whenever the input value changes.
   */
  hasSearchSubmitButton?: boolean;
  /**
   * The debounce time, in milliseconds, for the search input firing
   * `onChangeSearch` when changed. If `hasSearchSubmitButton` is true,
   * this doesn't do anything.
   */
  searchDelayTime?: number;
  /**
   * The starting value of the search input
   */
  defaultSearchTerm?: string;
  /**
   * A slot for optional additional actions, like buttons, to be displayed
   * on the opposite side of the top row from the search and filter controls.
   */
  additionalActions?: ReactNode;
  /**
   * The filters available in the filter menu. If undefined,
   * the filter menu won't be shown.
   */
  filters?: Array<DataFilter>;
  /**
   * If true, the filter and search will be disabled
   */
  isDisabled?: boolean;
};

type FilterTagsProps = {
  activeFilters: DataFilter[];
  updateFilterAndInputValues: UpdateFiltersOrValues;
};

type FiltersToRender = {
  id: string;
  label: string;
  value: string;
};

const FilterTags = ({
  activeFilters,
  updateFilterAndInputValues,
}: FilterTagsProps) => {
  const filtersWithValues = activeFilters.filter(
    (activeFilter: DataFilter) => activeFilter.value,
  );
  const filtersToRender: FiltersToRender[] = [];

  filtersWithValues.forEach((filter) => {
    if (Array.isArray(filter.value)) {
      filter.value.forEach((filterValue) => {
        const formattedValue =
          typeof filterValue === "string" ? filterValue : filterValue.value;
        filtersToRender.push({
          id: filter.id,
          label: filter.label,
          value: formattedValue,
        });
      });
    }
    if (typeof filter.value === "string") {
      filtersToRender.push({
        id: filter.id,
        label: filter.label,
        value: filter.value,
      });
    }
  });

  const getFilter = (id: string) =>
    filtersWithValues.find((filter) => filter.id === id);

  const removeValueFromFilterAndInput = (
    id: string,
    removedFilterValue: string,
  ) => {
    const currentFilter = getFilter(id);

    if (currentFilter) {
      const { value } = currentFilter;

      if (Array.isArray(value)) {
        const updatedValues = value.filter((currentValue) => {
          return (currentValue as Option).value !== removedFilterValue;
        });
        updateFilterAndInputValues({
          filterId: id,
          value:
            updatedValues.length > 0 ? (updatedValues as Option[]) : undefined,
        });
      }

      if (typeof value === "string") {
        updateFilterAndInputValues({
          filterId: id,
          value: undefined,
        });
      }
    }
  };

  return (
    <TagList>
      {filtersToRender.map((filter) => (
        <Tag
          key={`${filter.label}: ${filter.value}`}
          label={`${filter.label}: ${filter.value}`}
          onRemove={() =>
            removeValueFromFilterAndInput(filter.id, filter.value)
          }
        />
      ))}
    </TagList>
  );
};

const MemoizedFilterTags = memo(FilterTags);
MemoizedFilterTags.displayName = "FilterTags";

const DataFilters = ({
  onChangeSearch,
  onChangeFilters,
  hasSearchSubmitButton = false,
  searchDelayTime = 200,
  defaultSearchTerm = "",
  additionalActions,
  filters: filtersProp = [],
  isDisabled,
}: DataFiltersProps) => {
  const [filters, setFilters] = useState<DataFilter[]>(filtersProp);
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const initialInputValues = useMemo(() => {
    return filtersProp.reduce(
      (accumulator, filter) => {
        accumulator[filter.id] = filter.value;
        return accumulator;
      },
      {} as Record<string, DataFilterValue>,
    );
  }, [filtersProp]);

  const [inputValues, setInputValues] = useState(initialInputValues);

  const [searchValue, setSearchValue] = useState<string>(defaultSearchTerm);

  const activeFilters = useMemo(
    () => filters.filter((filter) => filter.value),
    [filters],
  );

  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState<boolean>(false);

  const [filtersMenuAnchorElement, setFiltersMenuAnchorElement] = useState<
    HTMLElement | undefined
  >();

  const [isFilterPopoverOpen, setIsFilterPopoverOpen] =
    useState<boolean>(false);

  const [filterPopoverAnchorElement, setFilterPopoverAnchorElement] = useState<
    HTMLElement | undefined
  >();

  const [filterPopoverCurrentFilter, setFilterPopoverCurrentFilter] = useState<
    DataFilter | undefined
  >();

  const menuRef = useRef<HTMLDivElement>();

  useEffect(() => {
    onChangeFilters?.(filters);
  }, [filters, onChangeFilters]);

  const debouncer = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (!hasSearchSubmitButton) {
      if (debouncer.current) {
        clearTimeout(debouncer.current);
      }

      debouncer.current = setTimeout(() => {
        onChangeSearch?.(searchValue ?? "");
      }, searchDelayTime);
    }
  }, [onChangeSearch, searchValue, searchDelayTime, hasSearchSubmitButton]);

  const autocompleteOptions = useMemo(() => {
    return filterPopoverCurrentFilter?.options || [];
  }, [filterPopoverCurrentFilter]);

  const updateInputValue = useCallback<UpdateFiltersOrValues>(
    ({ filterId, value }) => {
      setInputValues({ ...inputValues, [filterId]: value });
    },
    [inputValues],
  );

  const updateFilters = useCallback<UpdateFiltersOrValues>(
    ({ filterId, value }) => {
      const updatedFilters = filtersProp.map((filter) => ({
        ...filter,
        value: filter.id === filterId ? value : inputValues[filter.id],
      }));

      setFilters(updatedFilters);
    },
    [inputValues, filtersProp],
  );

  const updateFilterAndInputValues = useCallback<UpdateFiltersOrValues>(
    ({ filterId, value }) => {
      updateInputValue({ filterId, value });
      updateFilters({ filterId, value });
    },
    [updateFilters, updateInputValue],
  );

  const handleCheckboxFilterAndInputValueChange = useCallback<
    (filterId: string, option: Option, checked: boolean) => void
  >(
    (filterId, option, checked) => {
      const currentValues = (inputValues[filterId] as Option[]) || [];

      const updatedValues = checked
        ? [...currentValues, option]
        : currentValues.filter(
            (inputValue) => inputValue.value !== option.value,
          );

      const normalizedUpdatedValues =
        updatedValues.length > 0 ? updatedValues : undefined;

      setInputValues({
        ...inputValues,
        [filterId]: normalizedUpdatedValues,
      });

      const updatedFilters = filters.map((filter) => ({
        ...filter,
        value:
          filter.id === filterId
            ? normalizedUpdatedValues
            : inputValues[filter.id],
      }));

      setFilters(updatedFilters);
    },
    [filters, inputValues],
  );

  const handleAutocompleteFilterChange = useCallback<
    (filterId: string, option: Option[]) => void
  >(
    (filterId, option) => {
      setInputValues({ ...inputValues, [filterId]: option });
    },
    [inputValues],
  );

  const clearAllFilters = useCallback(() => {
    const updatedInputValues = filtersProp.reduce(
      (accumulator, filter) => {
        accumulator[filter.id] = undefined;
        return accumulator;
      },
      {} as Record<string, DataFilterValue>,
    );

    setInputValues(updatedInputValues);

    const updatedFilters = filtersProp.map((filter) => ({
      ...filter,
      value: undefined,
    }));

    setFilters(updatedFilters);
  }, [filtersProp]);

  const handleFilterSubmit = useCallback(() => {
    const updatedFilters = filtersProp.map((filter) => ({
      ...filter,
      value: inputValues[filter.id],
    }));

    setFilters(updatedFilters);
  }, [inputValues, filtersProp]);

  const filterMenu = useMemo(
    () => (
      <>
        <Box>
          <Button
            aria-controls={isFiltersMenuOpen ? "filters-menu" : undefined}
            aria-expanded={isFiltersMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            ariaLabel={t("filters.filters.arialabel")}
            isDisabled={isDisabled}
            endIcon={<FilterIcon />}
            onClick={(event) => {
              setFiltersMenuAnchorElement(event.currentTarget);
              setIsFiltersMenuOpen(true);
            }}
            variant="secondary"
          />
        </Box>

        <MuiMenu
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          id="filters-menu"
          anchorEl={filtersMenuAnchorElement}
          onClose={() => setIsFiltersMenuOpen(false)}
          open={isFiltersMenuOpen}
          PaperProps={{
            ref: menuRef as MutableRefObject<HTMLDivElement>,
          }}
        >
          {filtersProp.map((filter) => {
            // Unintuitively, we can't just use filter.value to grab the filter value.
            // `filter` is the initial set of filters provided to the comoponent, so its
            // value prop may not reflect the current value of the filter.
            const latestFilterValue = filters.find(
              (f) => f.id === filter.id,
            )?.value;

            return (
              <MuiMenuItem
                key={filter.id}
                onClick={(event) => {
                  setIsFilterPopoverOpen(true);
                  setFilterPopoverAnchorElement(event.currentTarget);
                  setFilterPopoverCurrentFilter(filter);
                }}
                selected={
                  filterPopoverCurrentFilter === filter &&
                  isFilterPopoverOpen === true
                }
                className={
                  filterPopoverCurrentFilter === filter &&
                  isFilterPopoverOpen === true
                    ? "isVisiblySelected"
                    : undefined
                }
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minWidth: 180,
                    paddingBlock: 1,
                    paddingInlineStart: 2,
                  }}
                >
                  <Box sx={{ marginRight: 2 }}>
                    <MuiTypography fontWeight="500" sx={{ marginBlockEnd: 2 }}>
                      {filter.label}
                    </MuiTypography>
                    <Subordinate component="div">
                      {!latestFilterValue ||
                      (Array.isArray(latestFilterValue) &&
                        latestFilterValue.length === 0) ? (
                        <Trans
                          i18nKey="filters.menuitem.any"
                          values={{
                            label: filter.label.toLowerCase(),
                          }}
                        />
                      ) : Array.isArray(latestFilterValue) ? (
                        <Trans
                          count={latestFilterValue.length}
                          i18nKey="filters.menuitem.selected"
                          values={{
                            selected: latestFilterValue.length,
                          }}
                        />
                      ) : (
                        latestFilterValue
                      )}
                    </Subordinate>
                  </Box>
                  <ChevronRightIcon />
                </Box>
              </MuiMenuItem>
            );
          })}
        </MuiMenu>
      </>
    ),
    [
      isFiltersMenuOpen,
      isDisabled,
      filterPopoverCurrentFilter,
      isFilterPopoverOpen,
      filtersMenuAnchorElement,
      filtersProp,
      filters,
      t,
    ],
  );

  const autoCompleteValue = useMemo(
    () =>
      filterPopoverCurrentFilter?.id
        ? (inputValues[filterPopoverCurrentFilter.id] as Option[])
        : undefined,
    [filterPopoverCurrentFilter, inputValues],
  );

  return (
    <Box>
      {/* Upper section */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Upper section left (filters and search) */}
        <Box sx={{ display: "flex", gap: 2, width: "50%", maxWidth: 480 }}>
          {/* Filter menu */}
          {filters.length > 0 && (
            <>
              {filterMenu}
              {/* Filter popover */}
              <MuiPopover
                anchorEl={filterPopoverAnchorElement}
                // Positions the popover flush with the edge of the parent menu
                // and at the right shadow elevation. These magic values are simply
                // to match the default popover offset.
                elevation={2}
                sx={{ marginLeft: 2, marginTop: -1 }}
                open={isFilterPopoverOpen}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={(ev: MouseEvent) => {
                  if (menuRef.current) {
                    const menuRect = menuRef.current.getBoundingClientRect();
                    const clickInsideMenu =
                      ev.clientX >= menuRect.left &&
                      ev.clientX <= menuRect.right &&
                      ev.clientY >= menuRect.top &&
                      ev.clientY <= menuRect.bottom;

                    if (!clickInsideMenu) {
                      setIsFiltersMenuOpen(false);
                    }
                  }
                  handleFilterSubmit();
                  setIsFilterPopoverOpen(false);
                }}
              >
                <Box sx={{ padding: 4, minWidth: 320 }}>
                  <form
                    onSubmit={(ev) => {
                      ev.preventDefault();
                      handleFilterSubmit();
                      setIsFilterPopoverOpen(false);
                      setIsFiltersMenuOpen(false);
                    }}
                    noValidate
                  >
                    {filterPopoverCurrentFilter?.render ? (
                      filterPopoverCurrentFilter.render(updateFilters)
                    ) : (
                      <>
                        {/* Autocomplete */}
                        {filterPopoverCurrentFilter?.variant ===
                          "autocomplete" &&
                          filterPopoverCurrentFilter?.options && (
                            <AutocompleteOuterContainer
                              odysseyDesignTokens={odysseyDesignTokens}
                            >
                              <AutocompleteInnerContainer>
                                <Autocomplete
                                  hasMultipleChoices
                                  isCustomValueAllowed
                                  label={filterPopoverCurrentFilter.label}
                                  value={autoCompleteValue}
                                  onChange={(_, value) => {
                                    handleAutocompleteFilterChange(
                                      filterPopoverCurrentFilter.id,
                                      value as Option[],
                                    );
                                  }}
                                  options={autocompleteOptions}
                                />
                              </AutocompleteInnerContainer>
                              <Button
                                variant="primary"
                                endIcon={<CheckIcon />}
                                type="submit"
                              />
                            </AutocompleteOuterContainer>
                          )}
                        {/* Text, Number, or undefined */}
                        {(filterPopoverCurrentFilter?.variant === "text" ||
                          filterPopoverCurrentFilter?.variant === "range" ||
                          (filterPopoverCurrentFilter &&
                            filterPopoverCurrentFilter?.variant ==
                              undefined)) && (
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "flex-end",
                            }}
                          >
                            <Box sx={{ width: "100%" }}>
                              <TextField
                                hasInitialFocus
                                label={filterPopoverCurrentFilter.label}
                                type={
                                  filterPopoverCurrentFilter.variant === "range"
                                    ? "number"
                                    : "text"
                                }
                                value={
                                  (inputValues[
                                    filterPopoverCurrentFilter.id
                                  ] as string) ?? ""
                                }
                                onChange={(ev) =>
                                  updateInputValue({
                                    filterId: filterPopoverCurrentFilter.id,
                                    value: ev.currentTarget.value,
                                  })
                                }
                                endAdornment={
                                  inputValues[
                                    filterPopoverCurrentFilter.id
                                  ] && (
                                    <MuiIconButton
                                      size="small"
                                      aria-label={t("filters.filter.clear")}
                                      onClick={() => {
                                        updateInputValue({
                                          filterId:
                                            filterPopoverCurrentFilter.id,
                                          value: undefined,
                                        });

                                        updateFilters({
                                          filterId:
                                            filterPopoverCurrentFilter.id,
                                          value: undefined,
                                        });
                                      }}
                                    >
                                      <CloseCircleFilledIcon />
                                    </MuiIconButton>
                                  )
                                }
                              />
                            </Box>
                            <Button
                              variant="primary"
                              endIcon={<CheckIcon />}
                              type="submit"
                            />
                          </Box>
                        )}

                        {/* Checkbox */}
                        {filterPopoverCurrentFilter?.variant ===
                          "multi-select" &&
                          filterPopoverCurrentFilter?.options && (
                            <CheckboxGroup
                              label={filterPopoverCurrentFilter.label}
                              isRequired
                            >
                              {filterPopoverCurrentFilter.options.map(
                                (option: { label: string; value: string }) => {
                                  const checkFilterInputValuesAsArray =
                                    (inputValues[
                                      filterPopoverCurrentFilter.id
                                    ] as Option[]) || [];
                                  const isOptionValueInInputValues =
                                    checkFilterInputValuesAsArray.some(
                                      (inputValue) =>
                                        inputValue.value === option.value,
                                    );
                                  return (
                                    <Checkbox
                                      key={option.value}
                                      label={option.label}
                                      value={option.value}
                                      isChecked={isOptionValueInInputValues}
                                      onChange={(_, checked) => {
                                        handleCheckboxFilterAndInputValueChange(
                                          filterPopoverCurrentFilter.id,
                                          option,
                                          checked,
                                        );
                                      }}
                                    />
                                  );
                                },
                              )}
                            </CheckboxGroup>
                          )}

                        {/* Radio */}
                        {filterPopoverCurrentFilter?.variant === "select" &&
                          filterPopoverCurrentFilter?.options && (
                            <RadioGroup
                              label={filterPopoverCurrentFilter.label}
                              onChange={(_, value) => {
                                updateFilterAndInputValues({
                                  filterId: filterPopoverCurrentFilter.id,
                                  value,
                                });
                              }}
                            >
                              <Radio
                                label={t("filters.filter.any")}
                                value={""}
                                isChecked={
                                  !inputValues[filterPopoverCurrentFilter.id]
                                }
                              />
                              <>
                                {filterPopoverCurrentFilter.options.map(
                                  (option: {
                                    label: string;
                                    value: string;
                                  }) => (
                                    <Radio
                                      key={option.value}
                                      label={option.label}
                                      value={option.value}
                                      isChecked={
                                        inputValues[
                                          filterPopoverCurrentFilter.id
                                        ] === option.value
                                      }
                                    />
                                  ),
                                )}
                              </>
                            </RadioGroup>
                          )}
                      </>
                    )}
                  </form>
                </Box>
              </MuiPopover>
            </>
          )}

          {/* Search */}
          {onChangeSearch && (
            <form
              style={{ width: "100%" }}
              onSubmit={(event) => {
                event.preventDefault();
                if (hasSearchSubmitButton) {
                  onChangeSearch(searchValue);
                }
              }}
            >
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <SearchField
                  value={searchValue}
                  label={t("filters.search.label")}
                  placeholder={t("filters.search.label")}
                  isDisabled={isDisabled}
                  onClear={() => {
                    setSearchValue("");
                    onChangeSearch("");
                  }}
                  onChange={(ev) => setSearchValue(ev.target.value)}
                />
                {hasSearchSubmitButton && (
                  <Box>
                    <Button
                      variant="primary"
                      label={t("filters.search.label")}
                      onClick={() => onChangeSearch(searchValue)}
                    />
                  </Box>
                )}
              </Box>
            </form>
          )}
        </Box>

        {/* Upper section right (clear filters & additional actions) */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {activeFilters.length > 0 && (
            <Box>
              <Button
                variant="secondary"
                label={t("filters.clear.label")}
                onClick={clearAllFilters}
              />
            </Box>
          )}
          {additionalActions}
        </Box>
      </Box>

      {/* Lower section */}
      {activeFilters.length > 0 && (
        <Box
          sx={{
            borderTopWidth: 1,
            borderTopColor: "#eeeeee",
            borderTopStyle: "solid",
            paddingTop: 4,
            marginTop: 4,
          }}
        >
          <MemoizedFilterTags
            activeFilters={activeFilters}
            updateFilterAndInputValues={updateFilterAndInputValues}
          />
        </Box>
      )}
    </Box>
  );
};

const MemoizedDataFilters = memo(DataFilters);
MemoizedDataFilters.displayName = "DataFilters";

export { MemoizedDataFilters as DataFilters };
