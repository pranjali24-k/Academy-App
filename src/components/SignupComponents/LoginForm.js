import React, { useState } from 'react'
import InputComponent from '../Input'
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { set_user } from '../../redux/actions/actionCreators';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleOnClick() {

    setLoading(true)
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth, email, password
        );
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'students', user.uid));
        const userData = userDoc.data();
          console.log("Login = ",userData)
        //saving user in redux state 
        dispatch(
          set_user({
            name: userData.name,
            number:userData.number,
            email: user.email,
            uid: user.uid,
            profilePic: userData.profilePic, // added profile pic url to doc
            applicationStatus:userData.applicationStatus,
            selectedCourse:userData.selectedCourse,
            isStudent:userData.isStudent,
            paymentStatus:userData.paymentStatus
          })
        )
        toast.success('Login Successfull !')
        setLoading(false)
        navigate('/profile')

      } catch (e) {
        toast.error(e.message)
        setLoading(false)
        console.log("Error in auth ", e)
      }
    } else {
      setLoading(false);
      toast.error('Make sure email and password should not empty !')
    }
  }
  
  return (
    <>
         <InputComponent
        state={email}
        setState={setEmail}
        placeholder='Email'
        type="email"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder='Password'
        type="password"
        required={true}
      />
      <Button
        text={!loading?"Login":'Loading ...'}
        onClick={handleOnClick}
        disabled={false}
      />
    </>
  )
}

export default LoginForm