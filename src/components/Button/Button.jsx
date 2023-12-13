import React from "react";
import PropTypes from "prop-types";
import "./Button.scss"; // Assuming you have a separate CSS file for styling

function Button(PropTypes) {
  return <button>{props.text}</button>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default Button;
