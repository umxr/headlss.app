import React from "react";
import { ShopifyCollectionEdge } from "../../../../graphqlTypes";
import CollectionsItem from "../CollectionsItem";

interface Props {
  collections: ShopifyCollectionEdge[];
}

const CollectionsList = ({ collections }: Props) => {
  return (
    <>
      {collections.map((edge: ShopifyCollectionEdge) => {
        return <CollectionsItem key={edge.node.id} collection={edge.node} />;
      })}
    </>
  );
};

export default CollectionsList;
