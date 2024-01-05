import { Link,useParams  } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/profile.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import apiUrl from '../components/api-url';


const Profile = ()=>{
    const  [profile,setProfile] = useState({});
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/fetch-profile/`,{
                headers: {
                    Authorization: `Token ${user?.auth_token}`,
                },
            });
            if(response.data.success){
                setProfile(response.data.data)
             }else{
                navigate('/profile/create/');
            };
        
        } catch (error) {
            navigate('/access-denied/');
         
        }   
    };
    useEffect(() => {

      fetchProfile();
    }, []);

    return(
        <div className='page-wrapper'>
            <Header/>
            <div className='wrapper'>
            <div className='author-container'>
                <div className='wrapper'>
                    <div className='profile-container'>
                        <div className='caption'>Your Profile</div>
                        <img src={`${apiUrl}${profile.picture}`} alt = 'instructor' />
                        <div className='author-details'>
                            <div className='name'>
                                {profile.first_name} {profile.last_name}
                                <Link className='profile-edit' to='/profile/edit/'>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </Link>
                            </div>
                            <div className='title'>
                               {profile.title}
                            </div>
                            <div className='phone'>
                                <i class="fa-solid fa-phone"></i>
                               {profile.phone}
                            </div>
                            <div className='website'>
                                <i class="fa-solid fa-globe"></i>
                                {profile.website}
                            </div>
                           
                            <div className='description'>
                            
                             <ReactQuill
                              value={profile.biography}
                                readOnly={true}
                                theme={"bubble"}
                            />


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
};

export default Profile;