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

import { LineChart, type LineChartProps } from "@okta/odyssey-react-mui/charts";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  staticBoardParameters,
  StoryCell,
  StoryGrid,
  StorySection,
} from "../../../../tools/boardStoryHelpers.js";
import { OdysseyStorybookThemeDecorator } from "../../../../tools/OdysseyStorybookThemeDecorator.js";

const meta = {
  component: LineChart,
  decorators: [OdysseyStorybookThemeDecorator],
  parameters: {
    docs: {
      description: {
        component:
          "The line chart draws one line for each series on a shared horizontal axis. If a series has no point for a category, the chart draws a gap in the line. The chart does not draw a point with the value zero. Each series has its own marker shape. After five series, the shapes repeat. The marker shape helps you tell each series apart without color.",
      },
    },
  },
  argTypes: {
    categories: {
      control: false,
      description:
        "The categories on the horizontal axis, in the order that the chart shows them. Each series in `series` supplies one value for each category, at the same index.",
      table: { type: { summary: "string[]" } },
      type: { name: "other", value: "string[]", required: true },
    },
    series: {
      control: false,
      description:
        "The series to plot. Each series has a name and an array of values that lines up by index with categories. A value of null means the series has no measurement at that category, and the chart draws a gap rather than a point at zero.",
      table: { type: { summary: "ChartSeries[]" } },
      type: { name: "other", value: "ChartSeries[]", required: true },
    },
    title: {
      control: "text",
      description:
        "The title of the chart. The chart ignores a subtitle that you set with no title. You can omit both props when another part of the layout shows the heading.",
      table: { type: { summary: "string" } },
    },
    subtitle: {
      control: "text",
      description:
        "The subtitle of the chart. The chart draws the subtitle beneath the title.",
      table: { type: { summary: "string" } },
    },
    ariaDescription: {
      control: "text",
      description:
        "A text description of the chart for assistive technology. The chart passes this description to the chart library. The description does not become a DOM attribute.",
      table: { type: { summary: "string" } },
      type: { name: "string", required: true },
    },
    xAxisLabel: {
      control: "text",
      description: "The label for the horizontal axis.",
      table: { type: { summary: "string" } },
    },
    yAxisLabel: {
      control: "text",
      description: "The label for the vertical axis.",
      table: { type: { summary: "string" } },
    },
    yAxisFormat: {
      control: { type: "select" },
      options: ["decimal", "compact", "percent"],
      description:
        "This prop formats the values on the vertical axis. The prop also accepts a currency object like `{ style: 'currency', currency }`, or a function. This control shows only the preset options.",
      table: {
        defaultValue: { summary: '"compact"' },
        type: {
          summary:
            '"decimal" | "compact" | "percent" | { style: "currency"; currency: string } | ((value: number) => string)',
        },
      },
    },
    pointPopoverValueFormat: {
      control: { type: "select" },
      options: ["decimal", "compact", "percent"],
      description:
        "This prop formats the value in the popover of a point. If you do not set this prop, the popover shows the exact value. The prop also accepts a currency object like `{ style: 'currency', currency }`, or a function. This control shows only the preset options.",
      table: {
        type: {
          summary:
            '"decimal" | "compact" | "percent" | { style: "currency"; currency: string } | ((value: number) => string)',
        },
      },
    },
    isLoading: {
      control: "boolean",
      description:
        "If `true`, the chart draws a loading state instead of its series. `isLoading` takes precedence over `hasError`.",
      table: { type: { summary: "boolean" } },
    },
    hasError: {
      control: "boolean",
      description:
        "If `true`, the chart draws an error state instead of its series. `isLoading` takes precedence over this prop.",
      table: { type: { summary: "boolean" } },
    },
    onPointClick: {
      action: "onPointClick",
      control: false,
      description:
        "The chart calls this function when the user clicks a point. The function receives the series name, the category, and the value of the point.",
      table: { type: { summary: "(point: ChartPoint) => void" } },
    },
    onRetry: {
      action: "onRetry",
      control: false,
      description:
        "The chart calls this function when the user clicks the retry button in the error state. If you do not set this prop, the error state draws no retry button.",
      table: { type: { summary: "() => void" } },
    },
  },
} satisfies Meta<typeof LineChart>;

export default meta;

