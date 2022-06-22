import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("1");

  return (
    <section>
      <form>
        <div>
          <h1>입장 이름</h1>
          <input
            className="joinInput"
            placeholder="이름을 입력해주세요"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {name.length > 1 && room && (
            <Link to={`/chat?name=${name}&room=${1}`}>
              <button className="enterBtn" type="submit">
                입장
              </button>
            </Link>
          )}
        </div>
      </form>
    </section>
  );
}

export default Join;
