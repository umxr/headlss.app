import gql from "graphql-tag";

export const CUSTOMER_UPDATE = gql`
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
    ) {
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


// acceptsMarketing (Boolean)
// Indicates whether the customer has consented to be sent marketing material via email.
//
// email (String)
// The customer’s email.
//
// firstName (String)
// The customer’s first name.
//
// lastName (String)
// The customer’s last name.
//
// password (String)
// The login password used by the customer.
//
// phone (String)
//     A unique phone number for the customer.