type Story = StoryObj<LineChartProps>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This is the interactive story. Every control in the panel works on this story. The other stories are static boards. This story uses values in the millions, so you can see `yAxisFormat` change the axis between `"compact"` and `"decimal"`. When you click a point, the chart logs the action to the Actions panel.',
      },
    },
  },
  args: {
    title: "Weekly Sign-in Success Rate",
    subtitle: "Sample data, trailing 6 weeks",
    ariaDescription:
      "Line chart of sample weekly sign-in success and failure counts, trending across six weeks.",
    xAxisLabel: "Week",
    yAxisLabel: "Attempts",
    yAxisFormat: "compact",
    pointPopoverValueFormat: "decimal",
    isLoading: false,
    hasError: false,
    categories: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    series: [
      {
        name: "Succeeded",
        data: [4250000, 4310000, 4180000, 4460000, 4520000, 4600000],
      },
      {
        name: "Failed",
        data: [380000, 402000, 365000, 410000, 395000, 420000],
      },
    ],
  },
};

export const AllSeries: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    return (
      <StorySection title="Every shape the series prop can take. A single series draws no legend, and more than one series draws one. A null value draws a gap. The sixth series reuses the first marker shape, and six series also cover every color in the palette. An empty array draws the axes with no line, and a value below zero extends the vertical axis below zero.">
        <StoryGrid minColumnWidth="440px">
          <StoryCell hasFilledWidth label="single series, no legend">
            <LineChart
              ariaDescription="Line chart of sample weekly sign-in attempts across four weeks."
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                {
                  name: "Attempts",
                  data: [420, 460, 395, 510],
                },
              ]}
              title="Sample Weekly Sign-in Attempts"
              xAxisLabel="Week"
              yAxisLabel="Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="several series, legend">
            <LineChart
              ariaDescription="Line chart comparing sample weekly sign-in attempts across three authentication factors."
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                {
                  name: "Password",
                  data: [340, 360, 310, 390],
                },
                {
                  name: "WebAuthn",
                  data: [175, 190, 205, 230],
                },
                {
                  name: "SMS",
                  data: [60, 55, 50, 45],
                },
              ]}
              title="Sample Weekly Sign-in Attempts by Factor"
              xAxisLabel="Week"
              yAxisLabel="Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="two series, second omits Week 3">
            <LineChart
              ariaDescription="Line chart comparing sample succeeded and failed sign-in attempts, where the failed series has no point for Week 3."
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                {
                  name: "Succeeded",
                  data: [340, 360, 310, 390],
                },
                {
                  name: "Failed",
                  data: [80, 65, null, 70],
                },
              ]}
              title="Sample Weekly Sign-in Attempts"
              xAxisLabel="Week"
              yAxisLabel="Attempts"
            />
          </StoryCell>

          <StoryCell
            hasFilledWidth
            label="six series, one per palette color, sixth reuses the first marker shape"
          >
            <LineChart
              ariaDescription="Line chart comparing sample weekly sign-in attempts across six authentication factors, one for each color in the chart palette."
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                {
                  name: "Password",
                  data: [340, 360, 310, 390],
                },
                {
                  name: "WebAuthn",
                  data: [175, 190, 205, 230],
                },
                {
                  name: "SMS",
                  data: [60, 55, 50, 45],
                },
                {
                  name: "Push",
                  data: [210, 225, 240, 260],
                },
                {
                  name: "Email",
                  data: [30, 28, 34, 25],
                },
                {
                  name: "Voice",
                  data: [12, 10, 15, 9],
                },
              ]}
              title="Sample Weekly Sign-in Attempts by Factor"
              xAxisLabel="Week"
              yAxisLabel="Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="empty series array">
            <LineChart
              ariaDescription="Line chart with no series, showing only its axes."
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[]}
              title="Sample Weekly Sign-in Attempts"
              xAxisLabel="Week"
              yAxisLabel="Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="values below zero">
            <LineChart
              ariaDescription="Line chart of sample weekly change in active users, where two weeks fall below zero."
              categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
              series={[
                {
                  name: "Net change",
                  data: [120, -45, -80, 60],
                },
              ]}
              title="Sample Weekly Net Change in Active Users"
              xAxisLabel="Week"
              yAxisLabel="Net change"
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllValueFormats: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const weeklyCategories = ["Week 1", "Week 2", "Week 3", "Week 4"];
    const weeklyRequestCounts = [1250000, 1310000, 1180000, 1420000];
    const weeklyErrorRates = [0.042, 0.037, 0.029, 0.021];

    return (
      <StorySection title="yAxisFormat and pointPopoverValueFormat each take a preset, a currency, or a function. A preset replaces the default rather than refining it.">
        <StoryGrid minColumnWidth="440px">
          <StoryCell hasFilledWidth label='default: "compact"'>
            <LineChart
              ariaDescription="Line chart of sample weekly request counts, using the default compact axis formatting."
              categories={weeklyCategories}
              series={[{ name: "Requests", data: weeklyRequestCounts }]}
              title="Sample Weekly Requests"
              xAxisLabel="Week"
              yAxisLabel="Requests"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label='"decimal"'>
            <LineChart
              ariaDescription="Line chart of sample weekly request counts, using full numbers rather than compact notation."
              categories={weeklyCategories}
              series={[{ name: "Requests", data: weeklyRequestCounts }]}
              title="Sample Weekly Requests"
              xAxisLabel="Week"
              yAxisFormat="decimal"
              yAxisLabel="Requests"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label='"percent" (expects fractions)'>
            <LineChart
              ariaDescription="Line chart of sample weekly error rates, formatted as percentages from fractional values."
              categories={weeklyCategories}
              pointPopoverValueFormat="percent"
              series={[{ name: "Error rate", data: weeklyErrorRates }]}
              title="Sample Weekly Error Rate"
              xAxisLabel="Week"
              yAxisFormat="percent"
              yAxisLabel="Error rate"
            />
          </StoryCell>

          <StoryCell
            hasFilledWidth
            label="{ style: 'currency', currency: 'EUR' }"
          >
            <LineChart
              ariaDescription="Line chart of sample weekly revenue, formatted in euros."
              categories={weeklyCategories}
              pointPopoverValueFormat={{ style: "currency", currency: "EUR" }}
              series={[{ name: "Revenue", data: weeklyRequestCounts }]}
              title="Sample Weekly Revenue"
              xAxisLabel="Week"
              yAxisFormat={{ style: "currency", currency: "EUR" }}
              yAxisLabel="Revenue"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="function formatter">
            <LineChart
              ariaDescription="Line chart of sample weekly latency, formatted by a custom function that appends a millisecond unit."
              categories={weeklyCategories}
              pointPopoverValueFormat={(value) => `${value}ms`}
              series={[
                {
                  name: "Latency",
                  data: [120, 135, 110, 128],
                },
              ]}
              title="Sample Weekly Latency"
              xAxisLabel="Week"
              yAxisFormat={(value) => `${value}ms`}
              yAxisLabel="Latency"
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllHeaders: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const headerCategories = ["Week 1", "Week 2"];
    const attemptsBySeries = [
      {
        name: "Succeeded",
        data: [340, 360],
      },
      {
        name: "Failed",
        data: [80, 65],
      },
    ];

    return (
      <StorySection title="The chart draws the title and the subtitle as HTML above the plot. The chart ignores a subtitle that arrives with no title, and a chart with neither leaves the heading to the surrounding layout.">
        <StoryGrid minColumnWidth="440px">
          <StoryCell hasFilledWidth label="title only">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, with a title and no subtitle."
              categories={headerCategories}
              series={attemptsBySeries}
              title="Sample Sign-in Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="title and subtitle">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, with both a title and a subtitle."
              categories={headerCategories}
              series={attemptsBySeries}
              subtitle="Illustrative data, not a real deployment"
              title="Sample Sign-in Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="subtitle only, ignored">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, with a subtitle and no title, which the chart ignores."
              categories={headerCategories}
              series={attemptsBySeries}
              subtitle="Illustrative data, not a real deployment"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="no title or subtitle">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, with no title or subtitle."
              categories={headerCategories}
              series={attemptsBySeries}
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};

export const AllStates: Story = {
  parameters: staticBoardParameters,
  render: function C() {
    const statesCategories = ["Week 1", "Week 2"];
    const attempts = [
      {
        name: "Attempts",
        data: [420, 460],
      },
    ];

    return (
      <StorySection title="isLoading and hasError each render in place of the plot, and the title and the subtitle stay on screen through every state. isLoading takes precedence when both are set. The error state draws a retry button only when onRetry has a value.">
        <StoryGrid minColumnWidth="440px">
          <StoryCell hasFilledWidth label="loaded">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, fully loaded."
              categories={statesCategories}
              series={attempts}
              subtitle="Sample data"
              title="Sample Sign-in Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="isLoading">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, currently loading."
              categories={statesCategories}
              isLoading
              series={attempts}
              subtitle="Sample data"
              title="Sample Sign-in Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="hasError with onRetry">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, currently showing an error with a retry button."
              categories={statesCategories}
              hasError
              onRetry={() => {}}
              series={attempts}
              subtitle="Sample data"
              title="Sample Sign-in Attempts"
            />
          </StoryCell>

          <StoryCell hasFilledWidth label="hasError, onRetry omitted">
            <LineChart
              ariaDescription="Line chart of sample sign-in attempts, currently showing an error with no retry button."
              categories={statesCategories}
              hasError
              series={attempts}
              subtitle="Sample data"
              title="Sample Sign-in Attempts"
            />
          </StoryCell>
        </StoryGrid>
      </StorySection>
    );
  },
};
