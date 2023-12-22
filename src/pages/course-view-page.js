import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/course-overview-page.css';
import previewImage from '../styles/hero1.jpg';

const CourseViewPage = ()=>{
    const [openSections, setOpenSections] = useState([]);
    const [openSlideSections, setOpenSlideSections] = useState(0);
    const  [contentOpen,setcontentOpen] = useState(true);

    const toggleAccordion = (index) => {
        const newOpenSections = [...openSections];
        newOpenSections[index] = !newOpenSections[index];
        setOpenSections(newOpenSections);
    };
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    const toggleContent = ()=>{
        setcontentOpen(!contentOpen);
    };
    return(
        <div className='page-wrapper' >
            <div className='course-header' >
                <div className='wrapper'>
                    <div className = 'back-arrow' >
                        <i class="fa-solid fa-arrow-left"></i>
                    </div>
                    <div className='logo'>Elearning</div>
                    <div className='course-title'>
                        The Complete Python Bootcamp From Zero to Hero in Python
                    </div>
                </div>
                <div className='icon'>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>
            <div className = 'course-body' >
                <div className='container-1'>
                    <div className={`content-modal ${contentOpen ? '':'show'}`} onClick = {toggleContent}>
                         <i class="fa-solid fa-chevron-left"></i>
                         <div className='text'>Course Contents</div>
                    </div>
                </div>
                <div className={`container-2 ${contentOpen ? 'show' : ''}`}>
                    <div className='content-header'>
                        <div className='title'>Course content</div>
                        <div className='close-icon' onClick={toggleContent}>
                            <i class="fa-solid fa-x"></i>
                        </div>
                    </div>
                    <div className='wrapper' >
                        <div className='accordion-container'>
                            <div className='section-tab'>
                                <div className='section-header' onClick={() => toggleAccordion(0)}>
                                <div className='tab-1'>
                                    <i class={`fa-solid ${openSections[0] ? 'fa-minus' : 'fa-plus'}`}></i>
                                    <span>Introduction</span>
                                </div>
                                <div className='tab-2'>1 hour 43 mins</div>
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
                                <div className='tab-2'>1 hour 43 mins</div>
                                </div>
                                {openSections[1] && (
                                <div className='section-body'>
                                    <div className='card'>1</div>
                                    <div className='card'>2</div>
                                </div>
                                )}
                            </div>
                            <div className='section-tab'>
                                <div className='section-header' onClick={() => toggleAccordion(2)}>
                                <div className='tab-1'>
                                    <i class={`fa-solid ${openSections[2] ? 'fa-minus' : 'fa-plus'}`}></i>
                                    <span>Section 2</span>
                                </div>
                                <div className='tab-2'>1 hour 43 mins</div>
                                </div>
                                {openSections[2] && (
                                <div className='section-body'>
                                    <div className='card'>1</div>
                                    <div className='card'>2</div>
                                </div>
                                )}
                            </div>
                            <div className='section-tab'>
                                <div className='section-header' onClick={() => toggleAccordion(3)}>
                                <div className='tab-1'>
                                    <i class={`fa-solid ${openSections[3] ? 'fa-minus' : 'fa-plus'}`}></i>
                                    <span>Section 2</span>
                                </div>
                                <div className='tab-2'>1 hour 43 mins</div>
                                </div>
                                {openSections[3] && (
                                <div className='section-body'>
                                    <div className='card'>1</div>
                                    <div className='card'>2</div>
                                </div>
                                )}
                            </div>
                            <div className='section-tab'>
                                <div className='section-header' onClick={() => toggleAccordion(4)}>
                                <div className='tab-1'>
                                    <i class={`fa-solid ${openSections[4] ? 'fa-minus' : 'fa-plus'}`}></i>
                                    <span>Section 2</span>
                                </div>
                                <div className='tab-2'>1 hour 43 mins</div>
                                </div>
                                {openSections[4] && (
                                <div className='section-body'>
                                    <div className='card'>1</div>
                                    <div className='card'>2</div>
                                </div>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className='course-slider'>
                <div className={`tab ${openSlideSections === 0 ? 'show' :''}`} onClick={() => toggleSlider(0)}>
                    Course Content
                </div>
                <div className={`tab ${openSlideSections === 1 ? 'show' :''}`} onClick={() => toggleSlider(1)}>
                    Annoucement
                </div>
               
            </div>
            <div className='slider-container-content'>
               {openSlideSections === 0 && (
                 <div className='slider-content'>
                    <div className='about'>
                        <div className='title'>About this course</div>
                        <div className='body'>
                            Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games
                        </div>
                    </div>
                    <div className='about' >
                        <div className='title'>Description</div>
                        <div className='body'>
                        Become a Python Programmer and learn one of employer's most requested skills of 2023!

                            This is the most comprehensive, yet straight-forward, course for the Python programming language on Udemy! Whether you have never programmed before, already know basic syntax, or want to learn about the advanced features of Python, this course is for you! In this course we will teach you Python 3.

                            With over 100 lectures and more than 21 hours of video this comprehensive course leaves no stone unturned! This course includes quizzes, tests, coding exercises and homework assignments as well as 3 major projects to create a Python project portfolio!

                            Learn how to use Python for real-world tasks, such as working with PDF Files, sending emails, reading Excel files, Scraping websites for informations, working with image files, and much more!

                            This course will teach you Python in a practical manner, with every lecture comes a full coding screencast and a corresponding code notebook! Learn in whatever manner is best for you!

                            We will start by helping you get Python installed on your computer, regardless of your operating system, whether its Linux, MacOS, or Windows, we've got you covered.
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
                 </div>
               )}
               {openSlideSections === 1 && (
                 <div className='slider-content'>
                    <div className='annoucement-container'>
                        <div className='profile'>
                            <img src={previewImage}/>
                            <div className='profile-details'>
                                <div className='name'>Joe</div>
                                <div className='time'>
                                    posted an announcement · 5 months ago
                                </div>
                            </div>
                        </div>
                        <div className='title'>
                            Natural Language with NLTK and Python Blog Post
                        </div>
                        <div className='description'>
                            Hi Everyone,

                            This week's blog post is all about using the Natural Language Toolkit (NLTK) library for Python and how you can leverage it for Part-of-Speech Tagging, Sentiment Analysis, Named Entity Recognition, and more!

                            You can check it out here:
                        </div>
                    </div>
                 </div>
               )}
               {openSlideSections === 2 && (
                 <div className='slider-content'>2</div>
               )}
              
            </div>
        </div>
    );
};
export default CourseViewPage;