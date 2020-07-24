import React from "react";
import {
  Box,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/core";
import { Link as GatsbyLink } from "gatsby";

import LoginForm from "../../components/LoginForm";
import Layout from "../../../../../modules/Layout";

const LoginContainer = () => {
  return (
    <Layout>
      <SimpleGrid
        p={6}
        columns={{
          md: 1,
          lg: 2,
        }}
        spacing={6}
      >
        <LoginForm />
        <Stack
          padding={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          width="100%"
          spacing={3}
          as={Box}
        >
          <Heading as="h1" size="lg">
            Don't have an account?
          </Heading>
          <Divider />
          <Text fontSize="sm">
            Why not create an account. Click {" "}
            <GatsbyLink
              to={"/account/register"}
              style={{
                textDecoration: "underline",
              }}
            >
              here
            </GatsbyLink>{" "}
            to get started
          </Text>
        </Stack>
      </SimpleGrid>
    </Layout>
  );
};

export default LoginContainer;
