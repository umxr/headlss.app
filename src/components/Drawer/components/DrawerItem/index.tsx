import React, { useCallback, useState } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/core";
import { navigate } from "gatsby";
import { FaTrash } from "react-icons/all";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../../../../reducers/drawer/actions";
import { LineItem } from "shopify-buy";
import { linkResolver, Templates } from "../../../../utils/linkResolver";

interface Props {
  item: LineItem;
  onUpdate: ({
    lineItemId,
    quantity,
  }: {
    lineItemId: string;
    quantity: number;
  }) => void;
  onRemove: (lineItemId: string) => void;
}

const DrawerItem = ({ item, onUpdate, onRemove }: Props) => {
  const [value, setValue] = useState<number>(item.quantity);
  const dispatch = useDispatch();

  const handleNavigation = async () => {
    if (!item.attrs.variant) return;
    dispatch(closeDrawer());
    await navigate(
      linkResolver(Templates.PRODUCTS, item.attrs.variant.attrs.product.handle)
    );
  };

  const handleChange = useCallback(
    (quantity: number) => {
      const lineItemId = String(item.id);
      setValue(quantity);
      onUpdate({
        lineItemId,
        quantity,
      });
    },
    [value]
  );

  const handleRemove = () => {
    onRemove(String(item.id));
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
