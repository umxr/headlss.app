import React from "react";
import CartLineItem from "../CartLineItem";
import { LineItem } from "shopify-buy";

interface Props {
  items: LineItem[];
  onRemove: ({ lineItemId }: { lineItemId: string }) => void;
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
  setCartLoading: (bool: boolean) => void;
  loading: boolean;
}

const CartLineItems = ({
  items,
  onRemove,
  loading,
  setCartLoading,
  onUpdate,
}: Props) => {
  return (
    <div>
      {items &&
        items.map((item: LineItem) => {
          if (!item) return;
          return (
            <CartLineItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdate={onUpdate}
              setCartLoading={setCartLoading}
              loading={loading}
            />
          );
        })}
    </div>
  );
};

export default CartLineItems;
