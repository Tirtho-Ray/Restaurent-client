// Register.jsx

import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import img from '../../assets/bg2.jpg';
import './login.css';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Register = () => {
    const { createUser, googleSignIn } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        const user = { name, email, password, confirmPassword };

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
        if (!password.match(passwordRegex)) {
            const err = "Password must be at least 6 characters, include uppercase and lowercase letters, and contain only alphanumeric characters";
            setError(err);
            setSuccessMessage('');
            return;
        }

        if (password !== confirmPassword) {
            const err = "Passwords do not match";
            setError(err);
            setSuccessMessage('');
            return;
        }

        setError('');

        createUser(email, password)
            .then(result =>{
                
                console.log(result);
                e.target.reset()
                setSuccessMessage('User created successfully.'); 
                navigate('/') 
            })
            .catch(err=>{
                console.log(err);
            })
        // send user data to server
        try {
            const serverURL = 'http://localhost:5000';
            const response = await fetch(`${serverURL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                e.target.reset();
                setSuccessMessage('User created successfully.');
                setError('');
                navigate('/');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed');
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError('Internal Server Error');
            setSuccessMessage('');
        }
    };

    



    const handelGoogleLogin=()=>{
        googleSignIn()
        .then(result =>{
            result.success
            setSuccessMessage('User created successfully.');
            navigate('/') 
        })
        .catch(err=>{
                console.log(err);
        })
    }

    return (
        <div className='relative min-h-screen flex items-center justify-center' style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}>
            <div className='absolute inset-0 bg-black opacity-40'></div>
            <div className='relative w-80 md:w-[300px] bg-white bg-opacity-10 mx-auto rounded-md p-4 backdrop-blur-md'>
                <div className='text-center'>
                    <h1 className='text-white font-Rowdies text-3xl'>Sign up</h1>
                </div>
                <div className='mt-4'>
                    <form onSubmit={handelSubmit}>
                        <div className='mt-2'>
                            <input type="text" placeholder='Name' name="name" required className='w-full h-8 px-2 rounded-md border-none text-[10px]' />
                        </div>
                        <div className='mt-2'>
                            <input type="email" placeholder='Email' name="email" required className='w-full h-8 px-2 rounded-md border-none text-[10px]' />
                        </div>
                        <div className='mt-2 relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                name="password"
                                id=""
                                className='w-full h-8 px-2 rounded-md border-none text-[10px]'
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-3 cursor-pointer'
                            >
                                {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </span>
                        </div>
                        {error && <p className="text-error text-[10px] mt-1">{error}</p>}
                        {successMessage && <p className="text-success text-[10px] mt-1">{successMessage}</p>}
                        <div className='mt-2 relative'>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='Confirm password'
                                name="confirmPassword"
                                id=""
                                className='w-full h-8 px-2 rounded-md border-none text-[10px]'
                            />
                            <span
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute right-3 top-3 cursor-pointer'
                            >
                                {showConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </span>
                        </div>
                        
                        <div className='mt-4'>
                            <button className='w-full py-2 bg-yellow-400 rounded-md font-Rowdies text-white'>
                                Sign up
                            </button>
                        </div>
                        <div className='mt-2 text-center text-white'>
                            <p>Already have an account?
                                <Link to="/login">
                                    <span className='text-blue-500 cursor-pointer'>Login</span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
                <div className='flex justify-center items-center gap-3 mt-4'>
                    <div className='h-px w-1/4 bg-white'></div>
                    <div className='text-white'> or </div>
                    <div className='h-px w-1/4 bg-white'></div>
                </div>
                <div className='flex justify-between items-center py-2 bg-red-400 rounded-md px-2 mt-2'>
                    <div className='text-2xl text-white'><FcGoogle /></div>
                    <div onClick={handelGoogleLogin} className='text-white'>Login With Google</div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
