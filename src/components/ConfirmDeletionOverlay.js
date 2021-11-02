import React, { useState, useEffect } from 'react';


const ConfirmDeletionOverlay = (props) => {

  const [user, setUser] = useState(props.currentUser);
  const [overlayStatus, setOverlayStatus] = useState(props.overlayStatus);

  const hideOverlay = (event) => {
    event.preventDefault();
    setOverlayStatus(false);
    props.setConfirmDeletion(false);
  }

  useEffect(() => {
    setUser(props.currentUser);
    setOverlayStatus(props.overlayStatus);
  }, [props]);
  
  return (
    <div className={`confirm-deletion-overlay ${overlayStatus}`} onClick={hideOverlay}> 
    { overlayStatus ? (
      <div className="content-container" >
        <p>Are you sure you want to delete <span className="user">{ user.username }</span>?</p>
        <button onClick={props.confirmDeleteUser}>Yes</button>
        <button >
          No
        </button>
      </div>
    ) : (
      null
    )}
    </div>
  );
}

export default ConfirmDeletionOverlay;