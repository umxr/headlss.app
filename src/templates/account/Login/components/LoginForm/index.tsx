import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { Button, Box, Divider, Heading, Stack, useToast } from "@chakra-ui/core";

import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Email from "../../../../../components/Form/Email";
import Password from "../../../../../components/Form/Password";
import { CUSTOMER_ACCESS_TOKEN_CREATE } from "../../mutations/customerAccessTokenCreate";
import { useContext } from "react";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";
import { ASSOCIATE_CUSTOMER_CHECKOUT } from "../../mutations/checkoutCustomerAssociateV2";
import { navigate } from "gatsby";

const LoginForm = () => {
  const { setAccessToken, setExpiry } = useContext(CustomerContext);
  const toast = useToast();
  const [customerAccessTokenCreate, { loading }] = useMutation(
    CUSTOMER_ACCESS_TOKEN_CREATE
  );
  const [associateCustomerCheckout] = useMutation(ASSOCIATE_CUSTOMER_CHECKOUT);

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
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
          const checkoutId = localStorage.getItem("shopify_checkout_id");
          associateCustomerCheckout({
            variables: {
              checkoutId,
              customerAccessToken:
                data.customerAccessTokenCreate.customerAccessToken.accessToken,
            },
          })
            .then(({ data }) => {
              if (
                data.checkoutCustomerAssociateV2.checkoutUserErrors.length === 0
              ) {
                actions.resetForm();
                navigate("/account/dashboard");
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
        Login
      </Heading>
      <Divider />
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
  );
};

export default LoginForm;
