import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import App from "../App";
import Drawer from "../../components/Drawer";
import Container from "../../components/Container";
import Notification from "../Notification";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <App>
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
      <Drawer placement="right" title="Your shopping cart" />
      <Notification />
    </App>
  );
};

export default Layout;
