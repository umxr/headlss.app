import React from "react";
import Client  from "shopify-buy";

const client = Client.buildClient({
  domain: "headlss.myshopify.com",
  storefrontAccessToken: "2f0365554792e450a365f05918feb654",
});

export const defaultStoreContext = {
  client,
  isCartOpen: false,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  addVariantToCart: (variantId: string, quantity: number) => {},
  removeLineItem: (
      client: ShopifyBuy.Client,
      checkoutId: string,
      lineItemId: string | number
  ) => {},
  updateLineItem: (
      client: ShopifyBuy.Client,
      checkoutId: string,
      lineItemId: string | number,
      quantity: number
  ) => {},
};

export const StoreContext = React.createContext(defaultStoreContext);
