import React from "react";
import { Box } from "@chakra-ui/core";

interface Props {
  description?: string | null | undefined
}

const ProductDescription = ({ description }: Props) => {
  if (!description) return null;
  return (
    <Box
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
};

export default ProductDescription;
