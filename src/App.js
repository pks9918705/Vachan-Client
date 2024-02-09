import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
// import ProductList from './pages/ProductList.jsx';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
// import Product from "./pages/Product";
import { useSelector } from "react-redux";
import Success from "./pages/Success.jsx";
import SuccessPayment from "./pages/SuccessPay.jsx";
import FailurePayment from "./pages/FailurePayment.jsx";
// import FrontPage from "./FrontPage"

    function App() {
        const user = useSelector((state) => state.user.currentUser);
        console.log(user)
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/" element={< FrontPage />} /> */}
                    {/* <Route path="/products/:category" element={<ProductList />} /> */}
                    {/* <Route path="/product/:id" element={<Product />} /> */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/paymentsuccess" element={<SuccessPayment />} />
                    <Route path="/failure" element={<FailurePayment />} />


                    <Route
                        path="/login"
                        element={
                            // Check if user is logged in and navigate accordingly
                            user ? <Navigate replace to={"/"} /> : <Login />
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            // Check if user is logged in and navigate accordingly
                            user ? <Navigate replace to={"/"} /> : <Register />
                        }
                    />




                </Routes>
            </Router>
        );
    }

export default App;
