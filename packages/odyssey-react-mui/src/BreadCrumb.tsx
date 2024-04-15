/*!
 * Copyright (c) 2023-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, PropsWithChildren, useContext } from "react";
import { ButtonBase, MenuItem } from "@mui/material";
import styled from "@emotion/styled";

import { BreadcrumbContext } from "./Breadcrumbs";
import { GroupIcon, UserIcon } from "./icons.generated";
import { Subordinate } from "./Typography";

const BreadcrumbContent = styled.span`
  white-space: nowrap;
  overflow: hidden;
  max-width: 10rem;
  text-overflow: ellipsis;
`;

export type BreadcrumbProps = {
  href: string;
  iconName?: "user" | "group";
};

const Breadcrumb = ({
  children,
  href,
  iconName,
}: PropsWithChildren<BreadcrumbProps>) => {
  const { breadcrumbType } = useContext(BreadcrumbContext);

  const breadcrumbContent = (
    <>
      {iconName === "group" ? (
        <GroupIcon />
      ) : iconName === "user" ? (
        <UserIcon />
      ) : null}
      <BreadcrumbContent>{children}</BreadcrumbContent>
    </>
  );

  if (breadcrumbType === "menuItem") {
    return <MenuItem href={href}>{breadcrumbContent}</MenuItem>;
  }

  if (breadcrumbType === "currentPage") {
    return <Subordinate color="textPrimary">{breadcrumbContent}</Subordinate>;
  }

  // breadcrumbType === "listItem" is the default
  // Provided here without a conditional to get TS to be quiet
  // about potential undefined returns
  return <ButtonBase href={href}>{breadcrumbContent}</ButtonBase>;
};

const MemoizedBreadcrumb = memo(Breadcrumb);
MemoizedBreadcrumb.displayName = "Breadcrumb";

export { MemoizedBreadcrumb as Breadcrumb };
