import React, { Component } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {
  StoreContext,
  defaultStoreContext,
} from "../../config/context/createStoreContext";

class Layout extends Component {
  state = {
    store: {
      ...defaultStoreContext,
      addVariantToCart: (variantId, quantity) => {
        if (variantId === "" || !quantity) {
          console.error("Both a size and quantity are required.");
          return;
        }

        this.setState((state) => ({
          store: {
            ...state.store,
            adding: true,
          },
        }));

        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ];

        console.log(lineItemsToUpdate);

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then((checkout) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout,
                adding: false,
              },
            }));
          });
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then((res) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout: res,
              },
            }));
          });
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) },
        ];

        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then((res) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout: res,
              },
            }));
          });
      },
    },
  };

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== "undefined";
    const existingCheckoutID = isBrowser
      ? localStorage.getItem("shopify_checkout_id")
      : null;

    const setCheckoutInState = (checkout) => {
      if (isBrowser) {
        localStorage.setItem("shopify_checkout_id", checkout.id);
      }

      this.setState((state) => ({
        store: {
          ...state.store,
          checkout,
        },
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = (id) => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID && existingCheckoutID !== "null") {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }
      } catch (e) {
        localStorage.setItem("shopify_checkout_id", null);
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }

  componentDidMount() {
    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();
  }

  render() {
    const { children } = this.props;
    return (
      <StoreContext.Provider value={this.state.store}>
        <Header />
        <main>{children}</main>
        <Footer />
      </StoreContext.Provider>
    );
  }
}

export default Layout;
