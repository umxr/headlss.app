import React from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/core";
import { Field, FieldProps, getIn } from "formik";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Text = ({ name, label, placeholder = "", onChange }: Props) => {
  return (
      <Field name={name}>
        {({ field, form }: FieldProps) => {
          const errors = getIn(form.errors, name);
          const touched = getIn(form.touched, name);

          return (
              <FormControl isInvalid={!!errors && !!touched}>
                <FormLabel htmlFor={name}>{label}</FormLabel>
                <Input
                    {...field}
                    id={name}
                    type="text"
                    placeholder={placeholder}
                    onChange={
                      onChange
                          ? (e: React.ChangeEvent<HTMLInputElement>) => {
                            onChange(e.target.value);
                          }
                          : field.onChange
                    }
                />
                <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
              </FormControl>
          );
        }}
      </Field>
  );
};

export default Text;
