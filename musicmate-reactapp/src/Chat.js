import React from "react";
import { ChatEngine } from "react-chat-engine";
import "./App.css";

function Chat() {
  return (
    <ChatEngine
      height="100vh"
      projectID="6a5f4de8-92af-4614-a696-5e5593baaf59"
      userName="Erika"
      userSecret="123123"
    />
  );
}
export default Chat;
