import React, {useState, useEffect} from 'react';

const EditUserForm = (props) => {
  
  const [user, setUser] = useState(props.currentUser);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateUser(user.id, user);
  }

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  return(
    <div className="edit-user-form">
      <form onSubmit={handleSubmit} >
        <label>Name</label>
        <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        <label>Username</label>
        <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        <button className="update-user-button">Update user</button>
        <button 
          onClick={() => props.setEditing(false) }
          className="button muted-button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditUserForm;