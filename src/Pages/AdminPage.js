import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../components/Button';
import { clear_user } from '../redux/actions/actionCreators';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const AdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    function handleOnClick(){
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
        <div className='wrapper'>
            <h2>Admin Page</h2>
            <div className="card-wrapper">
            <Card
                title={'Students'}
                displayImage={'https://images.unsplash.com/photo-1491308056676-205b7c9a7dc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80'}
                path={'allstudents'}
            />
            <Card
                title={'Teachers'}
                displayImage={'https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80'}
                path={'allteachers'}
            />
            <Card
                title={'Courses'}
                displayImage={'https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'}
                path={'allcourses'}
            />
            </div>
            <Button
                width={'100px'}
                text={'Logout'}
                onClick={handleOnClick}
                disabled={false}
            />
        </div>
    )
}

export default AdminPage