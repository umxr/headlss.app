import styled from "@emotion/styled";
import { Select as CSelect } from "@chakra-ui/core";

export const Select = styled(CSelect)`
  + .chakra-select__icon-wrapper {
    display: none;
  }
`;
