import React from "react";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
const HomePage = () => {
  return (
    <Box className="bg-black h-screen w-screen">
      <Container w="100%" maxW="xl" className=" pt-20 text-white">
        <Box
          d="flex"
          textAlign="center"
          justifyContent="center"
          w="100%"
          p={4}
          m="0 0 15px 0"
          borderRadius="lg"
          borderWidth="2px"
        >
          <Text fontSize="3xl">quickChat</Text>
        </Box>
        <Box>
          <Tabs variant="soft-rounded" colorScheme="gray">
            <TabList>
              <Tab>LogIn</Tab>
              <Tab>SignUp</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
