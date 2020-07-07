import React from "react";
import { graphql, Link } from "gatsby";
import {
  QueryImageSharpArgs,
  ShopifyCollection,
  ShopifyCollectionEdge,
  Site,
} from "../graphqlTypes";
import Layout from "../modules/Layout";
import { Helmet } from "react-helmet";

interface ChildImageSharp {
  childImageSharp: QueryImageSharpArgs;
}

interface Props {
  data: {
    site: Site;
    placeholderImage: ChildImageSharp;
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
  const image = placeholderImage.childImageSharp.fluid?.src;

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
      <ul>
        {allShopifyCollection.edges.map((edge: ShopifyCollectionEdge) => {
          return (
            <li key={edge.node.id}>
              <Link to={`/collections/${edge.node.handle}`}>
                {edge.node.title}
              </Link>
            </li>
          );
        })}
      </ul>
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
      childImageSharp {
        fluid(maxWidth: 480, maxHeight: 480) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    allShopifyCollection {
      edges {
        node {
          title
          handle
          id
        }
      }
    }
  }
`;
