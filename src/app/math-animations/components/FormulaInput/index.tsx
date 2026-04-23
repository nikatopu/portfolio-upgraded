import { useState, useEffect } from "react";
import styles from "./FormulaInput.module.scss";

interface FormulaInputProps {
  value: string;
  onChange: (formula: string) => void;
  placeholder?: string;
}

export default function FormulaInput({
  value,
  onChange,
  placeholder = "Enter formula (e.g., sin(x) + cos(y))",
}: FormulaInputProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const validateFormula = (formula: string): boolean => {
    // Basic validation for allowed characters and functions
    const allowedPattern =
      /^[x y t sin cos tan log sqrt pi e +\-*/()0-9.\s]*$/i;
    return allowedPattern.test(formula) && formula.trim().length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    const valid = validateFormula(newValue);
    setIsValid(valid);

    if (valid || newValue === "") {
      onChange(newValue || "x");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isValid) {
      onChange(localValue || "x");
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Mathematical Formula</label>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className={`${styles.input} ${!isValid ? styles.invalid : ""}`}
        />
        <div className={styles.hint}>
          Use variables: x, y, t (time) | Functions: sin, cos, tan, sqrt, log
        </div>
        {!isValid && (
          <div className={styles.error}>
            Invalid formula. Use only mathematical expressions with allowed
            functions.
          </div>
        )}
      </div>
    </div>
  );
}
