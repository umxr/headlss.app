import React from "react";
import { Box } from "@chakra-ui/core";

interface Props {
  description: string;
}

const ProductDescription = ({ description }: Props) => {
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
};

export default ProductDescription;
