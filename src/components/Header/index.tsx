import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

const Header = () => {
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
    <header>
      <Link to="/">{data.site.siteMetadata.title}</Link>
    </header>
  );
};

export default Header;
