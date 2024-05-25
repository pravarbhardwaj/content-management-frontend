import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";

const UserDataAdmin = ({ users, setUsers, token }) => {
  return (
    <>
      {users.map((curUser) => {
        const { id, username, admin } = curUser;
        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{username}</td>
            <td>{admin.toString()}</td>
            <td>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <EditUser
                  user_data={curUser}
                  setUsers={setUsers}
                  token={token}
                />
                <DeleteUser
                  user_data={curUser}
                  setUsers={setUsers}
                  token={token}
                />
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default UserDataAdmin;
