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

const styles = require("./fixture.module.scss");

describe("transformStyles", () => {
  describe("require visitor", () => {
    it.skip("transforms styles as expected", () => {
      expect(styles).toMatchSnapshot();
    });

    it("transforms styles template function arity as expected", () => {
      expect(styles.__template).toBeInstanceOf(Function);
      expect(styles.__template).toHaveLength(1);
    });

    it.skip("transforms styles template function return value as expected", () => {
      expect(styles.__template()).toMatchSnapshot();
    });
  });
});
