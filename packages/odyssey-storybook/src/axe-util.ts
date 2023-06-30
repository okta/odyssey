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

// eslint-disable-next-line import/no-extraneous-dependencies
import axe from "axe-core";

export const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export const axeRun = async (interaction = "") => {
  await sleep();

  await axe
    .run({
      runOnly: {
        type: "tag",
        values: [
          "section508",
          "wcag2a",
          "wcag2aa",
          "wcag21a",
          "wcag21aa",
          "wcag22aa",
        ],
      },
    })
    .then((results) => {
      if (results.violations.length) {
        console.error("Accessibility issues found ==> ", results.violations);
        throw new Error(`Accessibility issues found ${interaction}`);
      }
    })
    .catch((e) => {
      console.error(
        e instanceof Error ? e.message : "Unknown Error in play-test"
      );
      throw new Error(
        e instanceof Error ? e.message : "Unknown Error in play-test"
      );
    });
};
