import React from "react";
import { ChatState } from "../../context/chatProvider";
import { Box, Text } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import UpdateGroup from "./UpdateGroup";
import Profile from "./Profile";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user, setSelectedChat } = ChatState();
  const getSender = (loggedUser, users) => {
    if (!users || users.length === 0) {
      return "Unknown";
    }
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };
  const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  return (
    <div>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IoMdArrowRoundBack onClick={() => setSelectedChat("")} />
            <>{selectedChat.chatName.toUpperCase()}</>
            <>
              {!selectedChat.isGroupChat ? (
                <Profile user={getSenderFull(user, selectedChat.users)} />
              ) : (
                <UpdateGroup
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </>
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
        </>
      ) : (
        <Box className=" flex justify-center items-center">
          <h1 className="text-2xl">Select a chat to start messaging</h1>
        </Box>
      )}
    </div>
  );
};

export default SingleChat;
