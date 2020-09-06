import gql from "graphql-tag";

export const CHECKOUT_CUSTOMER_DISASSOCIATE_V2 = gql`
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
`;
