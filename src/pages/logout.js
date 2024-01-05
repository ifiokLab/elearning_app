import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Header from '../components/header';

const Logout = () => {
  return (
    <div className='page-wrapper'>
        <Header />
      <div className='wrapper'>
        <h1>Thanks for spending some quality time on the net today..</h1>
      </div>
    </div>
  );
};

export default Logout;
