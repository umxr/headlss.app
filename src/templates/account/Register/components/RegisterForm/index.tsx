import React from "react";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { Form, Formik } from "formik";
import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Email from "../../../../../components/Form/Email";
import Password from "../../../../../components/Form/Password";
import Text from "../../../../../components/Form/Text";
import { CUSTOMER_CREATE } from "../../mutations/customerCreate";

const RegisterForm = () => {
  const [createCustomer, { data, loading, error }] = useMutation(
    CUSTOMER_CREATE
  );
  const handleSubmit = async (values: FormValues) => {
    console.log(JSON.stringify(values, null, 2));
    await createCustomer({
      variables: {
        input: values,
      },
    });
  };

  console.log({
    data,
    loading,
    error,
  });

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
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Text name="firstName" label="First Name" />
              <Text name="lastName" label="Last Name" />
              <Email name="email" label="Email" placeholder="Email" />
              <Password name="password" label="Password" />
              <Button
                mt={4}
                variantColor="teal"
                isLoading={loading}
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

export default RegisterForm;
