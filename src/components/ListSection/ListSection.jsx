import { memo } from "react";
import styles from "./ListSection.module.css";
import { Cards } from "../Cards/Cards";

const ListSectionComponent = ({
  title,
  items,
  emptyText,
  onToggleViewed,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.sectionDiv}>
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <Cards
        arreglo={items}
        emptyText={emptyText}
        onToggleViewed={onToggleViewed}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </section>
    </div>
  );
};

export const ListSection = memo(ListSectionComponent);
