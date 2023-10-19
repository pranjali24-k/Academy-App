import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import Card from '../components/Card';

const OurFaculty = () => {
  var [studentData, setStudentData] = useState([]);
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

  if (studentData) {
    var onlyTeacher = studentData.filter((element) => {
      return !element.isStudent
    })
  }
  console.log(onlyTeacher)
  return (
    <div className='wrapper'>
      <h2>Our Faculty</h2>
      <div className='card-wrapper'>
        {
          onlyTeacher.map((element) => (  
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
    </div>
  )
}

export default OurFaculty