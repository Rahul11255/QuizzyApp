import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const Navigate = useNavigate();

  const handleLogin = () => {
    if (!username) {
      alert("Please enter a name.");
    } else {
      Navigate("/quiz");
      localStorage.setItem("name",username)
    }
  };

  return (
    <div className="login_container">
      <div className=" mb-12 w-80 rounded-md p-10 login_first_div">
        <div className="text_email"> <p> Enter Name </p> </div>
        <div>
          <div >
            <input
              type="text"
              placeholder="Enter your name....."
              id="username"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <button onClick={handleLogin} className="login_btn">Start now</button>
      </div>
    </div>
  );
}

export default LoginScreen;
