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
  ComponentPropsWithRef,
  ForwardedRef
} from 'react';

import {
  forwardRefWithStatics,
  useOmit,
  useCx
} from '../../utils';

import styles from './List.module.scss';
import ListItem from './ListItem';
import DescriptionTerm from './DescriptionTerm';
import DescriptionDetails from './DescriptionDetails';

export type Props = {
  /**
  * List Items
  */
  children?: ReactElement | ReactElement[],
  /**
   * List element used 
   */
   listType?: 'unordered' | 'ordered' | 'description',
   /**
    * Remove default styling
    */
   unstyled?: boolean,
} & ComponentPropsWithRef<'ul'> & ComponentPropsWithRef<'ol'> & ComponentPropsWithRef<'dl'>;

type Statics = {
  Item: typeof ListItem,
  Term: typeof DescriptionTerm,
  Details: typeof DescriptionDetails,
}

const List = forwardRefWithStatics<HTMLElement, Props, Statics>((props, ref) => {
  const {
    children,
    listType = 'unordered',
    unstyled = false,
    ...rest
  } = props

  const omitProps = useOmit(rest);

  const componentClass = useCx(
    !unstyled && styles.root,
    unstyled ? styles.unstyled : styles[listType ],
  );

  function ListElement() {
    if (listType === 'ordered') {
      return (
        <ol className={componentClass} ref={ref as ForwardedRef<HTMLOListElement>} {...omitProps}>
          {children}
        </ol >
      );
    }
    else if (listType === 'description'){
      return (
        <dl className={componentClass} ref={ref as ForwardedRef<HTMLDListElement>} {...omitProps}>
          {children}
        </dl >
      );
    }
    return (
      <ul className={componentClass} ref={ref as ForwardedRef<HTMLUListElement>} {...omitProps}>
        {children}
      </ul >
    );
  }

  return (
    <ListElement />
  )
})

List.Item = ListItem;
List.Term = DescriptionTerm;
List.Details = DescriptionDetails;

export default List;
