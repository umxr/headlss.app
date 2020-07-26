import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/core";

const CollectionEmpty = () => {
  return (
    <Alert __css={{}} status="error">
      <AlertIcon />
      <AlertTitle mr={2}>Oh no!</AlertTitle>
      <AlertDescription>This collection is Empty</AlertDescription>
    </Alert>
  );
};

export default CollectionEmpty;
