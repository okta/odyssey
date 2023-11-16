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
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Box } from "../Box";
import { TagList } from "../TagList";
import { Tag } from "../Tag";
import { SearchField } from "../SearchField";
import { Button } from "../Button";
import { IconButton, Menu, Popover } from "@mui/material";
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

export const dataFilterVariantValues = [
  "autocomplete",
  "checkbox",
  "date",
  "date-range",
  "multi-select",
  "range",
  "range-slider",
  "select",
  "text",
] as const;

export type DataFilter = {
  id: string;
  label: string;
  variant?: (typeof dataFilterVariantValues)[number];
  value?: string | string[] | undefined;
  options?: Array<{ label: string; value: string }>;
};

export type DataFiltersProps = {
  onChangeSearch?: (value: string) => void;
  onChangeFilters?: (filters: Array<DataFilter>) => void;
  searchOnSubmit?: boolean;
  searchDelay?: number;
  initialSearchTerm?: string;
  additionalActions?: ReactNode;
  filters?: Array<DataFilter>;
};

const DataFilters = ({
  onChangeSearch,
  onChangeFilters,
  searchOnSubmit = false,
  searchDelay = 200,
  initialSearchTerm,
  additionalActions,
  filters: filtersProp = [],
}: DataFiltersProps) => {
  const [filters, setFilters] = useState<DataFilter[]>(filtersProp);
  const [inputValues, setInputValues] = useState<{
    [key: string]: string | string[] | undefined;
  }>(
    filtersProp.reduce(
      (
        accumulator: { [key: string]: string | string[] | undefined },
        filter: DataFilter
      ) => {
        accumulator[filter.id] = filter.value;
        return accumulator;
      },
      {}
    )
  );
  const [search, setSearch] = useState<string>(initialSearchTerm ?? "");
  const activeFilters = filters.filter((filter) => filter.value);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | undefined>(
    undefined
  );
  const [popoverState, setPopoverState] = useState<{
    isOpen: boolean;
    anchorEl?: HTMLElement;
    filter?: DataFilter;
  }>({
    isOpen: false,
  });

  const menuRef = useRef<HTMLDivElement>();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChangeFilters?.(filters);
  }, [filters, onChangeFilters]);

  const debouncer = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (!searchOnSubmit) {
      if (debouncer.current) {
        clearTimeout(debouncer.current);
      }

      debouncer.current = setTimeout(() => {
        onChangeSearch?.(search ?? "");
      }, searchDelay);
    }
  }, [onChangeSearch, search, searchDelay, searchOnSubmit]);

  const handleInputChange = (
    filterId: string,
    value: string | string[] | undefined,
    submit: boolean = false
  ) => {
    setInputValues({ ...inputValues, [filterId]: value });

    if (submit) {
      const updatedFilters = filtersProp.map((filter) => ({
        ...filter,
        value: filter.id === filterId ? value : inputValues[filter.id],
      }));

      setFilters(updatedFilters);
    }
  };

  const handleMultiSelectChange = (
    filterId: string,
    value: string,
    submit: boolean = false
  ) => {
    const startingValues = filtersProp
      .find((filter) => filter.id === filterId)
      ?.options?.map((option) => option.value);
    const currentValues = (inputValues[filterId] ?? startingValues) as string[];
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
  };

  const clearAllFilters = () => {
    const updatedInputValues = filtersProp.reduce(
      (
        accumulator: { [key: string]: string | string[] | undefined },
        filter: DataFilter
      ) => {
        accumulator[filter.id] = undefined;
        return accumulator;
      },
      {}
    );

    setInputValues(updatedInputValues);

    const updatedFilters = filtersProp.map((filter) => ({
      ...filter,
      value: undefined,
    }));

    setFilters(updatedFilters);
  };

  const handleFilterSubmit = () => {
    const updatedFilters = filtersProp.map((filter) => ({
      ...filter,
      value: inputValues[filter.id],
    }));

    setFilters(updatedFilters);
  };

  const filterMenu = useMemo(
    () => (
      <>
        <Box>
          <Button
            aria-controls={isMenuOpen ? "filters-menu" : undefined}
            aria-expanded={isMenuOpen ? "true" : undefined}
            aria-haspopup="true"
            ariaLabel="Filters"
            endIcon={<FilterIcon />}
            onClick={(event) => {
              setMenuAnchorEl(event.currentTarget);
              setIsMenuOpen(true);
            }}
            variant="secondary"
          />
        </Box>

        <Menu
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          id="filters-menu"
          anchorEl={menuAnchorEl}
          onClose={() => setIsMenuOpen(false)}
          open={isMenuOpen}
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
                onClick={(ev) => {
                  setPopoverState({
                    isOpen: true,
                    anchorEl: ev.currentTarget,
                    filter: filter,
                  });
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
        </Menu>
      </>
    ),
    [isMenuOpen, menuAnchorEl]
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
              <Popover
                anchorEl={popoverState.anchorEl}
                open={popoverState.isOpen}
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
                      setIsMenuOpen(false);
                    }
                  }

                  setPopoverState({ ...popoverState, isOpen: false });
                }}
              >
                <Box sx={{ padding: 4, minWidth: 320 }}>
                  <form
                    onSubmit={(ev) => {
                      ev.preventDefault();
                      handleFilterSubmit();
                      setPopoverState({ ...popoverState, isOpen: false });
                      setIsMenuOpen(false);
                    }}
                  >
                    {/* Text or Number */}
                    {(popoverState?.filter?.variant === "text" ||
                      popoverState?.filter?.variant === "range") && (
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
                            label={popoverState.filter.label}
                            type={
                              popoverState.filter.variant === "range"
                                ? "number"
                                : "text"
                            }
                            value={
                              (inputValues[popoverState.filter.id] as string) ??
                              ""
                            }
                            onChange={(ev) =>
                              handleInputChange(
                                popoverState.filter!.id,
                                ev.currentTarget.value
                              )
                            }
                            endAdornment={
                              inputValues[popoverState.filter.id] && (
                                <IconButton
                                  size="small"
                                  aria-label="Clear filter"
                                  onClick={() => {
                                    handleInputChange(
                                      popoverState.filter!.id,
                                      undefined,
                                      true
                                    );
                                  }}
                                >
                                  <CloseCircleFilledIcon />
                                </IconButton>
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
                    {popoverState?.filter?.variant === "multi-select" &&
                      popoverState?.filter?.options && (
                        <CheckboxGroup
                          label={popoverState.filter.label}
                          isRequired
                        >
                          {popoverState.filter.options.map(
                            (option: { label: string; value: string }) => (
                              <Checkbox
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                isDefaultChecked={
                                  inputValues[
                                    popoverState.filter!.id
                                  ]?.includes(option.value) ||
                                  inputValues[popoverState.filter!.id] ===
                                    undefined
                                }
                                onChange={() =>
                                  handleMultiSelectChange(
                                    popoverState.filter!.id,
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
                    {popoverState?.filter?.variant === "select" &&
                      popoverState?.filter?.options && (
                        <RadioGroup
                          label={popoverState.filter.label}
                          onChange={(_, value) =>
                            handleInputChange(
                              popoverState.filter!.id,
                              value,
                              true
                            )
                          }
                        >
                          <Radio
                            label="Any"
                            value={""}
                            isChecked={!inputValues[popoverState.filter.id]}
                          />
                          <>
                            {popoverState.filter.options.map(
                              (option: { label: string; value: string }) => (
                                <Radio
                                  key={option.value}
                                  label={option.label}
                                  value={option.value}
                                  isChecked={
                                    inputValues[popoverState.filter!.id] ===
                                    option.value
                                  }
                                />
                              )
                            )}
                          </>
                        </RadioGroup>
                      )}
                  </form>
                </Box>
              </Popover>
            </>
          )}

          {/* Search */}
          {onChangeSearch && (
            <form
              style={{ width: "100%" }}
              onSubmit={(event) => {
                event.preventDefault();
                if (searchOnSubmit) {
                  onChangeSearch(searchRef.current?.value ?? "");
                }
              }}
            >
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <SearchField
                  value={search}
                  label="Search"
                  inputRef={searchRef}
                  onClear={() => {
                    setSearch("");
                    onChangeSearch("");
                  }}
                  onChange={(ev) => setSearch(ev.target.value)}
                />
                {searchOnSubmit && (
                  <Box>
                    <Button
                      variant="primary"
                      label="Search"
                      onClick={() =>
                        onChangeSearch(searchRef.current?.value ?? "")
                      }
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
