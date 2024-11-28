import React, { useState } from "react";
import { chatbotData } from "./data";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Welcome to NIT Warangal Chatbot! Please select a category to begin:\n${chatbotData.categories
        .map((category, index) => `${index + 1}. ${category.category}`)
        .join("\n")}`,
    },
  ]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = () => {
    if (userInput.trim() === "") return; // Ignore empty input

    const userMessage = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMessage]);

    // Show loading indicator
    setIsLoading(true);
    setTimeout(() => {
      // Process input after delay
      processUserInput(userInput);
      setIsLoading(false);
    }, 2000); // Simulate 5-second delay

    // Clear input
    setUserInput("");
  };

  const processUserInput = (input) => {
    if (!currentCategory) {
      // Handle category selection
      const categoryIndex = parseInt(input) - 1;
      if (categoryIndex >= 0 && categoryIndex < chatbotData.categories.length) {
        const category = chatbotData.categories[categoryIndex];
        setCurrentCategory(category);
        const botMessage = {
          sender: "bot",
          text: `You selected "${category.category}". Please choose an option:\n` +
            category.keywords
              .map((kw, index) => `${categoryIndex + 1}.${index + 1} ${kw.keyword}`)
              .join("\n"),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const botMessage = { sender: "bot", text: "Invalid category. Please try again." };
        setMessages((prev) => [...prev, botMessage]);
      }
    } else {
      // Handle keyword search or selection
      const keywordIndex = parseInt(input.split(".")[1]) - 1;
      const keywordMatch = chatbotData.categories
        .flatMap((category) => category.keywords)
        .find((kw) => kw.keyword.toLowerCase().includes(input.toLowerCase()));

      if (keywordMatch) {
        const botMessage = { sender: "bot", text: keywordMatch.info, isHTML: true };
        setMessages((prev) => [...prev, botMessage]);
        setCurrentCategory(null); // Reset to show categories again
      } else if (keywordIndex >= 0 && keywordIndex < currentCategory.keywords.length) {
        const keyword = currentCategory.keywords[keywordIndex];
        const botMessage = { sender: "bot", text: keyword.info, isHTML: true };
        setMessages((prev) => [...prev, botMessage]);
        setCurrentCategory(null); // Reset to show categories again
      } else {
        const botMessage = { sender: "bot", text: "No matching keyword found. Please try again." };
        setMessages((prev) => [...prev, botMessage]);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-red-100">
      {/* Header */}
      <div className="bg-blue-600 text-white text-center p-4 shadow-md">
        <h1 className="text-2xl font-bold">NITW CHATBOT</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-grow p-4 overflow-y-auto relative">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "bot" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  message.sender === "bot"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } px-4 py-2 rounded-lg max-w-xs`}
              >
                {message.isHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                ) : (
                  message.text.split("\n").map((line, i) => <p key={i}>{line}</p>)
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 shadow-md flex items-center">
        <input
          type="text"
          placeholder="Enter your choice or keyword..."
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleUserInput();
          }}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          onClick={handleUserInput}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
