import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaSearch, FaBell } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import Profile from "./Profile";
import { ChatState } from "../../context/chatProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SkeletonChat from "../SkeletonChat";
import { set } from "mongoose";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [serachResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const Navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Toast = useToast();
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    // Navigate("/");
  };
  const handleSearch = async () => {
    if (!search) {
      Toast({
        position: "top-left",
        title: "Invalid Input",
        description: "Please fill all the fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      if (!chats.find((c) => c._id === data._id))
        setChats((prevChats) => [data, ...prevChats]);

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Toast({
        position: "top-left",
        title: "Invalid Input",
        description: "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const accessChat = async (id) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userID: id }, config);
      setLoadingChat(false);
      setSelectedChat(data);
      onClose();
    } catch (error) {
      console.log(error);
      setLoadingChat(false);
      Toast({
        position: "top-left",
        title: "Invalid Input",
        description: "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
          <Button onClick={onOpen}>
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
                <Button onClick={logoutHandler} className=" w-full">
                  Logout
                </Button>
              </Profile>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottom="2px ">Search User</DrawerHeader>

            <DrawerBody>
              <Box className="flex">
                <Input
                  className=" text-black"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setLoading(true);
                  }}
                  placeholder="search by name"
                  mr="2"
                  value={search}
                />
                <Button onClick={handleSearch}>Go</Button>
              </Box>
              {loading ? (
                <Text>
                  <SkeletonChat />
                </Text>
              ) : (
                <Box w="100%">
                  {serachResult.map((user) => (
                    <Box
                      key={user._id}
                      className=" border-b-2 border-gray-500 py-2 flex my-2"
                    >
                      <Text className=" w-full flex items-center text-xl px-4 bg-gray-100  rounded-md">
                        {user.name}
                      </Text>

                      <Button
                        onClick={() => {
                          setLoadingChat(true);
                          accessChat(user._id);
                        }}
                      >
                        Chat
                      </Button>
                    </Box>
                  ))}
                </Box>
              )}
              {loadingChat && <SkeletonChat />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
