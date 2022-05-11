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

import {baseUrl} from "../mocks/baseUrl";
import XPathSelector from "../xpath-selector";

const id = 'components-button'
const viewMode = 'story'
const buttonXPathSelector = '//div[@id=\'root\']//Button';

class Button {
  private readonly type: string;
  private readonly children: string;
  private readonly isDisabled: boolean;
  private readonly size: string;
  private readonly isWide: boolean;
  private readonly variant: string;


  constructor(
    type= 'primary',
    children = 'Button label',
    isDisabled= false,
    size= 's',
    isWide = false,
    variant = 'primary') {
    this.type = type;
    this.children = children;
    this.isDisabled = isDisabled;
    this.size = size;
    this.isWide = isWide;
    this.variant = variant;
  }

  iFrameUrl() {
    return (
      () => {
        const baseURL = new URL(baseUrl.concat('/iframe.html'));

        baseURL.searchParams.set('id', id + '--' + this.type)
        baseURL.searchParams.set('viewMode', viewMode)
        baseURL.searchParams.set('args',
          'children:'.concat(this.children) + ';' +
          'size:'.concat(this.size) + ';' +
          'disabled:'.concat(String(this.isDisabled)) + ';' +
          'wide:'.concat(String(this.isWide)) + ';' +
          'variant:'.concat(this.variant)
        )
        return baseURL.toString();
      }
    ) ()
  }
}

export function buttonBuilder() {
  return {
    setType: function (type: string) {
      this.type = type;
      return this
    },
    setChildren: function (children: string) {
      this.children = children;
      return this
    },
    setIsDisabled: function (isDisabled: boolean) {
      this.isDisabled = isDisabled;
      return this
    },
    setSize: function (size: string) {
      this.size = size;
      return this
    },
    setIsWide: function (isWide: boolean) {
      this.isWide = isWide;
      return this
    },
    setVariant: function (variant: string) {
      this.variant = variant;
      return this
    },
    build: function () : Button {
      return new Button(
        this.type,
        this.children,
        this.isDisabled,
        this.size,
        this.isWide,
        this.variant)
    }
  }
}

export function getButtonSelector(): Selector {
  return XPathSelector(buttonXPathSelector)
}
