import React, { useState, useEffect }  from 'react';

const ModalButton = (props) => {

  const [modalStatus, setModalStatus] = useState(false);
  const [modalTimer, setModalTimer] = useState(0);


  const handleClick = () => {
    props.clickCallbackFunction();
    setModalStatus(true);
    setModalTimer(props.timerLength);
  }

  useEffect(()=> {
    if(modalTimer > 0) 
      setTimeout(() => setModalTimer(modalTimer - 1), 1000); 
    else 
      setModalStatus(false);
  }, [modalTimer]); 

  return (
    <div>
      <button className="save-button" onClick={handleClick}>{props.children}</button>
      <div className={`saved-modal ${modalStatus}`}>
        <p>{props.modalMessage}</p>
      </div>
    </div>
  )
}

export default ModalButton;
