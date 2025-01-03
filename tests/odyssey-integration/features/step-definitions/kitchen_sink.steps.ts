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

import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals'
import KitchenSinkPage from '../pageobjects/kitchenSink.page';

When(/^I click on the open dialog button$/, async () => {
    await expect(KitchenSinkPage.clickOpenDialogButton());
});

Then(/^I should see the dialog$/, async () => {
    await expect(KitchenSinkPage.dialog).toBeExisting();
});
