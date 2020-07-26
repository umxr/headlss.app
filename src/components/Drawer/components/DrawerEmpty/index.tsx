import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

const DrawerEmpty = () => {
  return (
    <Alert __css={{}} status="warning">
      <AlertIcon />
      <AlertTitle mr={2}>Oh no!</AlertTitle>
      <AlertDescription>Seems like your cart is empty</AlertDescription>
    </Alert>
  );
};

export default DrawerEmpty;
