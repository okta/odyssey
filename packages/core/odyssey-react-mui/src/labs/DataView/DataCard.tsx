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

import styled from "@emotion/styled";
import {
  Checkbox as MuiCheckbox,
  IconButton as MuiIconButton,
  Tooltip as MuiTooltip,
} from "@mui/material";
import { memo, useId, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardProps } from "../../Card.js";
import { ChevronDownIcon } from "../../icons.generated/ChevronDown.js";
import { ChevronUpIcon } from "../../icons.generated/ChevronUp.js";
import {
  DesignTokens,
  useOdysseyDesignTokens,
} from "../../OdysseyDesignTokensContext.js";

export type DataCardProps = {
  children?: CardProps["children"];
  description?: CardProps["description"];
  detailPanel?: CardProps["detailPanel"];
  hasSelection?: boolean;
  image?: CardProps["image"];
  isSelected?: boolean;
  menuButtonChildren?: CardProps["menuButtonChildren"];
  onSelectionChange?: () => void;
  overline?: CardProps["overline"];
  title?: CardProps["title"];
  variant?: CardProps["variant"];
};

const CheckboxContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "odysseyDesignTokens",
})<{
  odysseyDesignTokens: DesignTokens;
}>(({ odysseyDesignTokens }) => ({
  marginBlockStart: `-${odysseyDesignTokens.Spacing1}`,
}));

const AccessoryPlaceholder = styled(MuiIconButton)(() => ({
  visibility: "hidden" as const,
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
  const titleId = useId();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const SelectionCheckbox = useMemo(
    () => (
      <CheckboxContainer odysseyDesignTokens={odysseyDesignTokens}>
        <MuiCheckbox
          checked={isSelected}
          inputProps={{
            "aria-labelledby": titleId,
          }}
          onChange={onSelectionChange}
        />
      </CheckboxContainer>
    ),
    [isSelected, odysseyDesignTokens, onSelectionChange, titleId],
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
          aria-label={
            isExpanded
              ? t("table.rowexpansion.collapse")
              : t("table.rowexpansion.expand")
          }
          children={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          onClick={() => setIsExpanded(!isExpanded)}
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
        {ExpansionToggle}
      </>
    );
  }, [ExpansionToggle, SelectionCheckbox, hasSelection]);

  return (
    <Card
      __role="listitem"
      accessory={Accessory}
      children={children}
      description={description}
      detailPanel={isExpanded && detailPanel}
      image={image}
      menuButtonChildren={menuButtonChildren}
      overline={overline}
      title={title}
      titleId={titleId}
      variant={variant}
    />
  );
};

const MemoizedDataCard = memo(DataCard);
MemoizedDataCard.displayName = "DataCard";

export { MemoizedDataCard as DataCard };
