import React, { useContext, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import img from '../../assets/bg2.jpg';
import './login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import axios from 'axios';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const result = await login(email, password);
            const loginUser = result.user;
            console.log(loginUser);
            e.target.reset();
            setSuccessMessage('Login successful!');
            setErrorMessage('');

            const user = { email };

            // Send user data to the server
            const response = await axios.post('https://restaurent-server-three.vercel.app/jwt', user,{withCredentials: true});
            if(response.data.success){
                navigate(location?.state?location?.state: '/');
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                setErrorMessage('Worng password and email.');
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
                setErrorMessage('No response from the server. Please try again.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setErrorMessage('An error occurred. Please try again.');
            }
            setSuccessMessage('');
        }
    }

    return (
        <div className='relative min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}>
            <div className='absolute inset-0 bg-black opacity-40'></div>
            <div className='relative w-80 md:w-[300px] bg-white bg-opacity-10 mx-auto rounded-md p-4 backdrop-blur-md'>
                <div className='text-center'>
                    <h1 className='text-white font-Rowdies text-3xl'>Login Now</h1>
                </div>
                <div className='mt-4'>
                    <form onSubmit={handelSubmit}>

                        <div className='mt-2'>
                            <input type="email" placeholder='Email' required name='email' className='w-full h-10 px-2 rounded-md border-none text-[14px]' />
                        </div>
                        <div className='mt-2 relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                required
                                name="password"
                                id=""
                                className='w-full h-10 px-2 rounded-md border-none text-[14px]'
                            />
                            <span
                                onClick={handleTogglePassword}
                                className='absolute right-3 top-3 cursor-pointer'
                            >
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </span>
                        </div>

                        <div className='mt-4'>
                            <button className='w-full py-2 bg-yellow-400 rounded-md font-Rowdies text-white'>
                                Login Now
                            </button>
                        </div>

                    </form>
                </div>
                {errorMessage && <p className="text-red-500 text-[10px] mt-2 text-center">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-[10px] mt-2 text-center ">{successMessage}</p>}
                <div className='mt-2 text-center text-white'>
                    <p>Don't Have an Account?
                        <Link to='/sign-up'>
                            <span className='text-blue-500 cursor-pointer'>Sign Up</span>
                        </Link>
                    </p>
                </div>
                <div className='flex justify-center items-center gap-3 mt-4'>
                    <div className='h-px w-1/4 bg-white'></div>
                    <div className='text-white'> or </div>
                    <div className='h-px w-1/4 bg-white'></div>
                </div>
                {/* Google login */}
                <div className='flex justify-between items-center py-2 bg-red-400 rounded-md px-2 mt-2'>
                    <div className='text-2xl text-white'><FcGoogle /></div>
                    <div className='text-white'>Login With Google</div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Login;
