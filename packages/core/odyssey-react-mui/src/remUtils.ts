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

/**
 * takes a rem value as an argument like "2rem" and strips the "rem" text and returns just the number
 */
export const stripRem = (remValue: string) =>
  Number(remValue.replace(/rem$/, ""));

/**
 * takes a pixel value as an argument and converts that to rem value based on a 14px font size
 */
export const toRem = (pixelValue: number) => pixelValue / 14;

/**
 * takes a rem value based on a 14px font size as an argument and returns a pixel value
 */
export const fromRem = (remValue: number) => remValue * 14;
