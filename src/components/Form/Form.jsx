import styles from "./Form.module.css";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";

export const MovieForm = ({ form, onChange, onSubmit, isEditing, onCancel }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>{isEditing ? "Editar película o serie" : "Agregar película o serie"}</h2>
      {isEditing && (
        <p className={styles.notice}>
          Estás editando una entrada. Haz clic en Guardar o Cancelar cuando termines.
        </p>
      )}

      <FormField
        label="Título"
        name="title"
        value={form.title}
        onChange={onChange}
        type="text"
        placeholder="Título"
      />

      <FormField
        label="Director"
        name="director"
        value={form.director}
        onChange={onChange}
        type="text"
        placeholder="Director"
      />

      <FormField
        label="Año"
        name="year"
        value={form.year}
        onChange={onChange}
        type="number"
        placeholder="2024"
      />

      <FormField
        label="Género"
        name="genre"
        value={form.genre}
        onChange={onChange}
        options={["Fantasía", "Ciencia ficción", "Drama", "Thriller", "Comedia", "Aventura"]}
      />

      <FormField
        label="Rating"
        name="rating"
        value={form.rating}
        onChange={onChange}
        type="number"
        step="0.1"
        min="0"
        max="10"
        placeholder="8.5"
      />

      <FormField
        label="Tipo"
        name="type"
        value={form.type}
        onChange={onChange}
        options={["Película", "Serie"]}
      />

      <div className={styles.actions}>
        <Button type="submit" variant="primary" size="medium">
          {isEditing ? "Guardar" : "Agregar"}
        </Button>
        <Button type="button" variant="secondary" size="medium" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
