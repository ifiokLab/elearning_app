import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '../styles/course-detail.css';
import previewImage from '../styles/hero1.jpg';
import Header from '../components/header';

const CourseDetailPage = ()=>{
    const [openSections, setOpenSections] = useState([]);

    const toggleAccordion = (index) => {
        const newOpenSections = [...openSections];
        newOpenSections[index] = !newOpenSections[index];
        setOpenSections(newOpenSections);
    };
    return(
        <div className='page-wrapper'>
             <Header />
            <div className='landing-page-wrapper'>
                <div className='landing-page-container'>
                    <div className='container1'>
                        <h1 className='course-title'>Learn Python & Ethical Hacking From Scratch</h1>
                        <div className='course-description'>
                            Write 20+ hacking programs to learn hacking & programming at the same time | No prior knowledge required
                        </div>
                        <div className='ratings-container'>
                            <div className='ratings-box'>
                                <span className='ratings-num'>4.7</span>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star-half"></i>
                                <span className='student-num'>119,564</span>
                            </div>
                        </div>
                        <div className='author-card'>
                            <span className='name'>Created by Steve ben</span>
                        </div>
                    </div>
                    <div className='container2'>
                        <div className = 'preview-container'>
                            <img src={previewImage} alt = 'preview image' />
                            <div className='image-overlay'>
                                <div className='wrapper'>
                                    <div className='btn-wraper'>
                                        <i class="fa-solid fa-play"></i>
                                    </div>
                                    <div className='preview-text'>Preview this course</div>
                                </div>
                            </div>
                            <div className='preview-course'>
                                <div className = 'price-container'>
                                    <div className = 'price' >$200</div>
                                    <div className = 'discount'>$400</div>
                                    <div className='text'>80% off</div>
                                </div>
                                <div className='cart-wrapper'>
                                    <div className='cart-btn'>
                                        
                                        <Link to='/course-view-page'>Add to Cart</Link>
                                    </div>
                                    <div className='heart-btn'>
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                </div>
                                <div className='buy'>
                                    Buy Now
                                </div>
                                <div className='title'>This course includes:</div>
                                <div className='card'>
                                    <i class="fa-solid fa-video"></i>
                                    <span>25 hours on-demand video</span>
                                </div>
                                <div className='card'>
                                    <i class="fa-regular fa-file"></i>
                                    <span>Assignments</span>
                                </div>
                                <div className='card'>
                                    <i class="fa-solid fa-infinity"></i>
                                    <span>Full lifetime access</span>
                                </div>
                                <div className='card'>
                                    <i class="fa-solid fa-medal"></i>
                                    <span>Certificate of completion</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='what-learn-wrapper'>
                <div className='wrapper'>
                    <div className='title'>What you will learn</div>
                    <div className='what-container'>
                        <div className='cards'>
                            <i class="fa-solid fa-check"></i>
                            <div className='text'>
                                180+ videos (25 hours) on Python programming & ethical hacking
                            </div>
                        </div>
                        <div className='cards'>
                            <i class="fa-solid fa-check"></i>
                            <div className='text'>
                                Learn 2 topics at the same time - Python programming & Ethical Hacking
                            </div>
                        </div>
                        <div className='cards'>
                            <i class="fa-solid fa-check"></i>
                            <div className='text'>
                                Have a deep understanding on how computer systems work
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className = 'accordion-wrapper'>
                <div className='wrapper'>
                    <div className='accordion-header'>
                        <div className='title'>Course Contents</div>
                        <div className='overview'>
                            20 sections • 184 lectures • 24h 56m total length
                        </div>
                    </div>

                    <div className='accordion-container'>
                        <div className='section-tab'>
                            <div className='section-header' onClick={() => toggleAccordion(0)}>
                            <div className='tab-1'>
                                <i class={`fa-solid ${openSections[0] ? 'fa-minus' : 'fa-plus'}`}></i>
                                <span>Introduction</span>
                            </div>
                            <div className='tab-2'>12 lectures • 1 hour 43 mins</div>
                            </div>
                            {openSections[0] && (
                            <div className='section-body'>
                                <div className='card'>1</div>
                                <div className='card'>2</div>
                            </div>
                            )}
                        </div>

                        <div className='section-tab'>
                            <div className='section-header' onClick={() => toggleAccordion(1)}>
                            <div className='tab-1'>
                                <i class={`fa-solid ${openSections[1] ? 'fa-minus' : 'fa-plus'}`}></i>
                                <span>Section 2</span>
                            </div>
                            <div className='tab-2'>12 lectures • 1 hour 43 mins</div>
                            </div>
                            {openSections[1] && (
                            <div className='section-body'>
                                <div className='card'>1</div>
                                <div className='card'>2</div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='requirements-container'>
                <div className='wrapper'>
                    <div className='title'>Requirements</div>
                     <ul>
                        <li>Basic IT knowledge</li>
                        <li>No Linux, programming or hacking knowledge required.</li>
                        <li>Computer with a minimum of 4GB ram/memory</li>
                        <li>Operating System: Windows / Apple Mac OS / Linux</li>
                     </ul>
                </div>
            </div>
            <div className='description-container'>
                <div className='wrapper'>
                <div className='title'>Description</div>
                <div className='text'>
                    Welcome to my comprehensive course on python programming and ethical hacking. The course assumes you have NO prior knowledge in any of these topics, and by the end of it you'll be at a high intermediate level being able to combine both of these skills to write python programs to hack computer systems exactly the same way that black hat hackers do. That's not all, you'll also be able to use the programming skills you learn to write any program even if it has nothing to do with hacking.
                    This course is highly practical but it won't neglect the theory, we'll start with basics of ethical hacking and python programming and installing the needed software. Then we'll dive and start programming straight away. You'll learn everything by example, by writing useful hacking programs, no boring dry programming lectures.
                    The course is divided into a number of sections, each aims to hack a specific system!  You'll first learn how this system works and its weaknesses, then you'll lean how to write a python program to exploit these weaknesses and hack it. As we write the program I will teach you python programming from scratch covering one topic at a time. By the end of the course you're going to have a number of ethical hacking programs written by yourself (see below) from backdoors, keyloggers, credential harvesters, network hacking tools, website hacking tools and the list goes on. You'll also have a deep understanding on how computer systems work, how to model problems, design an algorithm to solve problems and implement the solution using python .
                </div>
                </div>
            </div>
            <div className='author-container'>
                <div className='wrapper'>
                    <div className='profile-container'>
                        <div className='caption'>Instructor</div>
                        <img src={previewImage} alt = 'instructor' />
                        <div className='author-details'>
                            <div className='name'>Zaid Sabih</div>
                            <div className='title'>
                                Ethical Hacker, Computer Scientist & CEO of zSecurity
                            </div>
                            <div className='description'>
                            My name is Zaid Al-Quraishi, I am a professional ethical hacker, computer scientist, and the founder and CEO of zSecurity & Bug-Bounty. I am passionate about utilising my skills to improve the security of organisations and individuals by identifying and resolving vulnerabilities in their systems.

                            I have in-depth knowledge and experience in the fields of ethical hacking & cyber security, and I have helped over 1 million students worldwide on multiple teaching platforms to gain a better understanding of the subject.

                            My companies, zSecurity & Bug-Bounty, specialise in providing ethical hacking services and managed bug-bounty programs to help organisations identify and remediate vulnerabilities in their systems.


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='review-wrapper'>
                <div className='wrapper'>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={2}
                   
                    autoplay={{ delay: 1200 }}
                    modules={[Autoplay, Pagination, Navigation]}
                    >
                    <SwiperSlide >
                        <div className='cards'>
                            <div className='box-1'>
                                <div className='author-initials'>CP</div>
                                <div className='details-wrapper'>
                                    <div className='name'>
                                        Chao-Hong P.
                                    </div>
                                    <div className='date'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span> 2 weeks ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className='box-2'>
                                It was an interesting and fulfilling course. Zaid is a great teacher and taught both Python coding and ethical hacking concepts really well. Past students had queries for problems I experienced and the TAs and some other
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                    <div className='cards'>
                            <div className='box-1'>
                                <div className='author-initials'>SJ</div>
                                <div className='details-wrapper'>
                                    <div className='name'>
                                        Steve Joe.
                                    </div>
                                    <div className='date'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span> 2 weeks ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className='box-2'>
                                It was an interesting and fulfilling course. Zaid is a great teacher and taught both Python coding and ethical hacking concepts really well. Past students had queries for problems I experienced and the TAs and some other
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide >
                    <div className='cards'>
                            <div className='box-1'>
                                <div className='author-initials'>JD</div>
                                <div className='details-wrapper'>
                                    <div className='name'>
                                        John Doe.
                                    </div>
                                    <div className='date'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star-half"></i>
                                        <span> 2 weeks ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className='box-2'>
                                It was an interesting and fulfilling course. Zaid is a great teacher and taught both Python coding and ethical hacking concepts really well. Past students had queries for problems I experienced and the TAs and some other
                            </div>
                    </div>
                    </SwiperSlide>
                    <SwiperSlide >
                        <div className='cards'>
                                <div className='box-1'>
                                    <div className='author-initials'>IU</div>
                                    <div className='details-wrapper'>
                                        <div className='name'>
                                            Chao-Hong P.
                                        </div>
                                        <div className='date'>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star"></i>
                                            <i class="fa-solid fa-star-half"></i>
                                            <span> 2 weeks ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='box-2'>
                                    It was an interesting and fulfilling course. Zaid is a great teacher and taught both Python coding and ethical hacking concepts really well. Past students had queries for problems I experienced and the TAs and some other
                                </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
                   
                </div>
            </div>
        </div>
    );
}

export default CourseDetailPage;