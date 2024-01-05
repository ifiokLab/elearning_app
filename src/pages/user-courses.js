import { Link,useParams  } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import apiUrl from '../components/api-url';


const UserCourses = ()=>{
    const [courses, setCourses] = useState([]);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const fetchCourses = async () => {
            console.log('user.auth_token:',user);
          try {
            const response = await axios.get('http://localhost:8000/enrolled-courses/',{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
            setCourses(response.data.all_courses);
          } catch (error) {
            console.error('Error fetching courses:', error);
          }
        };
    
        fetchCourses();
    }, [user]);
    
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
                    {courses.map((course) => (
                        <Link to={`/course-view-page/${course.id}/${course.title}/`}  className='card'>
                            <img src = {`${apiUrl}${course.thumbnail}`} alt='' />
                            <div className='card-details'>
                                <h2>{course.title}</h2>
                                <div className='author-name'>{course.instructor}r</div>
                                
                            </div>
                        </Link>
                    ))}
                        
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCourses;