import { FormulaEvaluator } from "../../lib/FormulaEvaluator";
import styles from "./PresetSelector.module.scss";

interface PresetSelectorProps {
  onPresetSelect: (formula: string) => void;
  currentFormula: string;
}

export default function PresetSelector({
  onPresetSelect,
  currentFormula,
}: PresetSelectorProps) {
  const presets = FormulaEvaluator.getPresets();

  const handlePresetClick = (formula: string) => {
    onPresetSelect(formula);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Formula Presets</label>
      <div className={styles.presetGrid}>
        {presets.map((preset, index) => {
          const isActive =
            preset.formula.toLowerCase() === currentFormula.toLowerCase();
          return (
            <button
              key={index}
              onClick={() => handlePresetClick(preset.formula)}
              className={`${styles.presetButton} ${isActive ? styles.active : ""}`}
              title={`Formula: ${preset.formula}`}
            >
              <div className={styles.presetName}>{preset.name}</div>
              <div className={styles.presetFormula}>{preset.formula}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
