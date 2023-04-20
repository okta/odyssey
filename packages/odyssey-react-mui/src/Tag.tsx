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

import { Chip, ChipProps } from "@mui/material";
import { memo, useContext } from "react";
import { TagListContext } from "./TagListContext";

export type TagProps = {
  isDisabled?: boolean;
  label: string;
  onClick?: ChipProps["onClick"];
  onRemove?: ChipProps["onDelete"];
};

const Tag = ({ isDisabled, label, onClick, onRemove }: TagProps) => {
  const { chipElementType } = useContext(TagListContext);

  return (
    <Chip
      label={label}
      clickable={onClick ? true : false}
      component={chipElementType}
      disabled={isDisabled}
      onClick={onClick}
      onDelete={onRemove}
    />
  );
};

const MemoizedTag = memo(Tag);

export { MemoizedTag as Tag };
