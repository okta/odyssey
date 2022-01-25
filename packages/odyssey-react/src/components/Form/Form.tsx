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
import type { ComponentPropsWithRef, ReactNode, ReactElement } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOmit, forwardRefWithStatics } from "../../utils";
import { Heading } from "../Heading";
import { Box } from "../Box";
import { Text } from "../Text";
import styles from "./Form.module.scss";
import { theme } from "./Form.theme";

export interface FormProps
  extends Omit<ComponentPropsWithRef<"form">, "style" | "color" | "className"> {
  /**
   * Content to be rendered within the Form. Avoid using direct children, put child content
   * within the provided Form static components (Form.Error and Form.Actions)
   */
  children: ReactElement | ReactElement[];

  /**
   * The title of the Form.
   */
  title?: string;

  /**
   * A short description of the form.
   */
  desc?: string;
}

interface PropsError {
  children: ReactNode;
}

interface PropsMain {
  children: ReactNode;
}

interface PropsActions {
  children: ReactNode;
}

type Statics = {
  Error: typeof FormError;
  Main: typeof Main;
  Actions: typeof Actions;
};

export const Form = withTheme(
  theme,
  styles
)(
  forwardRefWithStatics<HTMLFormElement, FormProps, Statics>((props, ref) => {
    const { children, title, desc, ...rest } = props;

    const omitProps = useOmit(rest);

    return (
      <Box as="form" {...omitProps} className={styles.root} ref={ref}>
        <header className={styles.header}>
          {title && <Heading visualLevel="3" children={title} />}
          {desc && <Text as="p">{desc}</Text>}
        </header>
        {children}
      </Box>
    );
  })
);

function FormError({ children }: PropsError) {
  return <section className={styles.error}>{children}</section>;
}

function Main({ children }: PropsMain) {
  return <section className={styles.main}>{children}</section>;
}

function Actions({ children }: PropsActions) {
  return <section className={styles.actions}>{children}</section>;
}

Form.Error = FormError;
Form.Main = Main;
Form.Actions = Actions;

Form.displayName = "Form";
FormError.displayName = "FormError";
Main.displayName = "FormMain";
Actions.displayName = "FormActions";
