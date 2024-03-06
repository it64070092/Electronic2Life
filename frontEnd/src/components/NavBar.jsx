import { useState } from 'react'
import '../App.css'

function NavBar() {

  const [isLogin, setIsLogin] = useState(false)

  return (
    <div className='flex flex-row h-24 border-b-2 border-solid border-black'>
      <div className='flex flex-row w-1/2 pt-5 pl-10 gap-10'>
        <MdElectricBolt className='h-12 w-12' />
        <p className='text-2xl font-bold pt-2'>Home</p>
        <p className='text-2xl font-bold pt-2'>Products</p>
        <p className='text-2xl font-bold pt-2'>Contracts</p>
      </div>
      {isLogin && (
        <div className='flex flex-row w-1/2 justify-end pt-7 pr-28 gap-10'>
          <CgProfile className='h-9 w-9' />
        </div>
      )}
      {!isLogin && (
        <div className='flex flex-row w-1/2 justify-end pt-7 pb-7 pr-28 gap-5'>
          <button className="bg-black hover:bg-gray-700 w-[14%] text-white font-bold py-1 px-4 rounded-lg">
            Login
          </button>
          <button className="bg-black hover:bg-gray-700 w-[14%] text-white font-bold py-2 px-4 rounded-lg">
            Sign Up
          </button>
        </div>
      )}
    </div>
  )
}

export default NavBar
