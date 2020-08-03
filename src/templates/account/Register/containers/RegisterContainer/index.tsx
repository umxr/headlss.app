import React from "react";
import {
  Box,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/core";
import Layout from "../../../../../modules/Layout";
import RegisterForm from "../../components/RegisterForm";
import { Link as GatsbyLink } from "gatsby";
import { linkResolver, Templates } from "../../../../../utils/linkResolver";

const RegisterContainer = () => {
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
        <RegisterForm />
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
            Already have an account?
          </Heading>
          <Divider />
          <Text fontSize="sm">
            Login Click{" "}
            <GatsbyLink
              to={linkResolver(Templates.ACCOUNT_LOGIN)}
              style={{
                textDecoration: "underline",
              }}
            >
              here
            </GatsbyLink>
          </Text>
        </Stack>
      </SimpleGrid>
    </Layout>
  );
};

export default RegisterContainer;
