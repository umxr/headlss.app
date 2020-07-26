import React from "react";
import { graphql } from "gatsby";
import { SimpleGrid } from "@chakra-ui/core";

import CollectionList from "../../components/CollectionList";
import CollectionEmpty from "../../components/CollectionEmpty";
import CollectionLayout from "../../components/CollectionLayout";

import { ShopifyCollection, Site } from "../../../../graphqlTypes";

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

const CollectionContainer = (props: Props) => {
  const {
    data: { site, shopifyCollection: collection, placeholderImage },
    location: { pathname },
  } = props;

  const canonical = `${site.siteMetadata?.siteUrl}${pathname}`;
  const title = collection.title ? collection.title : "Shopify Product Title";
  const description = collection.description
    ? collection.description
    : "Shopify Product Description";
  const handle = collection.handle;

  let image;
  if (collection.image && collection.image.src) {
    image = collection.image.src;
  } else {
    image = placeholderImage.absolutePath;
  }

  if (!collection.products) {
    return (
      <CollectionLayout
        title={title}
        description={description}
        canonical={canonical}
        url={`${site.siteMetadata?.siteUrl}/collections/${handle}`}
        image={image}
      >
        <CollectionEmpty />;
      </CollectionLayout>
    );
  }

  return (
    <CollectionLayout
      title={title}
      description={description}
      canonical={canonical}
      url={`${site.siteMetadata?.siteUrl}/collections/${handle}`}
      image={image}
    >
      <SimpleGrid
        p={6}
        columns={{
          sm: 2,
          md: 2,
          lg: 2,
          xl: 3,
        }}
        spacing={6}
      >
        <CollectionList products={collection.products} />
      </SimpleGrid>
    </CollectionLayout>
  );
};

export default CollectionContainer;

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
