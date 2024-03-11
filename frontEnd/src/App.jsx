import { useState } from 'react'
import HomePage from './content/HomePage';
import SignIn from './content/SignIn';
import SignUp from './content/SignUp';
import ProductDetail from './content/ProductDetail';
import ProductPage from './content/ProductPage';
import Profile from './content/Profile';
import NotFound from './content/NotFound';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './content/AdminPage';
import FixRequest from './content/FixRequest';
import SellRequest from './content/SellRequest';
import AddProductForm from './components/forAdmin/AddProduct';
import Tracking from './content/Tracking';
import { ComplexNavbar } from './components/NavBar';
import Footer from './components/Footer';
function App() {


  return (
    <Router>
    <div className='App' style={{height:"100%"}}>
    <ComplexNavbar/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/fixrequest' element={<FixRequest/>} />
        <Route path='/sellrequest' element={<SellRequest/>} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/addproduct' element={<AddProductForm/>}/>
        <Route path='/user/tracking' element={<Tracking/>}/>
      </Routes>
    <Footer/>
    </div>
  </Router>
  )
}

export default App
