import { Link } from "gatsby";
import React from "react";

interface Props {
  siteTitle: string;
}

const Header = ({ siteTitle }: Props) => (
  <header>
    <Link to="/">{siteTitle}</Link>
  </header>
);

export default Header;
