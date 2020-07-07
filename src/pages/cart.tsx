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
          {({ client, checkout, removeLineItem, updateLineItem, adding }) => {
            const setCartLoading = (bool: boolean) =>
              this.setState({ loading: bool });

            const handleRemove = (itemID: string | number) => async (
              event: React.SyntheticEvent
            ) => {
              event.preventDefault();
              await removeLineItem(client, checkout.id, itemID);
              setCartLoading(false);
            };

            const handleQuantityChange = (
              lineItemID: string | number
            ) => async (quantity: number) => {
              if (!quantity) {
                return;
              }
              await updateLineItem(client, checkout.id, lineItemID, quantity);
              setCartLoading(false);
            };

            const itemsInCart = checkout.lineItems.reduce(
              (total, item) => total + item.quantity,
              0
            );
            return (
              <CartLineItems
                items={checkout.lineItems}
                handleRemove={handleRemove}
                updateQuantity={handleQuantityChange}
                setCartLoading={setCartLoading}
                loading={this.state.loading}
              />
            );
          }}
        </StoreContext.Consumer>
      </Layout>
    );
  }
}

export default Cart;
