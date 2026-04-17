import styles from "./CounterStats.module.css";

export function CounterStats({ total, viewed, notViewed, genreCounts = {} }) {
  const progress = total > 0 ? (viewed / total) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.statsWrapper}>
        <div className={styles.statItem}>
          <span className={styles.label}>Total</span>
          <div className={styles.number}>{total}</div>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>Vistas</span>
          <div className={styles.number}>{viewed}</div>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>Por ver</span>
          <div className={styles.number}>{notViewed}</div>
        </div>
      </div>
      <div className={styles.genreBlock}>
        <span className={styles.genreLabel}>Por género</span>
        <ul className={styles.genreList}>
          {Object.entries(genreCounts).map(([genre, count]) => (
            <li key={genre} className={styles.genreItem}>
              <strong>{genre}</strong>: {count}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
