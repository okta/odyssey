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
  createContext,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import styled from "@emotion/styled";

type SetItemSize = (size: number) => void;

const ListboxContainer = styled.div({
  width: "100%",
  height: "100%",
});

const Row = ({
  data,
  index,
  setItemSize,
  style,
}: ListChildComponentProps & { setItemSize: SetItemSize }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rowRef.current) {
      /**
       * Checking for child height to workaround a bug where the clientHeight of the row isn't updated correctly
       * @see here if you need to know more: https://github.com/bvaughn/react-window/issues/582#issuecomment-1883074908
       */
      const firstChild = rowRef.current.firstElementChild;
      const height = firstChild
        ? firstChild.clientHeight
        : rowRef.current.clientHeight;

      setItemSize(height);
    }
  }, [index, rowRef, setItemSize]);

  const baseOption = data[index];
  const { key, props } = baseOption;

  /**
   * react-window calculates the absolute positions of the list items, via an inline style, so
   * we need to add it to each list item that is being rendered in the viewable list window.
   * @see here if you need to know more: https://github.com/bvaughn/react-window?tab=readme-ov-file#why-is-my-list-blank-when-i-scroll
   */
  const styles = useMemo(
    () => ({
      ...style,
      height: "auto",
    }),
    [style],
  );

  return (
    <div ref={rowRef}>
      <li {...props} key={key} style={styles} />
    </div>
  );
};

const OuterListboxContext = createContext({});

const OuterListboxElementType = forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = useContext(OuterListboxContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const useResetCache = (length: number) => {
  const resetCacheRef = useRef<VariableSizeList>(null);
  useEffect(() => {
    if (resetCacheRef.current) {
      resetCacheRef.current.resetAfterIndex(0, true);
    }
  }, [length]);
  return resetCacheRef;
};

const PickerVirtualizationListBox = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLElement>
>(function (props, ref) {
  const [listHeight, setListHeight] = useState(0);

  const { children, ...other } = props;
  const itemData: ReactElement[] = (children as ReactElement[]).flatMap(
    (item: ReactElement & { children?: ReactElement[] }) =>
      [item].concat(item.children || []),
  );

  const sizeMapRef = useRef<number[]>([]);

  const getListBoxHeight = useCallback(() => {
    // 8px of padding top/bottom applied by MUI
    const COMBINED_LISTBOX_PADDING = 16;

    if (itemData.length > OVERSCAN_ROW_COUNT) {
      // has a max-height of 40vh set in CSS. This is only set because height needs to be a number
      return 9999;
    } else {
      const itemsHeightCalculated = Array(itemData.length)
        .fill(null)
        .map((_, index) => sizeMapRef.current[index] || 0)
        .reduce(
          (prevItemHeight, nextItemHeight) => prevItemHeight + nextItemHeight,
          0,
        );
      return COMBINED_LISTBOX_PADDING + itemsHeightCalculated;
    }
  }, [itemData, sizeMapRef]);

  useEffect(() => {
    if (sizeMapRef.current.length && itemData.length) {
      setListHeight(getListBoxHeight());
    }
  }, [getListBoxHeight, itemData, sizeMapRef]);

  // The number of items (rows or columns) to render outside of the visible area for performance and scrolling reasons
  const OVERSCAN_ROW_COUNT = 8;

  const gridRef = useResetCache(itemData.length);

  const setItemSize = useCallback<SetItemSize>(
    (size) => {
      gridRef?.current?.resetAfterIndex(0, true);
      sizeMapRef.current = sizeMapRef.current.concat(size);
    },
    [gridRef, sizeMapRef],
  );
  const getItemSize = useCallback(
    // using 45px as a sane default here to avoid a lot of content shift on repaint
    (index: number) => sizeMapRef.current[index] || 45,
    [sizeMapRef],
  );

  return (
    <ListboxContainer ref={ref}>
      <OuterListboxContext.Provider value={other}>
        <VariableSizeList
          innerElementType="ul"
          itemData={itemData}
          itemCount={itemData.length}
          itemSize={getItemSize}
          height={listHeight}
          width="100%"
          ref={gridRef}
          outerElementType={OuterListboxElementType}
          overscanCount={OVERSCAN_ROW_COUNT}
        >
          {({ data, index, style }) => (
            <Row
              data={data}
              index={index}
              style={style}
              setItemSize={setItemSize}
            />
          )}
        </VariableSizeList>
      </OuterListboxContext.Provider>
    </ListboxContainer>
  );
});

const MemoizedPickerVirtualizationListBox = memo(PickerVirtualizationListBox);

MemoizedPickerVirtualizationListBox.displayName = "PickerVirtualizationListBox";

export { MemoizedPickerVirtualizationListBox as PickerVirtualizationListBox };
