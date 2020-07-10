import { FormValues } from "./types";
import isValidEmail from "../../../../../utils/isValidEmail";

const validate = (values: FormValues) => {
  const errors: { [key in keyof FormValues]?: string } = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Email is not valid";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default validate;
