import { memo } from "react";
import styles from "./MovieInfo.module.css";

const MovieInfoComponent = ({ director, year, genre, rating }) => {
  return (
    <>
      <p className={styles.meta}>
        {director} · {year}
      </p>
      <p className={styles.genre}>Género: {genre}</p>
      <p className={styles.rating}>Rating: {rating}</p>
    </>
  );
};

export const MovieInfo = memo(MovieInfoComponent);
