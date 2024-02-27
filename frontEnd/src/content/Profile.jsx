import { useState } from 'react'
import '../App.css'
import { useParams } from 'react-router-dom';
function Profile() {

  const {userId } = useParams();
  return (
    <h1>Profile id ${userId}</h1>
     
  )
}

export default Profile
