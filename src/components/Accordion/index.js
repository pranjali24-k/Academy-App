import React, { useState } from 'react';
import './styles.css';

const Accordion = ({ userData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  var bgColor='#f1f1f1';
  if(!userData.paymentStatus){
    bgColor='red'
  }
  return (
    <div className={`accordion ${isOpen ? 'open' : ''}`} onClick={handleToggle}>
      <div style={{backgroundColor:`${bgColor}`}} className="accordion-header">
        <span>{userData.name.toUpperCase()}</span>
        <span>{userData.applicationStatus.toUpperCase()}</span>
        <span>{(userData.paymentStatus?'Payment Done':'Not Done').toUpperCase()}</span>
      </div>
      {isOpen && (
        <div  className="accordion-content">
          <div> {userData.profilePic && <img src={userData.profilePic} alt="Profile" />}</div>
          <div>
            <p>Email: {userData.email}</p>
            <p>Number: {userData.number}</p>
            <p>ID: {userData.id}</p>
            <p>Payment Status : {userData.paymentStatus?'Done':'Not Done'}</p>
            <p>Selected Course: {userData.selectedCourse.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
