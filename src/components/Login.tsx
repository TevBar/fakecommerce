import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/authSlice'; // Adjust path if needed
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email and password
    if (!email || !password) {
      toast.error('Email and password are required.');
      return;
    }

    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      const user = credentials.user;

      // Retrieve the token properly
      const token = await user.getIdToken();

      dispatch(setAuth(token)); // Store token in Redux store
      localStorage.setItem('token', token); // Store token in localStorage

      toast.success('Logged in successfully!');
      navigate('/products');
    } catch (err) {
      console.error('Login error:', err); // Log the error for debugging
      toast.error('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4 p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 rounded-md"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 rounded-md"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Login
      </button>
    </form>
  );
}

export default Login;
