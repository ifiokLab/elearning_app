
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/WishList.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';


const WishList = ()=>{
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
                <div className='course-wrapper'>
                    <div className='popular'>
                        <h2>WishList</h2>
                    </div>
                    <div className='course-container'>
                        <Link to='/course-detail' className='card'>
                            <img src = {logo} alt='' />
                            <div className='heart-btn'>
                                 <i class="fa-solid fa-heart"></i>
                            </div>
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
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
                                <span className='price'>$19.0</span>
                                <span className='discount'>$17.6</span>
                                </div>
                            </div>
                        </Link>
                        <Link to='' className='card'>
                            <img src = {logo} alt='' />
                            <div className='heart-btn'>
                                 <i class="fa-solid fa-heart"></i>
                            </div>
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
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
                                <span className='price'>$19.0</span>
                                <span className='discount'>$17.6</span>
                                </div>
                            </div>
                        </Link>
                        <Link to='' className='card'>
                            <img src = {logo} alt='' />
                            <div className='heart-btn'>
                                 <i class="fa-solid fa-heart"></i>
                            </div>
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
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
                                <span className='price'>$19.0</span>
                                <span className='discount'>$17.6</span>
                                </div>
                            </div>
                        </Link>
                        <Link to='' className='card'>
                            <img src = {logo} alt='' />
                            <div className='heart-btn'>
                                 <i class="fa-solid fa-heart"></i>
                            </div>
                            <div className='card-details'>
                                <h2>The complete Reactjs Bootcamp from Zero to hero</h2>
                                <div className='author-name'>Jose Portilar</div>
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
                                <span className='price'>$19.0</span>
                                <span className='discount'>$17.6</span>
                                </div>
                            </div>
                        </Link>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishList;