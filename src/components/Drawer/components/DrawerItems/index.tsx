import React from "react";
import { LineItem } from "shopify-buy";
import { Stack } from "@chakra-ui/core";

import DrawerItem from "../DrawerItem";

interface Props {
  items: LineItem[];
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

const DrawerItems = ({ items, onUpdate, onRemove }: Props) => {
  return (
    <Stack spacing={6} height="100%">
      {items.map((item: LineItem) => {
        return (
          <DrawerItem
            item={item}
            key={item.id}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        );
      })}
    </Stack>
  );
};

export default DrawerItems;
