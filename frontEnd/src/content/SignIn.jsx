import { useState } from 'react'
import '../App.css'

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
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
          <button className="bg-[#738F78] text-2xl text-white p-4 mx-60 mb-6 rounded-lg">Sign In</button>
          <div className="flex justify-center">
            <p className="text-2xl">Don't have an account?</p>
            <p className="text-2xl text-[#63C7FF] pl-2 font-bold">Sign Up</p>
          </div>
        </div>
      </div>
    </div>


  )
}

export default SignIn
