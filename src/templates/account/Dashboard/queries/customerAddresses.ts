import gql from "graphql-tag";

export const CUSTOMER_ADDRESSES = gql`
  query customerAddresses($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      addresses(first: 10) {
        edges {
          node {
            id
            formatted(withCompany: true, withName: true)
            address1
            address2
            city
            company
            country
            firstName
            lastName
            zip
          }
        }
      }
      defaultAddress {
        id
        formatted(withCompany: true, withName: true)
        address1
        address2
        city
        company
        country
        firstName
        lastName
        zip
      }
    }
  }
`;
