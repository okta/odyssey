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
  buttonEndIcon?: ButtonProps["endIcon"];
  /**
   * The label on the triggering Button
   */
  buttonLabel?: ButtonProps["text"];
  /**
   * The variant of the triggering Button
   */
  buttonVariant?: ButtonProps["variant"];
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * Sets the text of the tooltip that appears on the trigger.
   */
  tooltipText?: ButtonProps["tooltipText"];
};

const MenuButton = ({
  buttonEndIcon = <ChevronDownIcon />,
  buttonLabel = "",
  buttonVariant = "secondary",
  children,
  id: idOverride,
  tooltipText,
}: MenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uniqueId = useUniqueId(idOverride);

  const menuListProps = useMemo(
    () => ({ "aria-labelledby": `${uniqueId}-button` }),
    [uniqueId]
  );

  return (
    <div>
      <Button
        aria-controls={open ? `${uniqueId}-menu` : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        endIcon={buttonEndIcon}
        id={`${uniqueId}-button`}
        onClick={handleClick}
        text={buttonLabel}
        tooltipText={tooltipText}
        variant={buttonVariant}
      />
      <Menu
        anchorEl={anchorEl}
        id={`${uniqueId}-menu`}
        MenuListProps={menuListProps}
        onClose={handleClose}
        open={open}
      >
        {children}
      </Menu>
    </div>
  );
};

const MemoizedMenuButton = memo(MenuButton);

export { MemoizedMenuButton as MenuButton };
