import React from "react";
import { LineItem } from "shopify-buy";
import CartLineItem from "../CartLineItem";

interface Props {
  items: LineItem[];
  handleRemove: (itemId: string | number) => void;
  updateQuantity: (itemId: string | number) => void;
  setCartLoading: (bool: boolean) => void;
  loading: boolean;
}

const CartLineItems = ({
  items,
  handleRemove,
  loading,
  setCartLoading,
  updateQuantity,
}: Props) => {
  return (
    <div>
      {items.map((item: LineItem) => {
        return (
          <CartLineItem
            key={item.id}
            item={item}
            handleRemove={handleRemove(item.id)}
            updateQuantity={updateQuantity(item.id)}
            setCartLoading={setCartLoading}
            loading={loading}
          />
        );
      })}
    </div>
  );
};

export default CartLineItems;
