import React, { ChangeEvent, Component, FormEvent } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Stack,
  Alert,
  AlertIcon,
  SimpleGrid,
  AlertDescription,
  Box,
  Image,
  AspectRatio,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/core";
import {
  Maybe,
  ShopifyProduct,
  ShopifyProductVariant,
} from "../../../../graphqlTypes";
import { StoreContext } from "../../../../config/context/createStoreContext";
import ProductOptions from "../ProductOptions";
import ProductDescription from "../ProductDescription";

interface Error {
  field: string;
  message: string;
}

interface Props {
  id: string;
  product: ShopifyProduct;
}

interface State {
  quantity: number;
  variant: string;
  errors?: Error[];
}

class ProductForm extends Component<Props, State> {
  state = {
    variant: "",
    quantity: 1,
    errors: null,
  };

  componentDidMount() {
    const { product } = this.props;
    if (product.variants && product.variants.length && product.variants[0]) {
      this.setState({
        variant: String(product.variants[0].shopifyId),
      });
    }
  }

  handleChange = (event: React.ChangeEvent) => {
    event.preventDefault();

    if (event.currentTarget.value) {
      const errors = this.state.errors;

      const errorIdx = errors.findIndex(
        (error) => error.field === event.currentTarget.name
      );

      errors.splice(errorIdx, 1);

      if (~errorIdx) {
        this.setState({ errors: errors });
      }
    }

    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleQuantityChange = (value: string) => {
    const quantity = parseInt(value);
    this.setState({
      quantity,
    });
  };

  handleSubmit = (
    callback: ({
      variantId,
      quantity,
    }: {
      variantId: string;
      quantity: number;
    }) => void
  ) => (event: React.SyntheticEvent) => {
    event.preventDefault();

    const errors = [];

    if (this.state.quantity < 1) {
      errors.push({
        field: "quantity",
        message: "Choose a <b>quantity</b> of 1 or more.",
      });
    }

    if (this.state.variant === "" || this.state.variant === ".") {
      errors.push({
        field: "variant",
        message: "Please select a <b>size</b>.",
      });
    }

    if (errors.length) {
      this.setState({ errors: errors });
      return;
    }

    if (this.state.variant) {
      callback({
        variantId: this.state.variant,
        quantity: this.state.quantity,
      });
    }
  };

  render() {
    const { product } = this.props;
    const { errors, quantity } = this.state;

    const featuredImage = product.images[0].originalSrc;
    const hasVariants =
      product && product.variants && product.variants.length > 1;
    const isOutOfStock = !hasVariants && !product.variants[0].availableForSale;

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => {
          return (
            <>
              <SimpleGrid
                columns={{
                  sm: 1,
                  md: 2,
                }}
                spacing={6}
              >
                <Box p={6}>
                  <AspectRatio maxW="400px" ratio={4 / 3} mx="auto">
                    <Image
                      src={featuredImage}
                      alt={product.title}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </AspectRatio>
                </Box>
                <Box p={6}>
                  <form
                    onSubmit={this.handleSubmit(addVariantToCart)}
                    noValidate
                  >
                    {errors && errors.length && (
                      <Stack spacing={3}>
                        {errors.map((error: Error) => (
                          <Alert status="error" key={error.field}>
                            <AlertIcon />
                            <AlertDescription>{error.message}</AlertDescription>
                          </Alert>
                        ))}
                      </Stack>
                    )}
                    <Stack spacing={3}>
                      {product.options && product.options.length > 1 && (
                        <ProductOptions options={product.options} />
                      )}
                      <FormControl>
                        <FormLabel htmlFor="quantity">Qty.</FormLabel>
                        <NumberInput
                          defaultValue={quantity}
                          step={1}
                          min={1}
                          onChange={(value) => this.handleQuantityChange(value)}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                      <Button type="submit" isDisabled={isOutOfStock}>
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </Button>
                    </Stack>
                  </form>
                </Box>
              </SimpleGrid>
              <Box p={6}>
                <SimpleGrid columns={1} spacing={6}>
                  <Tabs>
                    <TabList>
                      <Tab>Description</Tab>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                        <ProductDescription
                          description={product.descriptionHtml}
                        />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </SimpleGrid>
              </Box>
            </>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}

export default ProductForm;
