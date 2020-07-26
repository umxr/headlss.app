import React, { useState } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  useToast,
} from "@chakra-ui/core";
import { LineItem } from "shopify-buy";
import { navigate } from "gatsby";
import { FaTrash } from "react-icons/all";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../../reducers/drawer/actions";

interface Props {
  item: LineItem;
  onUpdate: (
    lineItemId: string,
    quantity: number,
    onSuccess?: () => void,
    onError?: () => void
  ) => void;
  onRemove: (
    lineItemId: string,
    onSuccess?: () => void,
    onError?: () => void
  ) => void;
}

const DrawerItem = ({ item, onUpdate, onRemove }: Props) => {
  const [value, setValue] = useState<number>(item.quantity);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleNavigation = async () => {
    dispatch(closeDrawer());
    await navigate(`/products/${item.variant.product.handle}`);
  };

  const onSuccess = () => {
    toast({
      title: "Success.",
      description: "We've updated your cart.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  const onError = (e) => {
    toast({
      title: "Error.",
      description: e.message,
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleChange = (value: number) => {
    setValue(value);
    onUpdate(item.id, value, onSuccess, onError);
  };

  const handleRemove = () => {
    onRemove(item.id, onSuccess, onError);
  };

  const featuredImage = item.variant.image.src;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={3}>
      <Flex justify="space-between" align="center">
        <AspectRatio
          onClick={handleNavigation}
          cursor="pointer"
          maxW="100px"
          ratio={4 / 3}
          width="100%"
        >
          <Image
            src={featuredImage}
            alt={item.title}
            style={{
              objectFit: "contain",
            }}
          />
        </AspectRatio>
        <Box>
          <Box
            onClick={handleNavigation}
            mb={2}
            fontWeight="semibold"
            as="p"
            lineHeight="tight"
          >
            {item.title}
          </Box>
          <NumberInput
            onChange={(value) => handleChange(parseInt(value))}
            value={value}
            min={1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <IconButton
          size="md"
          fontSize="lg"
          ml={2}
          variant="primary"
          icon={<FaTrash />}
          onClick={handleRemove}
        />
      </Flex>
    </Box>
  );
};

export default DrawerItem;
