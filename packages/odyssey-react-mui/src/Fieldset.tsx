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

import { Box } from "@mui/material";
import { memo, ReactElement, useMemo } from "react";

import { Callout } from "./Callout";
import { FieldsetContext } from "./FieldsetContext";
import { Legend, Support } from "./Typography";
import { useOdysseyDesignTokens } from "./OdysseyDesignTokensContext";
import { useUniqueId } from "./useUniqueId";
import type { HtmlProps } from "./HtmlProps";

export type FieldsetProps = {
  /**
   * A Callout indicating a Fieldset-wide error or status update.
   */
  alert?: ReactElement<typeof Callout>;
  /**
   * The Field components within the Fieldset
   */
  children: ReactElement | Array<ReactElement>;
  /**
   * A supplementary description
   */
  description?: string;
  /**
   * Defines a unique identifier (ID) which must be unique in the whole document.
   */
  id?: string;
  /**
   * Disables the component and any wrapped input fields.
   */
  isDisabled?: boolean;
  /**
   * The title of the Fieldset
   */
  legend: string;
  /**
   * The name associated with the group.
   */
  name?: string;
} & HtmlProps;

const Fieldset = ({
  alert,
  children,
  description,
  id: idOverride,
  isDisabled = false,
  legend,
  name,
  testId,
  translate,
}: FieldsetProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const id = useUniqueId(idOverride);

  const fieldsetContextValue = useMemo(
    () => ({
      isDisabled,
    }),
    [isDisabled]
  );

  return (
    <Box
      component="fieldset"
      data-se={testId}
      disabled={isDisabled}
      name={name}
      id={id}
      sx={{
        border: "0",
        margin: odysseyDesignTokens.Spacing0,
        marginBlockEnd: odysseyDesignTokens.Spacing6,
        maxWidth: odysseyDesignTokens.TypographyLineLengthMax,
        padding: odysseyDesignTokens.Spacing0,

        "&:last-child": {
          marginBlockEnd: odysseyDesignTokens.Spacing0,
        },
      }}
    >
      <Legend translate={translate}>{legend}</Legend>

      {description && <Support translate={translate}>{description}</Support>}

      {alert}

      <FieldsetContext.Provider value={fieldsetContextValue}>
        {children}
      </FieldsetContext.Provider>
    </Box>
  );
};

const MemoizedFieldset = memo(Fieldset);
MemoizedFieldset.displayName = "Fieldset";

export { MemoizedFieldset as Fieldset };
