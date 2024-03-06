import { useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

function Profile() {
  const [name, setName] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleLastnameChange = (event) => {
    setLastname(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setPhone(event.target.value)
  }

  const handleBirthDateChange = (event) => {
    setBirthDate(event.target.value)
  }

  return (
    <>
      <div className='flex flex-row pl-28 py-20'>
        <div className='flex-col h-[89vh] w-3/12 bg-[#a6b09d] rounded-3xl mr-16'>
          <div className='flex flex-row px-10 py-6 border-b-2 border-solid border-black'>
            <CgProfile className='h-9 w-9' />
            <p className='pl-4 text-2xl font-bold'>Edit Profile</p>
          </div>
          <div className='flex flex-row px-10 py-6 border-b-2 border-solid border-black'>
            <CgProfile className='h-9 w-9' />
            <p className='pl-4 text-2xl font-bold'>Edit Profile</p>
          </div>
          <div className='flex flex-row px-10 py-6 border-b-2 border-solid border-black'>
            <CgProfile className='h-9 w-9' />
            <p className='pl-4 text-2xl font-bold'>Edit Profile</p>
          </div>
        </div>
        <div className='flex flex-col bg-[#D9D9D9] h-[89vh] w-[65%] border-2 border-solid border-black rounded-3xl'>
          <div className='flex flex-row justify-start'>
            <img src='https://t4.ftcdn.net/jpg/04/81/13/43/360_F_481134373_0W4kg2yKeBRHNEklk4F9UXtGHdub3tYk.jpg' className='h-40 w-40 rounded-full mx-16 mt-6' />
            <div>
              <p className='text-4xl font-bold pt-12'>NAME</p>
              <p className='text-4xl font-bold pt-6'>LASTNAME</p>
            </div>
          </div>
          <div className='flex flex-row w-full pt-4'>
            <div className='flex flex-col w-1/2'>
              <p className="pl-16 pb-2 text-2xl font-bold">Name</p>
              <input type="text" placeholder="Your Name" value={name} onChange={handleNameChange} className="text-2xl p-2 ml-16 mr-16 rounded-lg border-2 border-black border-solid" />
              <p className="pl-16 pt-2 pb-2 text-2xl font-bold">Birth Date</p>
              <input type="Date" placeholder="Your Birth Date" value={birthDate} onChange={handleBirthDateChange} className="text-2xl p-2 ml-16 mr-16 mb-2 rounded-lg border-2 border-black border-solid" />
              <p className="pl-16 pb-2 text-2xl font-bold">Email</p>
              <input type="Email" placeholder="Your Email" value={email} onChange={handleEmailChange} className="text-2xl p-2 ml-16 mr-16 mb-2 rounded-lg border-2 border-black border-solid" />
              <p className="pl-16 pb-2 text-2xl font-bold">Address</p>
              <textarea placeholder="Your Address" value={address} onChange={handleAddressChange} className="text-2xl p-2 pb-16 ml-16 mr-16 mb-2 rounded-lg border-2 border-black border-solid" />
            </div>
            <div className='flex flex-col w-1/2'>
              <p className="pl-10 pb-2 text-2xl font-bold">Lastname</p>
              <input type="text" placeholder="Your Lastname" value={lastname} onChange={handleLastnameChange} className="text-2xl p-2 ml-10 mr-16 rounded-lg border-2 border-black border-solid" />
              <p className="pl-10 pt-4 pb-2 text-2xl font-bold">Phone Number</p>
              <input type="text" placeholder="Your Phone Number" value={phone} onChange={handlePhoneChange} className="text-2xl p-2 ml-10 mr-16 rounded-lg border-2 border-black border-solid" />
            </div>
          </div>
          <div className='flex justify-end mr-16 mt-4'>
            <button className="bg-[#738F78] text-2xl text-white p-4 w-[40%] rounded-lg font-bold">Save</button>
          </div>
        </div>
      </div>
    </>

  )
}

export default Profile
