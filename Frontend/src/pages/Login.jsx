import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { saveToken } from '../utils/auth';
import { toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
  const base= import.meta.env.VITE_Base_URL;
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      console.log("Fetched successfully........")
      
      const data = await response.json();
      
      
      if (response.ok) {
  saveToken(data);
  setMessage('Login successful!');
  toast.success('Login successful!');

  setTimeout(() => {
    window.location.href = "/";
  }, 500);
} else {
        setMessage(data.detail);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='w-full flex justify-center items-center min-h-[82.8vh] bg-white text-neutral-800'>
        <div className='bg-amber-100 flex flex-col p-5 rounded-xl shadow-2xl w-[90%] md:w-[60%] lg:w-[30%] gap-6'>
      <h2 className='mx-auto text-3xl font-semibold text-transparent bg-linear-to-r from-neutral-950 via-neutral-700 to-neutral-500 bg-clip-text'>Login</h2>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className='flex flex-col'>
            <label className='font-semibold'>Username:</label>
            <input className='border-2 h-12 p-2' placeholder='Enter Username' type="text" name="username" value={formData.username} onChange={handlechange} required />
        </div>
        <   div className='flex flex-col'>
            <label className='font-semibold'>Password:</label>
            <input className='border-2 h-12 p-2' placeholder='Enter Password' type="password" name="password" value={formData.password} onChange={handlechange} required />
        </div>
        <button className='p-3 bg-neutral-800 rounded text-white font-semibold cursor-pointer hover:scale-105' type="submit">Login</button>
      </form>
      <p className='text-sm text-center'>Don't have an account? <span onClick={() => navigate('/signup')} className='text-blue-600 cursor-pointer'>Sign up here</span></p>
      {message && <p>{message}</p>}
    </div>
    </div>
  )
}

export default Login