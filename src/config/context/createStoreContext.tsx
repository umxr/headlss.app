import { createContext } from "react";
import Client from "shopify-buy";

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
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
};

export const StoreContext = createContext(defaultStoreContext);
