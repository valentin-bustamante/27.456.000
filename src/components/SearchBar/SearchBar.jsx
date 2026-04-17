import { memo } from "react";
import styles from "./SearchBar.module.css";

const SearchBarComponent = ({ value, onChange, placeholder }) => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.icon} aria-hidden="true"></span>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={styles.input}
            />
        </div>
    );
};

export const SearchBar = memo(SearchBarComponent);