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
import { Autocomplete } from "../Autocomplete";
import { Box } from "../Box";
import { TagList } from "../TagList";
import { Tag } from "../Tag";
import { SearchField } from "../SearchField";
import { Button } from "../Button";
import {
  IconButton as MuiIconButton,
  Menu as MuiMenu,
  Popover as MuiPopover,
} from "@mui/material";
import {
  CheckIcon,
  ChevronRightIcon,
  CloseCircleFilledIcon,
  FilterIcon,
} from "../icons.generated";
import { MenuItem } from "../MenuItem";
import { Paragraph, Subordinate } from "../Typography";
import { TextField } from "../TextField";
import { CheckboxGroup } from "../CheckboxGroup";
import { Checkbox } from "../Checkbox";
import { RadioGroup } from "../RadioGroup";
import { Radio } from "../Radio";
import { MRT_ColumnDef, MRT_RowData } from "material-react-table";

export type DataFilterValue = string | string[] | undefined;

// This is the shape of each individual filter
export type DataFilter = {
  /**
   * A unique ID for the filter, typically the same id
   * as the column it'll be applied to.
   */
  id: string;
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
  options?: Array<{ label: string; value: string }>;
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
};

const DataFilters = ({
  onChangeSearch,
  onChangeFilters,
  hasSearchSubmitButton = false,
  searchDelayTime = 200,
  defaultSearchTerm = "",
  additionalActions,
  filters: filtersProp = [],
}: DataFiltersProps) => {
  const [filters, setFilters] = useState<DataFilter[]>(filtersProp);

  const initialInputValues = useMemo(() => {
    return filtersProp.reduce((accumulator, filter) => {
      accumulator[filter.id] = filter.value;
      return accumulator;
    }, {} as Record<string, DataFilterValue>);
  }, [filtersProp]);

  const [inputValues, setInputValues] = useState(initialInputValues);

  const [searchValue, setSearchValue] = useState<string>(defaultSearchTerm);
  const activeFilters = filters.filter(
    (filter) => typeof filter.value === "string" && filter.value
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

  const handleInputChange = useCallback(
    (filterId: string, value: DataFilterValue, submit: boolean = false) => {
      setInputValues({ ...inputValues, [filterId]: value });

      if (submit) {
        const updatedFilters = filtersProp.map((filter) => ({
          ...filter,
          value: filter.id === filterId ? value : inputValues[filter.id],
        }));

        setFilters(updatedFilters);
      }
    },
    [inputValues, filtersProp]
  );

  const handleMultiSelectChange = useCallback(
    (filterId: string, value: string, submit: boolean = false) => {
      const startingValues = filtersProp
        .find((filter) => filter.id === filterId)
        ?.options?.map((option) => option.value);
      const currentValues = (inputValues[filterId] ??
        startingValues) as string[];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((item: string) => item !== value)
        : [...currentValues, value];
      const valuesToSave =
        updatedValues.sort().join() === startingValues?.sort().join()
          ? undefined
          : updatedValues;

      setInputValues({ ...inputValues, [filterId]: valuesToSave });

      if (submit) {
        const updatedFilters = filtersProp.map((filter) => ({
          ...filter,
          value: filter.id === filterId ? valuesToSave : inputValues[filter.id],
        }));

        setFilters(updatedFilters);
      }
    },
    [inputValues, filtersProp]
  );

  const clearAllFilters = useCallback(() => {
    const updatedInputValues = filtersProp.reduce((accumulator, filter) => {
      accumulator[filter.id] = undefined;
      return accumulator;
    }, {} as Record<string, DataFilterValue>);

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
            ariaLabel="Filters"
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
              (f) => f.id === filter.id
            )?.value;

            return (
              <MenuItem
                key={filter.id}
                onClick={(event) => {
                  setIsFilterPopoverOpen(true);
                  setFilterPopoverAnchorElement(event.currentTarget);
                  setFilterPopoverCurrentFilter(filter);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minWidth: 180,
                  }}
                >
                  <Box sx={{ marginRight: 2 }}>
                    <Paragraph component="div">{filter.label}</Paragraph>
                    <Subordinate component="div">
                      {!latestFilterValue ||
                      (Array.isArray(latestFilterValue) &&
                        latestFilterValue.length === 0)
                        ? `Any ${filter.label.toLowerCase()}`
                        : Array.isArray(latestFilterValue)
                        ? `${latestFilterValue.length} selected`
                        : latestFilterValue}
                    </Subordinate>
                  </Box>
                  <ChevronRightIcon />
                </Box>
              </MenuItem>
            );
          })}
        </MuiMenu>
      </>
    ),
    [isFiltersMenuOpen, filtersMenuAnchorElement, filtersProp]
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
                  >
                    {/* Autocomplete */}
                    {filterPopoverCurrentFilter?.variant === "autocomplete" &&
                      filterPopoverCurrentFilter?.options && (
                        <Autocomplete
                          label={filterPopoverCurrentFilter.label}
                          value={
                            (inputValues[
                              filterPopoverCurrentFilter.id
                            ] as string) ?? ""
                          }
                          onBlur={function ro() {}}
                          onChange={function ro() {}}
                          onFocus={function ro() {}}
                          onInputChange={function ro() {}}
                          options={filterPopoverCurrentFilter.options.map(
                            (option: { label: string }) => ({
                              label: option.label,
                            })
                          )}
                        />
                      )}
                    {/* Text or Number */}
                    {(filterPopoverCurrentFilter?.variant === "text" ||
                      filterPopoverCurrentFilter?.variant === "range") && (
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
                              handleInputChange(
                                filterPopoverCurrentFilter.id,
                                ev.currentTarget.value
                              )
                            }
                            endAdornment={
                              inputValues[filterPopoverCurrentFilter.id] && (
                                <MuiIconButton
                                  size="small"
                                  aria-label="Clear filter"
                                  onClick={() => {
                                    handleInputChange(
                                      filterPopoverCurrentFilter.id,
                                      undefined,
                                      true
                                    );
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
                    {filterPopoverCurrentFilter?.variant === "multi-select" &&
                      filterPopoverCurrentFilter?.options && (
                        <CheckboxGroup
                          label={filterPopoverCurrentFilter.label}
                          isRequired
                        >
                          {filterPopoverCurrentFilter.options.map(
                            (option: { label: string; value: string }) => (
                              <Checkbox
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                isDefaultChecked={
                                  inputValues[
                                    filterPopoverCurrentFilter.id
                                  ]?.includes(option.value) ||
                                  inputValues[filterPopoverCurrentFilter.id] ===
                                    undefined
                                }
                                onChange={() =>
                                  handleMultiSelectChange(
                                    filterPopoverCurrentFilter.id,
                                    option.value,
                                    true
                                  )
                                }
                              />
                            )
                          )}
                        </CheckboxGroup>
                      )}

                    {/* Radio */}
                    {filterPopoverCurrentFilter?.variant === "select" &&
                      filterPopoverCurrentFilter?.options && (
                        <RadioGroup
                          label={filterPopoverCurrentFilter.label}
                          onChange={(_, value) =>
                            handleInputChange(
                              filterPopoverCurrentFilter.id,
                              value,
                              true
                            )
                          }
                        >
                          <Radio
                            label="Any"
                            value={""}
                            isChecked={
                              !inputValues[filterPopoverCurrentFilter.id]
                            }
                          />
                          <>
                            {filterPopoverCurrentFilter.options.map(
                              (option: { label: string; value: string }) => (
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
                              )
                            )}
                          </>
                        </RadioGroup>
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
                  label="Search"
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
                      label="Search"
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
                label="Clear filters"
                onClick={() => clearAllFilters()}
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
          <TagList>
            {activeFilters.map((filter) => (
              <Tag
                key={filter.label}
                label={`${filter.label}: ${filter.value}`}
                onRemove={() => handleInputChange(filter.id, undefined, true)}
              />
            ))}
          </TagList>
        </Box>
      )}
    </Box>
  );
};

const MemoizedDataFilters = memo(DataFilters);
MemoizedDataFilters.displayName = "DataFilters";

export { MemoizedDataFilters as DataFilters };
