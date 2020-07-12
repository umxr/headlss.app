import gql from "graphql-tag";

export const CUSTOMER_REQUEST = gql`
  query customerRequest($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      acceptsMarketing
      email
      firstName
      lastName
      id
      phone
      displayName
    }
  }
`;
