import React from "react";
import { Formik, Form } from "formik";
import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Email from "../../../../../components/Form/Email";
import Password from "../../../../../components/Form/Password/Password";

const LoginForm = () => {
  return (
    <Formik
      validate={validate}
      initialValues={INITIAL_VALUES}
      onSubmit={(values: FormValues) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Email name="email" label="Email" placeholder="Email" />
          <Password name="password" label="Password" />
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
