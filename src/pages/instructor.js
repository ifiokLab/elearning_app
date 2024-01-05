
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/instructor.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import { useNavigate } from 'react-router-dom';



const Instructor = ()=>{
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const User = useSelector(state => state.user.user);
    const navigate = useNavigate();

    
    useEffect(() => {

       
        if (User=== null || User?.isInstructor === false ) {
            // Redirect to the login page
            navigate('/instructor-login/');
            return; // Stop further execution of useEffect
        }


        const fetchUserCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/instructor-courses/', {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${User.auth_token}`, // Include the user ID in the Authorization header
                },
            });
            console.log(response.data.all_courses)
            setCourses(response.data.all_courses);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user courses:', error);
            setLoading(false);
        }
        };

        fetchUserCourses();
    }, []);
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <div className='course-header'>
                    <div className='title' >Courses</div>
                   <Link to = '/create-course/' className='create-course'>Create Course</Link>
                </div>
                {courses.length > 0 ? (
                    courses.map(course => (
                    <div key={course.id} className='course-box'>
                    <img src={`${apiUrl}${course.thumbnail}`} alt={course.title} />
                    <div className='details-card'>
                        <div className='box-1'>
                        <div className='title'>{course.title}</div>
                        <Link to={`/course-sections/${course.id}/${course.title}/`} className='edit'>
                            Edit / Manage course
                        </Link>
                        </div>
                        <div>
                        <Link to={`/courses/add-requirement/${course.id}/${course.title}/`} className='requirements'>
                            Add requirements
                        </Link>
                        </div>
                        <div className='status'>
                        <Link to={`/courses/add-objectives/${course.id}/${course.title}/`} className='objectives'>
                            Add objectives
                        </Link>
                        <Link to={`/course/${course.id}/edit/`} className='edit-course'>
                            edit-course
                        </Link>
                        <span>Status:</span>
                        <span>Draft</span>
                        </div>
                    </div>
                    </div>
                    ))
                ) : (
                <p>You haven't created any courses yet.</p>
                )}

                
            </div>
        </div>
    );
};

export default Instructor;