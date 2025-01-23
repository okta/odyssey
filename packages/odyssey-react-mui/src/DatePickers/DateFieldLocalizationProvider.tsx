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

import { memo, PropsWithChildren } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import { DateFieldsTranslations } from "./useDateFieldsTranslations.js";

type DateFieldLocalizationProviderProps = {
  localeText: DateFieldsTranslations;
  defaultedLanguageCode: string;
};

const DateFieldLocalizationProvider = ({
  children,
  defaultedLanguageCode,
  localeText,
}: PropsWithChildren<DateFieldLocalizationProviderProps>) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterLuxon}
      adapterLocale={defaultedLanguageCode}
      localeText={localeText}
    >
      {children}
    </LocalizationProvider>
  );
};

const MemoizedDateFieldLocalizationProvider = memo(
  DateFieldLocalizationProvider,
);
MemoizedDateFieldLocalizationProvider.displayName =
  "DateFieldLocalizationProvider";

export { MemoizedDateFieldLocalizationProvider as DateFieldLocalizationProvider };
