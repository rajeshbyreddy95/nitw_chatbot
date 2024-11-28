import React, { createContext, useState } from "react";

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <ChatbotContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatbotContext.Provider>
  );
};
