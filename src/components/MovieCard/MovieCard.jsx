import { memo } from "react";
import styles from "./MovieCard.module.css";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { MovieInfo } from "../MovieInfo/MovieInfo";

const MovieCardComponent = ({ item, onToggleViewed, onEdit, onDelete }) => {
  return (
    
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <Badge variant="type">{item.type}</Badge>
        <Badge variant={item.viewed ? "viewed" : "notViewed"}>
          {item.viewed ? "Visto" : "No visto"}
        </Badge>
      </div>

      <h3>{item.title}</h3>
      <MovieInfo
        director={item.director}
        year={item.year}
        genre={item.genre}
        rating={item.rating}
      />

      <div className={styles.actions}>
        <Button
          type="button"
          variant="primary"
          size="small"
          onClick={() => onToggleViewed(item.id)}
        >
          {item.viewed ? "Marcar no visto" : "Marcar visto"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="small"
          onClick={() => onEdit(item)}
        >
          Editar
        </Button>
        <Button
          type="button"
          variant="danger"
          size="small"
          onClick={() => onDelete(item)}
        >
          Eliminar
        </Button>
      </div>
    </article>
  );
};

export const MovieCard = memo(MovieCardComponent);
