import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import classes from "./Button.module.scss";

const Button = ({ children, className, ...other }) => {
  return (
    <button className={cn(classes.button, className)} {...other}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Button;
