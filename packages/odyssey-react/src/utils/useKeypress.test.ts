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


import { fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import { useKeypress } from "./useKeypress";

test('should fire callback when key in map is pressed', () => {
  const handleKeypress = jest.fn()

  renderHook(() => useKeypress([
    ['ArrowLeft', handleKeypress]
  ]))

  act(() => {
    fireEvent.keyUp(document.body, {key: 'ArrowLeft', code: 'ArrowLeft'})
    fireEvent.keyUp(document.body, {key: 'ArrowRight', code: 'ArrowRight'})
  })

  expect(handleKeypress).toHaveBeenCalledTimes(1);
})
