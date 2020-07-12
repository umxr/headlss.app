import React from "react";
import { Box, Divider, Heading, Stack, Flex } from "@chakra-ui/core";

const DashboardAddress = (props) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" {...props}>
      <Box p={4}>
        <Heading as="h2" size="md" mb={4}>
          Address
        </Heading>
        <Divider mb={4} />
        <Stack spacing={2}>
            <Flex>

            </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default DashboardAddress;
