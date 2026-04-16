import styles from "./FilterMovie.module.css";

function FilterMovie({ filters, onChange }) {
    return (
        <div className={styles.container}>
            <select
                className={styles.select}
                value={filters.type}
                onChange={(e) => onChange("type", e.target.value)}
            >
                <option value="">Tipo</option>
                <option value="Película">Películas</option>
                <option value="Serie">Series</option>
            </select>

            <select
                className={styles.select}
                value={filters.genre}
                onChange={(e) => onChange("genre", e.target.value)}
            >
                <option value="">Todos los generos</option>
                <option value="Fantasía">Fantasía</option>
                <option value="Ciencia ficción">Ciencia ficción</option>
                <option value="Thriller">Thriller</option>
                <option value="Drama">Drama</option>
            </select>
        </div>
    );
}
export default FilterMovie