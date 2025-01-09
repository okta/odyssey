/*!
 * Copyright (c) 2021-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { Meta, StoryObj } from "@storybook/react";
import {
  Pagination,
  paginationTypeValues,
  type PaginationProps,
} from "@okta/odyssey-react-mui";
import { MuiThemeDecorator } from "../../../../.storybook/components";

const meta = {
  title: "MUI Components/Pagination",
  component: Pagination,
  argTypes: {
    pageIndex: {
      control: {
        type: "number",
        min: 1,
      },
      description: "The current page index",
      type: {
        required: true,
        name: "number",
      },
    },

    pageSize: {
      control: {
        type: "number",
        min: 1,
      },
      description: "The current page size",
      type: {
        required: true,
        name: "number",
      },
    },

    onPaginationChange: {
      description: "Page index and page size setter",
      type: {
        required: true,
        name: "function",
      },
    },

    lastRow: {
      control: {
        type: "number",
        min: 1,
      },
      description: "The current page last row index",
      type: {
        required: true,
        name: "number",
      },
    },

    totalRows: {
      control: {
        type: "number",
        min: 1,
      },
      description: "Total rows count",
      type: {
        name: "number",
      },
    },

    hasPageInput: {
      control: "boolean",
      description:
        "If true, the page input will be visible and the user can directly manipulate which page is visible.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },

    hasRowCountInput: {
      control: "boolean",
      description:
        "If true, the row count input will be visible and the user can directly manipulate how many rows are visible.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },

    hasRowCountLabel: {
      control: "boolean",
      description: "If true, the pagination controls will be disabled.",
      table: {
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },

    isDisabled: {
      control: "boolean",
      description: "If true, the pagination controls will be disabled",
      type: {
        required: true,
        name: "boolean",
      },
    },

    isMoreDisabled: {
      control: "boolean",
      description:
        "If true, the pagination next/show more button will be disabled",
      type: {
        required: true,
        name: "boolean",
      },
    },

    variant: {
      control: { type: "radio" },
      options: paginationTypeValues,
      description: `The type of pagination controls shown, defaults to next/prev buttons, but can set to a simple Load more button by setting to "loadMore".`,
      type: {
        name: "other",
        value: "radio",
      },
      table: {
        defaultValue: {
          summary: paginationTypeValues[0],
        },
      },
    },

    rowsPerPageLabel: {
      control: "text",
      description:
        "The label that shows how many results are rendered per page",
      type: {
        required: true,
        name: "string",
      },
    },

    currentPageLabel: {
      control: "text",
      description: "The labeled rendered for the current page index",
      type: {
        required: true,
        name: "string",
      },
    },

    previousLabel: {
      control: "text",
      description: "The label for the previous control",
      type: {
        required: true,
        name: "string",
      },
    },

    nextLabel: {
      control: "text",
      description: "The label for the next control",
      type: {
        required: true,
        name: "string",
      },
    },

    loadMoreLabel: {
      control: "text",
      description: `If the pagination is of "loadMore" variant, then this is the the load more label`,
      type: {
        required: true,
        name: "string",
      },
    },

    maxPageIndex: {
      control: "number",
      description:
        "The highest page number allowed to be manually input in pagination.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    maxPageSize: {
      control: "number",
      description:
        "The largest number of rows allowed to be shown per page. This only affects the row input in pagination.",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    currentRowsCount: {
      control: "number",
      description: "The number of items currently visible on the page",
      table: {
        type: {
          summary: "number",
        },
      },
    },
  },
  args: {
    pageIndex: 1,
    pageSize: 20,
    lastRow: 20,
    currentRowsCount: 20,
    hasPageInput: true,
    hasRowCountInput: true,
    hasRowCountLabel: true,
    isDisabled: false,
    variant: "paged",
    rowsPerPageLabel: "Rows per page",
    currentPageLabel: "Page",
    previousLabel: "Previous page",
    nextLabel: "Next page",
    loadMoreLabel: "Show more",
    totalRows: 100,
  },

  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
} satisfies Meta<PaginationProps>;

export default meta;

export const Default: StoryObj<PaginationProps> = {
  render: (props) => {
    return <Pagination {...props} />;
  },
};

export const LoadMore: StoryObj<PaginationProps> = {
  ...Default,
  args: {
    variant: "loadMore",
  },
};

export const JustButtons: StoryObj<PaginationProps> = {
  ...Default,
  args: {
    hasPageInput: false,
    hasRowCountInput: false,
    hasRowCountLabel: false,
  },
};
