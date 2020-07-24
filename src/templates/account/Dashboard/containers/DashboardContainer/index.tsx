import React from "react";
import Layout from "../../../../../modules/Layout";
import DashboardDetails from "../../components/DashboardDetails";
import { Flex, Box, SimpleGrid } from "@chakra-ui/core";
import DashboardPreferences from "../../components/DashboardPreferences";
import DashboardAddress from "../../components/DashboardAddress";

const DashboardContainer = () => {
  return (
    <Layout>
      <SimpleGrid
        p={6}
        columns={{
          md: 1,
          lg: 2,
          xl: 3,
        }}
        spacing={6}
      >
        <DashboardDetails />
        <DashboardPreferences />
        <DashboardAddress />
      </SimpleGrid>
    </Layout>
  );
};

export default DashboardContainer;
