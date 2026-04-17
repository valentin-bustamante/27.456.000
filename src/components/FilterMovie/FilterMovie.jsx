import styles from "./FilterMovie.module.css";

function FilterMovie({ filters, sorting, onChange, onSortChange }) {
    return (
        <div className={styles.container}>
            <div className={styles.headerRow}>
                <span className={styles.rowLabel}>Filtros y orden</span>
            </div>
            <div className={styles.controlsRow}>
                <select
                    className={styles.select}
                    value={filters.type}
                    onChange={(e) => onChange("type", e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="Película">Películas</option>
                    <option value="Serie">Series</option>
                </select>

                <select
                    className={styles.select}
                    value={filters.genre}
                    onChange={(e) => onChange("genre", e.target.value)}
                >
                    <option value="">Todos los géneros</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Ciencia ficción">Ciencia ficción</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Drama">Drama</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Aventura">Aventura</option>
                </select>
                <select
                    className={styles.select}
                    value={sorting.sortBy}
                    onChange={(e) => onSortChange("sortBy", e.target.value)}
                >
                    <option value="">Sin ordenar</option>
                    <option value="year">Año</option>
                    <option value="rating">Rating</option>
                </select>

                <select
                    className={styles.select}
                    value={sorting.order}
                    onChange={(e) => onSortChange("order", e.target.value)}
                >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>
            </div>
        </div>
    );
}
export default FilterMovie