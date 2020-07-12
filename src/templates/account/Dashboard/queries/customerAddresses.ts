import gql from "graphql-tag";

export const CUSTOMER_ADDRESS = gql`
  query customerAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      acceptsMarketing
      addresses(first: 10) {
        edges {
          node {
            id
            formatted(withCompany: true, withName: true)
          }
        }
      }
    }
  }
`;
