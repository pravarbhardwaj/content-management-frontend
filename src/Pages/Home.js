import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserData from "../components/UserData";
import Form from "react-bootstrap/Form";
import UserDataAdmin from "../components/UserDataAdmin";

function Home() {
  useEffect(() => {
    fetchUsers(API);
    // eslint-disable-next-line
  }, []);

  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [adminFilter, setAdminFilter] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  let navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL + "/fetch_users";
  function logout() {
    localStorage.removeItem("user-info");
    navigate("/login");
  }

  function addParameterToURL(param, url) {
    url += (url.split("?")[1] ? "&" : "?") + param;
    return url;
  }

  const fetchUsers = async (url) => {
    const storage = localStorage.getItem("user-info")
      ? JSON.parse(localStorage.getItem("user-info"))
      : null;
    if (storage === null) {
      return <Navigate to="/login" />;
    }
    try {
      let res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + storage["access_token"],
        },
      });

      if (res.status === 401) {
        alert("Session expired. Please log in again!");
        logout();
      }

      const data = await res.json();

      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  async function searchFilter() {
    let url = API;
    if (userFilter !== "") {
      url = addParameterToURL("username=" + userFilter, url);
    }
    if (adminFilter && adminFilter !== "Admin Filter") {
      url = addParameterToURL("admin=" + adminFilter.toString(), url);
    }

    await fetchUsers(url);
  }

  if (userInfo === null) {
    return <Navigate to="/login" />;
  }

  if (userInfo["admin"]) {
    return (
      <div
        className="col-sm-8 offset-sm-2"
        style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
      >
        <div style={{ display: "flex" }}>
          <h2> Welcome {userInfo["username"]}!</h2>
          <button
            onClick={logout}
            style={{ marginLeft: "auto", height: 40, width: 40 }}
            className="btn btn-danger"
          >
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>
        <input
          type="text"
          placeholder="username"
          className="form-control"
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <br />
        <Form.Select
          onChange={(e) => setAdminFilter(e.target.value)}
          aria-label="Admin Filter"
        >
          <option>Admin Filter</option>
          <option value={false}>false</option>
          <option value={true}>true</option>
        </Form.Select>
        <br />
        <button onClick={searchFilter} className="btn btn-primary">
          Filter
        </button>

        <h4 style={{ marginTop: 20 }}>User Data Table</h4>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User</th>
              <th scope="col">Admin</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <UserDataAdmin
              users={users}
              setUsers={setUsers}
              token={userInfo["access_token"]}
            />
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div
      className="col-sm-8 offset-sm-2"
      style={{ paddingTop: 10, paddingLeft: 10, paddingRight: 10 }}
    >
      <div style={{ display: "flex" }}>
        <h2> Welcome {userInfo["username"]}!</h2>
        <button
          onClick={logout}
          style={{ marginLeft: "auto", height: 40, width: 40 }}
          className="btn btn-danger"
        >
          <i className="bi bi-box-arrow-right" />
        </button>
      </div>
      <br />
      <input
        type="text"
        placeholder="username"
        className="form-control"
        onChange={(e) => setUserFilter(e.target.value)}
      />
      <br />
      <Form.Select
        onChange={(e) => setAdminFilter(e.target.value)}
        aria-label="Admin Filter"
      >
        <option>Admin Filter</option>
        <option value={false}>false</option>
        <option value={true}>true</option>
      </Form.Select>
      <br />
      <button onClick={searchFilter} className="btn btn-primary">
        Filter
      </button>

      <h4 style={{ marginTop: 20 }}>User Data Table</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">User</th>
            <th scope="col">Admin</th>
          </tr>
        </thead>
        <tbody>
          <UserData users={users} />
        </tbody>
      </table>
    </div>
  );
}

export default Home;
