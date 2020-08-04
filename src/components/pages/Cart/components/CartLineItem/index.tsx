import React, { ChangeEvent, useCallback, useState } from "react";
import { LineItem } from "shopify-buy";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/core";
import { formatMoney } from "../../../../../utils/formatMoney";

interface Props {
  item: LineItem;
  onRemove: ({ lineItemId }: { lineItemId: string }) => void;
  onUpdate: ({
    lineItemId,
    quantity,
  }: {
    lineItemId: string;
    quantity: number;
  }) => void;
  setCartLoading: (bool: boolean) => void;
  loading: boolean;
}

const CartLineItem = ({
  item,
  loading,
  onUpdate,
  setCartLoading,
  onRemove,
}: Props) => {
  const [value, setValue] = useState<number>(item.quantity);

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
    setCartLoading(true);
    onRemove({ lineItemId: String(item.id) });
  };

  const price = formatMoney(Number(item.attrs.variant.price) * 100);

  return (
    <div>
      <p>{item.title}</p>
      <p>{price}</p>
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
      <button onClick={handleRemove}>Remove</button>
      <hr />
    </div>
  );
};

export default CartLineItem;
