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

import { memo, useMemo, useState } from "react";
import {
  Tooltip as MuiTooltip,
  IconButton as MuiIconButton,
  Checkbox as MuiCheckbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons.generated";
import { Card, CardProps } from "../../Card";
import styled from "@emotion/styled";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext";

export type DataCardProps = Omit<
  CardProps,
  "accessory|button|isLoading|onClick"
> & {
  hasSelection?: boolean;
  isSelected?: boolean;
  onSelectionChange?: () => void;
};

const CheckboxContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  marginBlockStart: `-${odysseyDesignTokens.Spacing1}`,
}));

const AccessoryPlaceholder = styled(MuiIconButton)(() => ({
  visibility: "hidden",
}));

const DataCard = ({
  children,
  description,
  detailPanel,
  hasSelection,
  image,
  isSelected,
  onSelectionChange,
  overline,
  title,
  variant,
  menuButtonChildren,
}: DataCardProps) => {
  const odysseyDesignTokens = useOdysseyDesignTokens();
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const SelectionCheckbox = useMemo(
    () => (
      <CheckboxContainer odysseyDesignTokens={odysseyDesignTokens}>
        <MuiCheckbox checked={isSelected} onChange={onSelectionChange} />
      </CheckboxContainer>
    ),
    [isSelected, odysseyDesignTokens, onSelectionChange],
  );

  const ExpansionToggle = useMemo(() => {
    return detailPanel ? (
      <MuiTooltip
        title={
          isExpanded
            ? t("table.rowexpansion.collapse")
            : t("table.rowexpansion.expand")
        }
      >
        <MuiIconButton
          children={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={
            isExpanded
              ? t("table.rowexpansion.collapse")
              : t("table.rowexpansion.expand")
          }
        />
      </MuiTooltip>
    ) : (
      <AccessoryPlaceholder disabled>
        <ChevronDownIcon />
      </AccessoryPlaceholder>
    );
  }, [isExpanded, detailPanel, t]);

  const Accessory = useMemo(() => {
    return (
      <>
        {hasSelection && SelectionCheckbox}
        {detailPanel && ExpansionToggle}
      </>
    );
  }, [ExpansionToggle, SelectionCheckbox, detailPanel, hasSelection]);

  return (
    <Card
      accessory={Accessory}
      children={children}
      description={description}
      detailPanel={isExpanded && detailPanel}
      image={image}
      overline={overline}
      title={title}
      variant={variant}
      menuButtonChildren={menuButtonChildren}
    />
  );
};

const MemoizedDataCard = memo(DataCard);
MemoizedDataCard.displayName = "DataCard";

export { MemoizedDataCard as DataCard };
