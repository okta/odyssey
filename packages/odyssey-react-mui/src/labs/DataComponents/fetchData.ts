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
import { MRT_RowData } from "material-react-table";
import { t } from "i18next";

import { DataQueryParamsType } from "./dataTypes";
import { UniversalProps } from "./componentTypes";

type DataRequestType = {
  dataQueryParams: DataQueryParamsType;
  errorMessageProp: UniversalProps["errorMessage"];
  getDataFn: UniversalProps["getData"];
  setData: Dispatch<SetStateAction<MRT_RowData[]>>;
  setErrorMessage: Dispatch<SetStateAction<UniversalProps["errorMessage"]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const fetchData = async ({
  dataQueryParams,
  errorMessageProp,
  getDataFn,
  setData,
  setErrorMessage,
  setIsLoading,
}: DataRequestType) => {
  setIsLoading(true);
  setErrorMessage(errorMessageProp);
  try {
    const incomingData = await getDataFn?.(dataQueryParams);
    setData(incomingData);
  } catch (error) {
    setErrorMessage(typeof error === "string" ? error : t("table.error"));
  } finally {
    setIsLoading(false);
  }
};
