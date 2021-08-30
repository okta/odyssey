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

import type { FunctionComponent, ReactElement, ReactNode } from 'react';
import { useCx, useOmit } from '../../utils';
import Title from '../Title';
import styles from './Infobox.module.scss';

export type InfoboxVariants = 'info' | 'danger' | 'caution' | 'success';

export type Props = {
  /**
   * Content to be rendered within the infobox. Avoid using direct children, put child content
   * within the provided Infobox static components (Infobox.Content and Infobox.Actions)
   */
  children: ReactElement | ReactElement[],

  /**
   * The visual variant to be displayed to the user.
   * @default info
   */
  variant?: InfoboxVariants,

  /**
   * The title or headline of the Infobox. If Infobox.Content is not present it is required.
   */
  title?: string;
};

type PropsInfoboxContent = {
  children: ReactNode
}

type PropsInfoboxActions = {
  children: ReactNode
}

export type StaticComponents = {
  Content: FunctionComponent<PropsInfoboxContent>,
  Actions: FunctionComponent<PropsInfoboxActions>,
}

/**
 * An infobox is a type of alert that provides feedback in response to a
 * user action or system activity.
 *
 * @component
 * @example
 * <Infobox variant="primary" title="Moonbase Alpha-6">
 *  <Infobox.Content>
 *    You are currently logged in from Moonbase Alpha-6, located on Luna.
 *  </Infobox.Content>
 *  <Infobox.Actions>
 *    <Link href="/fuel">Visit fueling console</Link>
 *  </Infobox.Actions>
 * </Infobox>
 */

 const Infobox: FunctionComponent<Props> & StaticComponents = (props) => {
  const {
    children,
    title,
    variant = "info",
    ...rest
  } = props;

  const componentClass = useCx(
    styles.root,
    styles[`${variant}Variant`],
  );

  const omitProps = useOmit(rest);

  return (
    <aside
    {...omitProps}
      className={componentClass}
      role="status"
    >
      <span className={styles.icon}>
        {/* @todo Insert <Icon> component */}
        ‽
      </span>
      { title && <div className={ styles.title }><Title visualLevel="6" children={ title } /></div> }
      { children }
    </aside>
  );
};

Infobox.Content = ({ children }) => (
  <section className={styles.content}>
    {children}
  </section>
);

Infobox.Actions = ({ children }) => (
  <section className={styles.actions}>
    {children}
  </section>
);

export default Infobox;
