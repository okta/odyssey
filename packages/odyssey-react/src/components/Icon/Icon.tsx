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

import { ComponentPropsWithoutRef, forwardRef } from "react";
import { useOmit } from "../../utils";
import { iconDictionary } from "./";

export interface Props
  extends Omit<ComponentPropsWithoutRef<"svg">, "style" | "className"> {
  /**
   * Title text used by screen readers
   */
  title?: string;
  /**
   * Name of icon to render
   */
  name: keyof typeof iconDictionary;
  /**
   * Inset used for optical alignment of icon with text
   */
  insetBlockStart?: "initial" | "auto";
}

/**
 * A system of icons which establishes a visual language
 * that can be easily understood regardless of age, language or culture.
 */

const Icon = forwardRef<SVGSVGElement, Props>(
  ({ name, title, ...rest }, ref) => {
    const omitProps = useOmit(rest);

    const NamedIcon = iconDictionary[name];

    return <NamedIcon {...omitProps} title={title} ref={ref} />;
  }
);

export default Icon;
