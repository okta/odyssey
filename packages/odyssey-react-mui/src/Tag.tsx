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
  icon?: ReactElement<typeof Icon>;
  isDisabled?: boolean;
  label: string;
  onClick?: ChipProps["onClick"];
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
