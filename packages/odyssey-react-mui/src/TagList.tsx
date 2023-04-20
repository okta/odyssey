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

import { Tag } from "./";
import { Stack } from "@mui/material";
import { memo, ReactElement, useMemo } from "react";
import { ChipElementType, TagListContext } from "./TagListContext";

export type TagListProps = {
  children: ReactElement<typeof Tag> | Array<ReactElement<typeof Tag>>;
};

const TagList = ({ children }: TagListProps) => {
  const providerValue = useMemo<{
    chipElementType: ChipElementType;
  }>(
    () => ({
      chipElementType: "li",
    }),
    []
  );

  return (
    <Stack component="ul" direction="row" spacing={2}>
      <TagListContext.Provider value={providerValue}>
        {children}
      </TagListContext.Provider>
    </Stack>
  );
};

const MemoizedTagList = memo(TagList);

export { MemoizedTagList as TagList };
