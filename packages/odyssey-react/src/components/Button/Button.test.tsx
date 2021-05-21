import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  const buttonLabel = "Button Label";

  it("render the button", () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Button onClick={handleClick} variant="primary">{buttonLabel}</Button>);
    
    expect(getByTestId('ods-button')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <Button variant="primary" onClick={handleClick}>My Button</Button>
    );
    fireEvent.click(getByTestId('ods-button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Button onClick={handleClick} variant="primary" disabled>{buttonLabel}</Button>);
    expect(getByTestId('ods-button')).toHaveAttribute('disabled')
  });
});
