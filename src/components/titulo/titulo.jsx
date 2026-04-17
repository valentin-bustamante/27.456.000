import styles from './titulo.module.css';

export const Titulo = ({ texto }) => {
    return (
        <h1 className={styles.titulo}>
            <span className={styles.firstLetter}>{texto[0]}</span>
            {texto.slice(1)}
        </h1>
    );
}