import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/Button';

const StudentDetails = () => {
  const [student, setStudent] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState(() => { return 'pending' })

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id, status]);

  const getData = async () => {
    try {
      const docRef = doc(db, "students", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStudent({ id: id, ...docSnap.data() });
      } else {
        console.log("No such student!");
        toast.error("No such student!");
        navigate("/allstudents");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  async function changeStatus(value) {
    try {
      await setDoc(doc(db, "students", id), { ...student, applicationStatus: value });
      if (value == 'approved') { toast.success('Application Approved !') }
      else { toast.success('Application  Rejected !') }
      setStatus(value)
    } catch (e) {
      console.log("Error = ", e)
      toast.error(e.message)

    }
  }

  async function changePaymentStatus() {
    try {
      await setDoc(doc(db, "students", id), { ...student, paymentStatus: true });
      toast.success('Payment Status Changed !')
    } catch (e) {
      console.log("Error = ", e)
      toast.error(e.message)

    }
  }

  return (
    <div className='wrapper'>
      {
        student ?
          <>
            <img src={student.profilePic} alt="" height={"160px"} width={"140px"}
              style={{ borderRadius: '10%' }}
            />
            <p>{student.name}</p>
            <p>{student.uid}</p>
            <p style={{ textAlign: 'center' }}> Number : {student.number}  Email : {student.email} </p>
            {student.applicationStatus == 'pending' && <p
              style={{ color: 'yellow' }}
            >
              Application Status : {student.applicationStatus.toUpperCase()}
            </p>}
            {student.applicationStatus == 'rejected' && <p
              style={{ color: 'red' }}
            >
              Application Status : {student.applicationStatus.toUpperCase()}
            </p>}
            {student.applicationStatus == 'approved' && <p
              style={{ color: 'green' }}
            >
              Application Status : {student.applicationStatus.toUpperCase()}
            </p>}
            {
              student.paymentStatus ? <p style={{ color: 'green' }}>Payment Done !</p>
                : <p style={{ color: 'red' }}>Payment Not Yet Done !</p>
            }
            {
              student.applicationStatus == 'pending' &&
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Button
                  width={'80px'}
                  text={'Approve'}
                  color={'green'}
                  onClick={() => { changeStatus('approved') }}
                />
                <Button
                  width={'80px'}
                  color={'red'}
                  text={'Reject'}
                  onClick={() => { changeStatus('rejected') }}
                />
              </div>
            }
            {
              !student.paymentStatus &&
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Button
                  width={'80px'}
                  text={'Payment Done'}
                  color={'green'}
                  onClick={() => { changePaymentStatus() }}
                />
              </div>
            }
          </>
          :
          <p>No Details Found</p>
      }
    </div>
  )
}

export default StudentDetails