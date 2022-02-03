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

import React, { forwardRef } from "react";
import type { ComponentPropsWithRef } from "react";
import { withTheme } from "@okta/odyssey-react-theme";
import { useOmit } from "../../utils";
import { Box } from "../Box";
import styles from "./TagList.module.scss";
import { theme } from "./TagList.theme";

export interface TagListProps
  extends Omit<
    ComponentPropsWithRef<"ul">,
    "style" | "className" | "children" | "color"
  > {
  /**
   * Children are never rendered.
   */
  children?: never;
  /**
   * Text content to be rendered within the tag, it should describe an entity.
   */
  tags: string[];
}

/**
 * Use TagList to help describe and differentiate an entity or object.
 * Think of them as “adjectives” in your UI toolbox that make navigating
 * and parsing content easier.
 */
export const TagList = withTheme(
  theme,
  styles
)(
  forwardRef<HTMLUListElement, TagListProps>((props, ref) => {
    const { tags, ...rest } = props;
    const omitProps = useOmit(rest);

    return (
      <Box as="ul" {...omitProps} ref={ref} className={styles.root}>
        {tags.map((item) => (
          <li className={styles.item} key={item}>
            {item}
          </li>
        ))}
      </Box>
    );
  })
);

TagList.displayName = "TagList";
