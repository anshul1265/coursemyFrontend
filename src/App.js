import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header/Header';
import Home from './components/Home/Home';
import Footer from './components/Layout/Footer/Footer';
import Courses from './components/Courses/Courses';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgetPassword from './components/Auth/ForgetPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import NotFound from './components/Layout/NotFound/NotFound';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentFail from './components/Payments/PaymentFail';
import Subscribe from './components/Payments/Subscribe';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourse from './components/Admin/CreateCourse/CreateCourse';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import { loadUser } from './redux/actions/user';
import { ProtectedRoute } from "protected-route-react";
import Loader from './components/Layout/Loader/Loader';

function App() {

  window.addEventListener('contextmenu', (e) => { e.preventDefault() });
  const { isAuthenticated, user, message, error, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();

  // if any three of dispatch, error or message changes, then call this useEffect
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  // useEffect to get data without requiring the user to login
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch])

  return (
    <Router>

      {/* if we are in loading state, then show the loader */}
      {
        loading ? (<Loader />) :
          (
            <>
              <Header isAuthenticated={isAuthenticated} user={user} />
              <Routes>

                {/* normal routes accessible for everyone */}
                <Route path='/' element={<Home />} />
                <Route path='/courses' element={<Courses />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/request' element={<Request />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />

                <Route path='/course/:id' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CoursePage user={user} />
                  </ProtectedRoute>
                } />

                <Route path='/forgotpassword' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <ForgetPassword />
                  </ProtectedRoute>
                } />
                <Route path='/resetpassword/:token' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <ResetPassword />
                  </ProtectedRoute>
                } />

                {/* if the user is not authenticated then he/she will go to the profile after login */}
                <Route path='/login' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <Login />
                  </ProtectedRoute>
                } />

                {/* if the user is authenticated then he/she will go to the profile route */}
                <Route path='/profile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                } />

                {/* if the user is not authenticated then he/she will go to the profile route after registeration */}
                <Route path='/register' element={
                  <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile">
                    <Register />
                  </ProtectedRoute>
                } />

                {/* if a user has to subscibe to a course, then he/she has to be authenticated */}
                <Route path='/subscribe' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Subscribe user={user} />
                  </ProtectedRoute>
                } />

                <Route path='/paymentsuccess' element={<PaymentSuccess />} />
                <Route path='/paymentfail' element={<PaymentFail />} />

                {/* if user has to change password, then he/she must be authenticated */}
                <Route path='/changepassword' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ChangePassword />
                  </ProtectedRoute>
                } />

                {/* if user has to update profile, then he/she must be authenticated */}
                <Route path='/updateprofile' element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}

                {/* dashboard route */}
                <Route path='/admin/dashboard' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* create course route */}
                <Route path='/admin/createcourse' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <CreateCourse />
                  </ProtectedRoute>
                } />

                {/* all courses route */}
                <Route path='/admin/courses' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                } />

                {/* all users route */}
                <Route path='/admin/users' element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <Users />
                  </ProtectedRoute>
                } />

              </Routes>
              <Footer />
              <Toaster />
            </>
          )
      }
    </Router>
  );
}

export default App;
