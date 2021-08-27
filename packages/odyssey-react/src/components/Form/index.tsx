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

import type { FunctionComponent, ReactNode, ReactElement } from 'react';
import { useOmit } from '../../utils';

import Title from '../Title';

import styles from './Form.module.scss';

export type Props = {
  /**
   * Content to be rendered within the Form. Avoid using direct children, put child content
   * within the provided Form static components (Form.Error, Form.Main, and Form.Actions)
   */
  children: ReactElement | ReactElement[],

  /**
   * The title of the Form.
   */
  title?: string;

  /**
   * A short description of the form.
   */
  desc?: string;

};

type PropsFormError = {
  children: ReactNode
}

type PropsFormMain = {
  children: ReactNode
}

type PropsFormActions = {
  children: ReactNode
}

export type StaticComponents = {
  Error: FunctionComponent<PropsFormError>,
  Main: FunctionComponent<PropsFormMain>,
  Actions: FunctionComponent<PropsFormActions>,
}

const Form: FunctionComponent<Props> & StaticComponents = (props) => {
  const {
    children,
    title,
    desc,
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  return (
    <form
      {...omitProps}
      className={styles.root}
    >
      <header className={styles.header}>
        { title && <Title visualLevel="3" children={ title } /> }
        { desc && <p>{ desc }</p> }
      </header>
      { children }
    </form>
  );
};

Form.Error = ({ children }) => (
  <section className={styles.error}>
    {children}
  </section>
);

Form.Main = ({ children }) => (
  <section className={styles.main}>
    {children}
  </section>
);

Form.Actions = ({ children }) => (
  <section className={styles.actions}>
    {children}
  </section>
);

export default Form;
