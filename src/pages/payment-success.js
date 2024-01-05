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


const PaymentSuccess = ()=>{
    const user = useSelector((state) => state.user.user);

    const fetchPaymentStatus = async () => {
        try {
            

          const response = await axios.get(`http://localhost:8000/api/payment/${user?.stripeId}/success/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
           
          
         
          console.log('cart..:',response.data);
        } catch (error) {
          console.error('Error fetching cart courses:', error);
        }
    };
    useEffect(() => {

        fetchPaymentStatus();
    }, []);
    return(
        <div className ='page-wrapper'>
            <div className='wrapper'>
                <h2>Payment success</h2>
            </div>
        </div>
    );
};

export default PaymentSuccess;