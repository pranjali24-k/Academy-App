import { useState } from "react"
import SignupForm from "../components/SignupComponents/SignupForm";
import LoginForm from "../components/SignupComponents/LoginForm";
import { toast } from "react-toastify";

const AuthenticationPage = () => {
 const [flag,setFlag] = useState(false);
  return (
    <div className='wrapper'>
      {flag ? <h2>Student Signup</h2>: <h2>Student Login</h2>}
      {flag ? <SignupForm />:<LoginForm/>}
      {
        flag ?
          <p style={{cursor:'pointer'}} onClick={()=>{setFlag(!flag)}}>Already have account ? Click here to Login</p>
        :
          <>
            <p style={{cursor:'pointer'}} onClick={()=>{setFlag(!flag)}}>Don't have an account ? Click here to Signup</p>
            <p style={{cursor:'pointer',borderBottom:'1px solid black'}} onClick={()=>{toast.warning('Comming Soon !')}}>Teacher ? Click here to Login</p>
          </>
          
      }
    </div>
  )
}

export default AuthenticationPage