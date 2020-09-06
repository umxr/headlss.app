import moment from "moment";

export const checkExpiry = (expiry: string): boolean => {
  if (!expiry) return false;
  const expiryDate = moment(expiry);
  return expiryDate.isAfter(moment());
};
