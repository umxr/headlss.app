/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

const templates = {
  ShopifyProduct: path.resolve("./src/templates/product.tsx"),
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const pages = await graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            id
            handle
            __typename
          }
        }
      }
    }
  `);

  pages.data.allShopifyProduct.edges.forEach((edge) => {
    createPage({
      path: `/products/${edge.node.handle}`,
      component: templates[edge.node.__typename],
      context: {
        id: edge.node.id,
        handle: edge.node.handle,
      },
    });
  });
};
