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
import { memo, ReactElement, useContext } from "react";
import { TagListContext } from "./TagListContext";
import { Icon } from "./Icon";

export type TagProps = {
  /**
   * An optional icon to display alongside the Tag label
   */
  icon?: ReactElement<typeof Icon>;
  /**
   * If `true`, the Tag is disabled
   */
  isDisabled?: boolean;
  /**
   * The label text for the Tag
   */
  label: string;
  /**
   * Callback fired when the Tag is clicked
   */
  onClick?: ChipProps["onClick"];
  /**
   * Callback fired when the remove button of the Tag is clicked
   */
  onRemove?: ChipProps["onDelete"];
};

const Tag = ({ icon, isDisabled, label, onClick, onRemove }: TagProps) => {
  const { chipElementType } = useContext(TagListContext);

  return (
    <Chip
      clickable={onClick ? true : false}
      component={chipElementType}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      icon={icon}
      label={label}
      onClick={onClick}
      onDelete={onRemove}
    />
  );
};

const MemoizedTag = memo(Tag);
MemoizedTag.displayName = "Tag";

export { MemoizedTag as Tag };
