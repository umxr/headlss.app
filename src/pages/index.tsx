import React from "react";

import Layout from "../modules/Layout";
import SEO from "../components/Seo";

import "../styles/theme/theme.scss";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" description="Home Description" />
    <h1>Home Page</h1>
  </Layout>
);

export default IndexPage;
