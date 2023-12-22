import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/create-course.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';


const CreateCourse = ()=>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
   
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', { title, category ,subcategory,description});
    };
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
    
      const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
      };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
    
    const handleSubcategoryChange = (event) => {
        setSubcategory(event.target.value);
    };
    return(
        <div className='page-wrapper'>
            <Header />
            <div className='wrapper'>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className='form-header'>
                    <span>Create course</span>
                    <i class="fa-solid fa-chalkboard-user"></i>
                </div>
                <div className={`form-group ${title ? 'active' : ''}`}>
                    <input type="text" id="title" value={title} onChange = {handleTitleChange} required />
                    <label htmlFor="title">Title</label>
                </div>

                <div className={`form-group ${category ? 'active' : ''}`}>
                    <select id="category" value={category} onChange={handleCategoryChange} required >
                    <option value="">Select Category</option>
                    <option value="category1">Category 1</option>
                    <option value="category2">Category 2</option>
                    
                    </select>
                </div>

                <div className={`form-group ${subcategory ? 'active' : ''}`}>
                    <select id="subcategory" value={subcategory} onChange={handleSubcategoryChange} required>
                    <option value="">Select Subcategory</option>
                    {category === 'category1' && (
                        <>
                        <option value="subcat1">Subcategory 1</option>
                        <option value="subcat2">Subcategory 2</option>
                        </>
                    )}
                    {category === 'category2' && (
                        <>
                        <option value="subcat3">Subcategory 3</option>
                        <option value="subcat4">Subcategory 4</option>
                        </>
                    )}
                    {/* Add more subcategories as needed */}
                    </select>
                </div>

                <div className={`form-group ${description ? 'active' : ''}`}>
                    <textarea value={description} id = 'description' onChange= {handleDescriptionChange} required></textarea>
                    <label htmlFor="description">description</label>
                </div>

                <div className='btn-wrapper'>
                    <button type="submit">Submit</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default CreateCourse;