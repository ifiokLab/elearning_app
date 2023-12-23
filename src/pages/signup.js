import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/signup.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';



const Signup = ()=>{
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


     const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', { fname, lname ,email,password,ConfirmPassword});
    };
    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className='form-header'>
                        <i class="fa-solid fa-user"></i>
                        <span>Sign up and start learning!</span>
                        
                    </div>
                    <div className={`form-group ${fname ? 'active' : ''}`}>
                        <input type="text" id="fname" value={fname} onChange = {handleFnameChange} required />
                        <label htmlFor="fname">First name</label>
                    </div>
                    <div className={`form-group ${lname ? 'active' : ''}`}>
                        <input type="text" id="lname" value={lname} onChange = {handleLnameChange} required />
                        <label htmlFor="lname">last name</label>
                    </div>
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
                    <div className={`form-group ${ConfirmPassword ? 'active' : ''}`}>
                        <input  type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={ConfirmPassword} onChange = {handleConfirmPasswordChange} required />
                        <label htmlFor="password">Confirm Password</label>
                        <div className='eye-icon' onClick={toggleConfirmPasswordVisibility}>
                            <i class={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye' }`}></i>
                        </div>
                    </div>

                    <div className='btn-wrapper'>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;