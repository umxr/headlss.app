import * as React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { Button, Box, Flex, Heading, Stack, useToast } from "@chakra-ui/core";

import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Email from "../../../../../components/Form/Email";
import Password from "../../../../../components/Form/Password";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "../../mutations/customerAccessTokenCreate";
import { useContext } from "react";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";

const LoginForm = () => {
  const { setAccessToken, setExpiry } = useContext(
    CustomerContext
  );
  const toast = useToast();
  const [customerAccessTokenCreate, { loading }] = useMutation(
    CUSTOMER_ACCESS_TOKEN_CREATE
  );

  const handleSubmit = (values: FormValues) => {
    customerAccessTokenCreate({
      variables: {
        input: values,
      },
    })
      .then(({ data }) => {
        if (data.customerAccessTokenCreate.customerAccessToken) {
          setAccessToken(
            data.customerAccessTokenCreate.customerAccessToken.accessToken
          );
          setExpiry(
            data.customerAccessTokenCreate.customerAccessToken.expiresAt
          );
          toast({
            title: "Success!",
            description: "You've successfully logged in.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        }
        if (data.customerAccessTokenCreate.customerUserErrors.length) {
          const [error] = data.customerAccessTokenCreate.customerUserErrors;
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
        borderRadius="lg"
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

export default LoginForm;
