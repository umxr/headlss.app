import React, { useCallback, useState } from "react";
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
import { navigate } from "gatsby";
import { FaTrash } from "react-icons/all";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../../reducers/drawer/actions";
import { LineItem } from "shopify-buy";

interface Props {
  item: LineItem;
  onUpdate: (
    {
      lineItemId,
      quantity,
    }: {
      lineItemId: string;
      quantity: number;
    },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => void;
  onRemove: (
    lineItemId: string,
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => void;
}

const DrawerItem = ({ item, onUpdate, onRemove }: Props) => {
  const [value, setValue] = useState<number>(item.quantity);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleNavigation = async () => {
    if (!item.attrs.variant) return;
    dispatch(closeDrawer());
    await navigate(`/products/${item.attrs.variant.attrs.product.handle}`);
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

  const onError = (e?: any) => {
    toast({
      title: "Error.",
      description: e.message,
      status: "error",
      duration: 2500,
      isClosable: true,
    });
  };

  const handleChange = useCallback(
    (quantity: number) => {
      const lineItemId = String(item.id);
      setValue(quantity);
      onUpdate(
        {
          lineItemId,
          quantity,
        },
        onSuccess,
        onError
      );
    },
    [value]
  );

  const handleRemove = () => {
    onRemove(String(item.id), onSuccess, onError);
  };

  const featuredImage = item.attrs.variant.image.src;

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
            __css={{}}
            onChange={(value) => handleChange(parseInt(value))}
            value={value}
            min={1}
            focusInputOnChange={false}
          >
            <NumberInputField type="number" __css={{}} />
            <NumberInputStepper __css={{}}>
              <NumberIncrementStepper __css={{}} />
              <NumberDecrementStepper __css={{}} />
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
          aria-label={`Remove Product`}
        />
      </Flex>
    </Box>
  );
};

export default DrawerItem;
