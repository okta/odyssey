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

import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';
import { axe } from 'jest-axe';

global.a11yCheck = (renderFn) => {
  describe('accessibility', () => {
    it('meets WCAG 2.1 AA criteria', async () => {
      const { container } = renderFn();
      const results = await axe(container, {
        runOnly: ['section508', 'wcag21a', 'wcag21aa']
      });

      expect(results).toHaveNoViolations();
    });
  });
};

// mocked for Choices.js in Select
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
