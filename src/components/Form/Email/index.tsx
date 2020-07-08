import React from "react";
import { Field, FieldProps, getIn } from "formik";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Email = ({ name, label, placeholder = "Email", onChange }: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const error = getIn(form.errors, name);
        const touched = getIn(form.touched, name);

        return (
          <div>
            <label htmlFor={name}>{label}</label>
            <input
              {...field}
              id={name}
              type="email"
              placeholder={placeholder}
              onChange={
                onChange
                  ? (e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value);
                    }
                  : field.onChange
              }
            />
          </div>
        );
      }}
    </Field>
  );
};

export default Email;
