import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import '../styles/course-detail.css';
import previewImage from '../styles/hero1.jpg';
import Header from '../components/header';
import apiUrl from '../components/api-url';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CourseDetailPage = ()=>{
    const [openSections, setOpenSections] = useState([]);
    const [enrolled, setEnrolled] = useState(false);
    const [cart, setCart] = useState([]);
    const [sections, setSections] = useState([]);
    const { id } = useParams();
    const { title } = useParams();
    const [course, setCourse] = useState('');
    const [loading, setLoading] = useState(true);
    const [requirements, setRequirements] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [contentCount,setContentCount] = useState([]);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const handlePlayButtonClick = () => {
        // Update state to show the video modal
        setShowVideoModal(true);
    };
    const toggleAccordion = (index) => {
        const newOpenSections = [...openSections];
        newOpenSections[index] = !newOpenSections[index];
        setOpenSections(newOpenSections);
    };
    const fetchRequirements = async ()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/courses/${id}/add-objectives/`);
            setRequirements(response.data);
            setLoading(!loading);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setLoading(!loading);
        }
    };
    const fetchObjectives = async ()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/courses/${id}/add-objectives/`);
            setObjectives(response.data);
            setLoading(!loading);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setLoading(!loading);
        }
    };
    const fetchContentCounts = async ()=>{
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/course/${id}/content-type-count/`);
            setContentCount(response.data);
            console.log('contentCount:',response.data);
            setLoading(!loading);
        } catch (error) {
            console.error('Error fetching course details:', error);
            setLoading(!loading);
        }
    };
    const fetchCourseDetail = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/courses/${id}/`);
          setCourse(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching course details:', error);
          setLoading(false);
        }
    };
    
    const fetchCourseSections = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/sections/${id}/`);
            console.log(response.data);
            setSections(response.data);
            setOpenSections(new Array(response.data).fill(false));
        } catch (error) {
            console.error('Error fetching course sections:', error);
        }
    };
    const checkEnrollment = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/check-enrollment/${id}/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
         
          setEnrolled(response.data.enrolled);
        } catch (error) {
            setEnrolled(enrolled);
          console.error('Error checking enrollment:', error);
        }
    };
    const isInCart = (courseId) => {
        return cart.some((course) => course.id === courseId);
    };
    const handleAddToCart = async (courseId) => {
        
        console.log('user.auth_token:',user?.auth_token);
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
                 console.error('added to cart:',response.data);
            } else {
                console.error('removed from cart:',response.data);
            }
     
        } catch (error) {
            navigate('/login'); 
            console.error('Error adding course to cart:', error);
        }
    };
    const GoToCart = async (courseId) => {
        
        console.log('user.auth_token:',user?.auth_token);
        try {
          // Make a POST request to add the course to the cart
          const formData = new FormData();
          const response = await axios.post(`http://localhost:8000/go-to-cart/${courseId}/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
            },
          });
           if (response.data.success) {
                // Update the list of cart courses
                navigate('/cart'); 
                 console.error('added to cart:',response.data);
            } else {
                console.error('removed from cart:',response.data);
            }
     
        } catch (error) {
            navigate('/login'); 
            console.error('Error adding course to cart:', error);
        }
    };
    const buyNow = async (courseId) => {
        
        console.log('user.auth_token:',user?.auth_token);
        try {
          // Make a POST request to add the course to the cart
          const formData = new FormData();
          const response = await axios.post(`http://localhost:8000/go-to-cart/${courseId}/`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${user?.auth_token}`, // Include the user ID in the Authorization header
            },
          });
           if (response.data.success) {
                // Update the list of cart courses
                navigate('/checkout'); 
                 console.error('added to cart:',response.data);
            } else {
                console.error('removed from cart:',response.data);
            }
     
        } catch (error) {
            navigate('/login'); 
            console.error('Error adding course to cart:', error);
        }
    };
    const fetchCartCourses = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/shopping-cart/',{
            headers: {
                Authorization: `Token ${user?.auth_token}`,
            },
          });
           
          
          setCart(response.data.courses);
          console.log('cart:',cart);
        } catch (error) {
          console.error('Error fetching cart courses:', error);
        }
    };
    useEffect(() => {

        fetchCartCourses();
        checkEnrollment();
        fetchContentCounts();
        fetchObjectives();
        fetchRequirements();
        fetchCourseDetail();
        fetchCourseSections();
    }, [id])
    const getIconForContentType = (contentType) => {
        switch (contentType) {
          case 'video':
            return 'fa-video';
          case 'audio':
            return 'fa-volume-up';
          case 'document':
            return 'fa-file-alt';
          case 'quiz':
            return 'fa-question-circle';
          case 'assignment':
            return 'fa-clipboard';
          // Add more cases as needed
          default:
            return 'fa-file'; // Default icon
        }
    };

    const getTextForContentType = (contentType,count) => {
        switch (contentType) {
          case 'video':
            return (
                <div className='card'>
                    <i class="fa-solid fa-video"></i>
                    <span>{count}  on-demand videos</span>
                </div>
                 
            );
          case 'audio':
            return (
                <div className='card'>
                    <i class="fa-solid fa-volume-up"></i>
                    <span>{count} Audio</span>
                 </div>
               
            );
          case 'document':
            return (
                <div className='card'>
                    <i class="fa-solid fa-file-alt"></i>
                    <span>{count} document</span>
                 </div>
               
            );
          case 'quiz':
            return (
                <div className='card'>
                    <i class="fa-solid fa-question-circle"></i>
                    <span>{count} Quiz</span>
                 </div>
               
            );
          case 'assignment':
            return (
                <div className='card'>
                    <i class="fa-regular fa-clipboard"></i>
                    <span>{count} Assignments</span>
                 </div>
            );
          default:
            return '';
        }
      };

   

    return(
        <div className='page-wrapper'>
             <Header />
            <div className='landing-page-wrapper'>
                {course && (
                     <div className='landing-page-container'>
                    
                     <div className='container1'>
                         <h1 className='course-title'>{course.title}</h1>
                         <div className='course-description'>
                           {course.overview}
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
                             <span className='name'>Created by Steve ben </span>
                         </div>
                     </div>
                     <div className='container2'>
                         <div className = 'preview-container'>
                             <img src={previewImage} alt = 'preview image' />
                             <div className='image-overlay'  onClick={handlePlayButtonClick}>
                                 <div className='wrapper'>
                                     <div className='btn-wraper'>
                                        {/*if a user clicks the play button the preview-video-wrapper nodal should be displayed and the video should start playing */}
                                        <i className="fa-solid fa-play" onClick={handlePlayButtonClick}></i>
                                     </div>
                                     <div className='preview-text'>Preview this course</div>
                                 </div>
                             </div>
                             <div className='preview-course'>
                                 <div className = 'price-container'>
                                     <div className = 'price' >${course.discountPrice}</div>
                                     <div className = 'discount'>${course.price}</div>
                                     <div className='text'>{course.percentage} off</div>
                                 </div>
                                 <div className='cart-wrapper'>
                                     <div className='cart-btn'>
                                        {enrolled ? (
                                            <Link to={`/course-view-page/${id}/${title}/`}>Go to Course</Link>
                                            ):
                                            (
                                                <div onClick={() => GoToCart(id)}>Add to Cart</div>
                                            )
                                        }
                                     </div>
                                    
                                     {enrolled ? (
                                        ''
                                        )
                                        :
                                        (<div className={`heart-btn ${isInCart(course.id) ? 'red-heart' : ''}`} onClick={() => handleAddToCart(id)}>
                                             <i className={`${isInCart(course.id) ? 'fa-solid' : 'fa-regular' } fa-heart` } ></i>
                                        </div>
                                     )}
                                 </div>
                                    {enrolled ?
                                        ''
                                        :
                                        <div className='buy' onClick={() => buyNow(id)}>
                                            Buy Now
                                        </div>
                                    }
                                
                                 <div className='title'>This course includes:</div>
                                 <div>
                                    {contentCount.map((count) => (
                                        <div key={count.content_type}>
                                            {getTextForContentType(count.content_type,count.count)}
                                        </div>
                                    ))}
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
                )}
               
            </div>
            <div className='what-learn-wrapper'>
                <div className='wrapper'>
                    <div className='title'>What you will learn</div>
                    <div className='what-container'>
                        {objectives.map((objectives) =>(
                            <div key={objectives.id} className='cards'>
                                <i class="fa-solid fa-check"></i>
                                <div className='text'>
                                    {objectives.title}
                                </div>
                             </div>
                        ))}
                       
                        
                    </div>
                </div>
            </div>
            
            <div className="accordion-wrapper">
                <div className="wrapper">
                <div className="accordion-header">
                    <div className="title">Course Contents</div>
                    {/* Render course details here using the 'course' state */}
                </div>

                <div className="accordion-container">
                    {sections.map((section, index) => (
                    <div className="section-tab" key={section.id}>
                        <div className="section-header" onClick={() => toggleAccordion(index)}>
                        <div className="tab-1">
                            <i className={`fa-solid ${openSections[index] ? 'fa-minus' : 'fa-plus'}`}></i>
                            <span>{section.title}</span>
                        </div>
                        <div className="tab-2">{`${section.contents.length} lectures`}</div>
                        </div>
                        {openSections[index] && (
                        <div className="section-body">
                            {section.contents.map((content) => (
                            <div key={content.id} className="card">
                                <p>{content.title}</p>
                                <i className={`fa-solid ${getIconForContentType(content.content_type)}`}></i>
                                {/* Render other content details here */}
                            </div>
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            <div className='requirements-container'>
                <div className='wrapper'>
                    <div className='title'>Requirements</div>
                     <ul>
                     
                        {requirements.map((requirement) =>(
                            <li key={requirement.id}>{requirement.title}</li>
                        ))}
                     </ul>
                </div>
            </div>
            <div className='description-container'>
                <div className='wrapper'>
                <div className='title'>Description</div>
                <div className='text'>
                {course.description}
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
            {showVideoModal && (
            <div className = 'preview-video-wrapper'>
                <div className='preview-container'>
                    <div className='preview-header'>
                        <span className='title-header'>Course Preview</span>
                        <span className='icon'>
                            <button onClick={() => setShowVideoModal(false)}> <i className="fa-solid fa-x"></i></button>
                        </span>
                    </div>
                    <div className = 'preview-title'>
                        <div className='title'>{course.title}</div>
                    </div>
                    <div className='video-wrapper'>
                       
                        <video controls>
                            <source src={`${apiUrl}${course.preview_video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
}

export default CourseDetailPage;