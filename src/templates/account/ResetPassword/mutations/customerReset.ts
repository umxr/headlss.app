import gql from "graphql-tag";

export const CUSTOMER_RESET = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
