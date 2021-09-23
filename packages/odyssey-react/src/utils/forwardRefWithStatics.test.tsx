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

import type { ComponentPropsWithRef, FC } from 'react';
import { screen, render } from '@testing-library/react';
import { forwardRefWithStatics } from '.';

describe('forwardRefWithStatics', () => {
  type Props = ComponentPropsWithRef<'div'>;
  type Statics = { Child: typeof Child; };

  const Child: FC<Props> = (props) => <div {...props} />;

  const Parent = forwardRefWithStatics<
    HTMLDivElement,
    Props,
    Statics
  >(
    (props, ref) => <div ref={ref} {...props} />
  );

  Parent.Child = Child;

  it('supports statics', () => {
    expect(Parent.Child).toEqual(Child);
  });

  it('renders self and child components', () => {
    render(
      <Parent data-testid="parent">
        <Parent.Child data-testid="child" />
      </Parent>
    );

    expect(screen.getByTestId('parent')).toBeVisible();
    expect(screen.getByTestId('child')).toBeVisible();
  });
});
