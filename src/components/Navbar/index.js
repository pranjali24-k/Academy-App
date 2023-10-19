import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import './styles.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { clear_user } from '../../redux/actions/actionCreators';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
const Navbar = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    signOut(auth)
        .then(() => {
            toast.success('user logged out !');
            navigate('/')
            dispatch(clear_user())
        })
        .catch((error) => {
            toast.error(error.message)
        })

}
  return (
    <div className='navbar'>
    <div className='links'>
      <NavLink to='/' >Home</NavLink>
      { ! user &&<NavLink to='/signup' >Signup</NavLink>}
      <NavLink to='/aboutus' >About Us</NavLink>
      <NavLink to='/courses' >Courses</NavLink>
      <NavLink to='/profile' >Profile</NavLink>
      <NavLink to='/adminpage' >Admin ?</NavLink>
    </div>
  </div>
  )
}

export default Navbar