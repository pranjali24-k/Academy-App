import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import Card from '../components/Card';

const AllStudents = () => {
  var [studentData, setStudentData] = useState([]);
  var [pendingStudent,setPendingStudent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'students')),
      (querySnapshot) => {
        const studentD = [];
        querySnapshot.forEach((doc) => {
          studentD.push({ id: doc.id, ...doc.data() });
        });
        setStudentData(studentD);
      },
      (error) => {
        console.log('Error fetching Students:', error)
      }
    );
    return () => {
      unsubscribe();
    };

  }, []);

  if(studentData){
    var onlyStudent = studentData.filter((element)=>{
      return element.isStudent
    })
  }
  //check pending request student exist or not 
 var stpen=[];
  if(onlyStudent){
    stpen = onlyStudent.filter((element)=>{
      return element.applicationStatus=='pending'
    })
  }
  console.log(onlyStudent)
  return (
    <div className='wrapper'>
      {stpen.length>0?<h2>Pending Requests</h2>:<h2> No Pending Requests !</h2>}
      {
        onlyStudent.length > 0 && (
          <div className='card-wrapper'>
            {
              onlyStudent.map((element) => (
                element.applicationStatus=='pending' && !element.paymentStatus &&
                <Card 
                  key={element.id}
                  id={element.id}
                  title={element.name}
                  displayImage={element.profilePic}
                  path={`studentDetails/${element.id}`}
                />
              ))
            }
          </div>
        )
      }
      <div style={{display:'flex',flexWrap:'wrap'}}>
      <Button
        width={'120px'}
        text={'Shortlisted Students'}
        onClick={() => { navigate('/shortlisted_students') }}
        color={'green'}
      />
      <Button
        width={'120px'}
        text={'Rejected Students'}
        color={'red'}
        onClick={() => { navigate('/rejected_students') }}
      />
      </div>
    </div>
  )
}

export default AllStudents