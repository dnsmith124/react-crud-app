import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import ConfirmDeletionOverlay from './components/ConfirmDeletionOverlay';
import ModalButton from './components/ModalButton';
import './App.css';
import { useEffect, useState, useCallback } from 'react';

const App = () => {

  const usersData = (localStorage.getItem('UserTable')) 
    ? JSON.parse(localStorage.getItem('UserTable')) 
    : [] 
  const initialFormState = { id: null, name: '', username: '' }
  const count = (usersData === null) ? 0 : usersData.length;

  const [users, setUsers] = useState(usersData);
  const [userCount, setUserCount] = useState(count);
  const [editing, setEditing] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState)


  const addUser = (user) => {
    user.id = userCount + 1;
    setUserCount(userCount + 1);
    if(users != null )
      setUsers([...users, user]);
    else 
      setUsers([user]);
  }

  const deleteUser = (userToDelete) => {
    setCurrentUser(userToDelete);
    setEditing(false);
    setConfirmDeletion(true);
  }

  const confirmDeleteUser = () => {
    setConfirmDeletion(false);    
    setUsers(users.filter((user) => user.id !== currentUser.id));
    setCurrentUser(initialFormState);
  }

  const editRow = (user) => {
    setEditing(true);
    setConfirmDeletion(false);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  }

  const saveUserTable = useCallback(() => {
    localStorage.setItem('UserTable', JSON.stringify(users));
    console.log(localStorage.getItem('UserTable'));
  }, [users]);

  const clearUserTable = () => {
    localStorage.clear();
    setCurrentUser(initialFormState);
    setUsers([]);
  }

  useEffect(() => {
    saveUserTable();
  }, [users, saveUserTable])


  return (
    <div className="container">
      <h1>CRUD App</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable users={users} deleteUser={deleteUser} editRow={editRow} />
          <div className="button-container">
            <ModalButton 
              clickCallbackFunction={saveUserTable} 
              timerLength={3}
              modalMessage="Users saved to local memory."
            >
              Save Users
            </ModalButton>
            <ModalButton 
              clickCallbackFunction={clearUserTable} 
              timerLength={3}
              modalMessage="All users removed."
            >
              Clear All Users
            </ModalButton>
          </div>
        </div>
      </div>
      <ConfirmDeletionOverlay currentUser={currentUser} confirmDeleteUser={confirmDeleteUser} overlayStatus={confirmDeletion} setConfirmDeletion={setConfirmDeletion} />
    </div>
  );
}

export default App;
