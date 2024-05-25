import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteUser({ user_data, setUsers, token }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteData = async () => {
    await fetch(
      process.env.REACT_APP_API_URL+"/user/" + user_data.id.toString(),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const handleDelete = async () => {
    await deleteData();
    let res = await fetch(process.env.REACT_APP_API_URL+"/fetch_users", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await res.json();
    setUsers(data);
    alert(user_data.username + " Succesfully Deleted!");
    setShow(false);
  };

  return (
    <>
      <Button variant="danger" onClick={handleShow} size="sm">
        DELETE
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {user_data.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {user_data.username}? This action is
          irreversible!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteUser;
