/*!
 * Copyright (c) 2022-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import '../framework/pageobjects/buttonPageObject'
import {buttonBuilder, getButtonSelector} from "../framework/pageobjects/buttonPageObject";

const buttonVariants = [
  { variant: 'primary'},
  { variant: 'secondary'},
  { variant: 'danger'},
  { variant: 'floating'}
];

fixture('Testing disabled button');

buttonVariants.forEach( c => {
  test(
    'when variant is set to '.concat(c.variant),
    async browser => {
      const button = buttonBuilder()
        .setType('primary')
        .setIsDisabled(true)
        .setVariant(c.variant)
        .build()

      await browser
        .navigateTo(
          button.iFrameUrl()
        )

      await browser
        .expect(
          getButtonSelector().hasAttribute('disabled')
        ).ok()
    }
  );
})

fixture('Testing wide button');

buttonVariants.forEach( c => {
  test(
    'when variant is set to '.concat(c.variant),
    async browser => {
      const button = buttonBuilder()
        .setType('primary')
        .setIsWide(true)
        .setVariant(c.variant)
        .build()

      await browser
        .navigateTo(
          button.iFrameUrl()
        )

    await browser
      .resizeWindow(1000, 500)
      .expect(
        getButtonSelector().clientHeight
      ).eql(30)
      .expect(
        getButtonSelector().clientWidth
      ).eql(970)
    }
  );
})

fixture('Testing button size')

const buttonSizes = [
  { size: 's', h: 30, w: 103},
  { size: 'm', h: 38, w: 103},
  { size: 'l', h: 46, w: 111}
];

buttonSizes.forEach( c => {
  test(
    'when the size is set to '.concat(c.size),
    async browser => {
      const button = buttonBuilder()
        .setType('primary')
        .setSize(c.size)
        .build()

      await browser
        .resizeWindow(1000, 500)
        .navigateTo(
          button.iFrameUrl()
        )

      await browser
        .expect(
          getButtonSelector().clientHeight
        ).eql(c.h)
        .expect(
          getButtonSelector().clientWidth
        ).eql(c.w)
    }
  );
})
