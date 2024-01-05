
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/checkout.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading } from '../actions/user-action'; // Import setUser and setLoading actions
import apiUrl from '../components/api-url';
import { useNavigate } from 'react-router-dom';


const Checkout = () =>{
    const [cart, setCart] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const user = useSelector((state) => state.user.user);


    const handlePaymentMethodChange = (event) => {
        setSelectedPaymentMethod(event.target.value);
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


    const handleCheckout = async (event) => {
        event.preventDefault();
        try {
          // Make a POST request to add the course to the cart
          const formData = new FormData();
          formData.append('payment-method', selectedPaymentMethod);
          const response = await axios.post(`http://localhost:8000/api/checkout/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
            },
          });
           if (response.data.success) {
                // Update the list of cart courses
                console.log('submitted:',response.data.user);
                dispatch(setUser(response.data.user));
                //navigate(`/${response.data.url}`);
                 window.location.href =  response.data.url;
                console.log('submitted:',response.data);
            } else {
                console.error('failed:',response.data);
            }
     
        } catch (error) {
           // navigate('/login'); 
            console.error(':', error);
        }
    };

    return(
        <div className='page-wrapper'>
            <Header/>
            <form className='wrapper' onSubmit={handleCheckout}>
                <div className='cart-title' id='checkout-title'>
                   Payment Method
                </div>
                <div className ='payment-method'>
                    <div className='payment-wrapper' >
                        <div className='input-card' onClick={handlePaymentMethodChange}>
                            <input
                                type="radio" required
                                id="card"
                                name="paymentMethod"
                                value="card"
                                checked={selectedPaymentMethod === 'card'}
                            />
                             <i class="fa-regular fa-credit-card"></i>
                            <label htmlFor="card">
                               
                                Credit or debit card
                            </label>
                        </div>
                        <div className='input-card' onClick={handlePaymentMethodChange}>
                            <input
                                type="radio" required
                                id="paypal"
                                name="paymentMethod"
                                value="paypal"
                                checked={selectedPaymentMethod === 'paypal'}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>

                       
                    </div>

                </div>
                <div className='cart-title' id='checkout-title'>
                    Order details
                </div>
            <div className='inner-wrapper' id='inner-cart-wrapper'>
               
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
                                {course.instructor}
                            </div>
                            <div className='stats' >
                            
                            </div>
                            
                        </div>
                    </div>
                ))}
                
                </div>
                <div className='cart-container-2'>
                    <div className='total-card'>
                        <div className='title'>Summary:</div>
                        <div className='price'>${totalAmount}</div>
                        <p>By completing your purchase you agree to these Terms of Service.</p>
                        <button type='' className='checkout-btn' >Complete checkout</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
};

export default Checkout;