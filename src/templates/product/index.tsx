import React from "react";
import { graphql } from "gatsby";

import ProductContainer from "./containers/ProductContainer";

import { ShopifyProduct, Site } from "../../graphqlTypes";

interface Image {
  absolutePath: string;
}

interface Props {
  data: {
    site: Site;
    shopifyProduct: ShopifyProduct;
    placeholderImage: Image;
  };
  location: Location;
}

const Product = ({ data, location }: Props) => {
  return <ProductContainer data={data} location={location} />;
};

export default Product;

export const query = graphql`
  query ProductQuery($handle: String!) {
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
    shopifyProduct(handle: { eq: $handle }) {
      shopifyId
      id
      title
      handle
      descriptionHtml
      productType
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants {
        shopifyId
        title
        price
        availableForSale
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        shopifyId
      }
      images {
        altText
        originalSrc
      }
    }
  }
`;
