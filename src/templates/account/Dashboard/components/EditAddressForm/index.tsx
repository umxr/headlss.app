import React, { useContext, useEffect, useState } from "react";
import { useMutation } from "react-apollo";
import { Button, ButtonGroup, Flex, Stack, useToast } from "@chakra-ui/core";
import { Form, Formik, FormikHelpers } from "formik";
import validate from "../AddAddressForm/validate";
import { INITIAL_VALUES } from "../AddAddressForm/constants";
import Text from "../../../../../components/Form/Text";
import { FormValues } from "./types";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";
import { CUSTOMER_ADDRESS_UPDATE } from "../../mutations/customerAddressUpdate";

interface SelectedAddress extends FormValues {
  id: string;
}

interface Props {
  onSubmit: (view: string) => void;
  onCancel: (view: string) => void;
  selectedAddress?: SelectedAddress;
}

const EditAddressForm = ({ onSubmit, onCancel, selectedAddress }: Props) => {
  const toast = useToast();
  const { customerAccessToken } = useContext(CustomerContext);
  const [formState, setFormState] = useState<FormValues>(INITIAL_VALUES);
  const [customerAddressUpdate, { loading }] = useMutation(
    CUSTOMER_ADDRESS_UPDATE
  );

  useEffect(() => {
    if (selectedAddress) {
      const address = {
        ...selectedAddress,
      };

      delete address.id;
      delete address.__typename

      setFormState(address);
    }
  }, [selectedAddress]);

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    customerAddressUpdate({
      variables: {
        customerAccessToken,
        id: selectedAddress.id,
        address: values,
      },
    })
      .then(({ data }) => {
        if (data.customerAddressUpdate.customerUserErrors.length === 0) {
          toast({
            title: "Success!",
            description: "Address Updated.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          actions.resetForm();
          onSubmit("read");
        }
        if (data.customerAddressUpdate.customerUserErrors.length) {
          const [error] = data.customerAddressDelete.customerUserErrors;
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

  const handleCancel = () => {
    onCancel("read");
    setFormState(INITIAL_VALUES);
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
          enableReinitialize={true}
          validate={validate}
          initialValues={formState}
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
                    <Button variantColor="teal" onClick={handleCancel}>
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

export default EditAddressForm;
