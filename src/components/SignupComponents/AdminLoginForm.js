import React, { useState } from 'react'
import InputComponent from '../Input'
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';

const AdminLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    async function handleOnClick() {

        setLoading(true)
        if (email && password) {
            try {
                const userCredential = await signInWithEmailAndPassword(
                    auth, email, password
                );
                const user = userCredential.user;

                if (user && user.email === 'aktheboss123@gmail.com') {
                    toast.success('Login Successfull !')
                    setLoading(false)
                    navigate('/adminpage')
                }
                else {
                    toast.error('You are not admin !')
                    setLoading(false)
                    navigate('/')
                }

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
                text={!loading ? "Login" : 'Loading ...'}
                onClick={handleOnClick}
                disabled={false}
            />
        </>
    )
}

export default AdminLoginForm