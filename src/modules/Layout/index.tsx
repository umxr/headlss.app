import React from "react";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
