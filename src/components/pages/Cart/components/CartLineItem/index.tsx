import React, { useState } from "react";
import { LineItem } from "shopify-buy";

interface Props {
  item: LineItem;
  handleRemove: (itemId: React.SyntheticEvent) => void;
  updateQuantity: (itemId: string | number) => void;
  setCartLoading: (bool: boolean) => void;
  loading: boolean;
}

const CartLineItem = ({
  item,
  loading,
  updateQuantity,
  setCartLoading,
  handleRemove,
}: Props) => {
  const [quantity, setQuantity] = useState(1);

  if (item.quantity !== quantity && !loading) {
    setQuantity(item.quantity);
  }

  const handleInputChange = (event: React.SyntheticEvent) => {
    if (loading) {
      return;
    }

    const value = event.target.value;

    // Make sure the quantity is always at least 1.
    const safeValue = Math.max(Number(value), 0);

    // No need to update if the value hasn’t updated.
    if (value === quantity) {
      return;
    }

    // If the field is empty, update the state but don’t do anything else.
    if (value === "") {
      setQuantity(value);
      return;
    }

    // Otherwise, trigger the loading state and set the quantity in state.
    setCartLoading(true);
    setQuantity(safeValue);

    // If the quantity is set to 0, remove the item.
    if (safeValue === 0) {
      handleRemove(event);
      return;
    }

    // If we get here, update the quantity.
    updateQuantity(safeValue);
  };

  const handleRemoveItem = (event: React.SyntheticEvent) => {
    setCartLoading(true);
    handleRemove(event);
  };

  return (
    <div>
      <p>{item.title}</p>
      <p>
        {item.variant.title}, ${item.variant.price}
      </p>

      <input
        aria-label="Quantity"
        id={`quantity_${item.id.substring(58, 64)}`}
        type="number"
        name="quantity"
        inputMode="numeric"
        min="1"
        step="1"
        onChange={(event) => handleInputChange(event)}
        onBlur={() => setQuantity(item.quantity)}
        value={quantity}
      />
      <button onClick={handleRemoveItem}>Remove</button>
      <hr />
    </div>
  );
};

export default CartLineItem;
