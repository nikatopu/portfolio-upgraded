"use client";

// House rule: more than 4 options → use this dropdown; 4 or fewer → chips.
// Native <select> underneath, so it's accessible and gets the phone's own picker on mobile.

import s from "./Select.module.scss";

type Option = { value: string; label: string };
type Props = {
  id: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  tone?: "paper" | "raised";
};

export default function Select({ id, value, options, onChange, placeholder, required, tone = "paper" }: Props) {
  return (
    <span className={`${s.wrap} ${tone === "raised" ? s.raised : ""}`}>
      <select id={id} value={value} required={required} onChange={(e) => onChange(e.target.value)} className={value === "" ? s.empty : undefined}>
        {placeholder !== undefined && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </span>
  );
}
