import React from "react";

import ProductForm from "../../components/ProductForm";
import ProductLayout from "../../components/ProductLayout";

import { ShopifyProduct, Site } from "../../../../graphqlTypes";

interface Image {
  absolutePath: string;
}

interface Props {
  data: {
    site: Site;
    shopifyProduct: ShopifyProduct;
    placeholderImage: Image;
  };
  location: Location;
}

const ProductContainer = (props: Props) => {
  const {
    data: { site, shopifyProduct: product, placeholderImage },
    location: { pathname },
  } = props;

  const canonical = `${site.siteMetadata?.siteUrl}${pathname}`;
  const title = product.title ? product.title : "Shopify Product Title";
  const description = product.description
    ? product.description
    : "Shopify Product Description";
  const handle = product.handle;

  let image;
  const [productImage] = product.images;
  if (productImage && productImage.originalSrc) {
    image = productImage.originalSrc;
  } else {
    image = placeholderImage.absolutePath;
  }

  return (
    <ProductLayout
      title={title}
      description={description}
      canonical={canonical}
      url={`${site.siteMetadata?.siteUrl}/product/${handle}`}
      image={image}
    >
      <ProductForm
        id={product.id}
        product={product}
      />
    </ProductLayout>
  );
};
export default ProductContainer;
