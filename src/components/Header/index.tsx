import React, { useCallback, useContext, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/core";
import { FaShoppingCart, FaUser } from "react-icons/all";
import { Link, navigate } from "gatsby";

import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { CustomerContext } from "../../config/context/createCustomerContext";
import { useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "../../reducers/drawer/actions";
import { linkResolver, Templates } from "../../utils/linkResolver";
import { RootState } from "../../config/redux/createRootReducer";
import { toggleNavigation } from "../../reducers/navigation/actions";
import { showSuccessNotification } from "../../reducers/notification/actions";

interface Props {
  authenticated: boolean;
  logout: (callback?: () => void | Promise<void>) => void;
}

const MenuItems = ({ authenticated, logout }: Props) => {
  if (authenticated) {
    return (
      <MenuGroup>
        <MenuItem as={Link} to={linkResolver(Templates.ACCOUNT_DASHBOARD)}>
          Account
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (logout) {
              logout();
            }
          }}
        >
          Logout
        </MenuItem>
      </MenuGroup>
    );
  }

  return (
    <MenuGroup>
      <MenuItem as={Link} to={linkResolver(Templates.ACCOUNT_LOGIN)}>
        Login
      </MenuItem>
      <MenuItem as={Link} to={linkResolver(Templates.ACCOUNT_REGISTER)}>
        Register
      </MenuItem>
    </MenuGroup>
  );
};

const Header = () => {
  const dispatch = useDispatch();
  const { authenticated, logout } = useContext(CustomerContext);
  const isOpen = useSelector((state: RootState) => state.navigation.isOpen);

  const toggleCart = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);
  const toggleMobileNavigation = useCallback(
    () => dispatch(toggleNavigation()),
    [dispatch]
  );

  return (
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
          <Link to={linkResolver(Templates.ROOT)}>
            <Heading as="h1" size="lg">
              Headlss
            </Heading>
          </Link>
        </Flex>

        <Box
          display={{ xs: "block", md: "none" }}
          onClick={toggleMobileNavigation}
        >
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
          display={{ xs: isOpen ? "block" : "none", md: "flex" }}
          width={{ xs: "full", md: "auto" }}
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
        >
          <Text
            as={Link}
            to={linkResolver(Templates.COLLECTIONS)}
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
          >
            Collections
          </Text>
          <Text
            as={Link}
            to={linkResolver(Templates.PRODUCTS)}
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
          >
            Products
          </Text>
        </Box>

        <Box
          display={{ xs: isOpen ? "flex" : "none", md: "flex" }}
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
            onClick={toggleCart}
          />
          <Menu>
            <MenuButton
              as={IconButton}
              size="md"
              fontSize="lg"
              ml={{
                xs: "0",
                md: "2",
              }}
              icon={<FaUser />}
              aria-label={`Account`}
              variant="primary"
              backgroundColor="transparent"
            />
            <MenuList>
              <MenuItems
                authenticated={authenticated}
                logout={() =>
                  logout(() => navigate(linkResolver(Templates.ROOT)))
                }
              />
            </MenuList>
          </Menu>
          <ColorModeSwitcher />
        </Box>
      </Box>
    </nav>
  );
};

export default Header;
