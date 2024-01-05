
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import 'swiper/swiper-bundle.css';
import '../styles/home.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useNavigate,useLocation } from 'react-router-dom';


const Search = ()=>{
    const user = useSelector((state) => state.user.user);
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [term, setTerm] = useState('');
  
   
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

   
    const handleAddToCart = async (e,courseId) => {
        e.preventDefault();
        console.log('user.auth_token:',user?.auth_token);
        try {
          // Make a POST request to add the course to the cart
          const formData = new FormData();
          const response = await axios.post(`http://localhost:8000/add-to-cart/${courseId}/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
            },
          });
           if (response.data.success) {
                // Update the list of cart courses
                 fetchCartCourses();
                 console.error('added to cart:',response.data);
            } else {
                console.error('removed from cart:',response.data);
            }
     
        } catch (error) {
            navigate('/login'); 
            console.error('Error adding course to cart:', error);
        }
    };
    const fetchCartCourses = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/shopping-cart/',{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
          });
           
          
          setCart(response.data.courses);
          console.log('cart:',cart);
        } catch (error) {
          console.error('Error fetching cart courses:', error);
        }
    };
    
      // Function to check if a course is in the cart
    const isInCart = (courseId) => {
        return cart.some((course) => course.id === courseId);
    };

    const fetchSearchResults = async (query) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/search-courses/?query=${query}`);
            setResults(response.data.all_courses);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get('query');
        setTerm(searchQuery);
        if (searchQuery) {
            // Perform the search based on the query
            fetchSearchResults(searchQuery);
        }
       
    
       
        fetchCartCourses();
    }, [location.search]);
    
    return(
       <div class = 'home-wrapper'>
        <Header />
        <div className='search-wrapper'>
            <div className='course-wrapper'>
                    <div className='popular'>
                        <h2>Showing results for "{term}"</h2>
                    </div>
                
                        <div className='course-container'>
                            {results.map((course) => (
                                <Link key={course.id} to={`/course-detail/${course.id}/${course.title}/`} className='card'>
                                    <img src ={`${apiUrl}${course.thumbnail}`} alt='' />

                                
                                    <div className={`heart-button ${isInCart(course.id) ? 'red-heart' : ''}`}>
                                        {/* fa-regular fa-heart Add onClick handler to trigger adding the course to the cart */}
                                        <i className={`${isInCart(course.id) ? 'fa-solid' : 'fa-regular' } fa-heart` } onClick={(e) => handleAddToCart(e,course.id)}></i>
                                    </div>
                                    <div className='card-details'>
                                        <h2>{course.title}</h2>
                                        <div className='author-name'>{course.instructor}</div>
                                        <div className='ratings-card'>
                                            <span className='num box'>4.5</span>
                                            <span className='stars box'>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star"></i>
                                                <i class="fa-solid fa-star-half"></i>
                                            </span>
                                            <span className='students box'>
                                                (218,087)
                                            </span>
                                        </div>
                                        <div className='price-card'>
                                        <span className='price'>${course.price}</span>
                                        <span className='discount'>$17.6</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            
                        </div>
                    
            </div>
        </div>
       </div>
    )
};

export default Search;