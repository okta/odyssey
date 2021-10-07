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

import { forwardRef } from "react";
import type {
  ComponentType,
  ForwardRefRenderFunction,
  ForwardRefExoticComponent,
} from "react";

/* eslint-disable-next-line @typescript-eslint/ban-types */
type BaseShape = object;
type Exotic<Props, Statics> = ForwardRefExoticComponent<Props> & Statics;

export function forwardRefWithStatics<
  Ref extends Element | ComponentType<Props>,
  Props extends BaseShape,
  Statics extends BaseShape
>(render: ForwardRefRenderFunction<Ref, Props>): Exotic<Props, Statics> {
  return forwardRef<Ref, Props>(render) as Exotic<Props, Statics>;
}
