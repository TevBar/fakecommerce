import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BsCart3 } from "react-icons/bs";
import { CgMenuLeft, CgClose } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth, toggleCart } from './store/authSlice';
import Cart from './Cart';
import './Navbar.css';
import { useCategories } from '../hooks/useCategories'; // ✅ React Query hook

function Navbar() {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false); // ✅ Dropdown toggle

    const usertoken = useSelector((state: { auth: { token: string | null } }) => state.auth?.token ?? null);
    const items = useSelector((state: { cart: Array<any> }) => state.cart ?? []);
    const isCartVisible = useSelector((state: { auth: { isCartVisible: boolean } }) => state.auth?.isCartVisible ?? false);

    const dispatch = useDispatch();
    const { data: categories, isLoading, error } = useCategories(); // ✅ fetch categories

    // ✅ Check what's coming back from the API
    useEffect(() => {
        console.log("Fetched categories:", categories);
    }, [categories]);

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

                {/* ✅ Controlled Dropdown */}
                <li
                    className="nav-link dropdown relative"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <span className="cursor-pointer">Categories</span>
                    {showDropdown && (
                        <ul className="dropdown-menu absolute bg-white text-black mt-2 rounded shadow-md z-50 min-w-[180px]">
                            {isLoading && (
                                <li className="px-4 py-2 text-gray-500">Loading...</li>
                            )}
                            {error && (
                                <li className="px-4 py-2 text-red-500">Error loading categories</li>
                            )}
                            {Array.isArray(categories) && categories.map((category: string) => (
                                <li key={category}>
                                    <NavLink
                                        to={`/category/${encodeURIComponent(category)}`}
                                        className="block px-4 py-2 hover:bg-gray-200"
                                    >
                                        {category}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>

                <li><NavLink to="/about" className="nav-link">About</NavLink></li>
                <li><NavLink to="/profile" className="hover:text-gray-300">Profile</NavLink></li>
                <li><NavLink to="/orders" className="text-blue-600 underline">View Order History</NavLink></li>
            </ul>

            {/* Auth & Cart Section */}
            <div className="auth-cart">
                {usertoken ? (
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                ) : (
                    <Link to="/auth">
                        <button className="signin-button">Sign In</button>
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




// import { toast } from 'react-toastify';
// import { BsCart3 } from "react-icons/bs";
// import { Link, NavLink } from 'react-router-dom';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase.config';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearAuth, toggleCart } from './store/authSlice';
// import Cart from './Cart';

// import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';

// function NavigationBar() {
//     const usertoken = useSelector((state: { auth: { token: string | null } }) => state.auth?.token ?? null);
//     interface CartItem {
//         id: string;
//         name: string;
//         price: number;
//         quantity: number;
//     }

//     const items = useSelector((state: { cart: Array<CartItem> }) => state.cart ?? []);
//     const isCartVisible = useSelector((state: { auth: { isCartVisible: boolean } }) => state.auth?.isCartVisible ?? false);

//     const dispatch = useDispatch();

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             dispatch(clearAuth());
//             localStorage.removeItem('token');
//             toast.warning("Logged out successfully!");
//         } catch (err: any) {
//             console.error("Signout Error ", err.message);
//             toast.error("Logout error!");
//         }
//     };

//     return (
//         <>
//             <Navbar bg="light" expand="lg" className="shadow-sm mb-4">
//                 <Container>
//                     <Navbar.Brand as={Link} to="/">ezmart</Navbar.Brand>
//                     <Navbar.Toggle aria-controls="navbar-nav" />
//                     <Navbar.Collapse id="navbar-nav">
//                         <Nav className="me-auto">
//                             <Nav.Link as={NavLink} to="/">Home</Nav.Link>
//                             <Nav.Link as={NavLink} to="/products">Categories</Nav.Link>
//                             <Nav.Link as={NavLink} to="/about">About</Nav.Link>
//                             <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
//                             <Nav.Link as={NavLink} to="/orders">View Order History</Nav.Link>
//                         </Nav>
//                         <div className="d-flex align-items-center gap-3">
//                             {usertoken ? (
//                                 <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
//                             ) : (
//                                 <Button as={Link} to="/auth" variant="outline-primary" size="sm">Sign In</Button>
//                             )}
//                             <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => dispatch(toggleCart())}>
//                                 <BsCart3 size={22} />
//                                 <Badge pill bg="primary" style={{ position: 'absolute', top: -5, right: -10 }}>
//                                     {items.length}
//                                 </Badge>
//                             </div>
//                         </div>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>

//             {isCartVisible && <Cart />}
//         </>
//     );
// }

// export default NavigationBar;
