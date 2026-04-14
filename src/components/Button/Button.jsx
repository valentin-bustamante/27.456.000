import { memo } from "react";
import styles from "./Button.module.css";

const ButtonComponent = ({
  type = "button",
  variant = "primary",
  size = "medium",
  className = "",
  children,
  ...props
}) => {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export const Button = memo(ButtonComponent);
