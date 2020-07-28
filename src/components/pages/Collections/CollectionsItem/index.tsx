import React from "react";
import { navigate } from "gatsby";
import LazyLoad from "react-lazyload";
import { AspectRatio, Box, Image } from "@chakra-ui/core";

import { ShopifyCollection } from "../../../../graphqlTypes";

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
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <LazyLoad height={350} once>
        <AspectRatio ratio={4 / 3} mx="auto">
          <Image src={collection.image?.src} alt={collection.title} />
        </AspectRatio>
      </LazyLoad>

      <Box p="6" textAlign="center">
        <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
          {collection.title}
        </Box>
      </Box>
    </Box>
  );
};

export default CollectionsItem;
