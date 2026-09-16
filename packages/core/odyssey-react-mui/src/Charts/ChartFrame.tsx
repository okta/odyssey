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

import { Skeleton as MuiSkeleton } from "@mui/material";
import { skeletonClasses } from "@mui/material/Skeleton";
import { memo, type ReactElement, useId } from "react";

import { createOdysseyStyledComponent } from "../createOdysseyStyledComponent.js";
import { useTranslation } from "../i18n.generated/i18n.js";
import { Heading4, Paragraph } from "../Typography.js";
import { ChartError } from "./ChartError.js";
import { useChartTokens } from "./chartTokens.js";

/** The props for a chart frame. */
export type ChartFrameProps = {
  /**
   * The chart. The frame shows this element when there is no error state and
   * no loading state.
   */
  children: ReactElement;
  /**
   * If `true`, the frame shows an error state in place of the chart body.
   * `isLoading` takes precedence over this property.
   */
  hasError?: boolean;
  /**
   * If `true`, the frame shows a loading skeleton in place of the chart
   * body. `isLoading` takes precedence over `hasError`.
   */
  isLoading?: boolean;
  /**
   * The frame calls this function when a user clicks the retry button in
   * the error state. The error state shows no retry button when the caller
   * omits this property.
   *
   * @see {@link CartesianChartProps.onRetry} for the retry flow that a
   * consumer follows. That property is the public one, so it owns the
   * description.
   */
  onRetry?: () => void;
  /**
   * The subtitle text, shown below the title. The frame ignores this text
   * when `title` has no value, because a subtitle explains a title and means
   * nothing alone.
   */
  subtitle?: string;
  /**
   * The title text, shown as a real heading above the chart body. The heading
   * survives every state: loaded, loading, and error.
   */
  title?: string;
};

// This frame supplies only a height floor. A consumer that sets a real height
// on the parent element still controls the final height, because this value
// is a minimum and not a fixed size.
const Frame = createOdysseyStyledComponent({
  tag: "section",
  shouldForwardProp: (prop) => prop !== "minHeight",
})<{ minHeight: string }>(({ odysseyDesignTokens, minHeight }) => ({
  display: "flex",
  flexDirection: "column",
  gap: odysseyDesignTokens.Spacing4,
  height: "100%",
  minHeight,
}));

// The header must not shrink, so the body takes every pixel of height that
// the header does not need.
//
// `gap` needs a flex or grid container to have any effect, and a `header` is
// a block element by default. `Heading4` renders an `h4` and `Paragraph`
// renders a `p`, and each carries its own block margins, which would add to
// the gap, so the margin reset names both elements.
const Header = createOdysseyStyledComponent({ tag: "header" })(
  ({ odysseyDesignTokens }) => ({
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    gap: odysseyDesignTokens.Spacing2,

    "& > h4, & > p": {
      marginBlock: 0,
    },
  }),
);

// A flex item defaults to a minimum height equal to its content, so this item
// would otherwise refuse to shrink below the height of the chart it holds.
// The zero minimum height lets the body take the flex space that `flex: 1`
// assigns to it.
//
// The body is also a single-row grid. The charting library draws a bare div
// with no class name and no height of its own. A block-level child of a flex
// column collapses to the height of its own content, which is zero before
// the chart draws, and the library then picks a fixed height of its own. A
// grid child stretches to fill its row by default, so the bare div fills the
// body without this file naming a class or reaching into a child with a
// selector.
const Body = createOdysseyStyledComponent({ tag: "div" })({
  display: "grid",
  flex: 1,
  gridTemplateRows: "1fr",
  minHeight: 0,
});

// The real chart also fills the height of its parent rather than setting a
// height of its own, so this fills the same `Body` grid cell the same way.
const LoadingSkeleton = createOdysseyStyledComponent({ tag: "div" })({
  height: "100%",
  width: "100%",
  [`& .${skeletonClasses.root}`]: {
    height: "100%",
    width: "100%",
  },
});

/**
 * A layout wrapper for a chart. The frame holds two parts: a header that
 * shows the title and the subtitle as real HTML, and a body below it. The
 * body shows exactly one of three states: a loading skeleton, an error
 * state, or the chart itself. The header stays on screen in all three
 * states.
 */
const ChartFrame = ({
  children,
  hasError,
  isLoading,
  onRetry,
  subtitle,
  title,
}: ChartFrameProps) => {
  const { minHeight } = useChartTokens();
  const { t } = useTranslation();
  const headingId = useId();

  const hasHeader = Boolean(title);
  const subtitleText = hasHeader ? subtitle : undefined;

  return (
    <Frame
      aria-labelledby={hasHeader ? headingId : undefined}
      minHeight={minHeight}
    >
      {hasHeader && (
        <Header>
          <Heading4 id={headingId}>{title}</Heading4>
          {subtitleText && <Paragraph>{subtitleText}</Paragraph>}
        </Header>
      )}
      <Body>
        {/*
         * A retry sets isLoading while the failed data is still on record.
         * Loading must win here, or the user who just clicked retry would
         * still see the error they were trying to clear, instead of seeing
         * that their request is in flight.
         */}
        {isLoading ? (
          <LoadingSkeleton
            aria-label={t("chart.loading.arialabel")}
            role="status"
          >
            <MuiSkeleton variant="rounded" />
          </LoadingSkeleton>
        ) : hasError ? (
          <ChartError onRetry={onRetry} />
        ) : (
          children
        )}
      </Body>
    </Frame>
  );
};

const MemoizedChartFrame = memo(ChartFrame);
MemoizedChartFrame.displayName = "ChartFrame";

export { MemoizedChartFrame as ChartFrame };
