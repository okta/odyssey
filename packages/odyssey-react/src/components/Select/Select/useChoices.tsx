/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import React, { useEffect, useRef, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import Choices from "choices.js";
import { CloseIcon } from "../../Icon";
import styles from "../Select.module.scss";

type UseChoices = (args: {
  id: string;
  value?: string;
  loadingText?: string;
  noResultsText?: string;
  noChoicesText?: string;
  onSearch?: (
    searchText: string,
    setOptions: (choices: Record<string, unknown>[]) => void
  ) => Promise<void>;
}) => void;

interface ChoicesSearchEventDetail {
  value: string;
  resultCount: number;
}
interface ChoicesSearch extends EventListener {
  (event: CustomEvent<ChoicesSearchEventDetail>): void;
}
function isChoicesSearchEvent(
  evt: Event
): evt is CustomEvent<ChoicesSearchEventDetail> {
  // eslint-disable-next-line
  return (evt as CustomEvent<ChoicesSearchEventDetail>).detail !== undefined;
}

const useChoices: UseChoices = ({
  id,
  value,
  loadingText,
  noResultsText,
  noChoicesText,
  onSearch,
}) => {
  const choices = useRef<undefined | Choices>();

  /**
   * A search handler which which informs the composer
   * that a search was triggered, and shows the dropdown.
   */
  const handleSearch: ChoicesSearch = useCallback(
    async (event: Event) => {
      if (onSearch !== undefined && isChoicesSearchEvent(event)) {
        if (choices && choices.current) {
          // Make sure the only visible 'choice' is loading
          choices?.current?.setChoices(
            [
              {
                value: "$_disabled",
                label: loadingText,
                disabled: true,
              },
            ],
            "value",
            "label",
            true
          );

          try {
            await onSearch(
              event.detail.value,
              (newOptions: Record<string, unknown>[]) => {
                // Make sure the only visible 'choice' is loading
                choices?.current?.setChoices(
                  newOptions,
                  "value",
                  "label",
                  true
                );
              }
            );
          } catch (ex) {
            // If composer allows an exception to reach here - indicates they want a choices
            // compatible error indicator.
          }
        }
      }
    },
    [onSearch]
  );

  useEffect(() => {
    const select = document.getElementById(id) as HTMLSelectElement;

    choices.current = new Choices(select, {
      loadingText,
      noResultsText,
      noChoicesText,
      itemSelectText: "",
      searchEnabled: false,
      shouldSort: false,
      removeItemButton: true,
      classNames: {
        containerOuter: styles.root,
        containerInner: styles.inner,
        input: styles.input,
        inputCloned: styles.inputCloned,
        list: styles.list,
        listItems: styles.listMultiple,
        listSingle: styles.listSingle,
        listDropdown: styles.listDropdown,
        item: styles.item,
        itemSelectable: styles.itemSelectable,
        itemDisabled: styles.itemDisabled,
        itemChoice: styles.itemChoice,
        placeholder: styles.placeholder,
        group: styles.group,
        groupHeading: styles.heading,
        button: styles.button,
        activeState: styles.active,
        focusState: styles.focused,
        openState: styles.open,
        disabledState: styles.disabled,
        highlightedState: styles.highlighted,
        selectedState: styles.selected,
        flippedState: styles.flipped,
        loadingState: styles.loading,
        noResults: styles.noResults,
        noChoices: styles.noChoices,
      },
      callbackOnCreateTemplates: () => ({
        item: (...args) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const item = Choices.defaults.templates.item.call(this!, ...args);
          const btn = item.querySelector("button");
          if (btn) {
            const indicator = document.createElement("span");
            indicator.classList.add(styles.buttonIndicator);
            indicator.setAttribute("role", "presentation");
            indicator.insertAdjacentHTML(
              "afterbegin",
              ReactDOMServer.renderToString(<CloseIcon />)
            );
            btn?.appendChild(indicator);
          }
          return item;
        },
      }),
    });

    if (onSearch && select) {
      select.addEventListener("search", handleSearch);
    }

    return () => {
      debugger;
      if (onSearch && select) {
        select.removeEventListener("search", handleSearch);
      }
      choices?.current?.destroy();
    };
  }, [id, loadingText, noChoicesText, noResultsText, onSearch, handleSearch]);

  useEffect(() => {
    const forceValue = () => value && choices?.current?.setChoiceByValue(value);
    const node = choices?.current?.passedElement?.element;

    if (value && node) {
      forceValue();
      node.addEventListener("change", forceValue);
    } else if (!value && node) {
      node.removeEventListener("change", forceValue);
    }
  }, [value]);
};

export { useChoices };
