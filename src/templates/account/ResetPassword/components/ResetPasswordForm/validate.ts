import { FormValues } from "./types";

const validate = (values: FormValues) => {
  const errors: { [key in keyof FormValues]?: string } = {};

  if (!values.password) {
    errors.password = "Required";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password's must match";
  }

  return errors;
};

export default validate;
