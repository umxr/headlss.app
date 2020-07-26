import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/createRootReducer";
import { closeDrawer } from "../../reducers/drawer/actions";
import DrawerEmpty from "./components/DrawerEmpty";
import DrawerItems from "./components/DrawerItems";

interface Props {
  placement: SlideProps["placement"];
  title?: string;
}

const Drawer = ({ placement = "right", title }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const onClose = () => dispatch(closeDrawer());

  return (
    <CDrawer isOpen={isOpen} placement={placement} onClose={onClose}>
      <CDrawerOverlay />
      <CDrawerContent>
        <CDrawerCloseButton />
        {title && <CDrawerHeader>{title}</CDrawerHeader>}
        <StoreContext.Consumer>
          {({ checkout, updateLineItem, removeLineItem }) => {
            const isCartEmpty = checkout.lineItems.length === 0;

            const updateItem = (
              lineItemId: string,
              quantity: number,
              onSuccess?: () => void,
              onError?: () => void
            ) => {
              updateLineItem(
                {
                  lineItemId,
                  quantity,
                },
                onSuccess,
                onError
              );
            };

            const removeItem = (
              lineItemId: string,
              onSuccess?: () => void,
              onError?: () => void
            ) => {
              removeLineItem(
                {
                  lineItemId,
                },
                onSuccess,
                onError
              );
            };

            if (isCartEmpty) {
              return (
                <CDrawerBody>
                  <DrawerEmpty />
                </CDrawerBody>
              );
            }

            return (
              <>
                <CDrawerBody>
                  <DrawerItems
                    items={checkout.lineItems}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                  />
                </CDrawerBody>
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
              </>
            );
          }}
        </StoreContext.Consumer>
      </CDrawerContent>
    </CDrawer>
  );
};

export default Drawer;
