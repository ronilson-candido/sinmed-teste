import React from "react";
import styles from "./styles.module.scss";

interface SmallFormFieldProps {
  label: string;
  type: string;
  value?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => void;
  max?: string | number;
  readOnly?: boolean;
  options?: string[];
  mask?: string;
}

const SmallFormField = React.forwardRef<
  HTMLInputElement | HTMLSelectElement,
  SmallFormFieldProps
>(
  (
    {
      label,
      type,
      value,
      onChange,
      onBlur,
      max,
      readOnly,
      options,
      mask,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={styles.formField}>
        <div>
          <h3>{label}</h3>
          {type === "select" && options ? (
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className={styles.input}
              {...rest}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={type}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              className={styles.input}
              maxLength={typeof max === "number" ? max : undefined}
              readOnly={readOnly}
              {...rest}
            />
          )}
        </div>
      </div>
    );
  }
);

SmallFormField.displayName = "SmallFormField";

export default SmallFormField;
