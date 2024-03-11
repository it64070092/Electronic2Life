
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import backendip from "../../../backendip";
import axios from "axios";
const RepairTracking = ({ onProductClick }) => {
    const user = useSelector(state => state.user);
    const userId = user.user?.user?._id;
    // Mock data for list of products being repaired
    const [repairList, setRepairList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://' + backendip + `:3000/get-repairs/${userId}`);
                console.log(response.data.repairs)
                setRepairList(response.data.repairs)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">รายการสินค้าที่ซ่อม</h1>
            <ul>
                {repairList.map((product) => (
                    <li key={product._id} className="flex items-center justify-between border-b py-2">
                        <div className="flex items-center">
                            <img src={`http://${backendip}:3000/uploads/${product.repairImage}`} alt={product.name} className="w-40 h-40 object-cover mr-4" />
                            <div>
                                <h3 className={`font-semibold ${product.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : ''}`}>{product.name}</h3>
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>
                        </div>
                        <div>
                            <span className={`text-sm font-semibold ${product.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : ''}`}>{product.status}</span>
                            <button onClick={() => onProductClick(product._id)} className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">ดูรายละเอียด</button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default RepairTracking;
