import styled from "@emotion/styled";

export const Container = styled.div`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-right: 8px;
  padding-left: 8px;

  @media only screen and (min-width: 30em) {
    max-width: 100%;
  }

  @media only screen and (min-width: 48em) {
    width: 752px;
    max-width: 100%;
  }

  @media only screen and (min-width: 62em) {
    width: 976px;
    max-width: 100%;
  }

  @media only screen and (min-width: 80em) {
    width: 1264px;
    max-width: 100%;
  }
`;
