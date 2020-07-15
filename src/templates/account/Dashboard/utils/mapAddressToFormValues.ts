import { Shopify_MailingAddress } from "../../../../graphqlTypes";

const mapAddressToFormValues = (address: Shopify_MailingAddress) => {
  const values = {
    ...address,
  };
  delete values.formatted;

  return values;
};

export default mapAddressToFormValues;
