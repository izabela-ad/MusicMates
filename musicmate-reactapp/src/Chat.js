import React from "react";
import { ChatEngine } from "react-chat-engine";
import "./App.css";
import ChatFeed from "./components/ChatFeed";
import DirectChatPage from "./components/DMs";

function Chat() {
  return (
    <ChatEngine
      height="100vh"
      projectID="6a5f4de8-92af-4614-a696-5e5593baaf59"
      userName="Izabela"
      userSecret="123123"
      //   renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
}
export default Chat;
