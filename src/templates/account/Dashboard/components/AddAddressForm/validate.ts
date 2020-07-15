import { FormValues } from "./types";

const validate = (values: FormValues) => {
  const errors: { [key in keyof FormValues]?: string } = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (!values.address1) {
    errors.address1 = "Required";
  }

  if (!values.city) {
    errors.city = "Required";
  }

  if (!values.country) {
    errors.country = "Required";
  }

  if (!values.zip) {
    errors.zip = "Required";
  }

  return errors;
};

export default validate;
