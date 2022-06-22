import React from "react";
import "./Message.css";
const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    <div id="messageBox">
      {isSentByCurrentUser ? (
        <div id="userMessage">
          <span className={`messageOutline`}>
            <span className="chatUserName">{trimmedName}</span>
            <span className="chatText">{text}</span>
          </span>
        </div>
      ) : (
        <div id={user ? "otherUserMessage" : "noticeMessage"}>
          <span
            className={`messageOutline otherOutLine ${
              !user ? "height20" : null
            }`}
          >
            <span className="chatUserName">{user}</span>
            <span className="chatText">{text}</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
