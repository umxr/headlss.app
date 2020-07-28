import React, { useContext } from "react";
import { navigate } from "gatsby";
import { Box, Image, AspectRatio, Button, useToast } from "@chakra-ui/core";

import formatMoney from "../../../../utils/formatMoney";
import { ShopifyProduct } from "../../../../graphqlTypes";
import { StoreContext } from "../../../../config/context/createStoreContext";
import { useDispatch } from "react-redux";
import { closeDrawer, openDrawer } from "../../../../reducers/drawer/actions";
import LazyLoad from "react-lazyload";

interface Props {
  product: ShopifyProduct;
}

const CollectionItem = ({ product }: Props) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { adding } = useContext(StoreContext);

  const handleNavigation = async () => {
    await navigate(`/products/${product.handle}`);
  };

  const featuredImage = product.images[0].originalSrc;
  const price = formatMoney(product.priceRange?.maxVariantPrice?.amount * 100);

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
            alt={product.title}
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
            const onSuccess = () => {
              toast({
                title: "Success.",
                description: "Added to cart.",
                status: "success",
                duration: 2500,
                isClosable: true,
              });
              dispatch(openDrawer());
              setTimeout(() => {
                dispatch(closeDrawer());
              }, 2500);
            };

            const onError = (error) =>
              toast({
                title: "Error.",
                description: error.message,
                status: "error",
                duration: 2500,
                isClosable: true,
              });

            return (
              <Button
                isLoading={adding}
                onClick={() =>
                  addVariantToCart(
                    {
                      variantId: product.variants[0].shopifyId,
                      quantity: 1,
                    },
                    onSuccess,
                    onError
                  )
                }
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
