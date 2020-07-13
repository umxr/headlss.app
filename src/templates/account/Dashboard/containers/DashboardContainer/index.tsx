import React from "react";
import Layout from "../../../../../modules/Layout";
import DashboardDetails from "../../components/DashboardDetails";
import { Stack } from "@chakra-ui/core";

const DashboardContainer = () => {
  return (
    <Layout>
      <Stack
        maxW="xl"
        px={{
          xs: 4,
          sm: 4,
          md: 0,
        }}
        marginX="auto"
        marginY={6}
        spacing={6}
      >
        <DashboardDetails />
      </Stack>
    </Layout>
  );
};

export default DashboardContainer;
