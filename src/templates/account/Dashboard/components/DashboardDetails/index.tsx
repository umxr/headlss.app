import React, { useContext, useEffect, useState } from "react";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import { useQuery, useMutation } from "react-apollo";
import { Box, Heading } from "@chakra-ui/core";
import { CUSTOMER_REQUEST } from "../../queries/customerRequest";
import { CustomerContext } from "../../../../../config/context/createCustomerContext";
import {
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  Divider,
  useToast,
} from "@chakra-ui/core";
import { FaEdit, FaCheck } from "react-icons/all";
import { CUSTOMER_UPDATE } from "../../mutations/customerUpdate";
import { PropsOf } from "@chakra-ui/system";
import "react-phone-number-input/style.css";

const DashboardDetails = (props: PropsOf<typeof Box>) => {
  const toast = useToast();
  const { customerAccessToken } = useContext(CustomerContext);
  const { loading, error, data } = useQuery(CUSTOMER_REQUEST, {
    variables: { customerAccessToken },
  });
  const [customerUpdate, { loading: mutationLoading }] = useMutation(
    CUSTOMER_UPDATE
  );

  const [firstName, setFirstName] = useState<string>("");
  const [editFirstName, setEditFirstName] = useState<boolean>(true);

  const [lastName, setLastName] = useState<string>("");
  const [editLastName, setEditLastName] = useState<boolean>(true);

  const [email, setEmail] = useState<string>("");
  const [editEmail, setEditEmail] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>("");
  const [editPhone, setEditPhone] = useState<boolean>(true);

  const formatPhone = (phone: string) => {
    const { number } = parsePhoneNumber(String(phone));
    return number;
  };

  useEffect(() => {
    if (data && data.customer) {
      setFirstName(data.customer.firstName);
      setLastName(data.customer.lastName);
      setEmail(data.customer.email);
      setPhone(data.customer.phone);
    }
  }, [data]);

  const handleUpdate = () => {
    customerUpdate({
      variables: {
        customerAccessToken,
        customer: {
          firstName,
          lastName,
          email,
          phone: formatPhone(phone),
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
    <Box width="100%" borderWidth="1px" borderRadius="lg" {...props}>
      <Box p={4}>
        <Heading as="h2" size="md" mb={4}>
          Personal Details
        </Heading>
        <Divider mb={4} />
        <Stack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <InputGroup>
              <Input
                isDisabled={editFirstName}
                pr="7rem"
                defaultValue={data.customer.firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
              />
              <InputRightElement height="100%">
                <Button
                  h="1.75rem"
                  onClick={() => setEditFirstName(!editFirstName)}
                >
                  {editFirstName ? <FaEdit /> : <FaCheck />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <InputGroup>
              <Input
                isDisabled={editLastName}
                pr="7rem"
                defaultValue={data.customer.lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
              />
              <InputRightElement height="100%">
                <Button
                  h="1.75rem"
                  onClick={() => setEditLastName(!editLastName)}
                >
                  {editLastName ? <FaEdit /> : <FaCheck />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="Email">Email</FormLabel>
            <InputGroup>
              <Input
                isDisabled={editEmail}
                pr="7rem"
                defaultValue={data.customer.email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <InputRightElement height="100%">
                <Button h="1.75rem" onClick={() => setEditEmail(!editEmail)}>
                  {editEmail ? <FaEdit /> : <FaCheck />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="phone">Phone</FormLabel>
            <InputGroup>
              <PhoneInput
                isDisabled={editPhone}
                inputComponent={Input}
                value={phone}
                onChange={setPhone}
                style={{
                  flex: 1,
                }}
              />
              <InputRightElement height="100%">
                <Button h="1.75rem" onClick={() => setEditPhone(!editPhone)}>
                  {editPhone ? <FaEdit /> : <FaCheck />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            onClick={handleUpdate}
            isLoading={mutationLoading}
            isDisabled={
              !editPhone || !editLastName || !editFirstName || !editEmail
            }
          >
            Update
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardDetails;
