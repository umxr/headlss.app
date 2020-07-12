import React from "react";
import { Box, Button, Flex, Heading, Stack, useToast } from "@chakra-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { Form, Formik } from "formik";
import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Email from "../../../../../components/Form/Email";
import { CUSTOMER_RECOVER } from "../../mutations/customerRecover";

const ForgotPasswordForm = () => {
  const toast = useToast();
  const [customerRecover, { loading }] = useMutation(CUSTOMER_RECOVER);
  const handleSubmit = (values: FormValues) => {
    customerRecover({
      variables: {
        email: values.email,
      },
    })
      .then(({ data }) => {
        if (data.customerRecover.customerUserErrors.length === 0) {
          toast({
            title: "Success.",
            description:
              "We've sent a password recovery email, Please check your inbox.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        }
        if (data.customerRecover.customerUserErrors.length) {
          const [error] = data.customerRecover.customerUserErrors;
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
          Forgot Password
        </Heading>
        <Formik
          validate={validate}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Email name="email" label="Email" placeholder="Email" />
              <Button
                mt={4}
                variantColor="teal"
                isLoading={loading}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Stack>
    </Flex>
  );
};

export default ForgotPasswordForm;
