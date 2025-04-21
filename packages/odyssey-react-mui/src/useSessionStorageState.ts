/*!
 * Copyright (c) 2025-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useCallback, useEffect, useMemo, useState } from "react";

export const getSessionStorageValue = <Value>(key: string): Value | null => {
  const sessionStorageValue = window.sessionStorage.getItem(key);

  try {
    if (typeof sessionStorageValue === "string") {
      return JSON.parse(sessionStorageValue) as Value;
    }

    return null;
  } catch {
    if (typeof sessionStorageValue === "string") {
      return sessionStorageValue as Value;
    }

    return null;
  }
};

export const useSessionStorageState = <Value>({
  initialState,
  key,
}: {
  initialState?: Value;
  key: string;
}) => {
  if (!key) {
    throw new Error("You must pass a value for `key`.");
  }

  const initialSessionState = useMemo(
    () => getSessionStorageValue<Value>(key) || initialState || null,
    [initialState, key],
  );

  const [state, setState] =
    useState<ReturnType<typeof getSessionStorageValue<Value>>>(
      initialSessionState,
    );

  const setSessionState = useCallback(
    (value: Value) => {
      window.sessionStorage.setItem(key, JSON.stringify(value || ""));

      setState(value);
    },
    [key],
  );

  const updateState = useCallback(() => {
    console.log({ key });
    setState(getSessionStorageValue<Value>(key));
  }, [key]);

  useEffect(() => {
    updateState();
  }, [updateState]);

  return {
    sessionState: state,
    setSessionState,
  };
};
