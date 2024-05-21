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
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps,
  InputBase,
  UseAutocompleteProps,
  AutocompleteValue,
  AutocompleteRenderInputParams,
} from "@mui/material";
import {
  createContext,
  FC,
  forwardRef,
  HTMLAttributes,
  memo,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import styled from "@emotion/styled";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import _AutoSizer, {
  Props as AutoSizerProps,
  Size as AutoSizerSize,
} from "react-virtualized-auto-sizer";

// This is required to get around a react-types issue for "AutoSizer is not a valid JSX element."
// @see https://github.com/bvaughn/react-virtualized/issues/1739#issuecomment-1291444246
const AutoSizer = _AutoSizer as unknown as FC<AutoSizerProps>;

import { Field } from "./Field";
import { FieldComponentProps } from "./FieldComponentProps";
import type { HtmlProps } from "./HtmlProps";
import {
  ComponentControlledState,
  useInputValues,
  getControlState,
} from "./inputUtils";

type SetItemSize = (index: number, size: number) => void;

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
      if (firstChild) {
        const height = firstChild.clientHeight;
        setItemSize(index, height);
      }
    }
  }, [index, rowRef, setItemSize]);

  /**
   * react-window calculates the absolute positions of the list items, via an inline style, so
   * we need to add it to each list item that is being rendered in the viewable list window.
   * @see here if you need to know more: https://github.com/bvaughn/react-window?tab=readme-ov-file#why-is-my-list-blank-when-i-scroll
   */
  return (
    <div key={`${index}-${style}}`} style={style} ref={rowRef}>
      {data[index]}
    </div>
  );
};

export type AutocompleteProps<
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
> = {
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["defaultValue"];
  getOptionLabel?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["getOptionLabel"];
  /**
   * Enables multiple choice selection
   */
  hasMultipleChoices?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["multiple"];
  /**
   * The value for the input
   */
  inputValue?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["inputValue"];
  /**
   * Allows the input of custom values
   */
  isCustomValueAllowed?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["freeSolo"];
  /**
   * Disables the Autocomplete input
   */
  isDisabled?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["disabled"];
  /**
   * Displays a loading indicator
   */
  isLoading?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["loading"];
  /**
   * Makes the Autocomplete input read-only
   */
  isReadOnly?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["readOnly"];
  /**
   * The label text for the autocomplete input
   */
  label: string;
  /**
   * Callback fired when the autocomplete loses focus.
   */
  onBlur?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onBlur"];
  /**
   * Callback fired when a selection is made.
   */
  onChange?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onChange"];
  /**
   * Callback fired when the textbox receives typed characters.
   */
  onInputChange?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onInputChange"];
  /**
   * Callback fired when the autocomplete gains focus.
   */
  onFocus?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["onFocus"];
  /**
   * The options for the Autocomplete input
   */
  options: ReadonlyArray<OptionType>;

  renderOption?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["renderOption"];

  renderTags?: MuiAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["renderTags"];
  /**
   * The value of the Autocomplete input
   */
  value?: UseAutocompleteProps<
    OptionType,
    HasMultipleChoices,
    undefined,
    IsCustomValueAllowed
  >["value"];

  /**
   * Used to determine if the option represents the given value. Uses strict equality by default if none provided.
   * Both arguments need to be handled, an option can only match with one value.
   * option: the option to test
   * value: the value to test against
   *
   * You will need to implement this function if your `option` items are objects.
   */
  getIsOptionEqualToValue?: (option: OptionType, value: OptionType) => boolean;

  /**
   * If this component is required to display a virtualized list of options,
   * then this value needs to be set to true.
   * It is recommended if you're options are on the order of 10's of hundreds or more.
   */
  isVirtualized?: boolean;
} & Pick<
  FieldComponentProps,
  | "errorMessage"
  | "errorMessageList"
  | "hint"
  | "HintLinkComponent"
  | "id"
  | "isFullWidth"
  | "isOptional"
  | "name"
> &
  Pick<HtmlProps, "ariaDescribedBy" | "testId" | "translate">;

const ListboxContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Autocomplete = <
  OptionType,
  HasMultipleChoices extends boolean | undefined,
  IsCustomValueAllowed extends boolean | undefined,
