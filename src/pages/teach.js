import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/teach.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';

const Teach = ()=>{
    const [openSlideSections, setOpenSlideSections] = useState(0);
    const toggleSlider = (index) => {
        setOpenSlideSections((prevOpenSection) => (prevOpenSection === index ? null : index));
    };
    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='hero-wrapper'>
                <img src={hero1} />
                <div className='teach-wrapper'>
                    <h1>Come teach with us</h1>
                    <div className='text'>
                        Become an instructor and change lives — including your own
                    </div>
                    <Link className='teach-btn'>
                        Get Started
                    </Link>
                </div>
            </div>
            <div className = 'start-reasons' >
                <h1>So many reasons to start</h1>
            </div>
            <div className='inspire-container' >
                <div className='box-wrapper'>
                    <div className='icon'>
                        <i class="fa-solid fa-chalkboard-user"></i>
                    </div>
                    <div className='title'>
                         Teach your way
                    </div>
                    <div className='text'>
                        Publish the course you want, in the way you want, and always have control of your own content.
                    </div>
                </div>
                <div className='box-wrapper'>
                    <div className='icon'>
                       
                        <i class="fa-solid fa-lightbulb"></i>
                    </div>
                    <div className='title'>
                        Inspire learners
                    </div>
                    <div className='text'>
                        Teach what you know and help learners explore their interests, gain new skills, and advance their careers.
                    </div>
                </div>
                <div className='box-wrapper'>
                    <div className='icon'>
                       
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <div className='title'>
                        Get rewarded
                    </div>
                    <div className='text'>
                        Expand your professional network, build your expertise, and earn money on each paid enrollment.
                    </div>
                </div>
            </div>
            <div className='how-begin' >
                <div className='title'>How to begin</div>
            </div>
            <div className='curriculum-container'>
                <div className='wrapper'>
                    <div className='section-header'>
                        <div className={`tab ${openSlideSections === 0 ? 'show' :''}`} onClick={() => toggleSlider(0)}>
                            Plan your curriculum
                        </div>
                        <div className={`tab ${openSlideSections === 1 ? 'show' :''}`} onClick={() => toggleSlider(1)}>
                            Record your video
                        </div>
                        <div className={`tab ${openSlideSections === 2 ? 'show' :''}`} onClick={() => toggleSlider(2)}>
                           launch your course
                        </div>
                    </div>
                    <div className='section-body'>
                        {openSlideSections === 0 && (
                            <div className='section-body-wrapper'>
                                <div className='text'>
                                    You start with your passion and knowledge. Then choose a promising topic with the help of our Marketplace Insights tool.

                                    The way that you teach — what you bring to it — is up to you.

                                    How we help you
                                    We offer plenty of resources on how to create your first course. And, our instructor dashboard and curriculum pages help keep you organized.
                                </div>
                                <img src={logo} alt ='' />
                            </div>
                        )}
                        {openSlideSections === 1 && (
                            <div className='section-body-wrapper'>
                                <div className='text'>
                                Gather your first ratings and reviews by promoting your course through social media and your professional networks.

                                    Your course will be discoverable in our marketplace where you earn revenue from each paid enrollment.

                                    How we help you
                                    Our custom coupon tool lets you offer enrollment incentives while our global promotions drive traffic to courses. There’s even more opportunity for courses chosen for Udemy Business.
                                </div>
                                <img src={logo} alt ='' />
                            </div>
                        )}
                        {openSlideSections === 2 && (
                            <div className='section-body-wrapper'>
                                <div className='text'>
                                    Use basic tools like a smartphone or a DSLR camera. Add a good microphone and you’re ready to start.

                                    If you don’t like being on camera, just capture your screen. Either way, we recommend two hours or more of video for a paid course.

                                    How we help you
                                    Our support team is available to help you throughout the process and provide feedback on test videos.
                                </div>
                                <img src={logo} alt ='' />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Teach;


