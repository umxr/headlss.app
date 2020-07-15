import React, { useContext, useState } from "react";
import {
  Box,
  Divider,
  Heading,
  Stack,
  Flex,
  Spinner,
  Button,
  ButtonGroup,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
} from "@chakra-ui/core";
import { useQuery, useMutation } from "react-apollo";
import { CUSTOMER_ADDRESSES } from "../../queries/customerAddresses";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";
import AddAddresForm from "../AddAddressForm";
import { Shopify_MailingAddressEdge } from "../../../../../graphqlTypes";
import { CUSTOMER_ADDRESS_DELETE } from "../../mutations/customerAddressDelete";
import { CUSTOMER_DEFUALT_ADDRESS_UPDATE } from "../../mutations/customerDefaultAddressUpdate";

const DashboardAddress = (props) => {
  const toast = useToast();
  const [view, setView] = useState("read");
  const { customerAccessToken } = useContext(CustomerContext);
  const [customerAddressDelete] = useMutation(CUSTOMER_ADDRESS_DELETE);
  const [customerDefaultAddressUpdate] = useMutation(
    CUSTOMER_DEFUALT_ADDRESS_UPDATE
  );
  const {
    data: addressesData,
    loading: addressesLoading,
    error: addressError,
    refetch,
  } = useQuery(CUSTOMER_ADDRESSES, {
    variables: {
      customerAccessToken,
    },
  });

  const onSubmit = (view: string) => {
    setView(view);
    refetch();
  };

  const onCancel = (view: string) => {
    setView(view);
  };

  const handleDelete = (id: string) => {
    customerAddressDelete({
      variables: {
        id,
        customerAccessToken,
      },
    })
      .then(({ data }) => {
        if (data.customerAddressDelete.customerUserErrors.length === 0) {
          toast({
            title: "Success!",
            description: "Address deleted.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          refetch();
        }
        if (data.customerAddressDelete.customerUserErrors.length) {
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

  const handleDefaultAddressUpdate = (addressId: string) => {
    customerDefaultAddressUpdate({
      variables: {
        addressId,
        customerAccessToken,
      },
    })
      .then(({ data }) => {
        if (data.customerDefaultAddressUpdate.customerUserErrors.length === 0) {
          toast({
            title: "Success!",
            description: "Default address updated.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
          refetch();
        }
        if (data.customerDefaultAddressUpdate.customerUserErrors.length) {
          const [error] = data.customerDefaultAddressUpdate.customerUserErrors;
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

  if (!addressesData && addressesLoading) {
    return (
      <Flex width="100%" height="100%" align="center" justify="center">
        <Spinner thickness="3px" speed="0.65s" size="lg" />
      </Flex>
    );
  }

  if (!addressesData && addressError) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" {...props}>
      <Box p={4}>
        <Heading as="h2" size="md" mb={4}>
          Address
        </Heading>
        <Divider mb={4} />
        {view === "create" && (
          <AddAddresForm onCancel={onCancel} onSubmit={onSubmit} />
        )}
        {view === "read" && (
          <Stack spacing={2}>
            {addressesData.customer.addresses.edges.map(
              (edge: Shopify_MailingAddressEdge, index: number) => {
                const addressMarkup = edge.node.formatted.join("<br />");
                if (
                  index ===
                  addressesData.customer.addresses.edges.length - 1
                ) {
                  return (
                    <Flex key={edge.node.id}>
                      <Box
                        flex={1}
                        dangerouslySetInnerHTML={{
                          __html: addressMarkup,
                        }}
                      />
                      <Box as={Flex} flex={1} display="flex" justify="flex-end">
                        <ButtonGroup flexDirection="column">
                          <Button
                            minW="150px"
                            isDisabled={
                              edge.node.id ===
                              addressesData.customer.defaultAddress.id
                            }
                            onClick={() =>
                              handleDefaultAddressUpdate(edge.node.id)
                            }
                            backgroundColor="blue.500"
                            style={{
                              marginLeft: 0,
                              marginBottom: 10,
                            }}
                          >
                            {edge.node.id ===
                            addressesData.customer.defaultAddress.id
                              ? "Default"
                              : "Set as default"}
                          </Button>
                          <Button
                            minW="150px"
                            variantColor="teal"
                            ml={0}
                            style={{
                              marginLeft: 0,
                              marginBottom: 10,
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            minW="150px"
                            backgroundColor="red.500"
                            m={0}
                            style={{
                              marginLeft: 0,
                            }}
                            onClick={() => handleDelete(edge.node.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Flex>
                  );
                }
                return (
                  <>
                    <Flex key={edge.node.id}>
                      <Box
                        flex={1}
                        dangerouslySetInnerHTML={{
                          __html: addressMarkup,
                        }}
                      />
                      <Box as={Flex} flex={1} display="flex" justify="flex-end">
                        <ButtonGroup flexDirection="column">
                          <Button
                            minW="150px"
                            isDisabled={
                              edge.node.id ===
                              addressesData.customer.defaultAddress.id
                            }
                            onClick={() =>
                              handleDefaultAddressUpdate(edge.node.id)
                            }
                            backgroundColor="blue.500"
                            style={{
                              marginLeft: 0,
                              marginBottom: 10,
                            }}
                          >
                            {edge.node.id ===
                            addressesData.customer.defaultAddress.id
                              ? "Default"
                              : "Set as default"}
                          </Button>
                          <Button
                            minW="150px"
                            variantColor="teal"
                            ml={0}
                            style={{
                              marginLeft: 0,
                              marginBottom: 10,
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            minW="150px"
                            backgroundColor="red.500"
                            m={0}
                            style={{
                              marginLeft: 0,
                            }}
                            onClick={() => handleDelete(edge.node.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </Box>
                    </Flex>
                    <Divider />
                  </>
                );
              }
            )}
            <Button
              backgroundColor="green.500"
              onClick={() => setView("create")}
            >
              Add address
            </Button>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default DashboardAddress;
