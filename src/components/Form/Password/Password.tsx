import React from "react";
import { Field, FieldProps, getIn } from "formik";

interface Props {
  name: string;
  label: string;
  onChange?: (value: string) => void;
}

const Password = ({ name, label, onChange }: Props) => {
  return (
    <Field name={name}>
      {({ field, form }: FieldProps) => {
        const error = getIn(form.errors, name);
        const touched = getIn(form.touched, name);

        const isInvalid = !!error && !!touched;

        return (
          <div>
            <label htmlFor={name}>{label}</label>
            <input
              {...field}
              id={name}
              type="password"
              onChange={
                onChange
                  ? (e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value);
                    }
                  : field.onChange
              }
            />
            {isInvalid && <div>{form.errors.name}</div>}
          </div>
        );
      }}
    </Field>
  );
};

export default Password;
