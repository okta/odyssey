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
import Radio from ".";

const radio = 'radio';
const label = 'Select speed';
const value = 'Lightspeed';
const name = 'speed';

describe("Radio", () => {
  it('renders visibly into the document', () => {
    const { getByRole } = render(
      <Radio label={ label } name={ name } value={ value } />
    );

    expect(getByRole(radio)).toBeVisible();
  });

  it('renders value attributed as expected for input', () => {
    const { getByRole } = render(
      <Radio label={ label } name={ name } value={ value } />
    );

    expect(getByRole(radio)).toHaveAttribute('value', value);
  });

  it('renders name attribute as expected for input', () => {
    const { getByRole } = render(
      <Radio label={ label } name={ name } value={ value } />
    );

    expect(getByRole(radio)).toHaveAttribute('name', name);
  });

  it('renders a provided id associating the input and label', () => {
    const { getByRole, getByText } = render(
      <Radio label={ label } name={ name } value={ value } id="foo" />
    );

    expect(getByRole(radio)).toHaveAttribute('id', 'foo');
    expect(getByText(label)).toHaveAttribute('for', 'foo');
  });

  it('renders a generated id associating the input and label', () => {
    const { getByLabelText } = render(
      <Radio label={ label } name={ name } value={ value } />
    );

    expect(getByLabelText(label)).toBeTruthy();
  });

  it.each([
    ['disabled'],
    ['checked'],
    ['required']
  ])('renders %s attribute', (attr: string) => {
    const { getByRole } = render(
      <Radio label={ label } value={ value } name={ name } { ...{ [attr]: true } } />
    );

    expect(getByRole(radio)).toHaveAttribute(attr);
  });

  it('invokes onChange with expected args when change input event fires', () => {
    const handle = jest.fn();

    const { getByRole } = render(
      <Radio onChange={ handle } label={ label } value={ value } name={ name } />
    );

    fireEvent.click(getByRole(radio));

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
      <Radio { ...{ [prop]: handle } } label={ label } value={ value } name={ name } />
    );

    fireEvent[type].call(
      fireEvent,
      getByRole(radio),
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type }),
    );
  });

  it('invokes inputRef with expected args after render', () => {
    const handle = jest.fn();

    const { getByRole } = render(
      <Radio inputRef={ handle } label={ label } value={ value } name={ name } />
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(getByRole(radio));
  });

  a11yCheck(() => render(<Radio label={ label } value={ value } name={ name } />));
});
