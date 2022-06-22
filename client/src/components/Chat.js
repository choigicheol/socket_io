import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Messages from "../Messages/Messages";
import "./Chat.css";

const ENDPOINT = "http://localhost:4000";
let socket;

function Chat({ location }) {
  const [name, setName] = useState("");
  // 테스트를 위해 room은 1로 고정
  const [room, setRoom] = useState("1");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    console.log(name, room);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }, [ENDPOINT, location.search]);

  // 마운트 시
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <>
      <Messages messages={messages} name={name} />
      <form className="sendForm">
        <input
          className="sendInput"
          type="text"
          placeholder="전송하려는 메세지를 입력하세요."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <button className="sendButton" onClick={(e) => sendMessage(e)}>
          전송
        </button>
      </form>
    </>
  );
}

export default Chat;
