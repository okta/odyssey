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

import React from "react";
import type { ReactElement, ComponentPropsWithRef, ForwardedRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { forwardRefWithStatics, useOmit, useCx } from "../../utils";
import styles from "./List.module.scss";
import { ListItem } from "./ListItem";
import { DescriptionTerm } from "./DescriptionTerm";
import { DescriptionDetails } from "./DescriptionDetails";

interface CommonProps {
  /**
   * List Items
   */
  children?: ReactElement | ReactElement[];
  /**
   * List element used
   * @default unordered
   */
  listType?: "unordered" | "ordered" | "description";
  /**
   * Remove default styling
   * @default false
   */
  unstyled?: boolean;
}

type UnorderedProps = CommonProps & ComponentPropsWithRef<"ul">;
type OrderedProps = CommonProps & ComponentPropsWithRef<"ol">;
type DescriptionProps = CommonProps & ComponentPropsWithRef<"dl">;

export type ListProps = Omit<
  UnorderedProps | OrderedProps | DescriptionProps,
  "style" | "className"
>;

type Statics = {
  Item: typeof ListItem;
  Term: typeof DescriptionTerm;
  Details: typeof DescriptionDetails;
};

/**
 * List provides ordered, unordered, description, and unstyled list UI.
 */
export const List = withTheme(
  () => ({}),
  styles
)(
  forwardRefWithStatics<HTMLElement, ListProps, Statics>((props, ref) => {
    const {
      children,
      listType = "unordered",
      unstyled = false,
      ...rest
    } = props;

    const omitProps = useOmit(rest);

    const componentClass = useCx(
      !unstyled && styles.root,
      unstyled ? styles.unstyled : styles[listType]
    );

    function ListElement() {
      if (listType === "ordered") {
        return (
          <ol
            {...omitProps}
            className={componentClass}
            ref={ref as ForwardedRef<HTMLOListElement>}
          >
            {children}
          </ol>
        );
      } else if (listType === "description") {
        return (
          <dl
            {...omitProps}
            className={componentClass}
            ref={ref as ForwardedRef<HTMLDListElement>}
          >
            {children}
          </dl>
        );
      }
      return (
        <ul
          {...omitProps}
          className={componentClass}
          ref={ref as ForwardedRef<HTMLUListElement>}
        >
          {children}
        </ul>
      );
    }

    return <ListElement />;
  })
);

List.displayName = "List";

List.Item = ListItem;
List.Term = DescriptionTerm;
List.Details = DescriptionDetails;
