import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginButtonStatus() {
    if (username === "" || password === "") {
      return true;
    }
    return false;
  }
  async function login() {
    console.warn(username, password);
    let credentials = { username: username, password: password };
    let result = await fetch(process.env.REACT_APP_API_URL+"/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(credentials),
    });

    if (result.status === 401) {
      alert("Incorrect username or password!");
      return;
    }
    result = await result.json();

    localStorage.setItem("user-info", JSON.stringify(result));
    navigate("/");
  }
  return (
 
      <div className="col-sm-4 offset-sm-4" style={{paddingLeft: 10, paddingRight: 10}}>
        <br />
        <h1>Login Page</h1>
        <br />
        <input
          type="text"
          placeholder="username"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div className="d-flex p-2">
          <button
            onClick={login}
            disabled={loginButtonStatus()}
            className="btn btn-primary"
          >
            Login
          </button>
          <button
            style={{ marginLeft: "auto" }}
            onClick={() => navigate("/register")}
            className="btn btn-secondary"
          >
            Go To Register
          </button>
        </div>
      </div>
    
  );
}

export default Login;
