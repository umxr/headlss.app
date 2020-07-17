import React, { useContext } from "react";
import { Button, Flex, ButtonGroup, Stack, useToast } from "@chakra-ui/core";
import validate from "./validate";

import { INITIAL_VALUES } from "./constants";
import { Form, Formik, FormikHelpers } from "formik";

import Text from "../../../../../components/Form/Text";
import { useMutation } from "@apollo/react-hooks";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";
import { CUSTOMER_ADDRESS_CREATE } from "../../mutations/customerAddressCreate";
import { FormValues } from "./types";

interface Props {
  onSubmit: (view: string) => void;
  onCancel: (view: string) => void;
}

const AddAddressForm = ({ onSubmit, onCancel }: Props) => {
  const toast = useToast();
  const { customerAccessToken } = useContext(CustomerContext);
  const [customerAddressCreate, { loading }] = useMutation(
    CUSTOMER_ADDRESS_CREATE
  );

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    customerAddressCreate({
      variables: {
        customerAccessToken,
        address: values,
      },
    })
      .then(({ data }) => {
        if (data.customerAddressCreate.customerUserErrors.length === 0) {
          toast({
            title: "Success!",
            description: "Address added.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          actions.resetForm();
          onSubmit("read");
        }
        if (data.customerAddressCreate.customerUserErrors.length) {
          const [error] = data.customerAddressCreate.customerUserErrors;
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
      <Flex width="100%">
        <Formik
          validate={validate}
          initialValues={INITIAL_VALUES}
          onSubmit={handleSubmit}
        >
          {() => {
            return (
              <Form
                style={{
                  width: "100%",
                }}
              >
                <Stack width="100%" spacing={2}>
                  <Text name="firstName" label="First Name" />
                  <Text name="lastName" label="Last Name" />
                  <Text name="company" label="Company" />
                  <Text name="address1" label="Address Line 1" />
                  <Text name="address2" label="Address Line 2" />
                  <Text name="city" label="City" />
                  <Text name="country" label="Country" />
                  <Text name="zip" label="Post Code/Zip" />
                  <ButtonGroup spacing={2}>
                    <Button
                      variantColor="teal"
                      type="submit"
                      isLoading={loading}
                    >
                      Submit
                    </Button>
                    <Button
                      variantColor="teal"
                      onClick={() => onCancel("read")}
                    >
                      Cancel
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default AddAddressForm;
