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

import { useEffect, useRef, ReactElement, ReactText } from "react";
import Choices from "choices.js";
import type { SelectOptionProps } from "./SelectOption";
import type { SelectOptionGroupProps } from "./SelectOptionGroup";
import styles from "./Select.module.scss";

type ChildrenType = ReactElement<SelectOptionProps | SelectOptionGroupProps>;
interface Option {
  value: ReactText;
}
interface Group {
  label: string;
  choices: Option[];
}

const isArray = (
  children: ChildrenType | ChildrenType[]
): children is ChildrenType[] => {
  return children instanceof Array;
};

const isFragment = (children: ChildrenType): children is ChildrenType => {
  return (
    !children.props.label &&
    !!children.props.children &&
    children.props.children instanceof Array
  );
};

const isGroup = (children: ChildrenType): children is ChildrenType => {
  return (
    !!children.props.label &&
    !!children.props.children &&
    children.props.children instanceof Array
  );
};

const parseChildren = (
  children: ChildrenType | ChildrenType[]
): (Group | Option)[] => {
  const options: (Group | Option)[] = [];

  if (isArray(children)) {
    children.forEach((child) => options.push(...parseChildren(child)));
  } else if (isFragment(children)) {
    options.push(...parseChildren(children.props.children as ChildrenType));
  } else {
    options.push(
      isGroup(children) ? parseGroup(children) : parseOption(children)
    );
  }

  return options;
};

const parseGroup = (group: ReactElement<SelectOptionGroupProps>): Group => {
  const options: Option[] = [];

  if (group.props.children instanceof Array) {
    group.props.children.forEach((child: any | any[]) =>
      options.push(parseOption(child))
    );
  } else {
    options.push(parseOption(group.props.children));
  }

  return { label: group.props.label, choices: options };
};

const parseOption = (option: ReactElement<SelectOptionProps>): Option => {
  return { value: option.props.children };
};

type UseChoices = (args: {
  id: string;
  children: ChildrenType | ChildrenType[];
  value?: string;
  loadingText?: string;
  noResultsText?: string;
  noChoicesText?: string;
}) => void;

export interface ChoicesHTMLSelectElement extends HTMLSelectElement {
  choices?: Choices;
}

const useChoices: UseChoices = ({
  id,
  children,
  value,
  loadingText,
  noResultsText,
  noChoicesText,
}) => {
  const choices = useRef<undefined | Choices>();

  useEffect(() => {
    const select = document.getElementById(id) as ChoicesHTMLSelectElement;

    const choicesInstance = new Choices(select, {
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
    });

    select.choices = choicesInstance;
    choices.current = choicesInstance;

    return () => {
      delete select.choices;
      choicesInstance.destroy();
    };
  }, [id, loadingText, noChoicesText, noResultsText]);

  useEffect(() => {
    choices.current?.setChoices(
      parseChildren(children),
      "value",
      "label",
      true
    );
  }, [children]);

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
