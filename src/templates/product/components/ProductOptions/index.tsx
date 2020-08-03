import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/core";

import * as S from "./styles";

import { Maybe, ShopifyProductOption } from "../../../../graphqlTypes";

interface Props {
  options: Maybe<ShopifyProductOption>[] | null | undefined;
}

const ProductOptions = ({ options }: Props) => {
  if (!options || options.length === 1) return null;
  return (
    <>
      {options.map((option: Maybe<ShopifyProductOption>, index: number) => {
        if (!option) return null;
        return (
          <FormControl key={option.id}>
            <FormLabel htmlFor={`SingleOptionSelector-${index}`}>
              {option.name}
            </FormLabel>
            <S.Select>
              {option.values &&
                option.values.map((value) => {
                  const optionValue = String(value);
                  return (
                    <option key={optionValue} value={optionValue}>
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
