import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message/Message";
import "./Messages.css";

function Messages({ messages, name }) {
  return (
    <>
      <ScrollToBottom className="messages">
        <section id="chatArea">
          {messages.map((message, i) => (
            <div id="messageContainer" key={i}>
              <Message message={message} name={name} />
            </div>
          ))}
        </section>
      </ScrollToBottom>
    </>
  );
}

export default Messages;
