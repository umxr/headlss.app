import gql from "graphql-tag";

export const ASSOCIATE_CUSTOMER_CHECKOUT = gql`
  mutation checkoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;
