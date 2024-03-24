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
  console.log("chatID", selectedChat?._id);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
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

  const getSender = (loggedUser, users) => {
    if (!users || users.length === 0) {
      return "Unknown";
    }
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
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
                <div className=" py-2 px-6 text-lg font-bold border-b-2 border-b-gray-300 rounded-lg ">
                  {chat.isGroupChat
                    ? chat.chatName
                    : getSender(loggedUser, chat.users)}
                </div>
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
