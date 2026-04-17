import styles from "./Form.module.css";
import { Button } from "../Button/Button";
import { FormField } from "../FormField/FormField";

export const MovieForm = ({ form, errors = {}, onChange, onSubmit, isEditing, onCancel }) => {
  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h2 className={styles.title}>{isEditing ? "Editar película o serie" : "Agregar película o serie"}</h2>
      {Object.keys(errors).length > 0 && (
        <div className={styles.formError} role="alert" aria-live="polite">
          <span className={styles.errorBadge}>!</span>
          <strong>Corrige los campos marcados para continuar.</strong>
        </div>
      )}
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
        error={errors.title}
      />

      <FormField
        label="Director"
        name="director"
        value={form.director}
        onChange={onChange}
        type="text"
        placeholder="Director"
        error={errors.director}
      />

      <FormField
        label="Año"
        name="year"
        value={form.year}
        onChange={onChange}
        type="number"
        placeholder="2024"
        error={errors.year}
        inputMode="numeric"
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
        placeholder="8.5"
        inputMode="decimal"
        error={errors.rating}
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
