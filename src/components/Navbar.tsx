import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsCart3 } from "react-icons/bs";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth, toggleCart } from './store/authSlice';
import Cart from './Cart';

function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(true);

    const usertoken = useSelector((state: { auth: { token: string | null } }) => state.auth?.token ?? null);
    const items = useSelector((state: { cart: Array<any> }) => state.cart ?? []);
    const isCartVisible = useSelector((state: { auth: { isCartVisible: boolean } }) => state.auth?.isCartVisible ?? false);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch(clearAuth());
            setIsNavVisible(!isNavVisible);
            localStorage.removeItem('token');  
            toast.warning("Logged out successfully!");
        } catch (err: any) {
            console.error("Signout Error ", err.message);
            toast.error("Logout error!");
        }
    };

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">ezmart</Link>
            </div>

            {/* Mobile Menu Button */}
            <span className="mobile-menu-icon" onClick={() => setIsNavVisible(!isNavVisible)}>
                {isNavVisible ? <CgMenuLeft /> : <CgClose />}
            </span>

            {/* Navigation Links */}
            <ul className={`navbar-menu ${isNavVisible ? "hidden" : "visible"}`}>
                <li><NavLink to="/" className="nav-link">Home</NavLink></li>
                <li><NavLink to="/products" className="nav-link">Categories</NavLink></li>
                <li><NavLink to="/about" className="nav-link">About</NavLink></li>
            </ul>

            {/* Auth & Cart Section */}
            <div className="auth-cart">
                {usertoken ? (
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                ) : (
                    <Link to="/auth">
                        <button className="signin-button"> Sign In</button>
                    </Link>
                )}
                <div className="cart-container" onClick={() => dispatch(toggleCart())}>
                    <BsCart3 className="cart-icon" />
                    <span className="cart-badge">{items.length}</span>
                </div>
            </div>

            {/* Cart Component */}
            {isCartVisible && <Cart />}
        </nav>
    );
}

export default Navbar;
