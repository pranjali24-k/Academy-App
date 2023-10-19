import React from 'react'
import Loader from './Loader';
import { Outlet,Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function AdminPrivateRoutes() {
  
    const [user,loading,error] = useAuthState(auth);

        if(loading){
            return <Loader/>
        }
        else if(!user || error){
            return <Navigate to='/adminlogin' replace />;
        }
        else if(user.email!=='aktheboss123@gmail.com'){
            return <Navigate to='/adminlogin' replace />;
        }
        else{
            return <Outlet/>
        }
    }


export default AdminPrivateRoutes