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
  ReactElement,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CheckIcon,
  ChevronRightIcon,
  // ChevronRightIcon,
  CloseCircleFilledIcon,
  FilterIcon,
} from "./icons.generated";
import {
  Badge,
  IconButton,
  InputAdornment,
  Menu,
  Popover,
  PopoverProps,
} from "@mui/material";
import {
  Box,
  Button,
  MenuItem,
  Paragraph,
  SearchField,
  Subordinate,
  Tag,
  TagList,
  TextField,
} from ".";

export type DataFilter = {
  id: string;
  name: string;
  value?: string | null;
};

export type DataFiltersProps = {
  actions?: ReactElement | ReactElement[] | false;
  filters?: Array<DataFilter>;
  onChangeFilters?: (updatedFilters: Array<DataFilter>) => void;
  onChangeSearch?: (value: string) => void;
  onClearSearch?: () => void;
};

const DataFilters = ({
  actions,
  filters,
  onChangeFilters,
  onChangeSearch,
  onClearSearch,
}: DataFiltersProps) => {
  const [popover, setPopover] = useState<{
    isOpen: boolean;
    anchorEl: HTMLElement | null;
    anchorOrigin: PopoverProps["anchorOrigin"];
    filter?: DataFilter;
  }>({
    isOpen: false,
    anchorEl: null,
    anchorOrigin: { horizontal: "left", vertical: "bottom" },
  });

  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [filterValue, setFilterValue] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const menuRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();

  const updateFilters = (id?: string | null, value?: string | null) => {
    const updatedFilters = filters?.map((filter) => {
      if (id === filter.id) {
        return {
          id: id,
          name: filter.name,
          value: value === "" ? null : value,
        };
      }

      return filter;
    });

    return updatedFilters;
  };

  const activeFilters = filters?.filter((filter) => filter.value) ?? [];

  const debouncer = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    if (debouncer.current) {
      clearTimeout(debouncer.current);
    }

    debouncer.current = setTimeout(() => {
      onChangeSearch?.(searchTerm);
    }, 500);
  }, [searchTerm]);

  return (
    <Box
      sx={{
        marginBottom: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {filters && (
            <Badge badgeContent={activeFilters.length}>
              <Button
                ariaLabel="Add filter"
                endIcon={<FilterIcon />}
                onClick={(ev) => setMenuAnchorEl(ev.currentTarget)}
                variant="secondary"
              />

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                PaperProps={{
                  ref: menuRef as MutableRefObject<HTMLDivElement>,
                }}
                onClose={(reason: string) => {
                  if (reason !== undefined) {
                    setMenuAnchorEl(null);
                  }
                }}
              >
                {filters?.map((filter: DataFilter) => (
                  <MenuItem
                    isSelected={true}
                    key={filter.id}
                    onClick={(ev) => {
                      setPopover({
                        isOpen: true,
                        anchorEl: ev.target as HTMLElement,
                        anchorOrigin: { horizontal: "right", vertical: "top" },
                        filter: filter,
                      });
                      setFilterValue(filter?.value ?? "");
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
                        <Paragraph component="div">{filter.name}</Paragraph>
                        <Subordinate component="div">
                          {filter.value && filter.value !== ""
                            ? filter.value
                            : `Any ${filter.name.toLowerCase()}`}
                        </Subordinate>
                      </Box>
                      <ChevronRightIcon />
                    </Box>
                  </MenuItem>
                ))}
              </Menu>
            </Badge>
          )}
          {onChangeSearch && (
            <Box sx={{ minWidth: 320 }}>
              <SearchField
                label="Search"
                placeholder="Search..."
                value={searchTerm}
                onClear={() => onClearSearch?.()}
                onChange={(ev) => {
                  setSearchTerm(ev.target.value);
                }}
              />
            </Box>
          )}
        </Box>

        <Box>
          {activeFilters.length > 0 && (
            <Button variant="secondary" label="Clear all" onClick={() => {}} />
          )}
          {actions}
        </Box>
      </Box>

      {activeFilters.length > 0 && (
        <Box
          sx={{
            paddingTop: 4,
            marginTop: 4,
            borderTop: "1px solid",
            borderColor: "#e1e1e1",
          }}
        >
          <TagList>
            {activeFilters.map((filter) => (
              <Tag
                key={filter.id}
                label={`${filter.name}: ${filter.value}`}
                onRemove={() => {
                  const updatedFilters = updateFilters(filter.id, null);
                  updatedFilters && onChangeFilters?.(updatedFilters);
                }}
              />
            ))}
          </TagList>
        </Box>
      )}

      <Popover
        anchorEl={popover.anchorEl}
        anchorOrigin={popover.anchorOrigin}
        open={popover.isOpen}
        onClose={(ev: MouseEvent) => {
          if (menuRef.current) {
            const menuRect = menuRef.current.getBoundingClientRect();
            const clickInsideMenu =
              ev.clientX >= menuRect.left &&
              ev.clientX <= menuRect.right &&
              ev.clientY >= menuRect.top &&
              ev.clientY <= menuRect.bottom;

            if (!clickInsideMenu) {
              setMenuAnchorEl(null);
            }
          }

          const updatedFilters = updateFilters(
            popover.filter?.id,
            inputRef.current?.value
          );
          updatedFilters && onChangeFilters?.(updatedFilters);

          setPopover({ ...popover, isOpen: false });
        }}
      >
        <Box
          sx={{
            alignItems: "flex-end",
            display: "flex",
            gap: 2,
            padding: 4,
          }}
        >
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              const updatedFilters = updateFilters(
                popover.filter?.id,
                inputRef.current?.value
              );
              updatedFilters && onChangeFilters?.(updatedFilters);
              setPopover({ ...popover, isOpen: false });
              setMenuAnchorEl(null);
            }}
          >
            <TextField
              hasInitialFocus
              label={popover.filter?.name ?? ""}
              value={filterValue}
              onChange={(ev) => {
                setFilterValue(ev.currentTarget.value);
              }}
              ref={inputRef as MutableRefObject<HTMLInputElement>}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear"
                    onClick={() => {
                      setFilterValue("");
                      const updatedFilters = updateFilters(
                        popover.filter?.id,
                        null
                      );
                      updatedFilters && onChangeFilters?.(updatedFilters);
                      setPopover({ ...popover, isOpen: false });
                    }}
                    size="small"
                    disabled={!filterValue || filterValue?.length == 0}
                  >
                    <CloseCircleFilledIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </form>
          <Button
            isDisabled={!filterValue || filterValue === popover.filter?.value}
            endIcon={<CheckIcon />}
            variant="primary"
            onClick={() => {
              setPopover({ ...popover, isOpen: false });

              const updatedFilters = updateFilters(
                popover.filter?.id,
                inputRef.current?.value
              );
              updatedFilters && onChangeFilters?.(updatedFilters);
            }}
          />
        </Box>
      </Popover>
    </Box>
  );
};

const MemoizedDataFilters = memo(DataFilters);
MemoizedDataFilters.displayName = "DataFilters";

export { MemoizedDataFilters as DataFilters };
