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
  ComponentPropsWithoutRef,
  FunctionComponent,
  ReactText
} from 'react';
import { useCx, useOmit } from '../../utils';
import styles from './Title.module.scss';

type Levels = '1' | '2' | '3' | '4' | '5' | '6';

export interface Props extends Omit<
  ComponentPropsWithoutRef<'h1'>,
  'style' | 'className'
> {
  /**
   * The semantic level for the underlying heading tag
   * @default 1
   */
  level?: Levels,

  /**
   * The visual level level for the underlying heading tag
   */
  visualLevel?: Levels,

  /**
   * The human readable section title to be visually displayed
   */
  children: ReactText,

  /**
   * Remove default block end margin
   * @default false
   */
  noEndMargin?: boolean;

  /*
   * Specify explicit line height spacing
   */
  lineHeight?: 'base' | 'title';
}

/**
 * Titles are used to describe the main idea of a page, a section, 
 * or content that follows it. By default, header tags (h1 through h6)
 * use the corresponding title size.
 * 
 * @component
 */
const Title: FunctionComponent<Props> = (props) => {
  const {
    level = '1',
    visualLevel,
    children,
    noEndMargin = false,
    lineHeight,
    ...rest
  } = props;

  const Tag = `h${level}` as const;

  const componentClass = useCx(
    styles.heading,
    visualLevel && styles[`level${visualLevel}`],
    noEndMargin && styles.noEndMargin,
    lineHeight && styles[`${lineHeight}LineHeight`]
  );

  const omitProps = useOmit(rest);

  return (
    <Tag {...omitProps} className={componentClass}>{children}</Tag>
  );
};

export default Title;
