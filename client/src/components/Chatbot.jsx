import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext"; // Import the user context
import axios from "axios"; // Import axios for API requests
import WingmanLogo from "../assets/icons/Wingman-logo.png"; // Import the Wingman logo

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle chatbot visibility
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(""); // State to store user input
  const { token } = useUser(); // Get the token from the user context

  const toggleChatbot = () => {
    setIsOpen(!isOpen); // Toggle chatbot visibility
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return; // Prevent sending empty messages

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);

    const userMessage = input; // Store the user's message
    setInput(""); // Clear input field

    try {
      // Send the user's message to the /chat API
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/chat`,
        { message: userMessage },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Add the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.reply || "No response from bot." },
      ]);
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  // Add the first message from the bot when the chatbot is opened
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          sender: "bot",
          text: "Hey! I'm Wingman 🐾, your little buddy here to help you out. Let's tackle this together!",
        },
      ]);
    }
  }, [isOpen]);

  return (
    <div className="z-[9999]">
      {/* Chatbot Toggle Button */}
      <button
        onClick={toggleChatbot}
        className="fixed bottom-4 right-4 w-18 h-18 rounded-full hover:opacity-90 z-[9999] flex items-center justify-center p-0"
      >
        <img
          src={WingmanLogo}
          alt="Wingman Logo"
          className="w-full h-full object-cover"
        />
      </button>

      {/* Chatbot Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-[9999]">
          {/* Chatbot Header */}
          <div className="bg-primary text-white p-2 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">Chatbot</h3>
            <button
              onClick={toggleChatbot}
              className="text-white text-xl font-bold"
            >
              &times;
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;