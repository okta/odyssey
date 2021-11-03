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

import type {
  ComponentPropsWithRef,
  ComponentType,
  ElementType,
  ForwardRefExoticComponent,
  ReactElement,
} from "react";

type Merge<P1, P2> = Omit<P1, keyof P2 | "style" | "className"> & P2;

type PolymorphicForwardRefExotic<Exotic, OwnProps> = ForwardRefExoticComponent<
  Merge<
    Exotic extends ElementType ? ComponentPropsWithRef<Exotic> : never,
    OwnProps & { as?: Exotic }
  >
>;

export interface PolymorphicForwardRef<IntrinsicElement, OwnProps>
  extends PolymorphicForwardRefExotic<IntrinsicElement, OwnProps> {
  <As = IntrinsicElement>(
    props: As extends ""
      ? { as: keyof JSX.IntrinsicElements }
      : As extends ComponentType<infer P>
      ? Merge<P, OwnProps & { as: As }>
      : As extends keyof JSX.IntrinsicElements
      ? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
      : never
  ): ReactElement | null;
}
