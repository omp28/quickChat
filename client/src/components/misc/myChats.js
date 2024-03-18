import React, { useEffect } from "react";
import { ChatState } from "../../context/chatProvider";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import SkeletonChat from "../SkeletonChat";
import NewGroupChat from "./NewGroupChat";

const MyChats = ({ fetchAgain }) => {
  const { user, setUser, selectedChat, setSelectedChat, chats, setChats } =
    ChatState();
  const Toast = useToast();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/user", config);

      setChats(data);
    } catch {
      Toast({
        title: "Error",
        description: "Failed to fetch chats",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  console.log("this is the user chat", chats);
  console.log("this is the user ", user);

  const getSender = (loggedUser, user) => {
    return user[0]._id === user[0]._id ? user[1].name : user[0].name;
  };

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      w={{ base: "100%", md: "30%" }}
      bg="white"
      p="2"
      alignItems="center"
      borderRadius="lg"
      className="flex justify-around "
    >
      <Box
        pb={3}
        px={3}
        d="flex"
        w="100%"
        alignItems="center"
        className="flex justify-around "
      >
        <h1 className=" text-2xl">My Chats</h1>
        <NewGroupChat>
          <Button d="flex">New Group Chat</Button>
        </NewGroupChat>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        w="100%"
        h="100%"
        overflowY="hidden"
        bg="gray.100"
      >
        {chats ? (
          <Stack>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                bg={selectedChat?._id === chat._id ? "gray.200" : "gray.100"}
                color={selectedChat?._id === chat._id ? "black" : "gray.600"}
                onClick={() => setSelectedChat(chat)}
                w="100%"
                justifyContent="flex"
                textAlign="left"
                variant="ghost"
                _hover={{ bg: "gray.200" }}
              >
                {/* <div className=" py-2 px-6 text-lg font-bold border-b-2 border-b-gray-300 rounded-lg ">
                  {chat.name}
                </div> */}
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.user)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <SkeletonChat />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
