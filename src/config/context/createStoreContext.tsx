import { createContext } from "react";
import Client, {
  Cart,
  Client as IClient,
  Item as ILine,
  LineItem as ILineItem,
  Product as IProduct,
} from "shopify-buy";

const client = Client.buildClient({
  domain: "headlss.myshopify.com",
  storefrontAccessToken: "2f0365554792e450a365f05918feb654",
});

export type Item = ILine & ILineItem;

export interface LineItem extends Item {
  product: IProduct;
}

export interface ICart extends Cart {
  lineItems: LineItem[];
}

export interface IStoreContext {
  adding: boolean;
  client: IClient | null;
  checkout: Cart | {
    id: string;
    lineItems: ILineItem[];
    checkoutUrl: string;
  };
  addVariantToCart: (
    {
      variantId,
      quantity,
    }: {
      variantId: string;
      quantity: number;
    },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => void;
  removeLineItem: (
    { lineItemId }: { lineItemId: string },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => void;
  updateLineItem: (
    lineItemId: { lineItemId: string; quantity: number },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => void;
}

export const defaultStoreContext = {
  adding: false,
  client,
  checkout: {
    id: "",
    lineItems: [],
    checkoutUrl: "",
  },
  addVariantToCart: (
    {
      variantId,
      quantity,
    }: {
      variantId: string;
      quantity: number;
    },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => {},
  removeLineItem: (
    { lineItemId }: { lineItemId: string },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => {},
  updateLineItem: (
    lineItemId: { lineItemId: string; quantity: number },
    onSuccess?: () => void,
    onError?: (e?: any) => void
  ) => {},
};

export const StoreContext = createContext<IStoreContext>(defaultStoreContext);
