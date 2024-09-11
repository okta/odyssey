/*!
 * Copyright (c) 2024-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo, useMemo, ReactElement } from "react";
import { CollapseLeftIcon } from "../../icons.generated";
import { Box } from "../../Box";
import { Button } from "../../Button";
import { useOdysseyDesignTokens } from "../../OdysseyDesignTokensContext";

const CollapseIcon = ({ onClick }: { onClick?(): void }): ReactElement => {
  const odysseyDesignTokens = useOdysseyDesignTokens();

  const collapseButtonStyles = useMemo(
    () => ({
      "& > button": {
        height: odysseyDesignTokens.Spacing6,
        width: odysseyDesignTokens.Spacing6,
        color: odysseyDesignTokens.HueNeutral400,
      },
    }),
    [odysseyDesignTokens],
  );

  return (
    <Box sx={collapseButtonStyles}>
      <Button
        tabIndex={0}
        variant="secondary"
        onClick={onClick}
        startIcon={<CollapseLeftIcon />}
        ariaLabel="collapse side navigation"
      />
    </Box>
  );
};
const MemoizedCollapseIcon = memo(CollapseIcon);
MemoizedCollapseIcon.displayName = "CollapseIcon";

export { MemoizedCollapseIcon as CollapseIcon };
