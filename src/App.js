//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";
import Header from './components/header';
import Footer from './components/footer';
import CourseDetailPage from './pages/course-detail';
import CourseViewPage from './pages/course-view-page';
import Teach from './pages/teach';
import UserCourses from './pages/user-courses';
import Cart from './pages/cart';
import WishList from './pages/wishlist';
import Instructor from './pages/instructor';
import CreateCourse from './pages/create-course';
import CourseSections from './pages/course-sections';
import Signup from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="course-detail" element={<CourseDetailPage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />
      <Route path="course-sections" element={<CourseSections />} />
      <Route path="create-course" element={<CreateCourse />} />
      <Route path="instructor" element={<Instructor />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<WishList />} />
      <Route path="user-courses" element={<UserCourses />} />
      <Route path="teach" element={<Teach />} />
      <Route path="course-view-page" element={<CourseViewPage />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
