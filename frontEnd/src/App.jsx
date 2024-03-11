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
import RequestPage from './content/RequestPage';
import AddProductForm from './components/forAdmin/AddProduct';
function App() {


  return (
    <Router>
    <div className='App'>
    
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path='/request' element={<RequestPage/>} />
        <Route path='/admin' element={<AdminPage/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/addproduct' element={<AddProductForm/>}/>
      </Routes>
    
    </div>
  </Router>
  )
}

export default App
