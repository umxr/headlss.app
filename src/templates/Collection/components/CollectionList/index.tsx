import React from "react";
import { Maybe, ShopifyProduct } from "../../../../graphqlTypes";
import CollectionItem from "../CollectionItem";

interface Props {
  products: Maybe<ShopifyProduct>[];
}

const CollectionList = ({ products }: Props) => {
  return (
    <>
      {products.map((product: Maybe<ShopifyProduct>) => {
        if (!product) return null;
        return <CollectionItem product={product} key={product.id} />;
      })}
    </>
  );
};

export default CollectionList;
