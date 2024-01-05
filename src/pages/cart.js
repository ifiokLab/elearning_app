
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/cart.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useSelector } from 'react-redux';
import apiUrl from '../components/api-url';
import { useNavigate } from 'react-router-dom';


const Cart = ()=>{
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    const handleAddToCart = async (e,courseId) => {
        e.preventDefault();
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
                 console.log('added to cart:',response.data);
            } else {
                console.error('removed from cart:',response.data);
            }
     
        } catch (error) {
           // navigate('/login'); 
            console.error('Error adding course to cart:', error);
        }
    };
    const fetchCartCourses = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/shopping-cart-list/',{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
          });
           
          
          setCart(response.data.courses);
          setTotalAmount(response.data.total_amount);
          console.log('cart..:',response.data.courses);
        } catch (error) {
          console.error('Error fetching cart courses:', error);
        }
    };
    useEffect(() => {
       
        if (user === null) {
            // Redirect to the login page
            navigate('/login');
            return; // Stop further execution of useEffect
        }

        fetchCartCourses();
    }, []);

    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <div className='cart-title'>
                     Shopping Cart
                </div>
               <div className='inner-wrapper'>
                <div className='cart-container-1'>
                   
                {cart.map((course) =>(
                    <div key ={course.id} className='cart-card'>
                        <img src={`${apiUrl}${course.thumbnail}`} alt = '' />
                        <div className='details-wrapper'>
                            <div className='title-wrapper'>
                                <div className='title'> 
                                   {course.title}
                                    <div className='author'>
                                    {course.overview}
                                    </div>
                                </div>
                                <div className='price-wrapper'>
                                    <div className='price'>${course.discountPrice}</div>
                                    <div className='discount'>${course.price}</div>
                                </div>
                            </div>
                            <div className='ratings-card'>
                                <div>{course.instructor}</div>
                                <div onClick={(e) => handleAddToCart(e,course.id)}><i class="fa-solid fa-trash"></i></div>
                            </div>
                            <div className='stats' >
                               
                            </div>
                            
                        </div>
                    </div>
                ))}
                 
                </div>
                <div className='cart-container-2'>
                    <div className='total-card'>
                        <div className='title'>Total:</div>
                        <div className='price'>${totalAmount}</div>
                        <Link id='cart-checkout' to='/checkout/' className='checkout-btn'>checkout</Link>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Cart;