import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/instructor.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';




const Instructor = ()=>{
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <div className='course-header'>
                    <div className='title' >Courses</div>
                   <Link className='create-course'>Create Course</Link>
                </div>
                <div className='course-box'>
                    <img src={logo} alt = 'course-image' />
                    <div className='details-card'>
                        <div className='box-1'>
                            <div className='title'>Complete Python MasterClass</div>
                            <div className='edit'>Edit / Manage course</div>
                        </div>
                        <div className='status'>
                            <span>Status:</span>
                            <span>Draft</span>
                        </div>
                    </div>
                </div>
                <div className='course-box'>
                    <img src={logo} alt = 'course-image' />
                    <div className='details-card'>
                        <div className='box-1'>
                            <div className='title'>Complete Python MasterClass</div>
                            <div className='edit'>Edit / Manage course</div>
                        </div>
                        <div className='status'>
                            <span>Status:</span>
                            <span>Draft</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor;