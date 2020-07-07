import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { QueryImageSharpArgs, ShopifyProduct, Site } from "../graphqlTypes";
import Layout from "../modules/Layout";
import ProductForm from "../components/pages/Product/ProductForm";

interface ChildImageSharp {
  childImageSharp: QueryImageSharpArgs;
}

interface Props {
  data: {
    site: Site;
    shopifyProduct: ShopifyProduct;
    placeholderImage: ChildImageSharp;
  };
  location: Location;
}

const Product = (props: Props) => {
  const {
    data: { site, shopifyProduct: product, placeholderImage },
    location: { pathname },
  } = props;

  const canonical = `${site.siteMetadata?.siteUrl}${pathname}`;
  const title = product.title ? product.title : "Shopify Product Title";
  const description = product.description
    ? product.description
    : "Shopify Product Description";
  const handle = product.handle;

  // TODO: Create a better way to handle deeply nested property checking
  // @ts-ignore
  const image = product.images[0].localFile.url
    ? product.images[0].localFile.url
    : placeholderImage.childImageSharp.fluid?.src;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta
          property="og:url"
          content={`${site.siteMetadata?.siteUrl}/product/${handle}`}
        />
        <meta property="og:locale" content="en" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Headlss" />
        <meta property="og:description" content={description} />
        // @ts-ignore This can be removed once "TODO" Above is fixed
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@Statement" />
      </Helmet>
      <ProductForm id={product.id} variants={product.variants} />
    </Layout>
  );
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
      childImageSharp {
        fluid(maxWidth: 480, maxHeight: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    shopifyProduct(handle: { eq: $handle }) {
      shopifyId
      id
      title
      handle
      description
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
      }
      images {
        id
        altText
        localFile {
          url
          childImageSharp {
            fluid(maxWidth: 480, maxHeight: 480) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
