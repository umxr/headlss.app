import React, { useContext, useRef, useState } from "react";
import { Box, Heading, Flex, Text, Button, IconButton } from "@chakra-ui/core";
import { StoreContext } from "../../config/context/createStoreContext";
import { FaShoppingCart, FaUser } from "react-icons/all";
import { Link, navigate } from "gatsby";

import { useDisclosure } from "@chakra-ui/core";
import Drawer from "../Drawer";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { CustomerContext } from "../../config/context/createCustomerContext";

const Header = () => {
  const { authenticated } = useContext(CustomerContext);
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  const handleToggle = () => setShow(!show);

  const handleNavigation = () => {
    if (typeof window !== "undefined") {
      authenticated
          ? navigate("/account/dashboard")
          : navigate("/account/login");
    }
  }

  return (
    <>
      <nav>
        <Box
          as={Flex}
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          borderBottomWidth="1px"
        >
          <Flex align="center" mr={5}>
            <Link to="/">
              <Heading as="h1" size="lg">
                Headlss
              </Heading>
            </Link>
          </Flex>

          <Box display={{ xs: "block", md: "none" }} onClick={handleToggle}>
            <svg
              fill="white"
              width="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>

          <Box
            display={{ xs: show ? "block" : "none", md: "flex" }}
            width={{ xs: "full", md: "auto" }}
            alignItems="center"
            justifyContent="center"
            flexGrow={1}
          >
            <Text
              as={Link}
              to="/collections"
              mt={{ base: 4, md: 0 }}
              mr={6}
              display="block"
            >
              Collections
            </Text>
            <Text
              as={Link}
              to="/products"
              mt={{ base: 4, md: 0 }}
              mr={6}
              display="block"
            >
              Products
            </Text>
          </Box>

          <Box
            display={{ xs: show ? "flex" : "none", md: "flex" }}
            flexDirection={{
              xs: "column",
              md: "row",
            }}
            mt={{ base: 4, md: 0 }}
          >
            <IconButton
              size="md"
              fontSize="lg"
              variant="primary"
              icon={<FaShoppingCart />}
              aria-label={`Cart`}
              onClick={onOpen}
              ref={btnRef}
            />
            <IconButton
              size="md"
              fontSize="lg"
              ml={{
                xs: "0",
                md: "2",
              }}
              variant="primary"
              icon={<FaUser />}
              aria-label={`Account`}
              onClick={handleNavigation}
            />
            <ColorModeSwitcher />
          </Box>
        </Box>
      </nav>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        title="Your shopping cart"
        ref={btnRef}
      >
        hi
      </Drawer>
    </>
  );
};

export default Header;

// <StoreContext.Consumer>
//     {({ checkout }) => {
//         const itemsInCart = checkout.lineItems.reduce(
//             (total, item) => total + item.quantity,
//             0
//         );
//         return <div>Cart: {itemsInCart}</div>;
//     }}
// </StoreContext.Consumer>
