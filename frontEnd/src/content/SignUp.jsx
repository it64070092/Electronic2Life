import { useState } from 'react'
import '../App.css'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value)
  }

  return (
    <div className="bg-[#a6b09d] flex justify-end h-screen w-screen">
      <div className="bg-white h-full w-2/4 rounded-tl-3xl rounded-bl-3xl">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-center pt-24 pb-10">Sign Up</h1>
          <div className='flex flex-col pt-2 pb-6'>
            <p className="pl-28 pb-4 text-2xl font-bold">Username</p>
            <input type="text" placeholder="Your Username" value={username} onChange={handleUsernameChange} className="text-2xl p-4 mx-28 mb-4 rounded-lg border-2 border-black border-solid" />
            <p className="pl-28 pb-4 text-2xl font-bold">Email</p>
            <input type="email" placeholder="Your Email" value={email} onChange={handleEmailChange} className="text-2xl p-4 mx-28 mb-4 rounded-lg border-2 border-black border-solid" />
            <p className="pl-28 pb-4 text-2xl font-bold">Password</p>
            <input type="password" placeholder="Your Password" value={password} onChange={handlePasswordChange} className="text-2xl p-4 mx-28 mb-6 rounded-lg border-2 border-black border-solid" />
            <p className="pl-28 pb-4 text-2xl font-bold">Confirm Password</p>
            <input type="password" placeholder="Confirm your Password" value={confirmPassword} onChange={handleConfirmPasswordChange} className="text-2xl p-4 mx-28 mb-6 rounded-lg border-2 border-black border-solid" />
          </div>
          <button className="bg-[#738F78] text-2xl text-white p-4 mx-60 mb-6 rounded-lg">Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
