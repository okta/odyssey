import React from "react";
import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  const buttonLabel = "Button Label";
  it("render the button", () => {
    const { getByTestId } = render(<Button onClick={()=>{}} variant="primary">{buttonLabel}</Button>);
    
    expect(getByTestId('ods-button')).toBeInTheDocument();
  });

  it('should be disabled', () => {
    const { getByTestId } = render(<Button onClick={()=>{}} variant="primary" disabled>{buttonLabel}</Button>);
    expect(getByTestId('ods-button')).toHaveAttribute('disabled')
  });
});
