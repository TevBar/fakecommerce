import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';
import Page404 from './components/pages/Page404';
import Homepage from './components/pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UserAuth from './components/pages/UserAuth';
import Checkout from './components/pages/Checkout';
import Profile from "./components/pages/Profile"; 
import OrderHistory from "./components/order/OrderHistory";
import OrderDetails from "./components/order/OrderDetails";
import CategoryProducts from "./components/CategoryProducts";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './components/store/store';
import { setAuth, clearAuth } from './components/store/authSlice';
import { auth } from './firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

// ✅ Import reusable ProductForm (for both add/edit)
import ProductForm from './components/products/ProductForm';

const App: React.FC = () => {
    const dispatch = useDispatch();
    const usertoken = useSelector((state: RootState) => state.auth?.token ?? null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                dispatch(setAuth(token));
            } else {
                dispatch(clearAuth());
            }
        });

        return () => unsubscribe();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ToastContainer />
            <Toaster
                toastOptions={{
                    style: {
                        backgroundColor: 'rgba(30, 30, 30, 0.9)',
                        color: 'whitesmoke',
                        fontSize: '1rem',
                    },
                }}
            />
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                {/* ✅ Product add/edit (optional: wrap in auth) */}
                <Route path="/products/new" element={usertoken ? <ProductForm /> : <Navigate to="/auth" replace />} />
                <Route path="/products/edit/:id" element={usertoken ? <ProductForm /> : <Navigate to="/auth" replace />} />

                <Route path="/auth" element={<UserAuth />} />
                <Route path="/profile" element={usertoken ? <Profile /> : <Navigate to="/auth" replace />} />
                <Route path="/checkout" element={usertoken ? <Checkout /> : <Navigate to="/auth" replace />} />
                <Route path="/category/:categoryName" element={<CategoryProducts />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

export default App;

