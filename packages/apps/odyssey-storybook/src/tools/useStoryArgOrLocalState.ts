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

import { useArgs, useState } from "@storybook/preview-api";
import { StoryContext } from "@storybook/react";

/**
 * Provides a stateful value that uses Storybook args in Canvas,
 * falls back to local state for non-default stories when rendered in Docs.
 */
export function useStoryArgOrLocalState<
  TArgs extends Record<string, unknown>,
  K extends keyof TArgs,
>(params: {
  argKey: K;
  args: TArgs;
  context: StoryContext<TArgs>;
  defaultStoryName?: string;
  defaultValue: TArgs[K];
}) {
  const {
    args,
    context,
    argKey,
    defaultValue,
    defaultStoryName = "Default",
  } = params;
  const isDocs = context.viewMode === "docs";
  const isDefaultStory = context.name === defaultStoryName;

  const [{ [argKey]: argValue }, updateArgs] = useArgs<TArgs>();
  const [localValue, setLocalValue] = useState<TArgs[K]>(
    args[argKey] ?? defaultValue,
  );

  const useLocalState = isDocs && !isDefaultStory;
  const value = useLocalState ? localValue : (argValue ?? defaultValue);

  const setValue = (value: TArgs[K]) => {
    if (useLocalState) {
      setLocalValue(value);
    } else {
      updateArgs({ [argKey]: value } as unknown as Partial<TArgs>);
    }
  };

  return { value, setValue, useLocalState };
}
