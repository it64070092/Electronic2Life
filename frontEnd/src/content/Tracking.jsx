import React, { useState } from 'react';
import AddProductForm from '../components/forAdmin/AddProduct';
import AllProducts from '../components/forAdmin/AllProducts';
import RepairTracking from '../components/userTracking/RepairTracking';
import RepairDetail from '../components/userTracking/RepairDetail';
import BuyDetail from '../components/userTracking/BuyDetail';
import BuyTracking from '../components/userTracking/BuyTracking';
import SellTracking from '../components/userTracking/SellTracking';
import SellDetail from '../components/userTracking/SellDetail';
const Tracking = () => {
    const [activeTab, setActiveTab] = useState('การซ่อม');
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        setSelectedProductId(null); // รีเซ็ต selectedProductId เมื่อกลับไปหน้าซ่อม
    };

    const handleProductClick = (id) => {
        setSelectedProductId(id);
    };

    return (
        <div className="flex">
            {/* Left side - Tab bar */}
            <div className="w-1/4 border-r">
                <div
                    className={`p-4 cursor-pointer ${activeTab === 'การซ่อม' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleTabClick('การซ่อม')}
                >
                    การซ่อม
                </div>
                <div
                    className={`p-4 cursor-pointer ${activeTab === 'การซื้อ' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleTabClick('การซื้อ')}
                >
                    การซื้อ
                </div>
                <div
                    className={`p-4 cursor-pointer ${activeTab === 'การขาย' ? 'bg-gray-200' : ''}`}
                    onClick={() => handleTabClick('การขาย')}
                >
                    การขาย
                </div>

                {/* Add more tabs here if needed */}
            </div>
            {/* Right side - Content area */}
            <div className="w-3/4 p-4">
                {activeTab === 'การซ่อม' && selectedProductId === null && <RepairTracking onProductClick={handleProductClick} />}
                {activeTab === 'การซ่อม' && selectedProductId !== null && <RepairDetail productId={selectedProductId} onBack={() => setSelectedProductId(null)} />}
                {activeTab === 'การซื้อ' && selectedProductId === null && <BuyTracking onProductClick={handleProductClick} />}
                {activeTab === 'การซื้อ' && selectedProductId !== null && <BuyDetail payment={selectedProductId}onBack={() => setSelectedProductId(null)} />}
                {activeTab === 'การขาย' && selectedProductId === null && <SellTracking onProductClick={handleProductClick} />}
                {activeTab === 'การขาย' && selectedProductId !== null && <SellDetail offer={selectedProductId}onBack={() => setSelectedProductId(null)} />}
                {/* Add more content components for other tabs */}
            </div>
        </div>
    );
};


export default Tracking;
