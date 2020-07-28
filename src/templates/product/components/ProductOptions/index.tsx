import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/core";

import * as S from "./styles";

import { ShopifyProductOption } from "../../../../graphqlTypes";

interface Props {
  options: ShopifyProductOption[];
}

const ProductOptions = ({ options }: Props) => {
  return (
    <>
      {options.map((option: ShopifyProductOption, index: number) => {
        return (
          <FormControl key={option.shopifyId}>
            <FormLabel htmlFor={`SingleOptionSelector-${index}`}>
              {option.name}
            </FormLabel>
            <S.Select>
              {option.values.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </S.Select>
          </FormControl>
        );
      })}
    </>
  );
};

export default ProductOptions;
