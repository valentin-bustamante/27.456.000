import { memo } from "react";
import styles from "./FormField.module.css";

const FormFieldComponent = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  options,
  required = true,
  step,
  min,
  max,
  inputMode,
  error,
}) => {
  return (
    <label className={`${styles.field} ${error ? styles.hasError : ''}`} data-label={label}>
      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          onInvalid={(e) => e.preventDefault()}
          aria-invalid={Boolean(error)}
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          required={required}
          step={step}
          min={min}
          max={max}
          inputMode={inputMode}
          onInvalid={(e) => e.preventDefault()}
          aria-invalid={Boolean(error)}
        />
      )}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export const FormField = memo(FormFieldComponent);
