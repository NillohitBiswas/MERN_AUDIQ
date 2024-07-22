import {Link, useNavigate} from 'react-router-dom';
import Particlescomp from '../../components/Particles';
import './Login.css';
import { useState } from 'react';
import { loginStart,loginSuccess,loginFailure } from '../../Redux/user/userSlice';
import {useDispatch, useSelector } from 'react-redux';

function Login() {
  const [ formData, setFormData ] = useState({})
  const  {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleChange = (e)=> {
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async(e)=> {
    e.preventDefault();
    try {
      dispatch(loginStart());
     const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
     } )
     const data = await res.json();
     
     if (data.success === false) {
      dispatch(loginFailure(data));
      return;
     }
     dispatch(loginSuccess(data));
     navigate('/');
    } 
   catch(error){
   dispatch(loginFailure(error));
   }
  }
  return (
    <div>
      <Particlescomp id="particles"/>
      <div className='p-4 max-w-lg mx-auto'>
        <h1 className='font-mono font-bold text-3xl text-center my-7'>Get Started!</h1>
        <div className="login-container">
         <div className="login-header">
           <span>How you doing!</span>
           <h2>Enter Your personal details and you are ready to go.</h2>
         </div>
         <div className="line"></div>
         <form onSubmit={handleSubmit} className="login-form">
          <div className=" mt-10 relative">
           <input
             type="email"
             name="email"
             id="email"
             className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600  rounded-lg"
             placeholder="john@doe.com" 
             onChange={handleChange}
             autoComplete='off'
           />
           <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
          </div>
          <div className="mt-8 relative">
           <input
             type="password"
             name="Password"
             id="password"
             className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600 p-3 rounded-lg"
             placeholder="password" 
             onChange={handleChange}
             autoComplete='off'
           />
           <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
          </div>
           <button disabled={loading} >
            {loading ? "Loading..." : "Login" }
            </button>
          </form>
          <div className='mt-5 font-mono text-xs flex justify-center gap-2'>
            <p>Do not have an Account?</p>
            <Link to='/SignUp'>
            <span className='text-blue-600 '>Sign Up</span>
            </Link>
          </div>
          <p className='text-red-700 mt-5'>
            {error ? error.message || 'Somthing went wrong!' : '' }
          </p>
        </div>
      </div>
    </div>
  )
}
export default Login;