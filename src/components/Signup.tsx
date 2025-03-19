import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice'; // Adjust path if needed
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            const user = credentials.user;

            // ✅ Correctly retrieve Firebase token
            const token = await user.getIdToken();

            dispatch(setAuth({ token })); // Store token in Redux
            localStorage.setItem('token', token); // Store token in localStorage

            toast.success("Account created successfully!");
            navigate('/products');
        } catch (err) {
            console.error("Signup Error", err);
            toast.error("Signup failed! Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSignup} className="space-y-5">
                <div className="space-y-3">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="px-3 py-2 border rounded"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="px-3 py-2 border rounded"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="px-3 py-2 border rounded"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
