import React from 'react';

const UserTable = (props) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

        { props.users != null && props.users.length > 0 ? (

          props.users.map((user) => (
            <tr key={user.id}>
              <td className="name">{user.name}</td>
              <td className="username">{user.username}</td>
              <td className="actions">
                <button 
                  onClick={() => props.editRow(user) }
                  className="button muted-button"
                >
                  Edit
                </button>
                <button 
                  className="button muted-button" 
                  onClick={ () => props.deleteUser(user) }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))

        ) : (

          <tr>
            <td colSpan={3}>No users</td>
          </tr>

        )}

      </tbody>
    </table>
  );
}

export default UserTable;