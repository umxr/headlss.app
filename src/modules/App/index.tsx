import React, { Component } from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/core";
import moment from "moment";
import gql from "graphql-tag";

import {
  StoreContext,
  defaultStoreContext,
  IStoreContext,
} from "../../config/context/createStoreContext";
import {
  CustomerContext,
  defaultCustomerContext,
  ICustomerContext,
} from "../../config/context/createCustomerContext";

import CustomerProvider, {
  apolloClient,
} from "../../config/providers/createCustomerProvider";

import theme from "../../theme";
import { Cart } from "shopify-buy";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  showErrorNotification,
  showSuccessNotification,
} from "../../reducers/notification/actions";
import {CHECKOUT_CUSTOMER_DISASSOCIATE_V2} from "./mutations/checkoutCustomerDisassociateV2";
import {CUSTOMER_ACCESS_TOKEN_DELETE} from "./mutations/customerAccessTokenDelete";

interface State {
  customer: ICustomerContext;
  store: IStoreContext;
}

type StateProps = {
  showSuccessNotification: (message: string) => void;
  showErrorNotification: (message: string) => void;
};

type OwnProps = {
  children: React.ReactNode;
};

type Props = StateProps & OwnProps;

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
            mutation: CHECKOUT_CUSTOMER_DISASSOCIATE_V2,
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
                    mutation: CUSTOMER_ACCESS_TOKEN_DELETE,
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
      logout: (callback?: () => void | Promise<void>) => {
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
      addVariantToCart: ({
        variantId,
        quantity,
      }: {
        variantId: string;
        quantity: number;
      }) => {
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
        const { showErrorNotification, showSuccessNotification } = this.props;
        const checkoutId = checkout?.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(String(quantity), 10) },
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then((checkout: Cart) => {
            this.setState(
              (state) => ({
                store: {
                  ...state.store,
                  checkout,
                  adding: false,
                },
              }),
              () => {
                showSuccessNotification("Added to cart.");
              }
            );
          })
          .catch((e) => {
            console.log(e);
            showErrorNotification(e.message);
          });
      },
      removeLineItem: ({ lineItemId }: { lineItemId: string }) => {
        const { showSuccessNotification, showErrorNotification } = this.props;
        const { checkout, client } = this.state.store;
        const checkoutId = checkout?.id;

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
                showSuccessNotification("We've updated your cart");
              }
            );
          })
          .catch((e) => {
            showErrorNotification(e.message);
          });
      },
      updateLineItem: ({
        lineItemId,
        quantity,
      }: {
        lineItemId: string;
        quantity: number;
      }) => {
        const { showErrorNotification, showSuccessNotification } = this.props;
        const { checkout, client } = this.state.store;
        const checkoutId = checkout?.id;
        const lineItemsToUpdate = [{ id: lineItemId, quantity }];

        return (
          client.checkout
            // @ts-ignore
            .updateLineItems(checkoutId, lineItemsToUpdate)
            .then((checkout: Cart) => {
              this.setState(
                (state) => ({
                  store: {
                    ...state.store,
                    checkout,
                  },
                }),
                () => {
                  showSuccessNotification("We've updated your cart.");
                }
              );
            })
            .catch((e: any) => {
              console.log(e);
              showErrorNotification(e.message);
            })
        );
      },
    },
  };

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== "undefined";
    const existingCheckoutID = isBrowser
      ? localStorage.getItem("shopify_checkout_id")
      : null;

    const setCheckoutInState = (checkout: Cart) => {
      if (isBrowser) {
        localStorage.setItem("shopify_checkout_id", String(checkout.id));
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
        localStorage.setItem("shopify_checkout_id", "");
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

  async componentDidMount() {
    // Make sure we have a Shopify checkout created for cart management.
    await this.initializeCheckout();
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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showSuccessNotification: (message: string) =>
    dispatch(
      showSuccessNotification({
        message,
      })
    ),
  showErrorNotification: (message: string) =>
    dispatch(
      showErrorNotification({
        message,
      })
    ),
});

export default connect(null, mapDispatchToProps)(App);
