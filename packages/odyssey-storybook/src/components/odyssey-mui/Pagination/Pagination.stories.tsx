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

const storyBookMeta: Meta<PaginationProps> = {
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
      control: "function",
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
  },

  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storyBookMeta;

export const Default: StoryObj<PaginationProps> = {
  args: {
    pageIndex: 1,
    pageSize: 20,
    lastRow: 20,
    isDisabled: false,
    variant: "paged",
    rowsPerPageLabel: "Rows per page",
    currentPageLabel: "Page",
    previousLabel: "Previous page",
    nextLabel: "Next page",
    loadMoreLabel: "Show more",
    totalRows: 100,
  },

  render: (props) => {
    return <Pagination {...props} />;
  },
};
