import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles
import Header from '../components/header';
import 'swiper/swiper-bundle.css';
import '../styles/course-requirements.css';
import logo from '../styles/logo.svg';
import hero1 from '../styles/hero1.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Requirements = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [title, setTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [requirements, setRequirements] = useState([]);
  const [editingRequirement, setEditingRequirement] = useState(null);
  const navigate = useNavigate();


  const checkCourseOwner = async () => {
    //console.log('user.auth_token:',user);
    try {
      const response = await axios.get(`http://localhost:8000/api/check-course-owner/${id}/`,{
          headers: {
              Authorization: `Token ${user?.auth_token}`,
          },
      });
      
      if(response.data.success){
        console.log('all good');
      }else{
        navigate('/access-denied/');
      }
    
    } catch (error) {
      navigate('/access-denied/');
    }
  };

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/courses/${id}/add-requirements/`);
      setRequirements(response.data);
    } catch (error) {
      console.error('Error fetching requirements:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);

      const response = await axios.post(`http://127.0.0.1:8000/courses/${id}/add-requirements/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user.auth_token}`,
        },
      });

      if (response.data.success) {
        console.log('Requirement created successfully:', response.data);
        setTitle('');
        fetchRequirements();
      } else {
        console.error('Failed to create requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement creation:', error);
    }
  };

  const handleDelete = async (requirementId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/courses/${id}/requirements/${requirementId}/delete/`, {
        headers: {
          Authorization: `Token ${user.auth_token}`,
        },
      });
      console.log('response.data:',response.data);
      if (response.data.success) {
        console.log(`Requirement with ID ${requirementId} deleted successfully.`);
        fetchRequirements();
      } else {
        console.error('Failed to delete requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement deletion:', error);
    }
  };

  const handleEditingData = (requirementId,title) =>{
    setEditingRequirement(requirementId);
    setNewTitle(title);
  }

  const handleEdit = async (requirementId) => {
    try {
      const formData = new FormData();
      formData.append('title', newTitle);

      const response = await axios.put(`http://127.0.0.1:8000/courses/${id}/requirements/${requirementId}/edit/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${user.auth_token}`,
        },
      });

      if (response.data.success) {
        console.log(`Requirement with ID ${requirementId} edited successfully.`);
        fetchRequirements();
        setEditingRequirement(null); // Reset editing state after successful edit
      } else {
        console.error('Failed to edit requirement:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during requirement editing:', error);
    }
  };

  useEffect(() => {
    checkCourseOwner();
    fetchRequirements();
  }, []);

  return (
    <div className="page-wrapper">
        <Header/>
      <div className="wrapper">
        <form id="form-container-requirement" className="form-container" onSubmit={handleSubmit}>
          <div className="section-wrapper">
            <h2>Add course requirements</h2>
            <input
              type="text"
              placeholder="e.g students should have basic IT knowledge"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="add-section-btn">
              Add Section
            </button>
          </div>
        </form>

        <div className="requirements-list">
          <h2>Course Requirements</h2>
          <ul>
            {requirements.map((requirement) => (
              <li key={requirement.id}>
                {editingRequirement === requirement.id ? (
                  <>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button className='save-btn' onClick={() => handleEdit(requirement.id)}>Save</button>
                  </>
                ) : (
                  <>
                    {requirement.title}
                    <button className='edit-btn' onClick={() => handleEditingData(requirement.id,requirement.title)}><i className="fa-solid fa-pen-to-square"></i></button>
                    <button className = 'delete-btn' onClick={() => handleDelete(requirement.id)}><i className="fa-solid fa-trash"></i></button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Requirements;