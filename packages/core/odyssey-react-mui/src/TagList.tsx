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

import { Stack } from "@mui/material";
import { Children, memo, type ReactElement } from "react";

import { createOdysseyStyledComponent } from "./createOdysseyStyledComponent.js";
import { HtmlProps } from "./HtmlProps.js";
import { Tag } from "./Tag.js";

const StyledUnorderedList = createOdysseyStyledComponent({ tag: "ul" })({
  listStyle: "none",
});

export type TagListProps = {
  /**
   * The Tag or array of Tags within the TagList
   */
  children: ReactElement<typeof Tag> | Array<ReactElement<typeof Tag>>;
} & Pick<HtmlProps, "ariaLabel" | "testId">;

/**
 * A horizontal, wrapping list of Tag elements rendered as a semantic `<ul>`. Each Tag is contained by a semantic `<li>`. Use to display a collection of tags associated with an item or entity.
 */
const TagList = ({ ariaLabel, children, testId }: TagListProps) => {
  return (
    <Stack
      aria-label={ariaLabel}
      component={StyledUnorderedList}
      data-se={testId}
      direction="row"
      flexWrap="wrap"
      spacing={2}
      useFlexGap
    >
      {Children.map(children, (tag) => (
        <li>{tag}</li>
      ))}
    </Stack>
  );
};

const MemoizedTagList = memo(TagList);
MemoizedTagList.displayName = "TagList";

export { MemoizedTagList as TagList };
