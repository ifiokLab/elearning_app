import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/user-courses.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';


const UserCourses = ()=>{
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <div className='course-wrapper'>
                    <div className='popular'>
                        <h2>My Learning</h2>
                        <div className='time-text'>Learning a little each day adds up. Research shows that students who make learning a habit are more likely to reach their goals.</div>
                    </div>
                    <div className='course-container'>
                        <Link to='/course-detail' className='card'>
                            <img src = {logo} alt='' />
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
                                
                            </div>
                        </Link>
                        <Link to='' className='card'>
                            <img src = {logo} alt='' />
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
                                
                            </div>
                        </Link>
                        <Link to='' className='card'>
                            <img src = {logo} alt='' />
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
                               
                            </div>
                        </Link>
                        <Link to='' className='card'>
                            <img src = {logo} alt='' />
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
                                
                            </div>
                        </Link>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCourses;