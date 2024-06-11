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

import { Dispatch, SetStateAction } from "react";
import { UniversalProps } from "./componentTypes";
import { DataQueryParamsType } from "./dataTypes";
import { t } from "i18next";
import { MRT_RowData } from "material-react-table";

type DataRequestType = {
  getDataFn: UniversalProps["getData"];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<UniversalProps["errorMessage"]>>;
  errorMessageProp: UniversalProps["errorMessage"];
  setData: Dispatch<SetStateAction<MRT_RowData[]>>;
  dataQueryParams: DataQueryParamsType;
};

export const fetchData = async ({
  getDataFn,
  setIsLoading,
  setErrorMessage,
  errorMessageProp,
  setData,
  dataQueryParams,
}: DataRequestType) => {
  setIsLoading(true);
  setErrorMessage(errorMessageProp);
  try {
    const incomingData = await getDataFn?.(dataQueryParams);
    // incomingData.forEach((item: MRT_RowData, index: number) => {
    //   item._ods_index = index;
    // });
    setData(incomingData);
  } catch (error) {
    setErrorMessage(typeof error === "string" ? error : t("table.error"));
  } finally {
    setIsLoading(false);
  }
};
