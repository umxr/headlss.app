export enum Templates {
  "COLLECTIONS" = "COLLECTIONS",
  "PRODUCTS" = "PRODUCTS",
  "CART" = "CART",
  "ROOT" = "ROOT",
  "NOT_FOUND" = "NOT_FOUND",
  "PRODUCT" = "PRODUCT",
  "ACCOUNT_LOGIN" = "ACCOUNT_LOGIN",
  "ACCOUNT_REGISTER" = "ACCOUNT_REGISTER",
  "ACCOUNT_DASHBOARD" = "ACCOUNT_DASHBOARD",
  "ACCOUNT_FORGOT_PASSWORD" = "ACCOUNT_FORGOT_PASSWORD",
  "ACCOUNT_RESET_PASSWORD" = "ACCOUNT_RESET_PASSWORD",
}

export const ROUTES = {
  [Templates.COLLECTIONS]: "/collections",
  [Templates.PRODUCTS]: "/products",
  [Templates.CART]: "/cart",
  [Templates.ROOT]: "/",
  [Templates.NOT_FOUND]: "/404",
  [Templates.PRODUCT]: "/product",
  [Templates.ACCOUNT_LOGIN]: "/account/login",
  [Templates.ACCOUNT_REGISTER]: "/account/register",
  [Templates.ACCOUNT_DASHBOARD]: "/account/dashboard",
  [Templates.ACCOUNT_FORGOT_PASSWORD]: "/account/forgot",
  [Templates.ACCOUNT_RESET_PASSWORD]: "/account/reset",
};

export const linkResolver = (templates: Templates, path?: string) => {
  switch (templates) {
    case Templates.COLLECTIONS:
      if (!path) return ROUTES[Templates.COLLECTIONS];
      return `${ROUTES[Templates.COLLECTIONS]}/${path}`;
    case Templates.PRODUCTS:
      return ROUTES[Templates.PRODUCTS];
    case Templates.CART:
      return ROUTES[Templates.CART];
    case Templates.ROOT:
      return ROUTES[Templates.ROOT];
    case Templates.NOT_FOUND:
      return ROUTES[Templates.NOT_FOUND];
    case Templates.PRODUCT:
      if (!path) return ROUTES[Templates.PRODUCTS];
      return `${ROUTES[Templates.PRODUCT]}/${path}`;
    case Templates.ACCOUNT_LOGIN:
      return ROUTES[Templates.ACCOUNT_LOGIN];
    case Templates.ACCOUNT_REGISTER:
      return ROUTES[Templates.ACCOUNT_REGISTER];
    case Templates.ACCOUNT_DASHBOARD:
      return ROUTES[Templates.ACCOUNT_DASHBOARD];
    case Templates.ACCOUNT_FORGOT_PASSWORD:
      return ROUTES[Templates.ACCOUNT_FORGOT_PASSWORD];
    case Templates.ACCOUNT_RESET_PASSWORD:
      return ROUTES[Templates.ACCOUNT_RESET_PASSWORD];
    default:
      return ROUTES[Templates.ROOT];
  }
};
