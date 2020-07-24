import React from "react";
import { SimpleGrid } from "@chakra-ui/core";

import Layout from "../../../../../modules/Layout";
import DashboardDetails from "../../components/DashboardDetails";
import DashboardPreferences from "../../components/DashboardPreferences";
import DashboardAddress from "../../components/DashboardAddress";
import Authentication from "../../../../../modules/Authentication";

const DashboardContainer = () => {
  return (
    <Layout>
      <Authentication>
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
      </Authentication>
    </Layout>
  );
};

export default DashboardContainer;
