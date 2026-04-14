import { memo } from "react";
import styles from "./Cards.module.css";
import { MovieCard } from "../MovieCard/MovieCard";

const CardsComponent = ({ arreglo, onToggleViewed, onEdit, onDelete, emptyText }) => {
  if (arreglo.length === 0) {
    return <div className={styles.empty}>{emptyText}</div>;
  }

  return (
    <div className={styles.grid}>
      {arreglo.map((item) => (
        <MovieCard
          key={item.id}
          item={item}
          onToggleViewed={onToggleViewed}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export const Cards = memo(CardsComponent);