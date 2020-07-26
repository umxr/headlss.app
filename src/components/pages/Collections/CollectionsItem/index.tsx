import React from "react";
import { navigate } from "gatsby";
import { ShopifyCollection } from "../../../../graphqlTypes";
import { Box, Image } from "@chakra-ui/core";

interface Props {
  collection: ShopifyCollection;
}

const CollectionsItem = ({ collection }: Props) => {
  const handleNavigation = async () => {
    await navigate(`/collections/${collection.handle}`);
  };

  return (
    <Box
      onClick={handleNavigation}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <Image src={collection.image?.src} alt={collection.title} />

      <Box p="6" textAlign="center">
        <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {collection.title}
        </Box>
      </Box>
    </Box>
  );
};

export default CollectionsItem;
