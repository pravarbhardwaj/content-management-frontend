import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
    let navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [admin, setAdmin] = useState("")

  function registerButtonStatus() {
    
    if (username === "" || password === "" || confirmPass === "" || admin === "Select Role"  ) {
      return true;
    }
    return false;
  }

  async function register() {
    if (password !== confirmPass) {
      alert("Passwords Do Not Match!");
      return;
    }

    let credentials = { "username": username, "password": password, "admin": admin };

    let result = await fetch('http://127.0.0.1:8000/create_user', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': "application/json"
        },
        // body: '{\n  "admin": true,\n  "username": "test",\n  "password": "a"\n}',
        body: JSON.stringify(credentials)
    });

    result = await result.json();
    if (result.status === false) {
      alert(result.message);
      return;
    }
    setUsername("")
    setPassword("")
    setConfirmPass("")
    setAdmin("Select Role")
    alert(result.message)
    navigate("/login")
  }
  return (

      <div className="col-sm-4 offset-sm-4" style={{paddingLeft: 10, paddingRight: 10}}>
        <br />
        <h1>Registration Page</h1>
        <br />
        <input
          type="text"
          placeholder="Username"
          className="form-control"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          className="form-control"
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <br />
        <Form.Select onChange={(e) => setAdmin(e.target.value)} aria-label="Role Select">
          <option>Select Role</option>
          <option value={false}>Manager</option>
          <option value={true}>Admin</option>
        </Form.Select>
        <br />
        <div className="d-flex p-2">
        <button
          onClick={register}
          disabled={registerButtonStatus()}
          className="btn btn-primary"
        >
          Create
        </button>
        <button style={{marginLeft: "auto"}} onClick={() => navigate("/login")} className="btn btn-secondary">Go To Login</button>
        </div>
      </div>

  );
}

export default Register;
