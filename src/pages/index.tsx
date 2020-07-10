import React from "react";

import Layout from "../modules/Layout";
import SEO from "../components/Seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" description="Home Description" />
    <h1>Home Page</h1>
    <div className="container">
      <div className="row">
        <div className="col-sm">One of three columns</div>
        <div className="col-sm">One of three columns</div>
        <div className="col-sm">One of three columns</div>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
