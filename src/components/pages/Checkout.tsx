import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from './store'; // Adjust path based on your store structure

const Checkout: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token); // Assuming `token` exists in `auth`
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/auth');
        }
    }, [token, navigate]);

    return token ? (
        <div>Checkout</div>
    ) : null; // Prevent rendering when navigating
};

export default Checkout;
