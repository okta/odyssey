/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { createTheme } from "@mui/material/styles";

import { palette } from "./palette";
import "./palette.types";
import { shape } from "./shape";
import "./shape.types";
import { mixins } from "./mixins";
import "./mixins.types";
import { spacing } from "./spacing";
import { typography } from "./typography";
import "./typography.types";
import { components } from "./components";
import "./components.types";

export const theme = createTheme({
  palette,
  shape,
  mixins,
  spacing,
  typography,
  components,
  odyssey: {
    borderWidth: "1px",
  },
});

// This TS mod allows for `odyssey` above, but not within components.ts
declare module "@mui/material/styles" {
  interface Theme {
    odyssey: {
      borderWidth: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    odyssey?: {
      borderWidth?: string;
    };
  }
}
