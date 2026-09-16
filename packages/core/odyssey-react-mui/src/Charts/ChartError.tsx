/*!
 * Copyright (c) 2026-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { memo } from "react";

import { Button } from "../Buttons/Button.js";
import { createOdysseyStyledComponent } from "../createOdysseyStyledComponent.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import { WarningIcon } from "../icons.generated/Warning.js";
import { Heading5, Paragraph } from "../Typography.js";

/** The props for a chart error state. */
export type ChartErrorProps = {
  /**
   * The chart calls this function when a user clicks the retry button in the
   * error state. The error state shows no retry button when the caller
   * omits this property.
   */
  onRetry?: () => void;
};

// The parent is a single-row grid that stretches this component to the
// chart's full height. Centering here, rather than in the parent, keeps the
// centering rule next to the content it centers.
const OuterContainer = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing5,
    height: "100%",
    justifyContent: "center",
    textAlign: "center",
  }),
);

// `Heading4` renders an `h4` and `Paragraph` renders a `p`, and each carries
// its own block margins. Those margins would add to the gap below and throw
// off the measured spacing, so this resets them. The selector names both
// elements rather than every child, so a later child keeps its own margins.
const TextGroup = createOdysseyStyledComponent({ tag: "div" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    gap: odysseyDesignTokens.Spacing2,
    maxWidth: odysseyDesignTokens.TypographyLineLengthMax,

    "& > h4, & > p": {
      marginBlock: 0,
    },
  }),
);

/**
 * Renders the error state for a chart. A chart shows this component in
 * place of its plot when the chart fails to load its data.
 */
const ChartError = ({ onRetry }: ChartErrorProps) => {
  const { t } = useTranslation();

  return (
    <OuterContainer>
      <WarningIcon />
      <TextGroup role="alert">
        <Heading5>{t("chart.error.heading")}</Heading5>
        <Paragraph>{t("chart.error.text")}</Paragraph>
      </TextGroup>
      {onRetry && (
        <Button
          label={t("chart.error.retry")}
          onClick={onRetry}
          variant="secondary"
        />
      )}
    </OuterContainer>
  );
};

const MemoizedChartError = memo(ChartError);
MemoizedChartError.displayName = "ChartError";

export { MemoizedChartError as ChartError };
