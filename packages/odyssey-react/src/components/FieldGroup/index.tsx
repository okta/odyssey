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

import styles from './FieldGroup.module.scss';

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

type PropsFieldGroupError = {
  children: ReactNode
}

export type StaticComponents = {
  Error: FunctionComponent<PropsFieldGroupError>,
}

/**
 * A Form contains interactive controls for submitting information.
 *
 * @component
 * @example
 * <Form title="Interplanetary flight registration" desc="Complete this form in order to register for your interplanetary transfer.">
 *  <Form.Error>
 *  </Form.Error>
 *  <Form.Main>
 *  </Form.Main>
 *  <Form.Actions>
 *  </Form.Actions>
 * </Form>
 */

const FieldGroup: FunctionComponent<Props> & StaticComponents = (props) => {
  const {
    children,
    title,
    desc,
    ...rest
  } = props;

  const omitProps = useOmit(rest);

  return (
    <fieldset
      {...omitProps}
      className={styles.root}
    >
      { title && <legend className={styles.title}>{ title }</legend> }
      { desc && <p>{ desc }</p> }
      { children }
    </fieldset>
  );
};

FieldGroup.Error = ({ children }) => (
  <section className={styles.error}>
    {children}
  </section>
);

export default FieldGroup;

