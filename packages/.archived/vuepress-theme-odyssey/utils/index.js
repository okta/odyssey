/*!
 * Copyright (c) 2020-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

export const hashRE = /#.*$/;
export const extRE = /\.(md|html)$/;
export const endingSlashRE = /\/$/;
export const outboundRE = /^[a-z]+:/i;

export function normalize(path) {
  return decodeURI(path).replace(hashRE, "").replace(extRE, "");
}

export function isExternal(path) {
  return outboundRE.test(path);
}

export function isMailto(path) {
  return /^mailto:/.test(path);
}

export function isTel(path) {
  return /^tel:/.test(path);
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path;
  }
  const hashMatch = path.match(hashRE);
  const hash = hashMatch ? hashMatch[0] : "";
  const normalized = normalize(path);

  if (endingSlashRE.test(normalized)) {
    return path;
  }
  return normalized + ".html" + hash;
}

export function resolveNav(page, regularPath, site, localePath) {
  const { themeConfig } = site;

  return themeConfig.nav;
}
