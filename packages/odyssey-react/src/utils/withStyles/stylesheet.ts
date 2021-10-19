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

import type { Template } from "./withStyles";

interface Args {
  readonly digest: string;
  readonly template: Template;
}

export class OStyleSheet {
  private element!: HTMLStyleElement;
  private readonly template: Template;
  private readonly digest: string;

  constructor({ template, digest }: Args) {
    this.template = template;
    this.digest = digest;
    this.append();
  }

  private append() {
    const sheet = document.createElement("style");
    sheet.setAttribute("data-ods", this.digest);
    this.element = document.head.appendChild(sheet);
  }

  inject(): OStyleSheet {
    this.element.innerHTML = this.template();
    return this;
  }
}
