import React from "react";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import fetch from "isomorphic-fetch";

const httpLink = createHttpLink({
  uri: "https://headlss.myshopify.com/api/graphql",
  fetch,
});

const middlewareLink = setContext(() => ({
  headers: {
    "X-Shopify-Storefront-Access-Token": "2f0365554792e450a365f05918feb654",
  },
}));

export const apolloClient = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

interface Props {
  children: React.ReactNode;
}

const CustomerProvider = ({ children }: Props) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default CustomerProvider;
