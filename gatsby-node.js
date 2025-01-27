/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path");

const templates = {
  ShopifyProduct: path.resolve("./src/templates/product/index.tsx"),
  ShopifyCollection: path.resolve("./src/templates/collection/index.tsx"),
  Login: path.resolve("./src/templates/account/Login/index.tsx"),
  Register: path.resolve("./src/templates/account/Register/index.tsx"),
  ForgotPassword: path.resolve("./src/templates/account/ForgotPassword/index.tsx"),
  ResetPassword: path.resolve("./src/templates/account/ResetPassword/index.tsx"),
  Dashboard: path.resolve("./src/templates/account/Dashboard/index.tsx"),
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
      allShopifyCollection {
        edges {
          node {
            handle
            id
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

  pages.data.allShopifyCollection.edges.forEach((edge) => {
    createPage({
      path: `/collections/${edge.node.handle}`,
      component: templates[edge.node.__typename],
      context: {
        id: edge.node.id,
        handle: edge.node.handle,
      },
    });
  });

  createPage({
    path: "/account/login",
    component: templates["Login"],
    context: {},
  });
  createPage({
    path: "/account/register",
    component: templates["Register"],
    context: {},
  });
  createPage({
    path: "/account/forgot",
    component: templates["ForgotPassword"],
    context: {},
  });
  createPage({
    path: "/account/reset",
    component: templates["ResetPassword"],
    context: {},
  });
  createPage({
    path: "/account/dashboard",
    component: templates["Dashboard"],
    context: {},
  });
};
