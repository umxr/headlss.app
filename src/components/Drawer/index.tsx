import React from "react";
import { navigate } from "gatsby";
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
import { StoreContext } from "../../config/context/createStoreContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../config/redux/createRootReducer";
import { closeDrawer, toggleDrawer } from "../../reducers/drawer/actions";
import DrawerItems from "./components/DrawerItems";

interface Props {
  placement: SlideProps["placement"];
  title?: string;
}

const Drawer = ({ placement = "right", title }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.drawer.isOpen);

  const onClose = () => dispatch(closeDrawer());
  const onToggle = () => dispatch(toggleDrawer());

  const handleCartNavigation = async () => {
    onToggle();
    await navigate("/cart");
  };

  return (
    <CDrawer isOpen={isOpen} placement={placement} onClose={onClose}>
      <CDrawerOverlay />
      <CDrawerContent>
        <CDrawerCloseButton />
        {title && <CDrawerHeader>{title}</CDrawerHeader>}
        <StoreContext.Consumer>
          {({ checkout, updateLineItem, removeLineItem }) => {
            const updateItem = async (
              {
                lineItemId,
                quantity,
              }: {
                lineItemId: string;
                quantity: number;
              },
              onSuccess?: () => void,
              onError?: (e?: any) => void
            ) => {
              await updateLineItem(
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
              onError?: (e?: any) => void
            ) => {
              removeLineItem(
                {
                  lineItemId,
                },
                onSuccess,
                onError
              );
            };

            if (checkout) {
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
                      <Button onClick={handleCartNavigation}>View Cart</Button>
                      <Button as={CLink} href={checkout.checkoutUrl} isExternal>
                        Continue to Checkout
                      </Button>
                    </Stack>
                  </CDrawerFooter>
                </>
              );
            }
          }}
        </StoreContext.Consumer>
      </CDrawerContent>
    </CDrawer>
  );
};

export default Drawer;
