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

import { MutableRefObject, memo, useRef, useState } from "react";
import {
  // AddIcon,
  ChevronRightIcon,
  CloseCircleFilledIcon,
  // CloseCircleFilledIcon,
  FilterIcon,
} from "./icons.generated";
// import { Button, ButtonProps } from "./Button";
import {
  IconButton,
  InputAdornment,
  // ButtonGroup,
  Popover,
  // PopoverProps as MuiPopoverProps,
  PopoverProps,
} from "@mui/material";
import {
  Box,
  MenuButton,
  MenuItem,
  Paragraph,
  Subordinate,
  TextField,
} from ".";

export type DataFilter = {
  id: string;
  name: string;
  value?: string | null;
};

export type DataFiltersProps = {
  filters: Array<DataFilter>;
  onChangeFilters: (updatedFilters: Array<DataFilter>) => void;
};

// const FilterButton = ({
//   name,
//   value,
//   onClick,
//   onRemove
// }: {
//   name: string;
//   value?: string;
//   onClick: ButtonProps["onClick"];
//   onRemove: ButtonProps["onClick"];
// }) => (
//   <ButtonGroup>
//     <Button
//       label={`${name + (value ? `: ${value}` : "")}`}
//       onClick={onClick}
//       size="small"
//       variant="tertiary"
//     />
//     {value && (
//       <Button
//         endIcon={<CloseCircleFilledIcon />}
//         size="small"
//         variant="tertiary"
//         onClick={onRemove}
//       />
//     )}
//   </ButtonGroup>
// );

