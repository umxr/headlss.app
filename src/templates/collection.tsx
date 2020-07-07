import React from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import {
  Maybe,
  QueryImageSharpArgs,
  ShopifyCollection,
  ShopifyProduct,
  Site,
} from "../graphqlTypes";
import Layout from "../modules/Layout";

interface ChildImageSharp {
  childImageSharp: QueryImageSharpArgs;
}

interface Props {
  data: {
    site: Site;
    shopifyCollection: ShopifyCollection;
    placeholderImage: ChildImageSharp;
  };
  location: Location;
}

const Collection = (props: Props) => {
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

  // TODO: Create a better way to handle deeply nested property checking
  // @ts-ignore
  const image = collection.image.localFile.url
    ? collection.image.localFile.url
    : placeholderImage.childImageSharp.fluid?.src;

  if (!collection.products) {
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
        <div>Empty Collection</div>
      </Layout>
    );
  }

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
      <ul>
        {collection.products.map((product: Maybe<ShopifyProduct>) => {
          if (!product) return null;
          return (
            <li key={product.id}>
              <Link to={`/products/${product.handle}`}>{product.title}</Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
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
      childImageSharp {
        fluid(maxWidth: 480, maxHeight: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    shopifyCollection(handle: { eq: $handle }) {
      handle
      description
      title
      products {
        id
        handle
        title
        description
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
      }
      image {
        id
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
