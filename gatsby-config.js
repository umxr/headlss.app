module.exports = {
  siteMetadata: {
    siteUrl: "https://headlss.app",
    title: `Headlss`,
    description: `Future of Headless Commerce`,
    author: `@Statement`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: "headlss",
        accessToken: "2f0365554792e450a365f05918feb654",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Shopify",
        fieldName: "Shopify",
        url: "https://headlss.myshopify.com/api/graphql",
        headers: {
          "X-Shopify-Storefront-Access-Token":
            "2f0365554792e450a365f05918feb654",
        },
      },
    },
  ],
};
