import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules'
import { useSelector } from 'react-redux';
import 'swiper/swiper-bundle.css';
import '../styles/header.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/user-action'; // Import actions
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = ()=>{
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [searchQuery, setSearchQuery] = useState('');
    const [sidebarOpen,setsidebarOpen] = useState(false);
    const [profileModal,setProfileModal] = useState(false);
    const [subCategory,setsubCategory] = useState('');
    const navigate = useNavigate()
    
    const toggleSidebar = ()=>{
        setsidebarOpen(!sidebarOpen);
    }
    const toggleSubcategory = (tab)=>{
        setsubCategory(tab);
        console.log(subCategory);
    }
    const closeSubcategory = ()=>{
        console.log(subCategory);
        setsubCategory('');
    }
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        navigate(`/search?query=${searchQuery}`);
    };
    const handleLogout = async () => {
        try {
          // Make a POST request to the logout endpoint
          const response = await axios.post('http://127.0.0.1:8000/logout/');
    
          if (response.data.success) {
            // Clear the user data in Redux store
            dispatch(setUser(null));
            navigate('/logout');
    
            // Optionally, you may want to redirect the user to the login page
            // history.push('/login');
          } else {
            console.error('Logout failed:', response.data.message);
            // Handle failed logout, e.g., show an error message to the user
          }
        } catch (error) {
          console.error('An error occurred during logout:', error);
          // Handle unexpected errors
        }
    };
    const slides = [
       logo,
       hero1,
        // Add more image URLs as needed
    ];

    return(
        <div className='header-wrapper'>
            <header className='header'>
                <Link to='/' className='logo'>
                    Elearning  
                </Link>
                <div className='category-tab'>
                    <div className='title'>Categories</div>
                    <div className='category-menu'>
                        <div className='category-section'>
                            <Link to='/search?query=Development' className='link-tab'>
                                <div className='text'>Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Web Development' className='link-tab'>
                                        <div className='text'>Web Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Mobile App Development' className='link-tab'>
                                        <div className='text'>Mobile App Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Data Science' className='link-tab'>
                                        <div className='text'>Data Science</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Web Development' className='link-tab'>
                                        <div className='text'>Web Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Programming Languages' className='link-tab'>
                                        <div className='text'>Programming Languages</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Database design & Game Development' className='link-tab'>
                                        <div className='text'>Database design & Game Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Software Testing' className='link-tab'>
                                        <div className='text'>Software Testing</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Software Engineering' className='link-tab'>
                                        <div className='text'>Software Engineering</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Programming Languages' className='link-tab'>
                                        <div className='text'>Programming Languages</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=Software Development Tools' className='link-tab'>
                                        <div className='text'>Software Development Tools</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='/search?query=No-Code Development' className='link-tab'>
                                        <div className='text'>No-Code Development</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='/search?query=Finance & Accounting' className='link-tab'>
                                <div className='text'>Finance & Accounting</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='/search?query=>Accounting & Bookkeeping' className='link-tab'>
                                        <div className='text'>Accounting & Bookkeeping</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Compliance</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Cryptocurrency & Blockchain</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Economics</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Finance</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Financial modeling & analysis</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Investing & trading</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Money Management tools</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Taxes</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                            
                                
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='' className='link-tab'>
                                <div className='text'>IT Certification</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Network & Security</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Hardware</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Operating systems & Servers</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Other IT & Softwares</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='' className='link-tab'>
                                <div className='text'>Business</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Enterpreneurship</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Communication</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Management</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Sales</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Business Strategy</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Operations</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Project Management</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Software Engineering</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Business Law</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Business Law</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Business analytics and intelligence</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='category-section'>
                            <Link to='' className='link-tab'>
                                <div className='text'>Office Productivity</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            
                            </Link>
                            <div className='sub-category' >
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Excel</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Microsoft Office</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Excel VBA</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Microsoft Power Bi</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Google Sheets</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Google Drive</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Google Workspace</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                <div className='sub-category-section'>
                                    <Link to='' className='link-tab'>
                                        <div className='text'>Power Point</div>
                                        <div className='icon'>
                                            <i class="fa-solid fa-chevron-right"></i>
                                        </div>
                                
                                    </Link>
                                </div>
                                
                                
                            </div>
                        </div>

                    </div>
                </div>
                <form className='search-container' onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder = 'Search for anything' 
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                     <i className="fa-solid fa-magnifying-glass"></i>
                </form>
                <div className='nav-section'>
                    <div className='teach'>
                        <Link className='title' to='/teach'>Teach</Link>
                        <div className='teach-tab'>
                            <div className='turn'>
                                Turn what you know into an opportunity and reach millions around the world.
                            </div>
                            <div className='link-wrapper'>
                                <Link to=''>Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className='cart'>
                    <Link to='/cart/'>
                            <i className="fas fa-shopping-cart"></i>
                    </Link>
                    <div className='cart-tab'>
                            <div className='turn'>
                            Your cart is empty
                            </div>
                            <div className='link-wrapper'>
                                <Link to=''>Keep shopping</Link>
                            </div>
                        </div>
                    </div>
                    {user.user? ( 
                            <>
                                <button onClick={handleLogout} className='login'>
                                    Logout 
                                </button>
                                <div className='user-icon-container'>
                                    <div className='initial'>{user.user.first_name[0].toUpperCase()} {user.user.last_name[0].toUpperCase()}</div>
                                    <i className="fa-solid fa-circle dot"></i>
                                    <div className = 'profile-card-container'>
                                        <Link to='/profile/' className='profile-link'>Profile</Link>
                                        <Link to='/profile/edit/' className='profile-link'>Edit profile</Link>
                                        <div onClick={handleLogout} className='profile-link logout'>
                                            <i class="fa-solid fa-right-from-bracket"></i>
                                            Logout
                                        </div>
                                    </div>
                                </div>
                            </>
                         )
                        :
                        (
                           <>
                                <Link to='/login' className='offline-login'>
                                    Login
                                </Link>
                                <Link to='/signup' className='offline-signup'>
                                    signup
                                </Link>
                           </>
                        )
                    }
                  
                    
                </div>
            </header>
            <header className='mobile-navigation'>
                <div className='menu-btn' onClick={toggleSidebar}>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <div className='mobile-logo'>
                    <div className='title'>Elearning</div>
                </div>
                <div className='mobile-extra'>
                    <Link to='/cart/' className='cart'>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </Link>
                    <div className='search'>
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>

            </header>
            <div className={`sideBar ${sidebarOpen ? 'show':''}`}>
                <div className='sidebar-wrapper'>
                    <div className = 'auth-tab' >
                       <div className='auth-wrapper'>
                            <Link to=''>Login</Link>
                       </div>
                       <div className='auth-wrapper'>
                            <Link to=''>signup</Link>
                       </div>
                    </div>
                    <div className='side-body'>
                        <div className='title'>Most Popular</div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab1')}>
                                <div className='text'>Web Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab1' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Web Development</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >JavaScript</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>ReactJs</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Angular</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>CSS</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>NodeJs</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>ASP.NET</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Redux Framework</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Typescript</Link>
                                </div>
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' className='section' onClick={()=>toggleSubcategory('tab2')}>
                                <div className='text'>Game Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab2' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Unreal Engine</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >Unity</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Game Development Fundamentals</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>C++ (Programming Language)</Link>
                                </div>
                                <div className='links-box'>
                                <Link to =''>C# (Programming Language)</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Godot</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>3D Game Development</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>2D Game Development</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Unreal Engine Blueprints</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Blender</Link>
                                </div>
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab3')}>
                                <div className='text'>Mobile Development</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab3' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Google Flutter</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >IOS Development</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Android Development</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>React Native</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Dart (Programming Language)</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Swift</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>SwiftUI</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Kotlin</Link>
                                </div>
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab4')}>
                                <div className='text'>Enterpreneurship</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab4' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Business Fundamentals</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >Enterpreneurship Fundamentals</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Freelancing</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Business Strategy</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Dart (Programming Language)</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>ChatGPT</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Startup</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Online Business</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Business Plan</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Home Business</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Blogging</Link>
                                </div>
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab5')}>
                                <div className='text'>Business analytics & intelligence</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab5' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Microsoft Power Bi</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >SQL</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Data modeling</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Data analytics</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Business analysis</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Tableau</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Business analytics</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Business intelligence</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Data analysis Expression(DAX)</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Excel</Link>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab6')}>
                                <div className='text'>Finance</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab6' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Personal Finance</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >Finance Fundamentals</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Investment Banking</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Stock Trading</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Corporate Finance</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Banking</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Chartered Financial analyst</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Financial analysis</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Financial Management</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Payments</Link>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab7')}>
                                <div className='text'>IT Certifications</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab7' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>AWS Certified Cloud Practioner</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >AWS Certified Solution Architect</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>CompTIA A+</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Amazon AWS</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>CompTIA Security+</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Cisco Cert Network Associate(CCNA)</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>AWS Certified Developer Associate </Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Information Security</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Financial Management</Link>
                                </div>
                               
                                
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab7')}>
                                <div className='text'>Graphic design & illustration</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab7' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Graphic design</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >Adobe illustration</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Adobe Photoshop</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Canva</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Drawing</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Procreate digital illustration App</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Digital Painting </Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Design Theory</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Figma</Link>
                                </div>
                               
                                
                                
                            </div>
                        </div>
                        <div className='link-btn'>
                            <Link to='' onClick={()=>toggleSubcategory('tab8')}>
                                <div className='text'>Digital Marketing</div>
                                <div className='icon'>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </div>
                            </Link>
                            <div className={`mobile-sub-category ${subCategory === 'tab8' ? 'show' : ''}`}>
                                <div className='menu-tab' onClick={closeSubcategory}>
                                    <div className='icon'>
                                        <i class="fa-solid fa-chevron-left"></i>
                                    </div>
                                    <div className='text'>Menu</div>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Digital Marketing</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to ='' >ChatGPT</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Social Media Marketing</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Marketing Strategy</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Startup</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Google analytics</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Copywritting </Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Internet Marketing</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Sales Funnels</Link>
                                </div>
                                <div className='links-box'>
                                    <Link to =''>Youtube Marketing</Link>
                                </div>
                               
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className='close-btn' onClick={toggleSidebar}>
                    <i class="fa-solid fa-x"></i>
                </div>
            </div>
        </div>
    );
};

export default Header;