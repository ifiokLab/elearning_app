import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import Header from '../components/header';

import 'swiper/swiper-bundle.css';
import '../styles/home.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';

const Home = ()=>{
    const [searchQuery, setSearchQuery] = useState('');
    const handleInputChange = (e) => {
      setSearchQuery(e.target.value);
     
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform search-related actions here based on the searchQuery state
        console.log('Search Query:', searchQuery);
        alert(searchQuery);
    };
    const slides = [
       logo,
       hero1,
        // Add more image URLs as needed
    ];
    return(
       <div class = 'home-wrapper'>
        <Header />
        <div className='hero-container'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 500 }}
                    modules={[Autoplay, Pagination, Navigation]}
                    >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <img src={slide} alt={`Slide ${index + 1}`} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className = 'dream-container'>
                    <div className='wrapper'>
                        <h2>Dream Up</h2>
                        <p>Ambition accepted. Learn the latest skills to reach your professional goals.</p>
                        <form className='search-box'>
                            <input 
                                placeholder='What do you want to learn?'
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <div className='icon'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='mobile-dream'>
            <div className = 'dream-container'>
                    <div className='wrapper'>
                        <h2>Dream Up</h2>
                        <p>Ambition accepted. Learn the latest skills to reach your professional goals.</p>
                        <form className='search-box'>
                            <input 
                                placeholder='What do you want to learn?'
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                            <div className='icon'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='course-wrapper'>
                <div className='popular'>
                    <h2>Popular Courses</h2>
                </div>
                <div className='course-container'>
                    <Link to='/course-detail' className='card'>
                        <img src = {logo} alt='' />
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

            <div className = 'category-wrapper'>
                <div className = 'container'>
                    <div className='title'>Top Categories</div>
                    <div className='container-wrapper'>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-laptop-code"></i>
                            </span>
                            <span className='text'>Web Development</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                            <i class="fa-solid fa-mobile"></i>
                            </span>
                            <span className='text'>Mobile App Development</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-code"></i>
                            </span>
                            <span className='text'>Programming Languages</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-shield-halved"></i>
                            </span>
                            <span className='text'>Cyber Security</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-user-secret"></i>
                            </span>
                            <span className='text'>Ethical hacking</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                 <i class="fa-solid fa-database"></i>
                            </span>
                            <span className='text'>Database Management system</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-chart-simple"></i>
                            </span>
                            <span className='text'>Data Science</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-brands fa-connectdevelop"></i>
                            </span>
                            <span className='text'>Artificial Intelligence</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-gamepad"></i>
                            </span>
                            <span className='text'>Game Development</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-server"></i>
                            </span>
                            <span className='text'>Operating Systems & Servers</span>
                        </Link>
                        <Link className='card'>
                            <span className='icon'>
                                <i class="fa-solid fa-compass-drafting"></i>
                            </span>
                            <span className='text'>Graphic Design & illustration</span>
                        </Link>
                        
                    </div>
                </div>
            </div>
       </div>
    )
};

export default Home;