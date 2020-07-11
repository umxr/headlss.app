import * as React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { Button, Box, Flex, Heading, Stack } from "@chakra-ui/core";

import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Email from "../../../../../components/Form/Email";
import Password from "../../../../../components/Form/Password";

const LoginForm = () => {
  return (
    <Flex
      align="center"
      justify="center"
      height="100%"
      width="100%"
      flexDirection="column"
      flex={1}
    >
      <Stack
        maxW="lg"
        padding={4}
        borderWidth="1px"
        rounded="lg"
        overflow="hidden"
        width="100%"
        spacing={3}
        as={Box}
      >
        <Heading as="h1" size="lg">
          Login
        </Heading>
        <Formik
          validate={validate}
          initialValues={INITIAL_VALUES}
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Email name="email" label="Email" placeholder="Email" />
              <Password name="password" label="Password" />
              <Button
                mt={4}
                variantColor="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
