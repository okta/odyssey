/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { css } from "@emotion/react";
import { FormEventHandler, ReactNode, useMemo } from "react";

import { useTheme } from "./";

export type FormProps = {
  children: ReactNode;
  onSubmit?: FormEventHandler;
};

export const Form = ({ children, onSubmit }: FormProps) => {
  const theme = useTheme();

  const formStyles = useMemo(
    () => css`
      padding: ${theme.spacing(2)};
    `,
    [theme]
  );

  return (
    <form css={formStyles} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
