import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditUser({ user_data, setUsers, token }) {
  const [show, setShow] = useState(false);
  const [userName, updateUserName] = useState(user_data["username"]);
  const [userRole, updateRole] = useState(user_data["admin"]);

  const handleClose = () => setShow(false);

  const patchData = async () => {
    const patch_data = { username: userName, admin: userRole };

    let res = await fetch(
      process.env.REACT_APP_API_URL + "/user/" + user_data.id.toString(),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(patch_data),
      }
    );
    return await res.json();
  };

  const handleSave = async () => {
    if (userName === "") {
      alert("Username can not be empty.");
      return;
    }
    const patch_resp = await patchData();
    if (patch_resp.status === false){
      alert(patch_resp.message)
    }
    let res = await fetch(process.env.REACT_APP_API_URL+"/fetch_users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    setUsers(data);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow} size="sm">
        Edit User
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          User Name:
          <input
            type="text"
            placeholder="Username"
            className="form-control"
            value={userName}
            onChange={(e) => updateUserName(e.target.value)}
          />
          <div style={{marginTop:15}}>
          Role Type:
          <Form.Select
            defaultValue={userRole}
            onChange={(e) => updateRole(e.target.value)}
            aria-label="Role Select"
          >
            <option value={false}>Manager</option>
            <option value={true}>Admin</option>
          </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
