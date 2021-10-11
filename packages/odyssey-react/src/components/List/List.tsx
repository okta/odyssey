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

import type {
  ReactElement,
  ComponentPropsWithoutRef,
  ForwardedRef,
} from "react";
import { forwardRefWithStatics, useOmit, useCx, withStyles } from "../../utils";
import styles from "./List.module.scss";
import ListItem from "./ListItem";
import DescriptionTerm from "./DescriptionTerm";
import DescriptionDetails from "./DescriptionDetails";

type ListProps = {
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
};

type UnorderedProps = ListProps & ComponentPropsWithoutRef<"ul">;
type OrderedProps = ListProps & ComponentPropsWithoutRef<"ol">;
type DescriptionProps = ListProps & ComponentPropsWithoutRef<"dl">;

export type Props = Omit<
  UnorderedProps | OrderedProps | DescriptionProps,
  "style" | "className"
>;

type Statics = {
  Item: typeof ListItem;
  Term: typeof DescriptionTerm;
  Details: typeof DescriptionDetails;
};

const List = forwardRefWithStatics<HTMLElement, Props, Statics>(
  (props, ref) => {
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
  }
);

List.Item = ListItem;
List.Term = DescriptionTerm;
List.Details = DescriptionDetails;

export default withStyles(styles)(List);
