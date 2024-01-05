import { Link,useParams  } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CreateCourse = ()=>{
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubcategory, setSelectedSubcategory] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewVideo, setPreviewVideo] = useState('');
    const [overview, setOverview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const User = useSelector(state => state.user.user);

    
    
   
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(!isLoading);
        
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('category', selectedCategory);
            formData.append('sub_category', selectedSubcategory);
            formData.append('overview', overview);
            formData.append('thumbnail', thumbnail);
            formData.append('preview_video', previewVideo);
            console.log('previewVideo:',previewVideo);
    
            // Check if thumbnail is a file (not a base64 string)
           
    
            const response = await axios.post('http://127.0.0.1:8000/courses/create/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${User.auth_token}`, // Include the user ID in the Authorization header
                },
            });
    
            if (response.data.success) {
                setTimeout(() => {
                    setIsLoading(isLoading);
                    navigate('/');
                   
                }, 2000);
                console.log('Course created successfully:', response.data.course);
                // Redirect to the home page or do any other actions
            } else {
                console.error('Course creation failed:', response.data.message);
                // Handle failed course creation, e.g., show error messages to the user
            }
        } catch (error) {
            console.error('An error occurred during course creation:', error);
            setTimeout(() => {
                setIsLoading(isLoading);
               
            }, 2000);
            // Handle unexpected errors
        }
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
    
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            //reader.readAsDataURL(file);
            setThumbnail(file);
        } else {
            console.error('Invalid file type or no file selected.');
        }
    };
    
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handleOverviewChange = (event) => {
        setOverview(event.target.value);
    };
    
    const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    };

   
      const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'category') {
            handleCategoryChange(value);
        } else if (name === 'subcategory') {
            setSelectedSubcategory(value);
        }
    };

    const handleCategoryChange = async (categoryId) => {
        setSelectedCategory(categoryId);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/subcategories/${categoryId}/`);
            setSubcategories(response.data);
            if (response.data.length > 0) {
                setSelectedSubcategory(response.data[0].id);
            } else {
                setSelectedSubcategory('');
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    useEffect(() => {
        // Check if the user is authenticated  !User && User.isInstructor === true 
       
        if (User=== null || User?.isInstructor === false ) {
            // Redirect to the login page
            navigate('/instructor-login/');
            return; // Stop further execution of useEffect
        }
    
        // Fetch categories and default subcategories
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/categories/');
                setCategories(categoriesResponse.data);
    
                if (categoriesResponse.data.length > 0) {
                    const defaultCategoryId = categoriesResponse.data[0].id;
                    setSelectedCategory(defaultCategoryId);
    
                    const subcategoriesResponse = await axios.get(`http://127.0.0.1:8000/api/subcategories/${defaultCategoryId}/`);
                    setSubcategories(subcategoriesResponse.data);
    
                    if (subcategoriesResponse.data.length > 0) {
                        setSelectedSubcategory(subcategoriesResponse.data[0].id);
                    } else {
                        setSelectedSubcategory('');
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [User, navigate]);
    
  

    return(
        <div className='page-wrapper'>
            <Header />
            <div className='wrapper'>
            <form className="form-container" onSubmit={handleSubmit}  >
                <div className='form-header'>
                    <span>Create course</span>
                    <i class="fa-solid fa-chalkboard-user"></i>
                </div>
                <div className={`form-group ${title ? 'active' : ''}`}>
                    <input type="text" id="title" value={title} onChange = {handleTitleChange} required />
                    <label htmlFor="title">Title</label>
                </div>
                <div className={`form-group ${price ? 'active' : ''}`}>
                    <input type="number" id="price" value={price} onChange = {handlePriceChange} required />
                    <label htmlFor="price">Price</label>
                </div>

                <div className={`form-group ${categories ? 'active' : ''}`}>
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" onChange={handleInputChange} required>
                        <option value="" disabled>Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </select>
                </div>

                <div className={`form-group ${subcategories ? 'active' : ''}`}>
                    <label htmlFor="subcategory">Sub Category</label>
                    <select id="subcategory" name="subcategory" onChange={handleInputChange} required>
                        <option value="" disabled>Select Subcategory</option>
                        {subcategories.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.title}</option>
                        ))}
                    </select>
                </div>

                
                <div className={`form-group ${overview ? 'active' : ''}`}>
                    <textarea  maxLength={70} value={overview} id = 'overview' onChange= {handleOverviewChange} required></textarea>
                    <label  htmlFor="overview">course verview</label>
                </div>

                <div className={`form-group ${description ? 'active' : ''}`}>
                    <textarea value={description} id = 'description' onChange= {handleDescriptionChange} required></textarea>
                    <label htmlFor="description">Description</label>
                </div>
                <div className = 'thumbnail-wrapper' >
                     <label htmlFor="thumbnail" className='thumb-label'>Thumbnail</label>
                    <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={handleFileChange}
                    required
                    />
                </div>
                <div className = 'thumbnail-wrapper' >
                    <label title='course preview video' htmlFor="previewVideo" className='thumb-label'>Preview Video</label>
                    <input
                    type="file"
                    id="previewVideo"
                    name="previewVideo"
                    onChange={(e) => setPreviewVideo(e.target.files[0])}
                    
                    required
                    />
                </div>

                <div className='btn-wrapper'>
                    <button type="submit">
                        Submit
                        {isLoading ? <div className="loader"></div> : '' }
                            
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default CreateCourse;