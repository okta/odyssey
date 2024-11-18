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

type DataRequestType<TData extends MRT_RowData> = {
  dataQueryParams: DataQueryParamsType<TData>;
  errorMessageProp: UniversalProps<TData>["errorMessage"];
  getData: UniversalProps<TData>["getData"];
  setData: Dispatch<SetStateAction<TData[]>>;
  setErrorMessage: Dispatch<
    SetStateAction<UniversalProps<TData>["errorMessage"]>
  >;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};

export const fetchData = async <TData extends MRT_RowData>({
  dataQueryParams,
  errorMessageProp,
  getData,
  setData,
  setErrorMessage,
  setIsLoading,
}: DataRequestType<TData>) => {
  setIsLoading?.(true);
  setErrorMessage(errorMessageProp);
  try {
    const incomingData = await getData?.(dataQueryParams);
    setData(incomingData);
  } catch (error) {
    setErrorMessage(typeof error === "string" ? error : t("table.error"));
  } finally {
    setIsLoading?.(false);
  }
};
