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

import { browser } from '@wdio/globals'

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default abstract class Page {
    /**
    * Opens a sub page of the page
    * @param pageName pageName of the sub page (e.g. kitchen-sink)
    */
    public open (pageName: string) {
        return browser.url(`http://localhost:6006/iframe.html?id=labs-components-pagetemplate--${pageName}&viewMode=story`)
    }

    abstract get pageName(): string;
}
