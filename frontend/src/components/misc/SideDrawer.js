import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import Profile from "./Profile";
import { ChatState } from "../../context/chatProvider";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [serachResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return (
    <div>
      <Box
        className="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.200"
        w="100%"
        p="5px 10px"
        borderRadius="lg"
      >
        <Tooltip label="Search for users">
          <Button>
            <FaSearch />
            <Text d={{ base: "none", md: "flex" }}> Searh User</Text>
          </Button>
        </Tooltip>
        <Text className=" text-3xl">quickChat</Text>
        <div>
          <Menu>
            <MenuButton>
              <Button>
                <FaBell />
              </Button>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton className="border-l-2 border-gray-300">
              <Button>
                <MdOutlineAccountCircle className=" text-xl " />
              </Button>
            </MenuButton>
            <MenuList>
              <Profile user={ChatState().user}>
                <Button className=" w-full">My Profile</Button>
                <MenuDivider />
                <Button className=" w-full">Logout</Button>
              </Profile>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </div>
  );
};

export default SideDrawer;
