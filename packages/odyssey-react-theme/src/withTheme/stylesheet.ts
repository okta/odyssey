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

export class OStyleSheet extends Set<string> {
  private element: HTMLStyleElement;

  constructor() {
    super();
    const el = document.createElement("style");
    el.setAttribute("data-ods", "");
    this.element = document.head.appendChild(el);
  }

  inject(key: string, styles: string): boolean {
    if (this.has(key)) return false;
    this.element.innerHTML += styles;
    this.add(key);
    return true;
  }
}
