import React from "react";
import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
// function ChatFeed () {
const ChatFeed = (props) => {
const {chats, activeChat, userName, messages} = props
const chat = chats && chats[activeChat]
const renderMessages = () => {
    const keys = Object.keys(messages)
    return keys.map((key, index) => {
        const message = messages[key]
        const lastMessageKey = index ===0 ? null: keys[index-1]
        const myMessage = userName === message.sender.username
        return(
            <div key={'msg_${index}'} style={{width:'100%'}}>
                <div className="msg-block">
                    {
                        myMessage ? <MyMessage/> : <TheirMessage/>
                    }
                </div>
                <div className="read-receipts" style={{marginRight: myMessage ? '18px': '0px', marginLeft: myMessage ? '0px': '68px'}}>
                read-receipts
                </div>
            </div>
        )
    })
}
return (
    <div className="chat-feed">

    </div>
)
}


export default ChatFeed