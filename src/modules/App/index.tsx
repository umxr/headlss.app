import React, { Component } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import moment from "moment";
import gql from "graphql-tag";
import { Client } from "shopify-buy";

import {
  StoreContext,
  defaultStoreContext,
} from "../../config/context/createStoreContext";
import {
  CustomerContext,
  defaultCustomerContext,
} from "../../config/context/createCustomerContext";

import CustomerProvider, {
  apolloClient,
} from "../../config/providers/createCustomerProvider";

import theme from "../../theme";

interface State {}

interface Props {
  children: React.ReactNode;
}

class App extends Component<Props, State> {
  state = {
    customer: {
      ...defaultCustomerContext,
      getAccessToken: () => {
        const customerAccessToken = localStorage.getItem(
          "shopify_customer_token"
        );
        this.setState((state) => {
          return {
            customer: {
              ...state.customer,
              customerAccessToken,
              authenticated: !!customerAccessToken,
            },
          };
        });
      },
      deleteExpiry: () => {
        const { expiry } = this.state.customer;
        if (expiry) {
          this.setState((state) => {
            return {
              customer: {
                ...state.customer,
                expiry: null,
              },
            };
          });
          localStorage.removeItem("shopify_customer_expiry");
        }
      },
      deleteAccessToken: () => {
        const { customerAccessToken } = this.state.customer;
        if (customerAccessToken) {
          this.setState((state) => {
            return {
              customer: {
                ...state.customer,
                customerAccessToken: null,
                authenticated: false,
              },
            };
          });
          localStorage.removeItem("shopify_customer_token");
        }
      },
      checkExpiry: () => {
        const { expiry } = this.state.customer;
        if (!expiry) return false;
        const expiryDate = moment(expiry);
        return expiryDate.isAfter(moment());
      },
      getExpiry: () => {
        const expiry = localStorage.getItem("shopify_customer_expiry");
        this.setState(
          (state) => {
            return {
              customer: {
                ...state.customer,
                expiry,
              },
            };
          },
          () => {
            const valid = this.state.customer.checkExpiry();
            if (!valid) {
              this.state.customer.deleteAccessToken();
              this.state.customer.deleteExpiry();
            }
          }
        );
      },
      setAccessToken: (customerAccessToken: string) => {
        if (!customerAccessToken) return;
        this.setState((state) => {
          return {
            customer: {
              ...state.customer,
              customerAccessToken,
              authenticated: true,
            },
          };
        });
        localStorage.setItem("shopify_customer_token", customerAccessToken);
      },
      setExpiry: (expiry: string) => {
        if (!expiry) return;
        this.setState((state) => {
          return {
            customer: {
              ...state.customer,
              expiry,
            },
          };
        });
        localStorage.setItem("shopify_customer_expiry", expiry);
      },
      deleteCustomerInstance: () => {
        const checkoutId = localStorage.getItem("shopify_checkout_id");
        const customerAccessToken = localStorage.getItem(
          "shopify_customer_token"
        );
        apolloClient
          .mutate({
            mutation: gql`
              mutation checkoutCustomerDisassociateV2($checkoutId: ID!) {
                checkoutCustomerDisassociateV2(checkoutId: $checkoutId) {
                  checkout {
                    id
                  }
                  checkoutUserErrors {
                    code
                    field
                    message
                  }
                }
              }
            `,
            variables: { checkoutId },
          })
          .then(({ data }) => {
            if (
              data.checkoutCustomerDisassociateV2.checkoutUserErrors.length ===
              0
            ) {
              if (customerAccessToken) {
                apolloClient
                  .mutate({
                    mutation: gql`
                      mutation customerAccessTokenDelete(
                        $customerAccessToken: String!
                      ) {
                        customerAccessTokenDelete(
                          customerAccessToken: $customerAccessToken
                        ) {
                          userErrors {
                            field
                            message
                          }
                        }
                      }
                    `,
                    variables: { customerAccessToken },
                  })
                  .catch((error) => {
                    console.log("customerAccessTokenDelete");
                    console.error(error);
                  });
              }
            }
          })
          .catch((error) => {
            console.log("checkoutCustomerDisassociateV2");
            console.error(error);
          });
      },
      logout: (callback?: () => void) => {
        this.setState(
          (state) => {
            return {
              customer: {
                ...state.customer,
                customerAccessToken: null,
                expiry: null,
                authenticated: false,
              },
            };
          },
          () => {
            localStorage.removeItem("shopify_customer_token");
            localStorage.removeItem("shopify_customer_expiry");
            this.state.customer.deleteCustomerInstance();
            if (callback) {
              callback();
            }
          }
        );
      },
    },
    store: {
      ...defaultStoreContext,
      addVariantToCart: (
        {
          variantId,
          quantity,
        }: {
          variantId: string;
          quantity: number;
        },
        onSuccess?: () => void,
        onError?: () => void
      ) => {
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
          { variantId, quantity: parseInt(String(quantity), 10) },
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then((checkout) => {
            this.setState(
              (state) => ({
                store: {
                  ...state.store,
                  checkout,
                  adding: false,
                },
              }),
              () => {
                if (onSuccess) {
                  onSuccess();
                }
              }
            );
          })
          .catch((e) => {
            console.log(e);
            if (onError) {
              onError(e);
            }
          });
      },
      removeLineItem: (
        { lineItemId }: { lineItemId: string },
        onSuccess?: () => void,
        onError?: () => void
      ) => {
        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;

        return client.checkout
          .removeLineItems(checkoutId, [lineItemId])
          .then((res) => {
            this.setState(
              (state) => ({
                store: {
                  ...state.store,
                  checkout: res,
                },
              }),
              () => {
                if (onSuccess) {
                  onSuccess();
                }
              }
            );
          })
          .catch((e) => {
            if (onError) {
              onError(e);
            }
          });
      },
      updateLineItem: (
        {
          lineItemId,
          quantity,
        }: {
          lineItemId: string;
          quantity: number;
        },
        onSuccess?: () => void,
        onError?: () => void
      ) => {
        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;

        const lineItemsToUpdate = [{ id: lineItemId, quantity }];

        return client.checkout
          .updateLineItems(checkoutId, lineItemsToUpdate)
          .then((res) => {
            this.setState(
              (state) => ({
                store: {
                  ...state.store,
                  checkout: res,
                },
              }),
              () => {
                if (onSuccess) {
                  onSuccess();
                }
              }
            );
          })
          .catch((e) => {
            console.log(e);
            if (onError) {
              onError();
            }
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
    const fetchCheckout = (id: string) =>
      this.state.store.client.checkout.fetch(id);

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

  initializeCustomer() {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      this.state.customer.getAccessToken();
      this.state.customer.getExpiry();
    }
  }

  componentDidMount() {
    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();
    this.initializeCustomer();
  }

  render() {
    const { children } = this.props;
    return (
      <ChakraProvider theme={theme}>
        <CSSReset />
        <StoreContext.Provider value={this.state.store}>
          <CustomerContext.Provider value={this.state.customer}>
            <CustomerProvider>{children}</CustomerProvider>
          </CustomerContext.Provider>
        </StoreContext.Provider>
      </ChakraProvider>
    );
  }
}

export default App;
