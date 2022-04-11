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

import React from "react";
import type { ReactElement, RefObject, ReactNode } from "react";

export interface AffixProps {
  AffixButton?: ReactNode;
  AffixIcon?: ReactNode;
  AffixText?: string;
  className: string;
  sharedRef: RefObject<HTMLInputElement>;
}

export function Affix(props: AffixProps): ReactElement {
  const { AffixButton, AffixIcon, AffixText, className, sharedRef } = props;

  const setFocus = () => {
    requestAnimationFrame(() => {
      if (sharedRef.current) {
        sharedRef.current.focus();
      }
    });
  };

  return (
    <>
      {AffixText || AffixIcon ? (
        <span className={className} aria-hidden="true" onClick={setFocus}>
          {AffixText || AffixIcon}
        </span>
      ) : (
        AffixButton && <span className={className}>{AffixButton}</span>
      )}
    </>
  );
}
