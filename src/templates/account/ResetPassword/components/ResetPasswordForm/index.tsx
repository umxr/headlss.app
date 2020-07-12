import React from "react";
import { Box, Button, Flex, Heading, Stack, useToast } from "@chakra-ui/core";
import { useMutation } from "@apollo/react-hooks";
import { Form, Formik } from "formik";
import validate from "./validate";
import { INITIAL_VALUES } from "./constants";
import { FormValues } from "./types";

import Password from "../../../../../components/Form/Password";
import {
  CUSTOMER_RESET,
} from "../../mutations/customerReset";

interface Props {
  resetToken: string;
  id: string;
}

const ResetPasswordForm = ({ resetToken, id }: Props) => {
  const toast = useToast();
  const [customerReset, { loading }] = useMutation(CUSTOMER_RESET);
  const handleSubmit = (values: FormValues) => {
    customerReset({
      variables: {
        id,
        input: {
          resetToken,
          password: values.password,
        },
      },
    })
      .then(({ data }) => {
        if (data.customerReset.customerUserErrors.length === 0) {
          toast({
            title: "Success.",
            description: "Your password has been reset successfully!",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        }
        if (data.customerReset.customerUserErrors.length) {
          const [error] = data.customerReset.customerUserErrors;
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
          Reset Password
        </Heading>
        <Formik
          validate={validate}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <Password name="password" label="Password" />
              <Password name="confirmPassword" label="Confirm Password" />
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

export default ResetPasswordForm;
