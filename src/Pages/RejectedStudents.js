import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import Card from '../components/Card';
import Accordion from '../components/Accordion';

const RejectedStudents = () => {
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
        var onlyStudent = studentData.filter((element) => {
            return element.isStudent
        })
    }

    return (
        <div className='wrapper'>
            <h2>Rejected Student</h2>
            {
                onlyStudent.length > 0 && (
                    <div className='card-wrapper'>
                        {
                            onlyStudent.map((element) => (
                                element.applicationStatus == 'rejected' &&
                                <Accordion userData={element} />
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default RejectedStudents