
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/cart.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';


const Cart = ()=>{
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <div className='cart-title'>
                     Shopping Cart
                </div>
               <div className='inner-wrapper'>
                <div className='cart-container-1'>
                  <div className='cart-card'>
                    <img src={logo} alt = '' />
                    <div className='details-wrapper'>
                        <div className='title-wrapper'>
                            <div className='title'> 
                                The Complete Cyber Security Course : Hackers Exposed!
                                <div className='author'>
                                    By John Doe
                                </div>
                            </div>
                            <div className='price-wrapper'>
                                <div className='price'>$1,200</div>
                                <div className='discount'>$1,500</div>
                            </div>
                        </div>
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
                        <div className='stats' >
                            12 total hours
                            124 lectures
                            All Levels
                        </div>
                        
                    </div>
                  </div>
                  <div className='cart-card'>
                    <img src={logo} alt = '' />
                    <div className='details-wrapper'>
                        <div className='title-wrapper'>
                            <div className='title'> 
                                The Complete Cyber Security Course : Hackers Exposed!
                                <div className='author'>
                                    By John Doe
                                </div>
                            </div>
                            <div className='price-wrapper'>
                                <div className='price'>$1,200</div>
                                <div className='discount'>$1,500</div>
                            </div>
                        </div>
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
                        <div className='stats' >
                            12 total hours
                            124 lectures
                            All Levels
                        </div>
                        
                    </div>
                  </div>
                </div>
                <div className='cart-container-2'>
                    <div className='total-card'>
                        <div className='title'>Total:</div>
                        <div className='price'>$4,500</div>
                        <div className='checkout-btn'>checkout</div>
                    </div>
                </div>
               </div>
            </div>
        </div>
    );
};

export default Cart;