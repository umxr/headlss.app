import React, { forwardRef, useContext, useEffect, useState } from "react";
import {
  Button,
  Drawer as CDrawer,
  DrawerBody as CDrawerBody,
  DrawerCloseButton as CDrawerCloseButton,
  DrawerContent as CDrawerContent,
  DrawerFooter as CDrawerFooter,
  DrawerHeader as CDrawerHeader,
  DrawerOverlay as CDrawerOverlay,
  Link as CLink,
  Stack,
} from "@chakra-ui/core";

import { SlideProps } from "@chakra-ui/transition";
import { Link } from "gatsby";
import { StoreContext } from "../../config/context/createStoreContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  placement: SlideProps["placement"];
  children: React.ReactNode;
  title?: string;
}

const Drawer = React.forwardRef<React.RefObject<HTMLElement>, Props>(
  ({ isOpen, onClose, placement = "right", children, title }, ref) => {
    const { checkout } = useContext(StoreContext);
    const [loading, setLoading] = useState<boolean>(true);
    return (
      <CDrawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        finalFocusRef={ref}
      >
        <CDrawerOverlay />
        <CDrawerContent>
          <CDrawerCloseButton />
          {title && <CDrawerHeader>{title}</CDrawerHeader>}

          <CDrawerBody>{children}</CDrawerBody>

          <CDrawerFooter>
            <Stack spacing={4} width="100%">
              <Button as={Link} to="/cart">
                View Cart
              </Button>
              <Button as={CLink} href={checkout.webUrl} isExternal>
                Continue to Checkout
              </Button>
            </Stack>
          </CDrawerFooter>
        </CDrawerContent>
      </CDrawer>
    );
  }
);

export default Drawer;
