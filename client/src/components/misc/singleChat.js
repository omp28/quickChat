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
import { useRef } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:3000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, user, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketconnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const toast = useToast();
  console.log("this is msg", messages);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("stop typing", () => {
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (message) => {
      setMessages([...messages, message]);
      if (selectedChatCompare._id === message.chat._id) {
        scrollToBottom();
      } else {
        toast({
          title: "New Message",
          description: "You have a new message",
          status: "success",
          duration: 5000,
        });
      }
    });
  });

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

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
      scrollToBottom();
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load  the Messages",
        status: "error",
        duration: 5000,
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter") {
      socket.emit("stop typing", selectedChat._id);
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
        socket.emit("new message", data);
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
    if (!socketconnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTyped = new Date().getTime();
    var timerLength = 3000;

    setTimeout(() => {
      let currentTime = new Date().getTime();
      let diff = currentTime - lastTyped;
      if (diff >= timerLength && typing) {
        setTyping(false);
        socket.emit("stop typing", selectedChat._id);
      }
    }, timerLength);
  };

  const getSenderFull = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };
  const handleBlur = () => {
    setTyping(false);
    if (socketconnected) {
      socket.emit("stop typing", selectedChat._id);
    }
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
            <div className=" flex items-center">
              <h1>{selectedChat.chatName.toUpperCase()}</h1>
              <h1 className=" text-sm ml-4 italic">
                {isTyping ? "Typing..." : ""}
              </h1>
            </div>
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
            ref={chatContainerRef}
          >
            {loading ? (
              <SkeletonChat />
            ) : (
              <div>
                {messages.map((msg) => (
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
              </div>
            )}
            <FormControl onKeyDown={sendMessage}>
              <Input
                placeholder="Type a message"
                onChange={typingHandler}
                bg="white"
                className=" text-black"
                value={newMessage}
                onBlur={handleBlur}
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
