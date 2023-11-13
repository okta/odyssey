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

import type { Meta, StoryObj } from "@storybook/react";
import {
  DataTablePagination,
  DataTablePaginationProps,
  paginationTypeValues,
} from "@okta/odyssey-react-mui/labs";
import { MuiThemeDecorator } from "../../../../.storybook/components";
import { useEffect, useState } from "react";

const storybookMeta: Meta<DataTablePaginationProps> = {
  title: "Labs Components/DataTablePagination",
  component: DataTablePagination,
  argTypes: {
    currentPage: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    currentNumberOfResults: {
      control: "number",
      description: "",
      table: {
        type: {
          summary: "number",
        },
      },
    },
    isNextButtonDisabled: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    isPreviousButtonDisabled: {
      control: "boolean",
      description: "",
      table: {
        type: {
          summary: "boolean",
        },
      },
    },
    onClickNext: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "() => void",
        },
      },
    },
    onClickPrevious: {
      control: null,
      description: "",
      table: {
        type: {
          summary: "() => void",
        },
      },
    },
    paginationType: {
      control: "radio",
      options: paginationTypeValues,
      description: "",
      table: {
        type: {
          summary: paginationTypeValues.join(" | "),
        },
      },
    },
  },
  decorators: [MuiThemeDecorator],
  tags: ["autodocs"],
};

export default storybookMeta;

export const Default: StoryObj<DataTablePaginationProps> = {
  args: {
    currentPage: 1,
    currentNumberOfResults: 100,
    isNextButtonDisabled: false,
    isPreviousButtonDisabled: false,
    paginationType: "paged",
  },
  render: function C(props) {
    const [page, setPage] = useState<number>(props.currentPage ?? 1);

    useEffect(() => {
      setPage(props.currentPage ?? 1);
    }, [props.currentPage]);

    return (
      <DataTablePagination
        currentPage={page}
        onClickNext={() => setPage(page + 1)}
        onClickPrevious={() => setPage(page - 1)}
        isPreviousButtonDisabled={page <= 1}
        paginationType={props.paginationType}
      />
    );
  },
};
