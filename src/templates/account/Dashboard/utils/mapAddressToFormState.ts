import { Shopify_MailingAddress } from "../../../../graphqlTypes";
import { FormValues } from "../components/EditAddressForm/types";

const mapAddressToFormState = (
  address: Shopify_MailingAddress,
  initialFormState: FormValues
) => {
  return Object.keys(initialFormState).reduce((acc, key: string) => {
    return {
      ...acc,
      // @ts-ignore
      [key]: address[key],
    };
  }, initialFormState);
};

export default mapAddressToFormState;
