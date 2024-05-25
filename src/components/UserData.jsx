const UserData = ({users}) => {
    return (
        <>
        {
            users.map((curUser) => {
                const {id, username, admin} = curUser;

                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{username}</td>
                        <td>{admin.toString()}</td>
                    </tr>
                )
            })
        }
        </>
    )
}

export default UserData