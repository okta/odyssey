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
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider as EmotionTP } from "@emotion/react";
import {
  ThemeProvider as OdysseyTP,
  useTheme,
} from "@okta/odyssey-react-theme";

/**
 * A provider component for overriding theme values.
 */
export const ThemeProvider: typeof OdysseyTP = (props) => {
  const { as, theme, children } = props;
  return (
    <OdysseyTP
      as={as}
      theme={theme}
      children={<Consumer children={children} />}
    />
  );
};

const Consumer = ({ children }: { children: ReactNode }): ReactElement => {
  const theme = useTheme();
  return <EmotionTP theme={theme} children={children} />;
};
