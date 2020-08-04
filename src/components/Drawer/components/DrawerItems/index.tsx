import React from "react";
import { Stack } from "@chakra-ui/core";

import DrawerItem from "../DrawerItem";
import DrawerEmpty from "../DrawerEmpty";
import { LineItem } from "shopify-buy";

interface Props {
  items: LineItem[];
  onUpdate: ({
    lineItemId,
    quantity,
  }: {
    lineItemId: string;
    quantity: number;
  }) => void;
  onRemove: (lineItemId: string) => void;
}

const DrawerItems = ({ items, onUpdate, onRemove }: Props) => {
  if (!items || items.length === 0) {
    return <DrawerEmpty />;
  }
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
