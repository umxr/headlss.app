import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import App from "../App";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <App>
      <Header />
      <main>{children}</main>
      <Footer />
    </App>
  );
};

export default Layout;
