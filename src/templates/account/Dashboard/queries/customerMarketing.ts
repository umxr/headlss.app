import gql from "graphql-tag";

export const CUSTOMER_MARKETING = gql`
  query customerMarketing($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      acceptsMarketing
    }
  }
`;
