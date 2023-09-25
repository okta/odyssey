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

export const createShadowDom = (containerElement: HTMLElement) => {
  const shadowContainer = containerElement.attachShadow({ mode: "open" });
  const emotionRootElement = document.createElement("style");
  const shadowRootElement = document.createElement("div");

  shadowContainer.appendChild(emotionRootElement);
  shadowContainer.appendChild(shadowRootElement);

  return {
    emotionRootElement,
    shadowRootElement,
  };
};

// --DOCS--

// const {
//   emotionRootElement,
//   shadowRootElement,
// } = (
//   createShadowDom(
//     document.querySelector('#root') as HTMLElement
//   )
// )

// ReactDOM
// .createRoot(
//   shadowRootElement
// )
// .render(
//   <OdysseyProvider emotionRootElement={emotionRootElement} shadowRootElement={shadowRootElement}>
//     <App />
//   </OdysseyProvider>
// )
