import React, { useContext } from "react";
import { navigate } from "gatsby";
import { Box, Image, AspectRatio, Button } from "@chakra-ui/core";

import { formatMoney } from "../../../../utils/formatMoney";
import { ShopifyProduct } from "../../../../graphqlTypes";
import { StoreContext } from "../../../../config/context/createStoreContext";
import LazyLoad from "react-lazyload";
import { linkResolver, Templates } from "../../../../utils/linkResolver";

interface Props {
  product: ShopifyProduct;
}

const CollectionItem = ({ product }: Props) => {
  const { adding } = useContext(StoreContext);

  const handleNavigation = async () => {
    await navigate(linkResolver(Templates.PRODUCTS, String(product.handle)));
  };

  const featuredImage =
    product.images && product.images[0]?.originalSrc
      ? product.images[0].originalSrc
      : undefined;
  const alt = product?.title ? product.title : "";
  const price = formatMoney(
    Number(product.priceRange?.maxVariantPrice?.amount) * 100
  );

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <LazyLoad height={350} once>
        <AspectRatio
          onClick={handleNavigation}
          cursor="pointer"
          maxW="400px"
          ratio={4 / 3}
          mx="auto"
        >
          <Image
            src={featuredImage}
            alt={alt}
            style={{
              objectFit: "contain",
            }}
          />
        </AspectRatio>
      </LazyLoad>
      <Box
        cursor="pointer"
        onClick={handleNavigation}
        px={6}
        pt={6}
        textAlign="center"
      >
        <Box fontWeight="semibold" as="p" lineHeight="tight">
          {product.title}
        </Box>
        <Box fontWeight="bold" as="p" lineHeight="tight">
          {price}
        </Box>
      </Box>
      <Box mt={3} px={6} pb={6} textAlign="center">
        <StoreContext.Consumer>
          {({ addVariantToCart }) => {
            const [variant] = product.variants;

            return (
              <Button
                isLoading={adding}
                onClick={() => {
                  if (variant) {
                    addVariantToCart({
                      variantId: String(variant.shopifyId),
                      quantity: 1,
                    });
                  }
                }}
              >
                Add to cart
              </Button>
            );
          }}
        </StoreContext.Consumer>
      </Box>
    </Box>
  );
};

export default CollectionItem;
