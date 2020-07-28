import React from "react";
import { graphql } from "gatsby";
import { SimpleGrid } from "@chakra-ui/core";

import CollectionList from "../../components/CollectionList";
import CollectionEmpty from "../../components/CollectionEmpty";
import CollectionLayout from "../../components/CollectionLayout";

import { ShopifyCollection, Site } from "../../../../graphqlTypes";
import CollectionContainer from "./containers/CollectionContainer";

interface Image {
  absolutePath: string;
}

interface Props {
  data: {
    site: Site;
    shopifyCollection: ShopifyCollection;
    placeholderImage: Image;
  };
  location: Location;
}

const Collection = ({ data, location }: Props) => {
  return <CollectionContainer data={data} location={location} />;
};

export default Collection;

export const query = graphql`
  query CollectionQuery($handle: String!) {
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
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
        id
        handle
        title
        images {
          originalSrc
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
        variants {
          shopifyId
        }
      }
      image {
        src
      }
    }
  }
`;
