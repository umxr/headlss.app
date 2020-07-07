import React, { Component, FormEvent } from "react";
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

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
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

  handleSubmit = (callback: (variantId: string, quantity: number) => void) => (
    event: React.SyntheticEvent
  ) => {
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
      callback(this.state.variant, this.state.quantity);
    }
  };

  render() {
    const { variants } = this.props;
    const { errors } = this.state;
    return (
      <StoreContext.Consumer>
        {({ addVariantToCart }) => {
          return (
            <form onSubmit={this.handleSubmit(addVariantToCart)} noValidate>
              {errors.length && (
                <ul>
                  {errors.map((error: Error) => (
                    <li
                      key={error.field}
                      dangerouslySetInnerHTML={{ __html: error.message }}
                    />
                  ))}
                </ul>
              )}

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
              <button type="submit">Add to cart</button>
            </form>
          );
        }}
      </StoreContext.Consumer>
    );
  }
}

export default ProductForm;
