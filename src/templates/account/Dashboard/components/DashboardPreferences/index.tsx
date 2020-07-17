import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "react-apollo";
import { Box, Heading } from "@chakra-ui/core";
import { CUSTOMER_MARKETING } from "../../queries/customerMarketing";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";
import {
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Checkbox,
  FormControl,
  Button,
  Stack,
  Divider,
  useToast,
} from "@chakra-ui/core";
import { CUSTOMER_UPDATE } from "../../mutations/customerUpdate";
import { PropsOf } from "@chakra-ui/system";

const DashboardPreferences = (props: PropsOf<typeof Box>) => {
  const toast = useToast();
  const { customerAccessToken } = useContext(CustomerContext);
  const { loading, error, data } = useQuery(CUSTOMER_MARKETING, {
    variables: { customerAccessToken },
  });
  const [customerUpdate, { loading: mutationLoading }] = useMutation(
    CUSTOMER_UPDATE
  );
  const [acceptsMarketing, setAcceptsMarketing] = useState(false);

  const handleUpdate = () => {
    customerUpdate({
      variables: {
        customerAccessToken,
        customer: {
          acceptsMarketing,
        },
      },
    })
      .then(({ data }) => {
        if (data.customerUpdate.customerUserErrors.length === 0) {
          toast({
            title: "Success.",
            description: "You're account details have been updated.",
            status: "success",
            duration: 2500,
            isClosable: true,
          });
        }
        if (data.customerUpdate.customerUserErrors.length) {
          const [error] = data.customerUpdate.customerUserErrors;
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

  useEffect(() => {
    if (data && data.customer) {
      setAcceptsMarketing(data.customer.acceptsMarketing);
    }
  }, [data]);

  if (!data && loading) {
    return (
      <Flex width="100%" height="100%" align="center" justify="center">
        <Spinner thickness="3px" speed="0.65s" size="lg" />
      </Flex>
    );
  }

  if (!data && error) {
    return (
      <Alert __css={{}} status="error">
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
          Marketing Preferences
        </Heading>
        <Divider mb={4} />
        <Stack spacing={4}>
          <FormControl>
            <Checkbox
              isChecked={acceptsMarketing}
              onChange={() => setAcceptsMarketing(!acceptsMarketing)}
            >
              By ticking this box, you accept all marketing.
            </Checkbox>
          </FormControl>
          <Button onClick={handleUpdate} isLoading={mutationLoading}>
            Update
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardPreferences;
