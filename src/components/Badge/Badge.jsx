import { memo } from "react";
import styles from "./Badge.module.css";

const BadgeComponent = ({ variant = "default", children }) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
};

export const Badge = memo(BadgeComponent);
