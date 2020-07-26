import React from "react";
import * as currency from "@shopify/theme-currency";
import { navigate } from "gatsby";
import { ShopifyProduct } from "../../../../graphqlTypes";
import { Box, Image, AspectRatio } from "@chakra-ui/core";
import formatMoney from "../../../../utils/formatMoney";

interface Props {
  product: ShopifyProduct;
}

const CollectionItem = ({ product }: Props) => {
  const handleNavigation = async () => {
    await navigate(`/products/${product.handle}`);
  };

  const featuredImage = product.images[0].originalSrc;
  const price = formatMoney(product.priceRange?.maxVariantPrice?.amount * 100);

  return (
    <Box
      onClick={handleNavigation}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
    >
      <AspectRatio maxW="400px" ratio={4 / 3} mx="auto">
        <Image
          src={featuredImage}
          alt={product.title}
          style={{
            objectFit: "contain",
          }}
        />
      </AspectRatio>
      <Box p="6" textAlign="center">
        <Box fontWeight="semibold" as="p" lineHeight="tight">
          {product.title}
        </Box>
        <Box fontWeight="bold" as="p" lineHeight="tight">
          {price}
        </Box>
      </Box>
    </Box>
  );
};

export default CollectionItem;
