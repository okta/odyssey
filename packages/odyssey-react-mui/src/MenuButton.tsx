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

import {
  Button,
  ButtonProps,
  ChevronDownIcon,
  Divider,
  ListSubheader,
  Menu,
  MenuItem,
  useUniqueId,
} from "./";
import { memo, MouseEvent, ReactElement, useMemo, useState } from "react";

export type MenuButtonProps = {
  /**
   * The <MenuItem> components within the Menu.
   */
  children: Array<
    ReactElement<typeof MenuItem | typeof Divider | typeof ListSubheader>
  >;
  /**
   * The end Icon on the trigggering Button
   */
  buttonEndIcon?: ReactElement;
  /**
   * The label on the triggering Button
   */
  buttonLabel?: string;
  /**
   * The variant of the triggering Button
   */
  buttonVariant?: ButtonProps["variant"];
};

const MenuButton = ({
  buttonLabel = "",
  children,
  buttonEndIcon = <ChevronDownIcon />,
  buttonVariant = "secondary",
}: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uniqueId = useUniqueId();

  const menuListProps = useMemo(
    () => ({ "aria-labelledby": `${uniqueId}-button` }),
    [uniqueId]
  );

  return (
    <div>
      <Button
        endIcon={buttonEndIcon}
        id={`${uniqueId}-button`}
        aria-controls={open ? `${uniqueId}-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        text={buttonLabel}
        variant={buttonVariant}
      />
      <Menu
        id={`${uniqueId}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={menuListProps}
      >
        {children}
      </Menu>
    </div>
  );
};

const MemoizedMenuButton = memo(MenuButton);

export { MemoizedMenuButton as MenuButton };
