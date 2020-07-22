import { Shopify_MailingAddress } from "../../../../graphqlTypes";

const mapAddressToFormState = (address: Shopify_MailingAddress) => {
  const values = {
    ...address,
  };

  delete address.id;
  delete address.__typename;

  return values;
};

export default mapAddressToFormState;
