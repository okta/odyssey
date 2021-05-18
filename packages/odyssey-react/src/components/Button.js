import React from "react";
import classNames from "classnames";

const Button = (props) => {
  const { 
    ariaLabel,
    variant,
    children,
    className,
    disabled,
    tag = "button",
    wide,
    onClick
  } = props;

  const componentClass = classNames("ods-button", {
    "is-ods-button-full-width": wide,
    [`is-ods-button-${variant}`]: variant,
  }, className);

  const labelClass = classNames("ods-button--label", {
    "u-visually-hidden": ariaLabel
  });

  const Tag = tag;

  return (
    <Tag
      className={componentClass}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {children && <span className={labelClass}>{children}</span>}
    </Tag>
  )
};

export default Button;
