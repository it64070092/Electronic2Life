import { useState } from 'react';
import axios from 'axios';
import '../App.css';
import backendip from '../../backendip';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make a POST request to your backend endpoint for registration
      const response = await axios.post('http://'+backendip+':3000/register', {
        username,
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log(response.data); // Assuming your backend sends back some data upon successful registration

      // Reset form fields and errors after successful registration
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
      navigate("/signin")
    } catch (error) {
      // Handle error response from the server
      console.log(error.response)
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occuddrred. Please try again.');
      }
    }
  };

  return (
    <div className="bg-[#a6b09d] flex justify-end h-screen w-screen">
      <div className="bg-white h-full w-2/4 rounded-tl-3xl rounded-bl-3xl">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-center pt-24 pb-10">Sign Up</h1>
          {error && <p className="text-red-600 text-center mb-6">{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit" className="bg-[#738F78] text-2xl text-white p-4 mx-60 mb-6 rounded-lg">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
