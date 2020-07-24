import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Stack,
  useToast,
} from "@chakra-ui/core";
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
  const toast = useToast();
  const [customerCreate, { loading }] = useMutation(CUSTOMER_CREATE);
  const handleSubmit = (values: FormValues) => {
    customerCreate({
      variables: {
        input: values,
      },
    })
      .then(({ data }) => {
        if (data.customerCreate.customer) {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        }
        if (data.customerCreate.customerUserErrors.length) {
          const [error] = data.customerCreate.customerUserErrors;
          toast({
            title: "Error.",
            description: error.message,
            status: "error",
            duration: 2500,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        const message = e.toString().replace("Error: GraphQL error:", "");
        toast({
          title: "Error.",
          description: message,
          status: "error",
          duration: 2500,
          isClosable: true,
        });
      });
  };

  return (
    <Stack
      padding={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="100%"
      spacing={3}
      as={Box}
    >
      <Heading as="h1" size="lg">
        Register
      </Heading>
      <Divider />
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
  );
};

export default RegisterForm;
