/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, ReactElement, ReactNode } from "react";

import { Button } from "../Button";
import { Drawer } from "../Drawer";

export type OdysseyLayoutProps = {
  title?: string;
  description?: string;
  documentation?: {
    link: string;
    text: string;
  };
  drawer?: ReactElement<typeof Drawer>;
  /**
   * An optional Button object to be situated in the layout header. Should almost always be of variant `primary`.
   */
  primaryCallToActionComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the layout header, alongside the `callToActionPrimaryComponent`.
   */
  secondaryCallToActionComponent?: ReactElement<typeof Button>;
  /**
   * An optional Button object to be situated in the layout header, alongside the other two `callToAction` components.
   */
  tertiaryCallToActionComponent?: ReactElement<typeof Button>;
  /**
   * The content of the layout. May be a `string` or any other `ReactNode` or array of `ReactNode`s.
   */
  children?: ReactNode;
};

const OdysseyLayout = ({ title }: OdysseyLayoutProps) => {
  return <>{title}</>;
};

const MemoizedOdysseyLayout = memo(OdysseyLayout);
MemoizedOdysseyLayout.displayName = "OdysseyLayout";

export { MemoizedOdysseyLayout as OdysseyLayout };
