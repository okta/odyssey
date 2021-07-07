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

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import type { EventType } from "@testing-library/dom";
import Checkbox from ".";

const checkbox = 'checkbox';
const label = `${checkbox}_label`;
const value = `${checkbox}_value`;
const name = `${checkbox}_name`;

describe("Checkbox", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(
      <Checkbox label={label} name={name} value={value} />
    );

    expect(getByRole(checkbox)).toBeVisible();
  });

  it('renders value attributed as expected for input', () => {
    const { getByRole } = render(
      <Checkbox label={label} name={name} value={value} />
    );

    expect(getByRole(checkbox)).toHaveAttribute('value', value);
  });

  it('renders name attribute as expected for input', () => {
    const { getByRole } = render(
      <Checkbox label={label} name={name} value={value} />
    );

    expect(getByRole(checkbox)).toHaveAttribute('name', name);
  });

  it('renders a provided id associating the input and label', () => {
    const { getByRole, getByText } = render(
      <Checkbox label={label} name={name} value={value} id="foo" />
    );

    expect(getByRole(checkbox)).toHaveAttribute('id', 'foo');
    expect(getByText(label)).toHaveAttribute('for', 'foo');
  });

  it('renders a generated id associating the input and label', () => {
    const { getByLabelText } = render(
      <Checkbox label={label} name={name} value={value} />
    );

    expect(getByLabelText(label)).toBeTruthy();
  });

  it.each([
    ['disabled'],
    ['checked'],
    ['required']
  ])('renders %s attribute', (attr: string) => {
    const { getByRole } = render(
      <Checkbox label={label} value={value} name={name} {...{ [attr]: true }} />
    );

    expect(getByRole(checkbox)).toHaveAttribute(attr);
  });

  it('invokes onChange with expected args when change input event fires', () => {
    const handle = jest.fn();

    const { getByRole } = render(
      <Checkbox onChange={handle} label={label} value={value} name={name} />
    );

    fireEvent.click(getByRole(checkbox));

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'change' }),
      value
    );
  });

  it.each<[string, EventType]>([
    ['onBlur', 'blur'],
    ['onFocus', 'focus'],
  ])('invokes %s with expected args when %s input event fires', (prop, type) => {
    const handle = jest.fn();

    const { getByRole } = render(
      <Checkbox {...{ [prop]: handle }} label={label} value={value} name={name} />
    );

    fireEvent[type].call(
      fireEvent,
      getByRole(checkbox),
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type }),
    );
  });

  it('invokes inputRef with expected args after render', () => {
    const handle = jest.fn();

    const { getByRole } = render(
      <Checkbox inputRef={handle} label={label} value={value} name={name} />
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(getByRole(checkbox));
  });

  a11yCheck(() => render(<Checkbox label={label} value={value} name={name}/>))
});
