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

export interface AssertEnvReturn {
  isTest: boolean,
  isDev: boolean,
  isProd: boolean
}

export default function assertEnv(env: string): AssertEnvReturn {
  const result = {
    isTest: false,
    isDev: false,
    isProd: false
  }

  switch (env) {
    case 'test':
      return Object.assign(result, { isTest: true })
    case 'development':
      return Object.assign(result, { isDev: true })
    case 'production':
      return Object.assign(result, { isProd: true })
    default:
      throw new Error(
        `@okta/odyssey-babel must be run with an explicit NODE_ENV environment variable set.
        Valid environments are 'test', 'development' and 'production'`.replace(/\n\s+/, '\n')
      )
  }
}