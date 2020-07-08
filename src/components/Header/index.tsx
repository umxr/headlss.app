import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { StoreContext } from "../../config/context/createStoreContext";

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
      <StoreContext.Consumer>
        {({ checkout }) => {
          const itemsInCart = checkout.lineItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
          return <div>Cart: {itemsInCart}</div>;
        }}
      </StoreContext.Consumer>
    </header>
  );
};

export default Header;
