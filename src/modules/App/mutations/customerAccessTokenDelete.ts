import gql from "graphql-tag";

export const CUSTOMER_ACCESS_TOKEN_DELETE = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      userErrors {
        field
        message
      }
    }
  }
`;
