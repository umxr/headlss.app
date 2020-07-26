import React, { ChangeEvent, Component, FormEvent } from "react";
import { Maybe, ShopifyProductVariant } from "../../../../graphqlTypes";
import { StoreContext } from "../../../../config/context/createStoreContext";

interface Error {
  field: string;
  message: string;
}

interface Props {
  id: string;
  variants: Maybe<ShopifyProductVariant>[] | null | undefined;
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
    errors: [],
  };

  componentDidMount() {
    if (
      this.props.variants &&
      this.props.variants.length &&
      this.props.variants[0]
    ) {
      this.setState({
        variant: String(this.props.variants[0].shopifyId),
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
    const { variants } = this.props;
    const { errors } = this.state;

    const hasVariants = variants && variants.length > 1;

    const isOutOfStock = !hasVariants && !variants[0].availableForSale;

    console.log(this.state);

    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => {
          return (
            <form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
              {/*{errors.length && (*/}
              {/*  <ul>*/}
              {/*    {errors.map((error: Error) => (*/}
              {/*      <li*/}
              {/*        key={error.field}*/}
              {/*        dangerouslySetInnerHTML={{ __html: error.message }}*/}
              {/*      />*/}
              {/*    ))}*/}
              {/*  </ul>*/}
              {/*)}*/}

              <label htmlFor="quantity">Qty.</label>
              <input
                type="number"
                inputMode="numeric"
                id="quantity"
                name="quantity"
                min="1"
                step="1"
                onChange={this.handleChange}
                value={this.state.quantity}
              />
              {hasVariants && (
                <div>
                  <label htmlFor="variant">Size</label>
                  <select
                    id="variant"
                    value={this.state.variant}
                    name="variant"
                    onChange={this.handleChange}
                  >
                    <option disabled value="">
                      Choose Size
                    </option>
                    {variants &&
                      variants.map((variant) => {
                        if (!variant) return null;
                        return (
                          <option
                            disabled={!variant.availableForSale}
                            value={variant.shopifyId}
                            key={variant.shopifyId}
                          >
                            {variant.title}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}
              <button type="submit" disabled={isOutOfStock}>
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            </form>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}

export default ProductForm;
