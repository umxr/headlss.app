import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import { SimpleGrid } from "@chakra-ui/core";

import Layout from "../modules/Layout";

import {
  File,
  ShopifyCollection,
  ShopifyCollectionEdge,
  Site,
} from "../graphqlTypes";
import CollectionsList from "../components/pages/Collections/CollectionsList";


interface Props {
  data: {
    site: Site;
    placeholderImage: File;
    allShopifyCollection: { __typename?: "ShopifyCollectionConnection" } & {
      edges: Array<
        { __typename?: "ShopifyCollectionEdge" } & {
          node: { __typename?: "ShopifyCollection" } & ShopifyCollection;
        }
      >;
    };
  };
  location: Location;
}

const Products = (props: Props) => {
  const {
    data: { site, placeholderImage, allShopifyCollection },
    location: { pathname },
  } = props;

  const canonical = `${site.siteMetadata?.siteUrl}${pathname}`;
  const title = "Shopify Collections Page";
  const description = "Shopify Collections Page";
  const handle = "collections";
  const image = placeholderImage.absolutePath;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta
          property="og:url"
          content={`${site.siteMetadata?.siteUrl}/${handle}`}
        />
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Headlss" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Statement" />
      </Helmet>
      <SimpleGrid
        p={6}
        columns={{
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
        }}
        spacing={6}
      >
        <CollectionsList collections={allShopifyCollection.edges} />
      </SimpleGrid>
    </Layout>
  );
};

export default Products;

export const query = graphql`
  query ProductsQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
    placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
      absolutePath
    }
    allShopifyCollection {
      edges {
        node {
          image {
            src
          }
          title
          handle
          id
        }
      }
    }
  }
`;
