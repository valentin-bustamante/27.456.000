import { useEffect } from "react";
import styles from "./Splash.module.css";

export function Splash({ onFinish }) {
  useEffect(() => {
    const stop = setTimeout(onFinish, 3500);
    return () => clearTimeout(stop);
  }, [onFinish]);

  return (
    <div className={styles.overlay}>
      <div className={styles.logoBlock}>
        <span className={styles.letter}>Ñ</span>
        <span className={styles.text}>etflix</span>
      </div>
    </div>
  );
}
