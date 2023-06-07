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

import { memo, ReactElement } from "react";

import { Box, Typography } from "@mui/material";
import { Infobox } from "./Infobox";
import { useUniqueId } from "./useUniqueId";

export type FieldsetProps = {
  /**
   * The title of the Fieldset
   */
  legend: string;
  /**
   * A supplementary description
   */
  description?: string;
  /**
   * The Field components within the Fieldset
   */
  children: ReactElement | Array<ReactElement>;
  /**
   * An Infobox indicating a Fieldset-wide error or status update.
   */
  alert?: ReactElement<typeof Infobox>;
  /**
   * The name associated with the group.
   */
  name?: string;
  // /**
  //  * If this Boolean attribute is set, all form controls that are descendants of the <fieldset>, are disabled, meaning they are not editable and won't be submitted along with the <form>.
  //  * They won't receive any browsing events, like mouse clicks or focus-related events.
  //  * Note that form elements inside the <legend> element won't be disabled.
  //  */
  // NOTE: Functionality is currently disabled. This will correctly disable child <input>s, but will not pass `isDisabled` to the child components.
  // isDisabled?: boolean;
  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   */
  id?: string;
};

const Fieldset = ({
  alert,
  children,
  description,
  legend,
  name,
  id: idOverride,
}: // isDisabled,
FieldsetProps) => {
  const id = useUniqueId(idOverride);

  return (
    <Box
      component="fieldset"
      // disabled={isDisabled}
      name={name}
      id={id}
      sx={{
        maxWidth: (theme) => theme.mixins.maxWidth,
        margin: (theme) => theme.spacing(0),
        marginBlockEnd: (theme) => theme.spacing(4),
        padding: (theme) => theme.spacing(0),
        border: "0",

        "&:last-child": {
          marginBlockEnd: (theme) => theme.spacing(0),
        },
      }}
    >
      <Typography variant="legend" component="legend">
        {legend}
      </Typography>
      {description && <Typography paragraph>{description}</Typography>}
      {alert}
      {children}
    </Box>
  );
};

const MemoizedFieldset = memo(Fieldset);
MemoizedFieldset.displayName = "Fieldset";

export { MemoizedFieldset as Fieldset };
