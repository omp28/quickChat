import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { ChatState } from "../context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/misc/SideDrawer";
import MyChats from "../components/misc/myChats";
import ChatBox from "../components/misc/chatBox";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div className=" w-full">
      {user && <SideDrawer />}
      <Box className=" flex justify-around">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
