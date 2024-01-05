import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/signup.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions



const Login = ()=>{

    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()



     const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);

        try {
            dispatch(setLoading(true));
           
            const response = await axios.post('http://127.0.0.1:8000/login/', {
            email,
            password,
            });

            if (response.data.success) {
                dispatch(setUser(response.data.user));

                // Redirect to the home page
                setTimeout(() => {
                    navigate('/'); // Change '/' to the actual path of your home page
                }, 2000); // 2000 milliseconds (2 seconds) delay
            } else {
                console.error('Signup failed:',response.data.errors);
               
            
            // Handle failed signup, e.g., show error messages to the user
            }
        } catch (error) {
            setTimeout(() => {
                setIsLoading(isLoading);
                setErrorMessage(`Incorrect email or password.`);
               
            }, 2000); // 2000 milliseconds (2 seconds) delay
           
            // Handle unexpected errors
        }
        finally {
            dispatch(setLoading(false));
            //setIsLoading(!isLoading);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
   
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className='form-header'>
                        <i class="fa-solid fa-user"></i>
                        <span>Login and start learning!</span>
                        
                    </div>
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                    <div className={`form-group ${email ? 'active' : ''}`}>
                        <input type="text" id="email" value={email} onChange = {handleEmailChange} required />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className={`form-group ${password ? 'active' : ''}`}>
                        <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange = {handlePasswordChange} required />
                        <label htmlFor="password">Password</label>
                        <div className='eye-icon' onClick={togglePasswordVisibility}>
                            <i class={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                        </div>
                    </div>
                    

                    <div className='btn-wrapper'>
                        <button type="submit">
                            Login
                            {isLoading ? <div className="loader"></div> : '' }
                            
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;