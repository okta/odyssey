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
import Button, { ButtonVariants } from "./Button";

const buttonLabel = "Button Label";

const checkVariantClassName = (variantName: ButtonVariants, variantClassName: string) => {
  const { getByTestId } = render(
    <Button onClick={jest.fn()} variant={variantName}>{buttonLabel}</Button>
  );
  
  expect(getByTestId('ods-button')).toHaveClass(variantClassName)
};

describe("Button", () => {
  it("render the button", () => {
    const { getByTestId } = render(
      <Button onClick={jest.fn()} variant="primary">{buttonLabel}</Button>
    );
    
    expect(getByTestId('ods-button')).toBeInTheDocument();
  });

  it('should be disabled', () => {
    const { getByTestId } = render(
      <Button onClick={jest.fn()} variant="primary" disabled>{buttonLabel}</Button>
    );
    
    expect(getByTestId('ods-button')).toHaveAttribute('disabled')
  });

  it('should apply the `primary` variant class to the button', () => 
    checkVariantClassName('danger', 'is-ods-button-danger')
  );
  
  it('should apply the `secondary` variant class to the button', () => 
    checkVariantClassName('secondary', 'is-ods-button-secondary')
  );
  
  it('should apply the `danger` variant class to the button', () => 
    checkVariantClassName('danger', 'is-ods-button-danger')
  );
  
  it('should apply the `overlay` variant class to the button', () => 
    checkVariantClassName('dismiss', 'is-ods-button-dismiss')
  );
  
  it('should apply the `clear` variant class to the button', () => 
    checkVariantClassName('clear', 'is-ods-button-clear')
  );
  
  it('should apply the `wide` class to the button', () => {
    const { getByTestId } = render(
      <Button onClick={jest.fn()} variant="danger" wide={true}>{buttonLabel}</Button>
    );
    
    expect(getByTestId('ods-button'))
      .toHaveClass(
        "ods-button",
        "is-ods-button-full-width",
        "is-ods-button-danger"
      )
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Button variant="primary" onClick={handleClick}>My Button</Button>
    );

    fireEvent.click(getByTestId('ods-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

});
