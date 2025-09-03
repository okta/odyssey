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

type RgbComponents = {
  blue: number;
  green: number;
  red: number;
};

export const isValidHexString = (hexString: string) =>
  hexString.includes("#") && (hexString.length === 4 || hexString.length === 7);

export const rgbComponentsToString = (rgbComponents: RgbComponents) => {
  const { red, green, blue } = rgbComponents;

  return `${red}, ${green}, ${blue}`;
};

export const hexToRgb = (hexString: string) => {
  const hexNumber = parseInt(hexString.slice(1), 16);

  const red = (hexNumber >> 16) & 255;
  const green = (hexNumber >> 8) & 255;
  const blue = hexNumber & 255;

  return {
    red,
    green,
    blue,
    asFormattedString: `rgb(${rgbComponentsToString({ red, green, blue })})`,
  };
};
