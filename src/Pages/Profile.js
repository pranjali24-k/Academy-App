import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clear_user } from '../redux/actions/actionCreators';
const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
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
    const user = useSelector(state => state.user);

    return (
        <div className='wrapper'>
            {user.name ? (
                <>
                    <img src={user.profilePic} alt="" height={"160px"} width={"140px"}
                        style={{ borderRadius: '10%' }}
                    />
                    <p>{user.name}</p>
                    <p>{user.uid}</p>
                    <p style={{ textAlign: 'center' }}> Number : {user.number}  Email : {user.email} </p>
                    <div className='buttons-wrapper'>
                        <Button
                            width={'100px'}
                            text={'Edit Profile'}
                            onClick={() => { navigate('/editprofile') }}
                            disabled={false}
                        />
                        <Button
                            width={'100px'}
                            text={'Your Courses'}
                            onClick={()=>{navigate('/yourcourse')}}
                            disabled={false}
                        />
                        <Button
                            width={'100px'}
                            text={'Logout'}
                            onClick={handleLogout}
                            disabled={false}
                        />
                    </div>

                </>
            ) : "Please Login First"}
        </div>
    )
}

export default Profile