import gql from "graphql-tag";

export const CUSTOMER_DEFUALT_ADDRESS_UPDATE = gql`
  mutation customerDefaultAddressUpdate(
    $customerAccessToken: String!
    $addressId: ID!
  ) {
    customerDefaultAddressUpdate(
      customerAccessToken: $customerAccessToken
      addressId: $addressId
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