>({
  ariaDescribedBy,
  defaultValue,
  errorMessage,
  errorMessageList,
  getIsOptionEqualToValue,
  getOptionLabel,
  hasMultipleChoices,
  id: idOverride,
  inputValue,
  isCustomValueAllowed,
  isDisabled,
  isFullWidth = false,
  isLoading,
  isOptional = false,
  isReadOnly,
  isVirtualized: isVirtualizedProp = false,
  hint,
  HintLinkComponent,
  label,
  name: nameOverride,
  onBlur,
  onChange: onChangeProp,
  onInputChange: onInputChangeProp,
  onFocus,
  options,
  renderOption,
  renderTags,
  value,
  testId,
  translate,
}: AutocompleteProps<OptionType, HasMultipleChoices, IsCustomValueAllowed>) => {
  const controlledStateRef = useRef(
    getControlState({
      controlledValue: value,
      uncontrolledValue: defaultValue,
    }),
  );

  const isVirtualized = useRef(Boolean(isVirtualizedProp));
  const defaultValueProp = useMemo<
    | AutocompleteValue<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >
    | undefined
  >(() => {
    if (hasMultipleChoices) {
      if (value === undefined) {
        return defaultValue;
      }
      return [] as AutocompleteValue<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >;
    }
    return value === undefined ? defaultValue : undefined;
  }, [defaultValue, hasMultipleChoices, value]);

  const valueProps = useInputValues({
    defaultValue: defaultValueProp,
    value: value,
    controlState: controlledStateRef.current,
  });

  const inputValueProp = useMemo(() => {
    if (controlledStateRef.current === ComponentControlledState.CONTROLLED) {
      return { inputValue };
    }
    return undefined;
  }, [inputValue]);

  const renderInput = useCallback(
    ({
      InputLabelProps,
      InputProps,
      ...params
    }: AutocompleteRenderInputParams) => (
      <Field
        ariaDescribedBy={ariaDescribedBy}
        errorMessage={errorMessage}
        errorMessageList={errorMessageList}
        fieldType="single"
        hasVisibleLabel
        //@ts-expect-error htmlFor does not exist ont he InputLabelProps for autocomplete
        id={InputLabelProps.htmlFor}
        isFullWidth={isFullWidth}
        hint={hint}
        HintLinkComponent={HintLinkComponent}
        label={label}
        isOptional={isOptional}
        renderFieldComponent={({
          ariaDescribedBy,
          id,
          errorMessageElementId,
          labelElementId,
        }) => (
          <InputBase
            {...params}
            {...InputProps}
            inputProps={{
              ...params.inputProps,
              "aria-errormessage": errorMessageElementId,
              "aria-labelledby": labelElementId,
              "data-se": testId,
            }}
            aria-describedby={ariaDescribedBy}
            id={id}
            name={nameOverride ?? id}
            required={!isOptional}
          />
        )}
      />
    ),
    [
      ariaDescribedBy,
      errorMessage,
      errorMessageList,
      hint,
      HintLinkComponent,
      isFullWidth,
      isOptional,
      label,
      nameOverride,
      testId,
    ],
  );

  const OuterListboxContext = createContext({});

  const OuterListboxElementType = forwardRef<HTMLDivElement>((props, ref) => {
    const outerProps = useContext(OuterListboxContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  const ListboxComponent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLElement>
  >(function (props, ref) {
    const { children, ...other } = props;
    const itemData: ReactElement[] = (children as ReactElement[]).flatMap(
      (item: ReactElement & { children?: ReactElement[] }) =>
        [item].concat(item.children || []),
    );
    const sizeMap = useMemo(() => new Map<number, number>(), []);
    const gridRef = useRef<VariableSizeList>(null);

    const setItemSize = useCallback<SetItemSize>(
      (index, size) => {
        gridRef?.current?.resetAfterIndex(0, true);
        sizeMap.set(index, size);
      },
      [gridRef, sizeMap],
    );

    // The number of items (rows or columns) to render outside of the visible area for performance and scrolling reasons
    const overscanRowCount = 8;

    const getItemSize = useCallback(
      (index: number) => sizeMap.get(index) || 45,
      [sizeMap],
    );

    const renderWindow = useCallback(
      ({ height, width }: AutoSizerSize) => (
        <VariableSizeList
          innerElementType="ul"
          itemData={itemData}
          itemCount={itemData.length}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          itemSize={getItemSize}
          height={height}
          width={width}
          ref={gridRef}
          outerElementType={OuterListboxElementType}
          overscanCount={overscanRowCount}
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
      ),
      [itemData, getItemSize, gridRef, setItemSize],
    );

    return (
      <ListboxContainer ref={ref}>
        <OuterListboxContext.Provider value={other}>
          <AutoSizer>{renderWindow}</AutoSizer>
        </OuterListboxContext.Provider>
      </ListboxContainer>
    );
  });

  const onChange = useCallback<
    NonNullable<
      UseAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["onChange"]
    >
  >(
    (event, value, reason, details) => {
      onChangeProp?.(event, value, reason, details);
    },
    [onChangeProp],
  );

  const onInputChange = useCallback<
    NonNullable<
      UseAutocompleteProps<
        OptionType,
        HasMultipleChoices,
        undefined,
        IsCustomValueAllowed
      >["onInputChange"]
    >
  >(
    (event, value, reason) => {
      onInputChangeProp?.(event, value, reason);
    },
    [onInputChangeProp],
  );

  return (
    <MuiAutocomplete
      {...valueProps}
      {...inputValueProp}
      // conditionally provide the ListboxComponent if this needs to be virtualized
      {...(isVirtualized.current && { ListboxComponent })}
      // AutoComplete is wrapped in a div within MUI which does not get the disabled attr. So this aria-disabled gets set in the div
      aria-disabled={isDisabled}
      disableCloseOnSelect={hasMultipleChoices}
      disabled={isDisabled}
      freeSolo={isCustomValueAllowed}
      filterSelectedOptions={true}
      fullWidth={isFullWidth}
      getOptionLabel={getOptionLabel}
      id={idOverride}
      isOptionEqualToValue={getIsOptionEqualToValue}
      loading={isLoading}
      multiple={hasMultipleChoices}
      onBlur={onBlur}
      onChange={onChange}
      onInputChange={onInputChange}
      onFocus={onFocus}
      options={options}
      readOnly={isReadOnly}
      renderInput={renderInput}
      renderOption={renderOption}
      renderTags={renderTags}
      translate={translate}
      open={true}
    />
  );
};

// Need the `typeof Autocomplete` because generics don't get passed through
const MemoizedAutocomplete = memo(Autocomplete) as typeof Autocomplete;
// @ts-expect-error displayName is expected to not be on `typeof Autocomplete`
MemoizedAutocomplete.displayName = "Autocomplete";

export { MemoizedAutocomplete as Autocomplete };