const DataFilters = ({ filters, onChangeFilters }: DataFiltersProps) => {
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

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();

  const updateFilters = (id?: string | null, value?: string | null) => {
    const updatedFilters = filters.map((filter) => {
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

  return (
    <Box
      sx={{
        paddingBlock: 4,
        borderBottom: "1px solid",
        borderBottomColor: "#e1e1e1",
      }}
    >
      <MenuButton
        ariaLabel="Add filter"
        endIcon={<FilterIcon />}
        isOpen={isMenuOpen}
        onClose={(reason) => {
          if (reason !== undefined) {
            setIsMenuOpen(false);
          }
        }}
        onOpen={() => setIsMenuOpen(true)}
        ref={menuRef as MutableRefObject<HTMLDivElement>}
      >
        {filters.map((filter: DataFilter) => (
          <MenuItem
            key={filter.id}
            onClick={(ev) => {
              setPopover({
                isOpen: true,
                anchorEl: ev.target as HTMLElement,
                anchorOrigin: { horizontal: "right", vertical: "top" },
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
      </MenuButton>

      <Popover
        anchorEl={popover.anchorEl}
        anchorOrigin={popover.anchorOrigin}
        open={popover.isOpen}
        onClose={(
          ev: MouseEvent
          // reason: "backdropClick" | "escapeKeyDown"
        ) => {
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

          setPopover({ ...popover, isOpen: false });

          const updatedFilters = updateFilters(
            popover.filter?.id,
            inputRef.current?.value
          );
          onChangeFilters?.(updatedFilters);
        }}
      >
        <Box sx={{ padding: 4 }}>
          <TextField
            hasInitialFocus
            label={popover.filter?.name ?? ""}
            initialValue={
              typeof popover.filter?.value === "string"
                ? popover.filter?.value
                : ""
            }
            ref={inputRef as MutableRefObject<HTMLInputElement>}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Clear"
                  onClick={() => {
                    const updatedFilters = updateFilters(
                      popover.filter?.id,
                      inputRef.current?.value
                    );
                    onChangeFilters?.(updatedFilters);
                  }}
                  size="small"
                >
                  <CloseCircleFilledIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Popover>
    </Box>
  );

  // <>
  {
    /* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {filters &&
          filters.map((filter: DataFilter, i: number) => (
            <FilterButton
              key={i}
              name={filter.name}
              value={filter.value}
              onRemove={(ev) => {
                const updatedFilters = updateFilters(filter?.id, null);
                onChangeFilters?.(updatedFilters);
              }}
              onClick={(ev) => {
                setPopover({
                  isOpen: true,
                  anchorEl: ev.target as HTMLElement,
                  anchorOrigin: { horizontal: "left", vertical: "bottom" },
                  filter: filter
                });
              }}
            />
          ))}
      </Box> */
  }

  // </>
};

// type FilterButtonProps = {
//   label: string;
//   onClick: ButtonProps["onClick"];
//   onRemove: ButtonProps["onClick"];
// };

// type FilterPopoverProps = {
//   anchorEl?: HTMLElement | null;
//   anchorOrigin: MuiPopoverProps["anchorOrigin"];
//   currentFilter: DataFilter | undefined;
//   filters: Array<DataFilter>;
//   isOpen: boolean;
//   onClose: MuiPopoverProps["onClose"];
//   setFiltersFn: (id: string, value: string) => void;
// };

// type DataFiltersProps = {
//   allFilters: Array<DataFilter>;
//   activeFilters?: Array<DataFilter>;
//   onChange: (id: string, value: string) => void;
//   onClosePopover: MuiPopoverProps["onClose"];
// };

// export type DataFilter = {
//   id: string;
//   name: string;
//   value?: string | unknown;
// };

// const FilterPopover = ({
//   anchorEl,
//   anchorOrigin,
//   currentFilter,
//   filters,
//   setFiltersFn,
//   isOpen,
//   onClose,
// }: FilterPopoverProps) => {
//   const filter = filters.find((filter) => filter?.id === currentFilter?.id);
//   if (!filter) return null;

//   return (
//     <Popover
//       anchorEl={anchorEl}
//       anchorOrigin={anchorOrigin}
//       open={isOpen}
//       onClose={onClose}
//     >
//       <Box sx={{ padding: 4 }}>
//         <TextField
//           hasInitialFocus
//           label={filter.name ?? ""}
//           value={typeof filter.value === "string" ? filter.value : ""}
//           onChange={(ev) =>
//             setFiltersFn?.({ id: filter.id, value: ev.target.value })
//           }
//         />
//       </Box>
//     </Popover>
//   );
// };

// const DataFilters = ({
//   allFilters,
//   activeFilters,
//   onChange,
//   onClosePopover,
// }: DataFiltersProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const [popoverState, setPopoverState] = useState<{
//     isOpen: boolean;
//     anchorEl: HTMLElement | null;
//     anchorOrigin?: MuiPopoverProps["anchorOrigin"];
//     filter?: DataFilter;
//   }>({
//     isOpen: false,
//     anchorEl: null,
//   });

//   return (
//     <>
//       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
//         <MenuButton
//           endIcon={<AddIcon />}
//           buttonLabel="Filter"
//           size="small"
//           buttonVariant="tertiary"
//           onClose={(reason) => {
//             if (reason !== undefined) {
//               setIsMenuOpen(false);
//             }
//           }}
//           onOpen={() => setIsMenuOpen(true)}
//           isOpen={isMenuOpen}
//           ref={menuRef}
//         >
//           {allFilters.map((filter: DataFilter, i: number) => (
//             <MenuItem
//               key={i}
//               onClick={(ev) => {
//                 setPopoverState({
//                   isOpen: true,
//                   anchorOrigin: { vertical: "top", horizontal: "right" },
//                   anchorEl: ev.target as HTMLElement,
//                   filter: filter,
//                 });
//               }}
//             >
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   width: "100%",
//                   minWidth: 180,
//                 }}
//               >
//                 <Box sx={{ marginRight: 2 }}>
//                   <Paragraph component="div">{filter.name}</Paragraph>
//                   <Subordinate component="div">
//                     {filter.value && filter.value !== ""
//                       ? filter.value
//                       : `Any ${filter.name.toLowerCase()}`}
//                   </Subordinate>
//                 </Box>
//                 <ChevronRightIcon />
//               </Box>
//             </MenuItem>
//           ))}
//         </MenuButton>

//         {activeFilters &&
//           activeFilters.map((filter: DataFilter, i: number) => (
//             <FilterButton
//               key={i}
//               label={`${filter.name}: ${filter.value}`}
//               onRemove={() => onChange?.({ id: filter.id, value: null })}
//               onClick={(ev) => {
//                 setPopoverState({
//                   isOpen: true,
//                   anchorOrigin: { vertical: "bottom", horizontal: "left" },
//                   anchorEl: ev.target as HTMLElement,
//                   filter: filter,
//                 });
//               }}
//             />
//           ))}
//       </Box>

//       <FilterPopover
//         anchorEl={popoverState.anchorEl}
//         anchorOrigin={popoverState.anchorOrigin}
//         currentFilter={popoverState.filter}
//         filters={allFilters}
//         isOpen={popoverState.isOpen}
//         setFiltersFn={onChange}
//         onClose={(
//           ev: MouseEvent,
//           reason: "backdropClick" | "escapeKeyDown"
//         ) => {
//           if (menuRef.current) {
//             const menuRect = menuRef.current.getBoundingClientRect();
//             const clickInsideMenu =
//               ev.clientX >= menuRect.left &&
//               ev.clientX <= menuRect.right &&
//               ev.clientY >= menuRect.top &&
//               ev.clientY <= menuRect.bottom;

//             if (!clickInsideMenu) {
//               setIsMenuOpen(false);
//             }
//           }

//           setPopoverState({ ...popoverState, isOpen: false });
//           onClosePopover?.(ev, reason);
//         }}
//       />
//     </>
//   );
// };

const MemoizedDataFilters = memo(DataFilters);
MemoizedDataFilters.displayName = "DataFilters";

export { MemoizedDataFilters as DataFilters };
