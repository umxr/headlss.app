import React, { Component } from "react";
import CartLineItems from "../components/pages/Cart/components/CartLineItems";
import { StoreContext } from "../config/context/createStoreContext";
import Layout from "../modules/Layout";

interface State {
  loading: boolean;
}

class Cart extends Component<{}, State> {
  state = {
    loading: false,
  };
  render() {
    return (
      <Layout>
        <StoreContext.Consumer>
          {({ checkout, removeLineItem, updateLineItem }) => {
            const setCartLoading = (bool: boolean) =>
              this.setState({ loading: bool });

            const handleRemove = ({ lineItemId }: { lineItemId: string }) => {
              removeLineItem({
                lineItemId,
              });
            };

            const updateItem = async (
              {
                lineItemId,
                quantity,
              }: {
                lineItemId: string;
                quantity: number;
              },
              onSuccess?: () => void,
              onError?: (e?: any) => void
            ) => {
              await updateLineItem(
                {
                  lineItemId,
                  quantity,
                },
                onSuccess,
                onError
              );
            };

            if (checkout) {
              return (
                <CartLineItems
                  items={checkout.lineItems}
                  onRemove={handleRemove}
                  onUpdate={updateItem}
                  setCartLoading={setCartLoading}
                  loading={this.state.loading}
                />
              );
            }
          }}
        </StoreContext.Consumer>
      </Layout>
    );
  }
}

export default Cart;
