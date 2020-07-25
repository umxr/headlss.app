import React, { useContext } from "react";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

import { CustomerContext } from "../../config/context/createCustomerContext";

interface Props {
  children: React.ReactNode;
}

const Authentication = ({ children }: Props) => {
  const { customerAccessToken } = useContext(CustomerContext);
  if (!customerAccessToken) {
    return (
      <Box p={6}>
        <Alert __css={{}} status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Unauthorised!</AlertTitle>
          <AlertDescription>
            Seems like you dont have access to this page.
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  return <>{children}</>;
};

export default Authentication;
