import { memo } from "react";
import styles from "./SearchBar.module.css";

const SearchBarComponent = ({ value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={styles["search-bar"]}
        />
    );
};

export const SearchBar = memo(SearchBarComponent);