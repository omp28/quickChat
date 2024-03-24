import React from "react";
import { ChatState } from "../../context/chatProvider";
import { Box, FormControl, Text } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import UpdateGroup from "./UpdateGroup";
import Profile from "./Profile";
import { useState } from "react";
import SkeletonChat from "../SkeletonChat";
import { Input } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();
  console.log("this is msg", messages);

  const fetchMessages = async () => {
    if (!selectedChat?._id) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter") {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          { content: newMessage, chatID: selectedChat._id },
          config
        );
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    //typing indicator
  };

  const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

  return (
    <div className=" h-[90vh] border-2 border-black">
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
            borderRadius="lg"
            className="h-[70vh] overflow-y-scroll"
          >
            {/* messages here  */}
            {/* keep the message on the right if the sender is the logged in user and on the left if the sender is the other user */}
            {messages.map((msg) => (
              // if the sender is the logged in user then the message will be on the right use only div

              <div
                key={msg._id}
                className={`${
                  msg.sender._id === user._id
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >
                <div
                  className={`${
                    msg.sender._id === user._id
                      ? "bg-blue-400 text-white"
                      : "bg-gray-300 text-black"
                  } p-2 rounded-lg`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading ? <SkeletonChat /> : <div>{/* messages  */}</div>}
            <FormControl onKeyDown={sendMessage}>
              <Input
                placeholder="Type a message"
                onChange={typingHandler}
                bg="white"
                className=" text-black"
                value={newMessage}
              />
            </FormControl>
          </Box>
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
