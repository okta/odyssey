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

import { forwardRef, memo, ReactNode, useMemo } from "react";

import { MuiPropsContext, MuiPropsContextType } from "./MuiPropsContext.js";

export type MuiPropsChildProps = {
  children: ReactNode;
};

const MuiPropsChild = forwardRef<HTMLElement, MuiPropsChildProps>(
  ({ children, ...muiProps }, ref) => {
    const providerValue = useMemo<MuiPropsContextType>(
      () => ({
        ...muiProps,
        ref,
      }),
      [muiProps, ref],
    );

    return (
      <MuiPropsContext.Provider value={providerValue}>
        {children}
      </MuiPropsContext.Provider>
    );
  },
);

const MemoizedMuiPropsChild = memo(MuiPropsChild);
MemoizedMuiPropsChild.displayName = "MuiPropsChild";

export { MemoizedMuiPropsChild as MuiPropsChild };
