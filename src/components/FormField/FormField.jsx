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
}) => {
  return (
    <label className={styles.field}>
      {label}
      {options ? (
        <select name={name} value={value} onChange={onChange} required={required}>
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
        />
      )}
    </label>
  );
};

export const FormField = memo(FormFieldComponent);
