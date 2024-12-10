import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { setUserDetails, clearUserDetails } from "./store/userSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotPass from "./pages/ForgotPass";
import SignUp from "./pages/SignUp";
import AdminPannel from "./pages/AdminPannel";
import AllUsers from "./pages/AllUsers";
import AllProducts from "./pages/AllProducts";
import UploadProduct from "./components/UploadProduct";
import EditProduct from "./components/EditProduct";
import PrivateRoutes from "./utils/PrivateRoutes";
import CategoryProduct from "./pages/CategoryProduct";

const App = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const [auth, setAuth] = useState({ token: false });

  // Fetch user details and update Redux store
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user-details", {
        method: "GET",
        credentials: "include", // Ensure cookies are sent with the request
      });
      const result = await response.json();
      if (result.success) {
        dispatch(setUserDetails(result.user)); // Update user details in Redux
      } else {
        dispatch(clearUserDetails()); // Clear user details if not authenticated
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      dispatch(clearUserDetails());
    }
  };

  useEffect(() => {
    // Check if user is authenticated when the app loads
    fetchUserDetails();
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <Header userDetails={userDetails} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Login setAuth= {setAuth} />} />
        <Route path="/forget-password" element={<ForgotPass />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/category-product/:category" element={<CategoryProduct />} />

        {/* Protected route */}

        <Route element={<PrivateRoutes auth={auth} />}>
          <Route
            path="/admin-pannel"
            element={<AdminPannel userDetails={userDetails} />}
          >
            <Route path="all-users" element={<AllUsers />} />
            <Route path="all-products" element={<AllProducts />} />
          </Route>
        </Route>
        {/* Above is protected route */}

        {/* Protected route */}

        <Route element={<PrivateRoutes auth={auth}/>}>
          <Route path="/upload-product" element={<UploadProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Route>

        {/* Above is protected route */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
