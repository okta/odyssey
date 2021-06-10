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
import { render, fireEvent, within } from "@testing-library/react";
import type { EventType } from "@testing-library/dom";
import TextInput from ".";
import type { Props } from ".";

const textBox = 'textbox';
const label = 'Destination';

describe("TextInput", () => {
  it('renders into the document', () => {
    const { getByRole } = render(
      <TextInput label={label} />
    );

    expect(getByRole(textBox)).toBeInTheDocument();
  });

  it('renders a provided id associating the input and label', () => {
    const { getByRole, getByText } = render(
      <TextInput label={label} id="foo" />
    );

    expect(getByRole(textBox)).toHaveAttribute('id', 'foo');
    expect(getByText(label)).toHaveAttribute('for', 'foo');
  });

  it('renders a generated id associating the input and label', () => {
    const { getByLabelText } = render(
      <TextInput label={label} />
    );

    expect(getByLabelText(label)).toBe;
  });

  it('renders a provided name for the input', () => {
    const { getByRole } = render(
      <TextInput label={label} name="bar" />
    );

    expect(getByRole(textBox)).toHaveAttribute('name', 'bar');
  });

  it('renders the optionalLabel when input is not required', () => {
    const optionalLabel = 'Optional';

    const { container } = render(
      <TextInput label={label} optionalLabel={optionalLabel} required={false} />
    );

    expect(
      within(container.querySelector('label') as HTMLElement).getByText(
        optionalLabel
      )
    ).toBeInTheDocument();
  });

  it.each([
    ['disabled'],
    ['readonly'],
    ['required']
  ])('renders %s attribute', (attr: string) => {
    const { getByRole } = render(
      <TextInput label={label} {...{ [attr]: true }} />
    );

    expect(getByRole(textBox)).toHaveAttribute(attr);
  });

  it.each<[Props['type']]>([
    [undefined],
    ['text'],
    ['email'],
    ['url'],
    ['tel'],
    ['search'],
    ['password']
  ])('renders %s input type', (type) => {
    const { getByLabelText } = render(
      <TextInput label={label} type={type} />
    );

    expect(getByLabelText(label)).toHaveAttribute('type', type ?? 'text');
  });

  it('invokes onChange with expected args when change input event fires', () => {
    const handle = jest.fn();

    const { getByRole } = render(
      <TextInput onChange={handle} label={label} />
    );

    fireEvent.change(
      getByRole(textBox),
      { target: { value: 'new' } }
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type: 'change' }),
      'new'
    );
  });

  it.each<[string, EventType]>([
    ['onBlur', 'blur'],
    ['onFocus', 'focus'],
  ])('invokes %s with expected args when %s input event fires', (prop, type) => {
    const handle = jest.fn();

    const { getByRole } = render(
      <TextInput {...{ [prop]: handle }} label={label} />
    );

    fireEvent[type].call(
      fireEvent,
      getByRole(textBox),
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(
      expect.objectContaining({ type }),
    );
  });

  it('invokes inputRef with expected args after render', () => {
    const handle = jest.fn();

    const { getByRole } = render(
      <TextInput inputRef={handle} label={label} />
    );

    expect(handle).toHaveBeenCalledTimes(1);
    expect(handle).toHaveBeenLastCalledWith(getByRole(textBox));
  });

  a11yCheck(() => render(<TextInput label="foo" />))
});
