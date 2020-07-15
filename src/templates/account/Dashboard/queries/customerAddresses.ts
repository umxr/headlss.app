import gql from "graphql-tag";

export const CUSTOMER_ADDRESSES = gql`
  query customerAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(first: 10) {
        edges {
          node {
            id
            formatted(withCompany: true, withName: true)
          }
        }
      }
      defaultAddress {
        id
        formatted(withCompany: true, withName: true)
      }
    }
  }
`;
