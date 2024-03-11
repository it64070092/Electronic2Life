
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import backendip from "../../../backendip";
import axios from "axios";
const SellTracking = ({ onProductClick }) => {
    const user = useSelector(state => state.user);
    const userId = user.user?.user?._id;
    // Mock data for list of offers being repaired
    const [offerList, setOfferList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://${backendip}:3000/get-offers/${userId}`);
                console.log(response.data.offers);
           
                setOfferList(response.data.offers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId]);
    useEffect(() => {
    console.log(offerList)
    }, [offerList]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">รายการสินค้าที่ซื้อ</h1>
            <ul>
                {offerList.map((offer) => (
                    <li key={offer._id} className="flex items-center justify-between border-b py-2">
                        <div className="flex items-center">
                            <img src={`http://${backendip}:3000/uploads/${offer.offerImage}`} alt={offer.name} className="w-40 h-40 object-cover mr-4" />
                            <div>
                                <h3 className={`font-semibold ${offer.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : ''}`}>{offer.name}</h3>
                                <p className="text-sm text-gray-600">{offer.description}</p>
                            </div>
                        </div>
                        <div>
                            <span className={`text-sm font-semibold ${offer.status === 'ไม่อนุมัติเนื่องจากไม่อยู่ในเขตให้บริการ' ? 'text-red-500' : ''}`}>{offer.status}</span>
                            <button onClick={() => onProductClick(offer)} className="ml-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">ดูรายละเอียด</button>
                        </div>
                    </li>
                ))}

            </ul>
        </div>
    );
};

export default SellTracking;
