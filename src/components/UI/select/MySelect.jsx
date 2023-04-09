import React from "react";
import styles from "./MySelect.module.css";

function MySelect({ options, defaultValue, value, onChange }) {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      <option disabled value={value}>
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default MySelect;
