import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const ChatPage = () => {
  const [chat, setChat] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/api/chat");
    setChat(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {chat.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
