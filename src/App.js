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
import Logout from './pages/logout';
import Requirements from './pages/course-requirements';
import Objectives from './pages/course-objectives';
import Checkout from "./pages/check-out";
import PaymentSuccess from './pages/payment-success';
import AccessDenied from './pages/access-denied';
import InstructorSignup from "./pages/instructor-signup";
import InstructorLogin from "./pages/instructor-login";
import  CreateProfile  from "./pages/create-profile";
import  EditProfile  from "./pages/profile-edit";
import CourseEdit from './pages/course-edit';
import Search from './pages/search';
import Profile from './pages/profile';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="course-detail/:id/:title/" element={<CourseDetailPage />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="profile" element={<Profile />} />
      <Route path="course/:id/edit/" element={<CourseEdit />} />
      <Route path="instructor-signup" element={<InstructorSignup />} />
      <Route path="instructor-login" element={<InstructorLogin />} />
      <Route path="access-denied" element={<AccessDenied/>} />
      <Route path="payment-success" element={<PaymentSuccess />} />
      <Route path="profile/create/" element={< CreateProfile  />} />
      <Route path="profile/edit/" element={< EditProfile  />} />
      <Route path="logout" element={<Logout />} />
      <Route path="signup" element={<Signup />} />
      <Route path="search" element={<Search />} />
      <Route path="login" element={<Login />} />
      <Route path="courses/add-requirement/:id/:title/" element={<Requirements />} />
      <Route path="courses/add-objectives/:id/:title/" element={<Objectives />} />
      <Route path="course-sections/:id/:title/" element={<CourseSections />} />
      <Route path="create-course" element={<CreateCourse />} />
      <Route path="instructor" element={<Instructor />} />
      <Route path="cart" element={<Cart />} />
      <Route path="wishlist" element={<WishList />} />
      <Route path="user-courses" element={<UserCourses />} />
      <Route path="teach" element={<Teach />} />
      <Route path="course-view-page/:id/:title/" element={<CourseViewPage />} />
      <Route path="blogs" element={<Blogs />} />
      <Route path="contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
    <Footer/>
  </BrowserRouter>
  );
}

export default App;
