import React from "react";
import { ChatEngine } from "react-chat-engine";
import "./App.css";
import ChatFeed from "./components/ChatFeed";
function Chat() {
  return (
    <ChatEngine
      height="100vh"
      projectID="0b584e6a-75e9-4d8f-96f6-eea1a2bd3cac"
      userName="Erika"
      userSecret="123123"
      //   renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
}
export default Chat;
