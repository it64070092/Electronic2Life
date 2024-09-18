import { useState } from 'react'
import backendip from '../../backendip';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import axios from 'axios';
import { Alert } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
function SignIn() {
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleSignIn = async () => {
    const userData = new URLSearchParams();
    userData.append('username', username);
    userData.append('password', password);

    try {
      const response = await axios.post('http://'+backendip+':3000/login', userData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
	timeout: 10000
      })
      if (response.status === 200) { // Checking the status code for success
        console.log("Login Success");
        console.log(response.data);
	dispatch(loginUser(response.data)); // Dispatching loginUser action with response data
        console.log(user)
        console.log("eiei")
        navigate('/')
      } else if (response.status === 401) {
        console.eror(response.data.error);
        alert(response.data.error);
      }
     } catch (error) {
        if (error.response && error.response.data && error.response.data.details) {
        alert(error.response.data.details); // Show the detailed error message
        } else {
        alert("An unexpected error occurred");
        }
     }
  } 

  return (
    <div className="bg-[#a6b09d] flex justify-end h-screen w-screen">
      <div className="bg-white h-full w-2/4 rounded-tl-3xl rounded-bl-3xl">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-center pt-24 pb-10">Welcome!</h1>
          <div className='flex flex-col pt-10'>
            <p className="pl-28 pb-4 text-2xl font-bold">Username</p>
            <input type="text" placeholder="Your Username" value={username} onChange={handleUsernameChange} className="text-2xl p-4 mx-28 mb-4 rounded-lg border-2 border-black border-solid" />
            <p className="pl-28 pb-4 text-2xl font-bold">Password</p>
            <input type="password" placeholder="Your Password" value={password} onChange={handlePasswordChange} className="text-2xl p-4 mx-28 mb-6 rounded-lg border-2 border-black border-solid" />
          </div>
          <div className="flex justify-end pr-28 mb-28">
            <p className='text-lg text-[#63C7FF] font-bold'>Forgot password?</p>
          </div>
          <button onClick={handleSignIn} className="bg-[#738F78] text-2xl text-white p-4 mx-60 mb-6 rounded-lg">Sign In</button>
          <div className="flex justify-center">
            <p className="text-2xl">Don't have an account?</p>
            <a href={"/signup"} className="text-2xl text-[#63C7FF] pl-2 font-bold">Sign Up</a>
          </div>
        </div>
      </div>
    </div>


  )
}

export default SignIn
