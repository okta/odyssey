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

import { useEffect, useRef } from 'react';
import Choices from 'choices.js';

const useChoices = (id: string, value?: string): void => {
  const choices = useRef<undefined | Choices>();

  useEffect(() => {
    const select = document.getElementById(id) as HTMLSelectElement;

    choices.current = new Choices(select, {
      searchEnabled: false,
      shouldSort: false,
      itemSelectText: '',
      removeItemButton: true,
      classNames: {
        containerOuter: 'ods-select',
        containerInner: 'ods-select--inner',
        input: 'ods-select--input',
        inputCloned: 'ods-select--input--cloned',
        list: 'ods-select--list',
        listItems: 'ods-select--list--multiple',
        listSingle: 'ods-select--list--single',
        listDropdown: 'ods-select--list--dropdown',
        item: 'ods-select--item',
        itemSelectable: 'ods-select--item--selectable',
        itemDisabled: 'ods-select--item--disabled',
        itemChoice: 'ods-select--item--choice',
        placeholder: 'ods-select--placeholder',
        group: 'ods-select--group',
        groupHeading: 'ods-select--heading',
        button: 'ods-select--button',
        activeState: 'is-ods-select-active',
        focusState: 'is-ods-select-focused',
        openState: 'is-ods-select-open',
        disabledState: 'is-ods-select-disabled',
        highlightedState: 'is-ods-select-highlighted',
        selectedState: 'is-ods-select-selected',
        flippedState: 'is-ods-select-flipped',
        loadingState: 'is-ods-select-loading',
        noResults: 'has-no-ods-select-results',
        noChoices: 'has-no-ods-select-choices'

        // TODO: fix english leaks for these properties
        // loadingText: 'Loading...',
        // noResultsText: 'No results found',
        // noChoicesText: 'No choices to choose from',
        // itemSelectText: 'Press to select',
      }
    });

    return () => choices?.current?.destroy();
  }, [id]);


  useEffect(() => {
    const forceValue = () => value && choices?.current?.setChoiceByValue(value);
    const node = choices?.current?.passedElement?.element;

    if (value && node) {
      forceValue();
      node.addEventListener('change', forceValue);
    } else if (!value && node) {
      node.removeEventListener('change', forceValue);
    }
  }, [value]);
};

export { useChoices as default };
