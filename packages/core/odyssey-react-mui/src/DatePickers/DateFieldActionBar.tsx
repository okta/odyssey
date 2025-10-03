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

import styled from "@emotion/styled";
import { PickersActionBarProps } from "@mui/x-date-pickers";
import { memo } from "react";

import { Button } from "../Buttons/index.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../OdysseyDesignTokensContext.js";

const ActionContainer = styled.div<{ odysseyDesignTokens: DesignTokens }>(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    justifyContent: "flex-end",
    paddingInline: odysseyDesignTokens.Spacing4,
    paddingBlockEnd: odysseyDesignTokens.Spacing4,
  }),
);

const DateFieldActionBar = ({
  actions,
  onAccept,
  onCancel,
}: PickersActionBarProps) => {
  const { t } = useTranslation();
  const odysseyDesignTokens = useOdysseyDesignTokens();

  // actions will be [] or ["accept", "cancel"]
  if (actions && actions.length > 0) {
    return (
      <ActionContainer odysseyDesignTokens={odysseyDesignTokens}>
        <Button
          label={t("picker.labels.action.cancel")}
          onClick={onCancel}
          variant="floating"
        />
        <Button
          label={t("picker.labels.action.apply")}
          onClick={onAccept}
          variant="primary"
        />
      </ActionContainer>
    );
  }

  return null;
};

const MemoizedDateFieldActionBar = memo(DateFieldActionBar);
MemoizedDateFieldActionBar.displayName = "DateFieldActionBar";

export { MemoizedDateFieldActionBar as DateFieldActionBar };
