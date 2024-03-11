import React, { useState } from 'react';
import AddProductForm from '../components/forAdmin/AddProduct';
import AllProducts from '../components/forAdmin/AllProducts';
import RepairOrder from '../components/forAdmin/RepairOrder';
import Offer from '../components/forAdmin/Offer';
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('addProduct');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex">
      {/* Left side - Tab bar */}
      <div className="w-1/4 border-r">
        <div
          className={`p-4 cursor-pointer ${activeTab === 'addProduct' ? 'bg-gray-200' : ''}`}
          onClick={() => handleTabClick('addProduct')}
        >
          Add Product
        </div>
        <div
          className={`p-4 cursor-pointer ${activeTab === 'order' ? 'bg-gray-200' : ''}`}
          onClick={() => handleTabClick('order')}
        >
          Repair Order
        </div>
        <div
          className={`p-4 cursor-pointer ${activeTab === 'offer' ? 'bg-gray-200' : ''}`}
          onClick={() => handleTabClick('offer')}
        >
          Offer
        </div>
        <div
          className={`p-4 cursor-pointer ${activeTab === 'products' ? 'bg-gray-200' : ''}`}
          onClick={() => handleTabClick('products')}
        >
          Products
        </div>
       
        {/* Add more tabs here if needed */}
      </div>
      {/* Right side - Content area */}
      <div className="w-3/4 p-4">
        {activeTab === 'addProduct' && <AddProductForm />}
        {activeTab === 'order' && <RepairOrder />}
        {activeTab === 'offer' && <Offer />} 
        {activeTab === 'products' && <AllProducts/>}
        {/* Add more content components for other tabs */}
      </div>
    </div>
  );
};

export default AdminPage;
